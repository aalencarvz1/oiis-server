import { NextFunction, Request, Response } from "express";
import Campaigns from "../../../database/models/Campaigns.js";
import BaseRegistersController from "./BaseRegistersController.js";
import Utils from "../../utils/Utils.js";
import Campaign_Entities from "../../../database/models/Campaign_Entities.js";
import Campaign_Kpis from "../../../database/models/Campaign_Kpis.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import { QueryTypes } from "sequelize";
import Entities_Types from "../../../database/models/Entities_Types.js";

export default class CampaignsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaigns;
    }
    /**
     * default RequestHandler method to put registers of table model controller
     * @requesthandler
     * @override
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async put(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            res.data = await this.getTableClassModel().createData(queryParams);

            if (Utils.hasValue(queryParams.entities)) {
                for(let k in queryParams.entities) {
                    queryParams.entities[k].campaign_id = res.data.id;
                    await Campaign_Entities.create(queryParams.entities[k])
                }
            }

            if (Utils.hasValue(queryParams.kpis)) {
                for(let k in queryParams.kpis) {
                    queryParams.kpis[k].campaign_id = res.data.id;
                    await Campaign_Kpis.create(queryParams.kpis[k])
                }
            }

            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }
    /**
     * default RequestHandler method to put registers of table model controller
     * @requesthandler
     * @override
     * @created 2025-01-30
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
                queryParams.include = queryParams.include || [];
                queryParams.include.push({
                    model: Entities_Types
                })





                if (((this.getTableClassModel() as any).accessLevel || 1) == 2 ) {
                    queryParams.where = queryParams.where || {};
                    queryParams.where.creator_user_id = req.user?.id
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
