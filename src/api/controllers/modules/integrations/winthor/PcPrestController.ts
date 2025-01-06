import DatabaseUtils from "../../../database/DatabaseUtils.js";
import PcPrest from "../../../../database/models/winthor/PcPrest.js";
import BaseIntegrationsController from "../BaseIntegrationsController.js";
import PcCob from "../../../../database/models/winthor/PcCob.js";
import { Op, Sequelize } from "sequelize";

export default class PcPrestController extends BaseIntegrationsController{

    static getTableClassModel() : any {
        return PcPrest;
    }  

    static async getAllWarePixCobs(params?:any) : Promise<any> {
        let queryParams : any = params.queryParams || params;
        queryParams = await DatabaseUtils.prepareQueryParams(queryParams || {});      
        queryParams.include = queryParams.include || [];
        queryParams.include.push({
            model: PcCob,
            required:true,
            raw:true,
            attributes:[],
            on:{
            [Op.and]: [
                Sequelize.where(Sequelize.col(`${PcCob.tableName}.CODCOB`),'=',Sequelize.col(`${PcPrest.tableName}.CODCOB`)),
                Sequelize.where(Sequelize.fn('coalesce',Sequelize.col(`${PcCob.tableName}.BOLETO`),'N'),'=',Sequelize.literal(`'N'`)),
                {
                    CODCOB: {
                        [Op.notIn] : ['DEP','DESD','ESTR','CANC'],        
                    }
                },
                {
                    CODCOB: {
                        [Op.notLike] : '%BNF%',
                    }
                },
                {
                    CODCOB: {
                        [Op.notLike] : '%DEV%',
                    }
                }
            ]
            }
        });
        queryParams.where.VALOR = {[Op.gt] : 0};
        return await PcPrest.findAll(queryParams);  
    }

    static {
        this.configureDefaultRequestHandlers([this.getAllWarePixCobs]);
    }
}