import { QueryTypes } from "sequelize";
import DBConnectionManager from "../../../../../database/DBConnectionManager.js";
import SjdLogAnaliseEnt from "../../../../../database/models/sjd/SjdLogAnaliseEnt.js";
import DataSwap from "../../../../data/DataSwap.js";
import Utils from "../../../../utils/Utils.js";
import SjdBaseRegistersIntegrationsController from "./SjdBaseRegistersIntegrationsController.js";

export default class SjdLogAnaliseEntController extends SjdBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return SjdLogAnaliseEnt;
    }  

    static async getInputAnalise(params?: any) : Promise<DataSwap> {
        let result : DataSwap = new DataSwap();
        try {   
            let where : any = [];


            if (Utils.hasValue(params.business_units)) {
                where.push(`e.codfilial in (${params.business_units})`)
            }
            if (Utils.hasValue(params.input_transcation_number)) {
                where.push(`e.numtransent in (${params.input_transcation_number})`)
            }
            if (Utils.hasValue(params.invoice_number)) {
                where.push(`e.numnota in (${params.invoice_number})`)
            }  
            if (Utils.hasValue(params.start_date)) {
                where.push(`e.dtent >= to_date('${params.start_date}','yyyy-mm-dd')`)
            } 
            if (Utils.hasValue(params.end_date)) {
                where.push(`e.dtent <= to_date('${params.end_date}','yyyy-mm-dd')`)
            } 
            if (where.length) {
                where = ` where ${where.join(' and ')}`;
            } else {
                where = ` where 1 = 2`;
            }

            let query = `
                select 
                    case when e.numped is not null then 'PREENT' ELSE 'ENTRADA' end as "tipo",
                    e.codfilial as "codfilial",
                    e.numtransent as "numtransent",
                    e.numnota as "numnota",
                    e.numped as "numped",
                    e.dtent as "dtent",
                    e.rotinalanc as "rotinalanc",
                    e.equiplanc as "equiplanc",
                    max(e.temdivergenciatrib) as "temdivergenciatrib",
                    max(e.temdivergenciapreco) as "temdivergenciapreco",
                    max(e.temdivergenciaprecotabfornec) as "temdivergenciaprecotabfornec"
                from
                    sjdloganaliseent e
                ${where}
                group by
                    case when e.numped is not null then 'PREENT' ELSE 'ENTRADA' end,
                    e.codfilial,
                    e.numtransent,
                    e.numnota,
                    e.numped,
                    e.dtent,
                    e.rotinalanc,
                    e.equiplanc
            `
            result.data = await DBConnectionManager.getConsultDBConnection()?.query(
                query,{
                    type: QueryTypes.SELECT
                }                
            )
            result.success = true;
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }
    
    static {
        this.configureDefaultRequestHandlers();
    }
}