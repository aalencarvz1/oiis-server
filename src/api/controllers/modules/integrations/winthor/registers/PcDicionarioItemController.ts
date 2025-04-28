import { NextFunction, Request, Response } from "express";
import PcDicionarioItem from "../../../../../database/models/winthor/PcDicionarioItem.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";
import DatabaseUtils from "../../../../database/DatabaseUtils.js";
import PcDicionarioItemRot from "../../../../../database/models/winthor/PcDicionarioItemRot.js";
import PcDicionarioItemRotCust from "../../../../../database/models/winthor/PcDicionarioItemRotCust.js";
import { Op, Sequelize } from "sequelize";
import All_Tab_Columns from "../../../../../database/models/winthor/All_Tab_Columns.js";

export default class PcDicionarioItemController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcDicionarioItem;
    }  


    /**
     * default RequestHandler method to get registers of table model controller
     * @requesthandler
     * @override
     * @created 2025-03-20
     * @version 1.0.0
     */
    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let bodyParams = req.body;
            let queryParams = req.body.queryParams || req.body;
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            queryParams.raw = true;
            queryParams.where = queryParams.where || {};
            queryParams.order = queryParams.order || [];

            if (bodyParams.includeJoins) {
                queryParams.include = queryParams.include || [];
                queryParams.include.push({
                    model: PcDicionarioItemRot,
                    on:{
                        [Op.and]:[
                            Sequelize.where(Sequelize.literal(`${PcDicionarioItemRot.tableName}.NOMEOBJETO`),Sequelize.literal(`${PcDicionarioItem.tableName}.NOMEOBJETO`)),
                            Sequelize.where(Sequelize.literal(`${PcDicionarioItemRot.tableName}.NOMECAMPO`),Sequelize.literal(`${PcDicionarioItem.tableName}.NOMECAMPO`)),
                        ]
                    }
                })
                queryParams.include.push({
                    model: PcDicionarioItemRotCust,
                    on:{
                        [Op.and]:[
                            Sequelize.where(Sequelize.literal(`${PcDicionarioItemRotCust.tableName}.CODROTINA`),Sequelize.fn('nvl',Sequelize.literal(`${PcDicionarioItemRot.tableName}.CODROTINA`),Sequelize.literal(`${PcDicionarioItemRotCust.tableName}.CODROTINA`))),
                            Sequelize.where(Sequelize.literal(`${PcDicionarioItemRotCust.tableName}.NOMEOBJETO`),Sequelize.literal(`${PcDicionarioItem.tableName}.NOMEOBJETO`)),
                            Sequelize.where(Sequelize.literal(`${PcDicionarioItemRotCust.tableName}.NOMECAMPO`),Sequelize.literal(`${PcDicionarioItem.tableName}.NOMECAMPO`)),
                        ]
                    }
                })
                queryParams.include.push({
                    model: All_Tab_Columns,
                    on:{
                        [Op.and]:[
                            Sequelize.where(Sequelize.literal(`${All_Tab_Columns.tableName}.OWNER`),Sequelize.literal(`'JUMBO'`)),
                            Sequelize.where(Sequelize.literal(`${All_Tab_Columns.tableName}.TABLE_NAME`),Sequelize.literal(`${PcDicionarioItem.tableName}.NOMEOBJETO`)),
                            Sequelize.where(Sequelize.literal(`${All_Tab_Columns.tableName}.COLUMN_NAME`),Sequelize.literal(`${PcDicionarioItem.tableName}.NOMECAMPO`)),
                        ]
                    }
                });
                queryParams.order.push([Sequelize.literal(`${All_Tab_Columns.tableName}.COLUMN_ID`),'ASC']);
            }
            console.log(queryParams);
            res.data = await this.getTableClassModel().findAll(queryParams);
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