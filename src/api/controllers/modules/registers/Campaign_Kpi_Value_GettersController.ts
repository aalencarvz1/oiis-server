import { NextFunction, Request, Response } from "express";
import Campaign_Kpi_Value_Getters from "../../../database/models/Campaign_Kpi_Value_Getters.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import { QueryTypes } from "sequelize";
import Campaign_Kpis from "../../../database/models/Campaign_Kpis.js";
import Campaigns from "../../../database/models/Campaigns.js";
import Relationships from "../../../database/models/Relationships.js";
import Entities_Types from "../../../database/models/Entities_Types.js";
import Report_Visions from "../../../database/models/Report_Visions.js";
import Relationship_Types from "../../../database/models/Relationship_Types.js";
import Campaign_Entities from "../../../database/models/Campaign_Entities.js";
import ReportsController from "../reports/ReportsController.js";
import Measurement_Units from "../../../database/models/Measurement_Units.js";

export default class Campaign_Kpi_Value_GettersController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaign_Kpi_Value_Getters;
    }


    /**
     * create all items of kpi
     * @version 1.0.0
     */
    static async createKpiGettersFromKpi(params : any) : Promise<void>{
        if (Utils.hasValue(params?.kpi?.kpi_value_getters)) {

            //campaign kpi value getters
            for(let k in params?.kpi?.kpi_value_getters	||[]) {
                params.kpi.kpi_value_getters[k].campaign_kpi_id = params.kpi.id;
                if (Utils.hasValue(params.kpi.kpi_value_getters[k].conditions) && typeof params.kpi.kpi_value_getters[k].conditions != 'string') {
                    params.kpi.kpi_value_getters[k].conditions = JSON.stringify(params.kpi.kpi_value_getters[k].conditions);
                }
                if (Utils.hasValue(params.kpi.kpi_value_getters[k].campaign_entity_ids) && typeof params.kpi.kpi_value_getters[k].campaign_entity_ids != 'string') {
                    params.kpi.kpi_value_getters[k].campaign_entity_ids = params.kpi.kpi_value_getters[k].campaign_entity_ids.join(",");
                }
                params.kpi.kpi_value_getters[k] = {...params.kpi.kpi_value_getters[k], ...(await Campaign_Kpi_Value_Getters.create(params.kpi.kpi_value_getters[k],{transaction: params.transaction})).dataValues};
            }
        }
    }


    /**
     * calculate the result of kpi getter
     * @requesthandler
     * @created 2025-03-06
     * @version 1.0.0
     */
    static async calculate(req: Request, res: Response, next: NextFunction) : Promise<void> {
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
                queryParams.include = queryParams.include || [];
                queryParams.include.push({
                    required: true,
                    model: Campaign_Kpis,
                    include: [{
                        required: true,
                        model: Campaigns,
                        include: [{
                            required: true,
                            model: Entities_Types
                        }]
                    }]
                });

                let kpiValueGetter = await this.getTableClassModel().findOne(queryParams);
                if (Utils.hasValue(kpiValueGetter)) {
                    let visionRelationship = await Relationships.findOne({
                        where:{
                            relationship_type_id: Relationship_Types.RELATIONSHIP,
                            table_1_id: Entities_Types.id,
                            record_1_id: kpiValueGetter[`${Campaign_Kpis.tableName.toLowerCase()}.${Campaigns.tableName.toLowerCase()}.entity_type_id`],
                            table_2_id: Report_Visions.id
                        }
                    });
                    if (Utils.hasValue(visionRelationship)) {
                        let entities = await Campaign_Entities.findAll({
                            where:{
                                campaign_id: kpiValueGetter[`${Campaign_Kpis.tableName.toLowerCase()}.campaign_id`]
                            }
                        });
                        if (Utils.hasValue(entities)) {
                            let reportParams : any = {};
                            reportParams.user = req.user;
                            reportParams.visions = [visionRelationship.record_2_id];
                            reportParams.periods = [[kpiValueGetter.init_date,kpiValueGetter.end_date]];
                            reportParams.considerNormalSales = Utils.toBool(kpiValueGetter.consider_normal_sales);
                            reportParams.considerReturns = Utils.toBool(kpiValueGetter.consider_returns);
                            reportParams.considerBonuses = Utils.toBool(kpiValueGetter.consider_bonuses);
                            reportParams.viewAmount = [Measurement_Units.UN,Measurement_Units.DT].indexOf(kpiValueGetter.measurement_unit_id) > -1;
                            reportParams.viewWeight = kpiValueGetter.measurement_unit_id == Measurement_Units.WT;
                            reportParams.viewValue = kpiValueGetter.measurement_unit_id == Measurement_Units.VL;
                            reportParams.conditions = [];
                            /*reportParams.conditions.push({
                                reportVision:{id:visionRelationship.record_2_id},
                                operation:{id:'IN'},
                                selecteds: entities.map(el=>({id:el.entity_id}))
                            })*/
                            if (Utils.hasValue(kpiValueGetter[`${Campaign_Kpis.tableName.toLowerCase()}.${Campaigns.tableName.toLowerCase()}.conditions`])) {
                                reportParams.conditions = [...reportParams.conditions, ...JSON.parse(kpiValueGetter[`${Campaign_Kpis.tableName.toLowerCase()}.${Campaigns.tableName.toLowerCase()}.conditions`])];
                            }
                            if (Utils.hasValue(kpiValueGetter[`${Campaign_Kpis.tableName.toLowerCase()}.conditions`])) {
                                reportParams.conditions = [...reportParams.conditions, ...JSON.parse(kpiValueGetter[`${Campaign_Kpis.tableName.toLowerCase()}.conditions`])];
                            }
                            if (Utils.hasValue(kpiValueGetter.conditions)) {
                                reportParams.conditions = [...reportParams.conditions, ...JSON.parse(kpiValueGetter.conditions)];
                            }
                            console.log(JSON.stringify(reportParams.conditions));
                            res.data = await ReportsController.getCustomizedReportData(reportParams);
                        } else {
                            throw new Error('no has entities');
                        }
                    } else {
                        throw new Error('no has vision relationship to entity type');
                    }
                } else {
                    throw new Error('no data found');
                }
            }
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }



    static {
        this.configureDefaultRequestHandlers([
            this.calculate
        ]);
    }
}
