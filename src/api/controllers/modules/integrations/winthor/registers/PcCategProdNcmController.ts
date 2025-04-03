import { NextFunction, Request, Response } from "express";
import PcCategProdNcm from "../../../../../database/models/winthor/PcCategProdNcm.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";
import DatabaseUtils from "../../../../database/DatabaseUtils.js";
import Utils from "../../../../utils/Utils.js";
import PcCategProdNcmXNcm from "../../../../../database/models/winthor/PcCategProdNcmXNcm.js";
import { Op, Sequelize } from "sequelize";

export default class PcCategProdNcmController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcCategProdNcm;
    }  


     /**
         * get data from inherited this and include joins
         * @created 2025-01-01
         * @version 1.0.0
         */
        static async _get(params?: any) : Promise<any[]> {
            let queryParams : any = params?.queryParams || params || {};
            queryParams.where = queryParams.where || {};
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            queryParams.raw = Utils.firstValid([queryParams.raw,true]);
            if (params?.includeJoins) {
                queryParams.include = queryParams.include || [];
                queryParams.include.push({
                    required: true,
                    model: PcCategProdNcmXNcm
                });
            }
            if (Utils.hasValue(params?.CODNCMEX)) {
                queryParams.where[Op.and] = queryParams.where[Op.and] || [];
                let codNcmEx = params.CODNCMEX.toString();
                codNcmEx = codNcmEx.split('.');
                let codNcm : any = Utils.toNumber(codNcmEx[0])?.toString().padStart(8,'0');
                let codNcmArr : any = [
                    codNcm.slice(0,2),
                    codNcm.slice(2,4),
                    codNcm.slice(4,6),
                    codNcm.slice(6,7),
                    codNcm.slice(7,8)
                ];

                if (Utils.hasValue(codNcmArr[0])) {
                    queryParams.where[Op.and].push(Sequelize.where(Sequelize.fn('coalesce',Sequelize.col(`${PcCategProdNcmXNcm.tableName}.CAPITULO`),Utils.toNumber(codNcmArr[0])),Utils.toNumber(codNcmArr[0])));
                } else {
                    queryParams.where[Op.and].push(Sequelize.where(Sequelize.col(`${PcCategProdNcmXNcm.tableName}.CAPITULO`),null));
                }
                if (Utils.hasValue(codNcmArr[1])) {
                    queryParams.where[Op.and].push(Sequelize.where(Sequelize.fn('coalesce',Sequelize.col(`${PcCategProdNcmXNcm.tableName}.POSICAO`),Utils.toNumber(codNcmArr[1])),Utils.toNumber(codNcmArr[1])));
                } else {
                    queryParams.where[Op.and].push(Sequelize.where(Sequelize.col(`${PcCategProdNcmXNcm.tableName}.POSICAO`),null));
                }
                if (Utils.hasValue(codNcmArr[2])) {
                    queryParams.where[Op.and].push(Sequelize.where(Sequelize.fn('coalesce',Sequelize.col(`${PcCategProdNcmXNcm.tableName}.SUBPOSICAO`),Utils.toNumber(codNcmArr[2])),Utils.toNumber(codNcmArr[2])));
                } else {
                    queryParams.where[Op.and].push(Sequelize.where(Sequelize.col(`${PcCategProdNcmXNcm.tableName}.SUBPOSICAO`),null));
                }
                if (Utils.hasValue(codNcmArr[3])) {
                    queryParams.where[Op.and].push(Sequelize.where(Sequelize.fn('coalesce',Sequelize.col(`${PcCategProdNcmXNcm.tableName}.ITEM`),Utils.toNumber(codNcmArr[3])),Utils.toNumber(codNcmArr[3])));
                } else {
                    queryParams.where[Op.and].push(Sequelize.where(Sequelize.col(`${PcCategProdNcmXNcm.tableName}.ITEM`),null));
                }
                if (Utils.hasValue(codNcmArr[4])) {
                    queryParams.where[Op.and].push(Sequelize.where(Sequelize.fn('coalesce',Sequelize.col(`${PcCategProdNcmXNcm.tableName}.SUBITEM`),Utils.toNumber(codNcmArr[4])),Utils.toNumber(codNcmArr[4])));
                } else {
                    queryParams.where[Op.and].push(Sequelize.where(Sequelize.col(`${PcCategProdNcmXNcm.tableName}.SUBITEM`),null));
                }
                if (Utils.hasValue(codNcmEx[1])) {
                    queryParams.where[Op.and].push(Sequelize.where(Sequelize.fn('coalesce',Sequelize.col(`${PcCategProdNcmXNcm.tableName}.EXCESSAO`),Utils.toNumber(codNcmEx[1])),Utils.toNumber(codNcmEx[1])));
                } else {
                    queryParams.where[Op.and].push(Sequelize.where(Sequelize.col(`${PcCategProdNcmXNcm.tableName}.EXCESSAO`),null));
                }
                
            }
            
            return await this.getTableClassModel().findAll(queryParams);
        }


    /**
     * @requesthandler
     * @override
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {  
            let params = req.body || {};        
            res.data = await this._get(params);
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }
    
    static {
        this.configureDefaultRequestHandlers();
    }
}