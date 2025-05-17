import { NextFunction, Request, Response } from "express";
import Customized_Commission_Entities from "../../../database/models/Customized_Commission_Entities.js";
import Customized_Commission_Entity_Items from "../../../database/models/Customized_Commission_Entity_Items.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";
import Customized_Commission_Entity_ItemsController from "./Customized_Commission_Entity_ItemsController.js";
import { Sequelize } from "sequelize";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import Customized_Commissions from "../../../database/models/Customized_Commissions.js";

export default class Customized_Commission_EntitiesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Customized_Commission_Entities;
    }

    static handleFieldsToSave(queryParams: any) : void {
    
        let keys = Object.keys(queryParams);
        if (Utils.hasValue(queryParams.id)) {
            if (!Utils.hasValue(queryParams.entity_id)) {
                queryParams.entity_id = queryParams.id;
                queryParams.id = undefined;
                delete queryParams.id;
            }                        
        }

        if (Utils.hasValue(queryParams?.conditions)) {
            if (queryParams?.conditions && typeof queryParams.conditions !== 'string') {        
                queryParams.conditions = JSON.stringify(queryParams.conditions);
            } 
        } else if (keys.indexOf("conditions") > -1) {
            queryParams.conditions = null;
        }

        if (!Utils.hasValue(queryParams?.start_at) && keys.indexOf("start_at") > -1) {
            queryParams.start_at = null;
        }

        if (!Utils.hasValue(queryParams?.end_at) && keys.indexOf("end_at") > -1) {
            queryParams.end_at = null;
        }

        if (keys.includes("entity_type")) {
            queryParams.entity_type = undefined;
            delete queryParams.entity_type;
        }

        if (keys.includes("tempId")) {
            queryParams.tempId = undefined;
            delete queryParams.tempId;
        }

    }

    static async createEntitiesFromCustomizedCommission(params : any) : Promise<void>{
        if (Utils.hasValue(params?.customized_commission?.customized_commission_entities)) {
            for(let k in params.customized_commission.customized_commission_entities) {
                params.customized_commission.customized_commission_entities[k].customized_commission_id = params.customized_commission.id;                
                this.handleFieldsToSave(params.customized_commission.customized_commission_entities[k]);
                const result = await Customized_Commission_Entities.create(params.customized_commission.customized_commission_entities[k],{transaction: params.transaction});
                const itemsParams : any = {customized_commission_entity:{...params.customized_commission.customized_commission_entities[k],...result.dataValues || result}};                
                itemsParams.transaction = params.transaction;
                console.log('xxxxxx',itemsParams);
                await Customized_Commission_Entity_ItemsController.createItemsFromEntity(itemsParams); 

            }
        }
    }


    /**
     * path all items of customized_commission, such as entities and kpis
    * @version 1.0.0
    */
    static async patchEntitiesFromCustomizedCommission(params : any) : Promise<void>{
        if (Utils.hasValue(params?.customized_commission?.customized_commission_entities)) {
            for(let k in params.customized_commission.customized_commission_entities) {
                params.customized_commission.customized_commission_entities[k].customized_commission_id = params.customized_commission.id;
                
                let where : any = {};
                if (Utils.hasValue(params.customized_commission.customized_commission_entities[k].id)) {
                    where.id = params.customized_commission.customized_commission_entities[k].id;
                }
                if (Utils.hasValue(params.customized_commission.customized_commission_entities[k].items_ids_to_exclude)) {
                
                    await Customized_Commission_Entity_Items.destroy({
                        where: {
                            id: Utils.toArray(params.customized_commission.customized_commission_entities[k].items_ids_to_exclude)?.map(Utils.toNumber)
                        },
                        transaction: params.transaction
                    });
                }

                this.handleFieldsToSave(params.customized_commission.customized_commission_entities[k]);
                
                let resultData : any = null;
                if (Utils.hasValue(where)) {//update record
                    resultData = await Customized_Commission_Entities.saveOrCreate({
                        where:where,
                        values:params.customized_commission.customized_commission_entities[k],
                        transaction: params.transaction
                    });
                    if (!resultData?.success) {
                        resultData?.throw();
                    }
                    resultData = resultData.data;
                } else { //new record
                    resultData = await Customized_Commission_Entities.create(
                        params.customized_commission.customized_commission_entities[k],
                        {
                            transaction: params.transaction
                        }
                    );
                }

                const itemsParams : any = {customized_commission_entity:{...params.customized_commission.customized_commission_entities[k],...resultData.dataValues || resultData}};                
                itemsParams.transaction = params.transaction;
                await Customized_Commission_Entity_ItemsController.patchItemsFromEntity(itemsParams); 
            }
        }
    }

    /**
     * @requesthandler
     * @override
     * @created 2025-05-16
     * @version 1.0.0
     */
    static async get_with_totals_and_items(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const params = req.body || {};            
            const queryParams = params.queryParams || params;
            queryParams.raw = true;
            queryParams.attributes = queryParams.attributes || ['*'];
            //queryParams.attributes.push(Sequelize.literal(`(select sum(coalesce(i.base_value,0)) from ${Customized_Commission_Entity_Items.tableName} i where i.customized_commission_entity_id = ${Customized_Commission_Entities.tableName}.id) as base_value`));
            queryParams.include = queryParams.include || [];
            queryParams.include.push({
                model: Customized_Commissions
            })
            queryParams.include.push({
                model: Customized_Commission_Entity_Items
            })
            if (Utils.hasValue(queryParams.where)) {
                queryParams.where = DatabaseUtils.prepareLogicalQueryParams(queryParams.where);
            }
            res.data = await Customized_Commission_Entities.findAll(queryParams);
            res.success = true;
        } catch (e: any) {
            res.setException(e);            
        }
        res.sendResponse();
    }


    static {
        this.configureDefaultRequestHandlers([
            this.get_with_totals_and_items
        ]);
    }
}
