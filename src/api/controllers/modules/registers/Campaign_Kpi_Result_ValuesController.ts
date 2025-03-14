import { NextFunction, Request, Response } from "express";
import Campaign_Kpi_Result_Values from "../../../database/models/Campaign_Kpi_Result_Values.js";
import BaseRegistersController from "./BaseRegistersController.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import { Op, QueryTypes, Sequelize } from "sequelize";
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

            //extract variables from expression
            let expressionVars = this.getVarsFromExpression(expression);
            if (Utils.hasValue(expressionVars)) {

                //mount where clause to get kpi value getters according variable names
                let varNameAssociationColumn : any = [];
                let where : any = expressionVars.map((el: any)=>{
                    // 2 = peso.value, 3 = results.peso.value, 4 = kpi_name.results.peso.value, 5 = campaign_name.kpi_name.result.peso.value, >5 error
                    let resultWhere = null;
                    let elArr = el.split(".");
                    switch(elArr.length) {
                        case 1: //result name
                            //throw new Error('do implement use results in expression');
                            break;
                        break;
                        case 2: //getter_name.[value | objective] or results.resultname
                            if (elArr[0].toLowerCase().trim() == 'results') {  
                                //throw new Error('do implement use results in expression');
                                break;
                            } else {
                                resultWhere = `(ckg.campaign_kpi_id = ${kpiResultValue.campaign_kpi_id}
                                    and lower(ckg.name) = lower('${elArr[0]}'))`;                                
                            }
                        break;
                        case 3:
                            if (elArr[1].toLowerCase().trim() == 'kpis') {  
                                resultWhere = `(ck.name = ${elArr[0]}
                                    and lower(ckg.name) = lower('${elArr[2]}'))`;                                
                            } else if (elArr[1].toLowerCase().trim() == 'results') {  
                                //throw new Error('do implement use results in expression');
                                break;
                            } else {
                                throw new Error(`element of expression not handled: ${elArr[0]}`);
                            }                                
                        break;
                        default:
                            throw new Error(`do implement use external references of kpi in expressions: ${el} ${elArr.length}`);
                        break;
                    }
                    varNameAssociationColumn.push(`when ${resultWhere} then '${el}'`);
                    return resultWhere;
                });
                where = [...new Set(where)];
                where = where.filter(Utils.hasValue);
                if (Utils.hasValue(where)) {
                    where = where.join(' or ');
                    varNameAssociationColumn = `case ${varNameAssociationColumn.join(' ')} else null end as var_name`;
                } else {
                    where = '1=2';
                    varNameAssociationColumn = 'null as var_name';
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

                //get kpi value getters from db
                result.data = await DBConnectionManager.getDefaultDBConnection()?.query(
                    query,{
                        raw:true,
                        type:QueryTypes.SELECT
                    }                            
                );


                if (Utils.hasValue(result.data)) {

                    let kpiValueGettersNames = result.data.map((el: any)=>`${el.campaign_name}.${el.kpi_name}.${el.name}`);
                    kpiValueGettersNames = [...new Set(kpiValueGettersNames)];

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
     * @recursive
     * @created 2025-03-07
     * @version 1.0.0
     */
    static async _calculate(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        let errorMessages = [];
        try {
            let queryParams = params.queryParams || params;
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
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
                    queryParams.where.creator_user_id = params.user?.id
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

            if (Utils.hasValue(kpiResultValue)) {
                
                params.currentDate = params.currentDate || new Date();

                //find entities associated on this kpi result value 
                let whereEntities : any = {
                    campaign_id: kpiResultValue[Campaign_Kpis.tableName.toLowerCase()].campaign_id
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


                if (kpiResultValue.calculated_at?.getTime() != params.currentDate.getTime()) {

                    //get kpi value getters
                    let kpiValueGetters : any = await this.getKpiValueGettersFromKpiResultValue(kpiResultValue);

                    if (kpiValueGetters?.success) {
                        kpiValueGetters = kpiValueGetters.data || [];

                        //calculate kpi value getter result. Calc result is an array of rows with objects wich first property is entity_id
                        for(let k in kpiValueGetters) {
                            kpiValueGetters[k].calc_result = await Campaign_Kpi_Value_GettersController._calculate({
                                user:params.user,
                                currentDate:params.currentDate,
                                queryParams:{
                                    where:{
                                        id:kpiValueGetters[k].id
                                    }
                                }
                            });
                            if (kpiValueGetters[k].calc_result?.success) {
                                kpiValueGetters[k].calc_result = kpiValueGetters[k].calc_result.data || [];
                            } else {
                                kpiValueGetters[k].calc_result?.throw();
                            }
                        }

                        //iterate over all entities associateds to this result value
                        for(let j in entities) {

                            let campaignEntitieKpiResultValue = await Campaign_Entities_Kpi_Result_Values.findOne({
                                where:{
                                    campaign_entity_id: entities[j].id,
                                    campaign_kpi_result_value_id: kpiResultValue.id
                                }                                        
                            });

                            if (Utils.hasValue(campaignEntitieKpiResultValue) && campaignEntitieKpiResultValue.calculated_at?.getTime() == params.currentDate.getTime()) {
                                continue;
                            }


                            //evaluate expression by entity according kpi value getters, replacing correspondent it on expression
                            entities[j].expression = entities[j].expression || kpiResultValue.expression;
                            console.log('expression before',entities[j].expression);
                            for(let k in kpiValueGetters) {
                                if (Utils.hasValue(kpiValueGetters[k].calc_result)) {
                                    let keysTemp = Object.keys(kpiValueGetters[k].calc_result[0]);
                                    let rowEntityDataResult = kpiValueGetters[k].calc_result.find((el:any)=>el[keysTemp[0]] == entities[j].id);
                                    if (Utils.hasValue(rowEntityDataResult)) {
                                        entities[j].expression = entities[j].expression.replaceAll(`\$\{${kpiValueGetters[k].var_name}\}`,rowEntityDataResult[keysTemp[keysTemp.length - 1]]);
                                    } else {
                                        entities[j].expression = entities[j].expression.replaceAll(`\$\{${kpiValueGetters[k].var_name}\}`,0);
                                    }
                                }
                            }
                            if (entities[j].expression.indexOf("${") > -1) {

                                //extract variables from expression
                                let expressionVars = this.getVarsFromExpression(entities[j].expression);
                                if (Utils.hasValue(expressionVars)) {

                                    //mount where clause to get kpi value getters according variable names
                                    let varNameAssociationColumn : any = [];
                                    let where : any = expressionVars.map((el: any)=>{
                                        // 2 = peso.value, 3 = results.peso.value, 4 = kpi_name.results.peso.value, 5 = campaign_name.kpi_name.result.peso.value, >5 error
                                        let resultWhere = null;
                                        let elArr = el.split(".");
                                        switch(elArr.length) {
                                            case 1: //result name
                                                resultWhere = `(
                                                    cv.campaign_kpi_id = ${kpiResultValue[Campaign_Kpis.tableName].id}
                                                    and cv.name = '${el}'
                                                )`;
                                                break;
                                            break;
                                            case 2: //getter_name.[value | objective] or results.resultname
                                                if (elArr[0].toLowerCase().trim() == 'results') {  
                                                    resultWhere = `(
                                                        cv.campaign_kpi_id = ${kpiResultValue[Campaign_Kpis.tableName].id}
                                                        and cv.name = '${elArr[1]}'
                                                    )`;
                                                    break;
                                                } 
                                            break;
                                            case 3:
                                                if (elArr[1].toLowerCase().trim() == 'results') {  
                                                    resultWhere = `(
                                                        k.campaign_id = ${kpiResultValue[Campaign_Kpis.tableName].campaign_id}
                                                        and k.name = '${elArr[0]}'
                                                        and cv.name = '${elArr[2]}'
                                                    )`;
                                                }                                
                                            break;
                                            default:
                                                throw new Error(`do implement use external references of kpi in expressions: ${el} ${elArr.length}`);
                                            break;
                                        }
                                        varNameAssociationColumn.push(`when ${resultWhere} then '${el}'`);
                                        return resultWhere;
                                    });
                                    where = [...new Set(where)];
                                    where = where.filter(Utils.hasValue);
                                    if (Utils.hasValue(where)) {
                                        where = where.join(' or ');
                                        varNameAssociationColumn = `case ${varNameAssociationColumn.join(' ')} else null end as var_name`;
                                    } else {
                                        where = '1=2';
                                        varNameAssociationColumn = 'null as var_name';
                                    }

                                    //query to get kpi value getters                
                                    let query = `                                    
                                        select
                                            cv.*,
                                            ${varNameAssociationColumn}
                                        from                                            
                                            campaign_kpi_result_values cv 
                                            join campaign_kpis k on k.id = cv.campaign_kpi_id
                                        where
                                            (
                                                cv.campaign_entity_ids is null 
                                                or (
                                                    cv.campaign_entity_ids is not null
                                                    and (
                                                        cv.campaign_entity_ids = '${entities[j].entity_id}'
                                                        or instr(cv.campaign_entity_ids,'${entities[j].entity_id}'+',') > 0
                                                        or instr(cv.campaign_entity_ids,','+'${entities[j].entity_id}') > 0
                                                    ) 
                                                )
                                            ) 
                                            and (
                                                ${where}
                                            )
                                    `
                                    //get kpi value getters from db
                                    let resultValuesTemp : any = await DBConnectionManager.getDefaultDBConnection()?.query(
                                        query,{
                                            raw:true,
                                            type:QueryTypes.SELECT
                                        }                            
                                    );


                                    if (Utils.hasValue(resultValuesTemp)) {
                                        for(let k in resultValuesTemp) {

                                            //recursive call
                                            console.log('recursing for', entities[j].expression);
                                            //throw new Error("recursive intercept");
                                            resultValuesTemp[k].calc_result = await this._calculate({
                                                user: params.user,
                                                currentDate: params.currentDate,
                                                queryParams:{
                                                    where:{
                                                        id:resultValuesTemp[k].id
                                                    }
                                                }
                                            });
                                            if (resultValuesTemp[k].calc_result?.success) {
                                                console.log('xxxxx1');
                                                resultValuesTemp[k].calc_result = resultValuesTemp[k].calc_result.data || [];
                                                if (Utils.hasValue(resultValuesTemp[k].calc_result)) {
                                                    console.log('xxxxx2');
                                                    let keysTemp = Object.keys(resultValuesTemp[k].calc_result[0]);
                                                    console.log('xxxxx3',keysTemp);
                                                    console.log('xxxxx3.2',entities[j].entity_id,resultValuesTemp[k].calc_result);
                                                    resultValuesTemp[k].calc_result = resultValuesTemp[k].calc_result.find((el: any)=>el[keysTemp[0]] == entities[j].id);
                                                    console.log('xxxxx4',resultValuesTemp[k].calc_result);
                                                    if (Utils.hasValue(resultValuesTemp[k].calc_result)) {
                                                        entities[j].expression = entities[j].expression.replaceAll(`\$\{${resultValuesTemp[k].var_name}\}`,resultValuesTemp[k].calc_result[keysTemp[keysTemp.length - 1]]||0);
                                                    } else {
                                                        entities[j].expression = entities[j].expression.replaceAll(`\$\{${resultValuesTemp[k].var_name}\}`,0);
                                                    }
                                                } else {
                                                    entities[j].expression = entities[j].expression.replaceAll(`\$\{${resultValuesTemp[k].var_name}\}`,0);
                                                }
                                            } else {
                                                errorMessages.push(resultValuesTemp[k].calc_result?.message);
                                            }  
                                            console.log('recursing for 2',entities[j].expression);
                                            //throw new Error("recursive intercept 2");                                                                                  
                                        }
                                    }
                                    if (entities[j].expression.indexOf("${") > -1) {
                                        errorMessages.push(`not expected expression to eval(2): ${entities[j].expression}`);
                                    }
                                } else {
                                    errorMessages.push(`not expected expression to eval(1): ${entities[j].expression}`);
                                }
                            }

                            if (entities[j].expression.indexOf("${") == -1) {
                                
                                entities[j].expression = eval(entities[j].expression);
                                console.log('expression after',entities[j].expression);
                                //upsert kpi result value
                                if (Utils.hasValue(campaignEntitieKpiResultValue)) {
                                    campaignEntitieKpiResultValue.value = entities[j].expression;
                                    campaignEntitieKpiResultValue.calculated_at = params.currentDate;
                                    await campaignEntitieKpiResultValue.save();
                                } else {
                                    await Campaign_Entities_Kpi_Result_Values.create({                                    
                                        campaign_entity_id: entities[j].id,
                                        campaign_kpi_result_value_id: kpiResultValue.id,
                                        value: entities[j].expression,
                                        calculated_at: params.currentDate
                                    });
                                }
                            }
                        }
                        
                    } else {
                        kpiValueGetters?.throw();
                    }
                    if (errorMessages.length) {
                        result.message = errorMessages.join("\n");
                        result.success = false;
                    } else {
                        console.log('xxxx',kpiResultValue.calculated_at?.getTime() == params.currentDate.getTime(),kpiResultValue.calculated_at, params.currentDate);
                        kpiResultValue.calculated_at = params.currentDate;
                        await kpiResultValue.save();

                        result.data = entities.map((el:any)=>({
                            entity_id: el.entity_id,
                            id:el.entity_id,                            
                            expression: el.expression,
                            value: el.expression
                        }))

                        result.success = true;
                    }
                } 

                result.data = await Campaign_Entities_Kpi_Result_Values.findAll({
                    raw:true,
                    attributes:[
                        'campaign_entity_id',
                        [Sequelize.literal(`${Campaign_Entities.tableName}.entity_id`),'entity_id'],
                        [Sequelize.literal(`${Campaign_Entities.tableName}.entity_id`),'id'],
                        ['value','expression'],
                        ['value','value']
                    ],
                    include:[{
                        model: Campaign_Entities,
                        attributes:[]
                    }],
                    where:{
                        campaign_kpi_result_value_id: kpiResultValue.id,
                        campaign_entity_id: entities.map((el:any)=>el.id)
                    }
                });

                result.success = true;
            } else {
                throw new Error("no data found")
            }            
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
            let params = req.body;
            params.user = req.user;
            res.setDataSwap(await this._calculate(params));
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
