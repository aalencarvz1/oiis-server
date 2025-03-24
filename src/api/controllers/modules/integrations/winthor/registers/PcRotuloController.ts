import { NextFunction, Request, Response } from "express";
import PcRotulo from "../../../../../database/models/winthor/PcRotulo.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";
import DatabaseUtils from "../../../../database/DatabaseUtils.js";
import { QueryTypes, Sequelize } from "sequelize";
import PcRotuloItem from "../../../../../database/models/winthor/PcRotuloItem.js";

export default class PcRotuloController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcRotulo;
    }  


    /**
     * default RequestHandler method to get registers of table model controller
     * @requesthandler
     * @override
     * @created 2025-03-21
     * @version 1.0.0
     */
    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            queryParams.raw = true;
            if (queryParams.query) {
                res.data = await this.getTableClassModel().getConnection().query(
                    queryParams.query,{
                        raw:queryParams.raw,
                        type:QueryTypes.SELECT
                    }
                );
            } else {
                if (((this.getTableClassModel() as any).accessLevel || 1) == 2 ) {
                    queryParams.where = queryParams.where || {};
                    queryParams.where.creator_user_id = req.user?.id
                }

                if (req.body.includeItems) {
                    queryParams.include = queryParams.include || [];
                    queryParams.include.push({
                        model: PcRotuloItem,
                        on:Sequelize.where(Sequelize.literal(`${PcRotuloItem.tableName}.ID`),Sequelize.literal(`${PcRotulo.tableName}.ID`))
                    });
                    queryParams.order = queryParams.order || [];
                    queryParams.order.push([Sequelize.literal(`${PcRotuloItem.tableName}.VALOR`),'ASC']);
                }

                res.data = await this.getTableClassModel().findAll(queryParams);
            }
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