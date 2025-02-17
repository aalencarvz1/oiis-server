import { QueryTypes } from "sequelize";
import DBConnectionManager from "../../../../../database/DBConnectionManager.js";
import SjdLogAnaliseEnt from "../../../../../database/models/sjd/SjdLogAnaliseEnt.js";
import DataSwap from "../../../../data/DataSwap.js";
import Utils from "../../../../utils/Utils.js";
import SjdBaseRegistersIntegrationsController from "./SjdBaseRegistersIntegrationsController.js";
import Report_Data_Founts from "../../../../../database/models/Report_Data_Founts.js";

export default class SjdLogAnaliseEntController extends SjdBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return SjdLogAnaliseEnt;
    }  

    static async getInputAnalise(params?: any) : Promise<DataSwap> {
        let result : DataSwap = new DataSwap();
        try {   
            let reportDataFountName = 'input analises';

            let query : any = await Report_Data_Founts.findOne({
                where:{
                    name: reportDataFountName
                }
            });

            if (Utils.hasValue(query)) {
                query = query.get_value_from;

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
                    where.push(`trunc(e.dtent) >= trunc(to_date('${params.start_date}','yyyy-mm-dd'))`)
                } 
                if (Utils.hasValue(params.end_date)) {
                    where.push(`trunc(e.dtent) <= trunc(to_date('${params.end_date}','yyyy-mm-dd'))`)
                } 
                if (where.length) {
                    where = ` where ${where.join(' and ')}`;
                } else {
                    where = ` where 1 = 2`;
                }

                query = query.replace('${where}',where);
                
                result.data = await DBConnectionManager.getConsultDBConnection()?.query(query,{
                    type: QueryTypes.SELECT
                })
                result.success = true;
            } else {
                throw new Error(`report data fount not found with name ${reportDataFountName}`);
            }
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }

    static async getInputAnaliseDetails(params?: any) : Promise<DataSwap> {
        let result : DataSwap = new DataSwap();
        try {   

            let reportDataFountName = 'input analise details';

            let query : any = await Report_Data_Founts.findOne({
                where:{
                    name: reportDataFountName
                }
            });

            if (Utils.hasValue(query)) {
                query = query.get_value_from;
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
                if (Utils.hasValue(params.order_number)) {
                    where.push(`e.numped in (${params.order_number})`)
                }  
                if (Utils.hasValue(params.start_date)) {
                    where.push(`e.dtent >= to_date('${params.start_date.substring(0,19).replace("T"," ")}','yyyy-mm-dd hh24:mi:ss')`)
                } 
                if (Utils.hasValue(params.end_date)) {
                    where.push(`e.dtent <= to_date('${params.end_date.substring(0,19).replace("T"," ")}','yyyy-mm-dd hh24:mi:ss')`)
                } 



                if (where.length) {
                    where = ` where ${where.join(' and ')}`;
                } else {
                    where = ` where 1 = 2`;
                }

                query = query.replace('${where}',where);
                
                result.data = await DBConnectionManager.getConsultDBConnection()?.query(
                    query,{
                        type: QueryTypes.SELECT
                    }                
                )
                result.success = true;
            } else {
                throw new Error(`report data fount not found with name ${reportDataFountName}`);
            }
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }
    
    static {
        this.configureDefaultRequestHandlers();
    }
}