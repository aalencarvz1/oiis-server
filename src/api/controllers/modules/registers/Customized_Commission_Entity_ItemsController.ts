import Customized_Commission_Entities from "../../../database/models/Customized_Commission_Entities.js";
import Customized_Commission_Entity_Items from "../../../database/models/Customized_Commission_Entity_Items.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Customized_Commission_Entity_ItemsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Customized_Commission_Entity_Items;
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

    static async createItemsFromEntity(params : any) : Promise<void>{
        if (Utils.hasValue(params?.customized_commission_entity?.customized_commission_entity_items)) {
            for(const k in params.customized_commission_entity.customized_commission_entity_items) {
                params.customized_commission_entity.customized_commission_entity_items[k].customized_commission_entity_id = params.customized_commission_entity.id;                
                this.handleFieldsToSave(params.customized_commission_entity.customized_commission_entity_items[k]);
                await Customized_Commission_Entity_Items.create(params.customized_commission_entity.customized_commission_entity_items[k],{transaction: params.transaction})
            }
        }
    }


    /**
    * @version 1.0.0
    */
    static async patchItemsFromEntity(params : any) : Promise<void>{
        if (Utils.hasValue(params?.customized_commission_entity?.customized_commission_entity_items)) {
            for(const k in params.customized_commission_entity.customized_commission_entity_items) {
                params.customized_commission_entity.customized_commission_entity_items[k].customized_commission_entity_id = params.customized_commission_entity.id;
                
                const where : any = {};
                if (Utils.hasValue(params.customized_commission_entity.customized_commission_entity_items[k].id)) {
                    where.id = params.customized_commission_entity.customized_commission_entity_items[k].id;
                } 
                this.handleFieldsToSave(params.customized_commission_entity.customized_commission_entity_items[k]);

                let resultData : any = {};
                if (Utils.hasValue(where)) {//update record
                    resultData = await Customized_Commission_Entity_Items.saveOrCreate({
                        where:where,
                        values:params.customized_commission_entity.customized_commission_entity_items[k],
                        transaction: params.transaction
                    });
                    if (!resultData?.success) {
                        resultData?.throw();
                    }
                } else { //new record
                    resultData = await Customized_Commission_Entity_Items.create(
                        params.customized_commission_entity.customized_commission_entity_items[k],
                        {
                            transaction: params.transaction
                        }
                    );
                }
            }
        }
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
