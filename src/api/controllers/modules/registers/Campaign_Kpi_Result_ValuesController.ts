import { NextFunction, Request, Response } from "express";
import Campaign_Kpi_Result_Values from "../../../database/models/Campaign_Kpi_Result_Values.js";
import BaseRegistersController from "./BaseRegistersController.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import { Op, QueryTypes } from "sequelize";
import Campaign_Kpis from "../../../database/models/Campaign_Kpis.js";
import Campaigns from "../../../database/models/Campaigns.js";
import Entities_Types from "../../../database/models/Entities_Types.js";
import Utils from "../../utils/Utils.js";
import DBConnectionManager from "../../../database/DBConnectionManager.js";
import Campaign_Kpi_Value_GettersController from "./Campaign_Kpi_Value_GettersController.js";
import DataSwap from "../../data/DataSwap.js";
import Campaign_Entities from "../../../database/models/Campaign_Entities.js";
import Campaign_Entities_Kpi_Result_Values from "../../../database/models/Campaign_Entities_Kpi_Result_Values.js";

export default class Campaign_Kpi_Result_ValuesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaign_Kpi_Result_Values;
    }


    static getVarsFromExpression(expression: string) : string[] {
        let result: string[] = [];
        if (expression.indexOf("${") > -1) {
            result = expression.split("${");
            result = result.map((el:any)=>el.substring(0,el.indexOf("}")));
            result = [...new Set(result)];
            result = result.filter(Utils.hasValue);
        }
        return result;
    };


    /**
     * Based on kpi result value, get kpi value getters according expression
     * @created 2025-03-07
     * @version 1.0.0
     */
    static async getKpiValueGettersFromKpiResultValue(kpiResultValue: Campaign_Kpi_Result_Values) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let expression = kpiResultValue.expression;
            console.log('exp',expression);

            //extract variables from expression
            let expressionVars = this.getVarsFromExpression(expression);
            console.log('expressionVars',expressionVars);
            if (Utils.hasValue(expressionVars)) {
                console.log('expressionVars',expressionVars);

                //mount where clause to get kpi value getters according variable names
                let varNameAssociationColumn : any = [];
                let where : any = expressionVars.map((el: any)=>{
                    // 2 = peso.value, 3 = results.peso.value, 4 = kpi_name.results.peso.value, 5 = campaign_name.kpi_name.result.peso.value, >5 error
                    let resultWhere = null;
                    let elArr = el.split(".");
                    switch(elArr.length) {
                        case 1: //result name
                            throw new Error('do implement use results in expression');
                        break;
                        case 2: //getter_name.[value | objective] or results.resultname
                            if (elArr[0].toLowerCase().trim() == 'results') {  
                                throw new Error('do implement use results in expression');
                            } else {
                                resultWhere = `(ckg.campaign_kpi_id = ${kpiResultValue.campaign_kpi_id}
                                    and lower(ckg.name) = lower('${elArr[0]}'))`;                                
                            }
                        break;
                        case 3:
                            if (elArr[0].toLowerCase().trim() == 'kpis') {  
                                resultWhere = `(ckg.campaign_kpi_id = ${kpiResultValue.campaign_kpi_id}
                                    and lower(ckg.name) = lower('${elArr[1]}'))`;                                
                            } else if (elArr[0].toLowerCase().trim() == 'results') {  
                                throw new Error('do implement use results in expression');
                            } else {
                                throw new Error(`element of expression not handled: ${elArr[0]}`);
                            }                                
                        break;
                        default:
                            throw new Error('do implement use external references of kpi in expressions');
                        break;
                    }
                    varNameAssociationColumn.push(`when ${resultWhere} then '${el}'`);
                    return resultWhere;
                });
                where = [...new Set(where)];
                where = where.filter(Utils.hasValue);
                if (Utils.hasValue(where)) {
                    where = where.join(' or ');
                    varNameAssociationColumn = `case ${varNameAssociationColumn.join(' ')} else '' end as var_name`;
                } else {
                    where = '1=2';
                    varNameAssociationColumn = '';
                }

                //query to get kpi value getters                
                let query = `
                    select 
                        ckg.id as id,
                        ckg.name as name,
                        ck.name as kpi_name,
                        c.name as campaign_name,
                        ${varNameAssociationColumn}
                    from
                        campaign_kpi_value_getters ckg
                        join campaign_kpis ck on ckg.campaign_kpi_id = ck.id
                        join campaigns c on ck.campaign_id = c.id
                        join entities_types et on c.entity_type_id = et.id
                    where
                        ${where}
                `
                console.log('query',query);

                //get kpi value getters from db
                result.data = await DBConnectionManager.getDefaultDBConnection()?.query(
                    query,{
                        raw:true,
                        type:QueryTypes.SELECT
                    }                            
                );

                console.log('kpiValueGetters 0',result.data);

                if (Utils.hasValue(result.data)) {

                    let kpiValueGettersNames = result.data.map((el: any)=>`${el.campaign_name}.${el.kpi_name}.${el.name}`);
                    kpiValueGettersNames = [...new Set(kpiValueGettersNames)];
                    console.log('kpiValueGettersNames',kpiValueGettersNames);

                    //check and filter result based on entity_ids
                    if (Utils.hasValue(kpiResultValue.campaign_entity_ids)) {
                        kpiResultValue.campaign_entity_ids = kpiResultValue.campaign_entity_ids.split(",").map(Utils.toNumber) as any;
                        let filteredkpiValueGetters = result.data.filter((el:any)=>{
                            let result = false;
                            if (Utils.hasValue(el.campaign_entity_ids)) {
                                el.campaign_entity_ids = el.campaign_entity_ids.split(",").map(Utils.toNumber);
                                for(let k in el.campaign_entity_ids) {
                                    if (kpiResultValue.campaign_entity_ids.includes(el.campaign_entity_ids[k])) {
                                        result = true;
                                        break;
                                    }                                        
                                }
                            }
                            return result;
                        });

                        let filteredkpiValueGettersNames = filteredkpiValueGetters.map((el: any)=>`${el.campaign_name}.${el.kpi_name}.${el.name}`);

                        let notFilteredkpiValueGettersNames = kpiValueGettersNames.filter((el:any)=>!filteredkpiValueGettersNames.includes(el));

                        //reinclude not specific getters if not has specific pre-included
                        if (notFilteredkpiValueGettersNames.length) {
                            for(let k in result.data) {
                                let name = `${result.data[k].campaign_name}.${result.data[k].kpi_name}.${result.data[k].name}`;
                                if (notFilteredkpiValueGettersNames.includes(name) && !Utils.hasValue(result.data[k].campaign_entity_ids)) {
                                    filteredkpiValueGetters.push(result.data[k]);
                                    filteredkpiValueGettersNames.push(name);
                                    notFilteredkpiValueGettersNames.splice(notFilteredkpiValueGettersNames.indexOf(name),1);
                                }
                            }
                        }
                        result.data = filteredkpiValueGetters;
                    } 
                }
            }
            result.success = true;
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }


    /**
     * calculate the result of kpi result value expression
     * @requesthandler
     * @created 2025-03-07
     * @version 1.0.0
     */
    static async calculate(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            queryParams.raw = true;
            let kpiResultValue : any = null;
            if (queryParams.query) {
                kpiResultValue = await this.getTableClassModel().getConnection().query(
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

                kpiResultValue = await this.getTableClassModel().findOne(queryParams);
            }

            console.log('kpiResultValue',kpiResultValue);
            if (Utils.hasValue(kpiResultValue)) {

                //find entities associated on this kpi result value 
                let whereEntities : any = {
                    campaign_id: kpiResultValue[`${Campaign_Kpis.tableName.toLowerCase()}.campaign_id`]
                };
                let entitiesIds = kpiResultValue.campaign_entity_ids;
                if (Utils.hasValue(entitiesIds)) {
                    entitiesIds = Utils.toArray(entitiesIds)?.map(Utils.toNumber);
                    whereEntities.entity_id = {[Op.in]:entitiesIds}
                }
                let entities : any = await Campaign_Entities.findAll({
                    raw:true,
                    where: whereEntities
                });

                console.log('entities',entities);

                //get kpi value getters
                let kpiValueGetters : any = await this.getKpiValueGettersFromKpiResultValue(kpiResultValue);

                console.log('kpiValueGetters',kpiValueGetters);
                if (kpiValueGetters?.success) {
                    kpiValueGetters = kpiValueGetters.data || [];

                    //calculate kpi value getter result. Calc result is an array of rows with objects wich first property is entity_id
                    for(let k in kpiValueGetters) {
                        kpiValueGetters[k].calc_result = await Campaign_Kpi_Value_GettersController._calculate({queryParams:{where:{id:kpiValueGetters[k].id}},user:req.user});
                        if (kpiValueGetters[k].calc_result?.success) {
                            kpiValueGetters[k].calc_result = kpiValueGetters[k].calc_result.data || [];
                        } else {
                            kpiValueGetters[k].calc_result?.throw();
                        }
                    }

                    //iterate over all entities associateds to this result value
                    for(let j in entities) {

                        //evaluate expression by entity according kpi value getters, replacing correspondent it on expression
                        entities[j].expression = entities[j].expression || kpiResultValue.expression;
                        for(let k in kpiValueGetters) {
                            if (Utils.hasValue(kpiValueGetters[k].calc_result)) {
                                let keysTemp = Object.keys(kpiValueGetters[k].calc_result[0]);
                                let rowEntityDataResult = kpiValueGetters[k].calc_result.find((el:any)=>el[keysTemp[0]] == entities[j].entity_id);
                                if (Utils.hasValue(rowEntityDataResult)) {
                                    entities[j].expression = entities[j].expression.replaceAll(`\$\{${kpiValueGetters[k].var_name}\}`,rowEntityDataResult[keysTemp[keysTemp.length - 1]]);
                                }
                            }
                        }
                        if (entities[j].expression.indexOf("${") > -1) {
                            throw new Error('do implement multiple fonts from expression');
                        }
                        entities[j].expression = eval(entities[j].expression);

                        //upsert kpi result value
                        let resultTemp = await Campaign_Entities_Kpi_Result_Values.saveOrCreate({
                            where:{
                                campaign_entity_id: entities[j].id,
                                campaign_kpi_result_id: kpiResultValue.id
                            },
                            values:{
                                value: entities[j].expression
                            }                                        
                        });

                        if (!resultTemp?.success) {
                            resultTemp?.throw();
                        }
                    }
                    
                } else {
                    kpiValueGetters?.throw();
                }

                res.success = true;
            } else {
                throw new Error("no data found")
            }            
        } catch (e: any) {
            res.setException(e);
        }
        res.sendResponse();
    }
    
    static {
        this.configureDefaultRequestHandlers([
            this.calculate
        ]);
    }
}
