import { QueryTypes } from "sequelize";
import DBConnectionManager from "../../../database/DBConnectionManager.js";
import Entities_Types from "../../../database/models/Entities_Types.js";
import Record_Status from "../../../database/models/Record_Status.js";
import Sql_Object_Types from "../../../database/models/Sql_Object_Types.js";
import Utils from "../../utils/Utils.js";
import _ from "lodash";
import Permissions from "../../../database/models/Permissions.js";
import Relationship_Types from "../../../database/models/Relationship_Types.js";
import Report_Visions from "../../../database/models/Report_Visions.js";
import Report_Data_Founts from "../../../database/models/Report_Data_Founts.js";
import EpIntegrationsRegistersController from "../integrations/ep/EpIntegrationsRegistersController.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";

/**
 * Class to manage structured queries. 
 * Basicaly, caller must have call this.getStructuredQueryData to get strucured data according params. Then,
 * must have this.mountQuery to mount string query based on response of previous call.
 * 
 * @author Alencar
 * @created 2024-01-06
 * @version 1.0.0
 */
export default class StructuredQueryUtils {   


    /************************************************************************************
     *                     INIT METHODS CALLED ON EVAL TEXTS                            *
     ***********************************************************************************/

    static mountPeriodsField(params: any,field: string) : null | string {        
        let result = null;
        let periods = params.periods || [];
        let fieldPeriods = [];
        let newPeriods : any = [];

        
        if (Utils.typeOf(periods) != "array") {
            periods = Utils.toArray(periods,",");
        }

        periods = Utils.singleArrayTo2LevelArray(periods);

        for (let p in periods) {
            newPeriods[p] = [];
            for (let d in periods[p]) {
                if (typeof periods[p][d] != 'object') {
                    newPeriods[p][d] = Utils.toBRDate(new Date(periods[p][d]));
                } else {
                    newPeriods[p][d] = Utils.toBRDate(periods[p][d]);
                }
            }
        }

        for(let i = 0; i < newPeriods.length; i++) {
            fieldPeriods.push(`WHEN  ${field} BETWEEN TO_DATE('${newPeriods[i][0]}','dd/mm/yyyy') AND TO_DATE('${newPeriods[i][1]}','dd/mm/yyyy') THEN 'De ${newPeriods[i][0]} a ${newPeriods[i][1]}'`)
        }
        if (fieldPeriods.length) {
            result = `CASE ${fieldPeriods.join(' ')} ELSE 'INDEFINED' END`
        }
        return result;
    }

    static mountPeriodsWhereField(params: any,field: string): null | string {
        let result = null;
        let periods = params.periods || [];
        let fieldPeriods = [];
        let newPeriods: any = [];

        if (Utils.typeOf(periods) != "array") {
            periods = Utils.toArray(periods,",");
        }

        periods = Utils.singleArrayTo2LevelArray(periods);

        for (let p in periods) {
            newPeriods[p] = [];
            for (let d in periods[p]) {
                if (typeof periods[p][d] != 'object') {
                    newPeriods[p][d] = Utils.toBRDate(new Date(periods[p][d]));
                } else {
                    newPeriods[p][d] = Utils.toBRDate(periods[p][d]);
                }
            }
        }

        for(let i = 0; i < newPeriods.length; i++) {
            fieldPeriods.push(`${field} BETWEEN TO_DATE('${newPeriods[i][0]}','dd/mm/yyyy') AND TO_DATE('${newPeriods[i][1]}','dd/mm/yyyy')`)
        }
        if (fieldPeriods.length) {
            result = `${fieldPeriods.join(' OR ')}`
        }
        return result;
    }

    /*
    @deprecated 2025-04-17
    static mountAmountOutputField(params: any,aliasTable: string) : string {
        let result = null;
        let considerNormalSales = Utils.toBool(params.considerNormalSales);
        let considerReturns = Utils.toBool(params.considerReturns||false);
        let considerBonuses = Utils.toBool(params.considerBonuses||false);
        if (considerNormalSales || considerBonuses) {
            result = `nvl(${aliasTable}.qtsaida,0)`;
        } else {
            result = `0`;
        }
        //if (considerReturns) {
            //result += `-nvl(${aliasTable}.qtdevolvida,0)`
        //}
        return result;
    }*/

    static getOutputCodopers(params: any) : string {
        let result : any = [];
        let considerNormalSales = Utils.toBool(params.considerNormalSales);
        let considerReturns = Utils.toBool(params.considerReturns||false);
        let considerBonuses = Utils.toBool(params.considerBonuses||false);
        if (considerNormalSales || considerReturns) {
            result.push(11); //returns in output is computed on amount field
        }
        if (considerBonuses) {
            result.push(13);
        }
        if (result.length) {
            result = result.join(',');
        } else {
            result = '-1'
        }
        return result;
    }


    static async getSellersIdsFromOrigin(params?: any, origin?: any) : Promise<any> {
        let result = null;
        origin = (origin || params?.origin?.name || params?.origin?.label || params?.origin||'default').trim().toLowerCase();
        switch(origin) {
            case "ep":
                result = await EpIntegrationsRegistersController.getSellersIds(params);
            break;
            default:
                throw new Error(`not expected origin: ${origin}`);
            break;
        }
        return result;
    }

    

    /*
    @deprecated 2025-04-17
    static mountAmountReturnsField(params: any,aliasTable?: string) : string {
        let result = null;
        let considerReturns = Utils.toBool(params.considerReturns );
        if (considerReturns) {
            result = `CASE WHEN nvl(${aliasTable}.qtdevolvida,0)>0 THEN ${aliasTable}.qtdevolvida ELSE nvl(${aliasTable}.qtent,0) END * -1`;
        } else {
            result = `0`;
        }
        return result;
    }*/
    
    static mountPivotFields(params: any) : string | string[] {
        let result : any = [];
        if (Utils.toBool(params.viewAmount || false)) {
            result.push('SUM(NVL(QT,0)) AS QT');
        }
        if (Utils.toBool(params.viewWeight || false)) {
            result.push('SUM(NVL(PESO,0)) AS PESO');
        }
        if (Utils.toBool(params.viewValue || false)) {
            result.push('SUM(NVL(VALOR,0)) AS VALOR');
        }
        if (Utils.toBool(params.viewReturns || false)) {
            result.push('SUM(NVL(QT_DEVOL,0)) AS QT_DEVOL');
        }
        if (result && result.length) {
            result = result.join(',');
        }
        return result;
    }

    static mountPivotInFields(params: any) : null | string {
        let result = null;
        let periods = params.periods || [];
        let fieldPeriods = [];
        let newPeriods : any = [];

        if (Utils.typeOf(periods) != "array") {
            periods = Utils.toArray(periods,",");
        }
        periods = Utils.singleArrayTo2LevelArray(periods);

        for (let p in periods) {
            newPeriods[p] = [];
            for (let d in periods[p]) {
                if (typeof periods[p][d] != 'object') {
                    newPeriods[p][d] = Utils.toBRDate(new Date(periods[p][d]));
                } else {
                    newPeriods[p][d] = Utils.toBRDate(periods[p][d]);
                }
            }
        }

        for(let i = 0; i < newPeriods.length; i++) {
            fieldPeriods.push(`'De ${newPeriods[i][0]} a ${newPeriods[i][1]}'`)
        }
        if (fieldPeriods.length) {
            result = `(${fieldPeriods.join(',')})`
        }
        return result;
    }

    static checkExistsConditionsByReportVision(params: any,visionId: number) : boolean {
        let result = false;
        try {
            let conditions = params.conditions || params.condictions || [];
            if (Utils.hasValue(conditions)) {
                if (typeof conditions == 'string') {
                    conditions = JSON.parse(conditions);
                }
                result = conditions.filter((el: any)=>((el.reportVision || el.vision || {}).id || el.reportVision || el.vision) == visionId).length > 0;
            }
        } catch (e) {
            Utils.logError(e);
        }
        return result;
    }
    static checkExistsCondictionsByReportVision = StructuredQueryUtils.checkExistsConditionsByReportVision;

    static mountConditionsByReportVision(params: any,visionId: number,field: string) : null | string {
        let result = null;
        try {
            let conditions = params.conditions || params.condictions|| [];
            if (Utils.hasValue(conditions)) {
                if (typeof conditions == 'string') {
                    conditions = JSON.parse(conditions);
                }
                conditions = conditions.filter((el: any)=>((el.reportVision || el.vision || {}).id || el.reportVision || el.vision) == visionId);
                if (Utils.hasValue(conditions)) {
                    let conditionsOfVision = [];
                    for(let k in conditions) {
                        if (Utils.hasValue(conditions[k].selecteds || conditions[k].values)) {
                            conditionsOfVision.push(`${field} ${conditions[k].operation.id || conditions[k].operation} (${(conditions[k].selecteds || conditions[k].values).map((el: any)=>Utils.firstValid([el?.id,el,'null'])).join(',')})`);
                        }
                    }
                    let joinEqualsConditionsWith = params.joinEqualsConditionsWith || 'or'
                    if (conditionsOfVision.length > 1) {
                        result = `(${conditionsOfVision.join(` ${joinEqualsConditionsWith} `)})`;
                    } else {
                        result = conditionsOfVision.join(` ${joinEqualsConditionsWith} `);
                    }
                }
            }
        } catch (e) {
            Utils.logError(e);
        }
        return result;
    }
    static mountCondictionsByReportVision = StructuredQueryUtils.mountConditionsByReportVision;

    static mountExtraConditions(params?: any, logicalJoin?: string) : any {
        let result = params?.queryParams?.where || params?.where || params || '';
        if (Utils.hasValue(result)) {
            result = ` ${logicalJoin} (${DatabaseUtils.whereToString(result)}) `;
        }
        return result;
    }

    /************************************************************************************
     *                          END METHODS CALLED ON EVAL TEXTS                        *
     ***********************************************************************************/



    /**
     * method to eval sql text in expressions of query items
     * @created 2024-06-01
     * @version 1.0.0
     */
    static async evalSqlText(sqlText?: any,params?: any) : Promise<any> {
        let result = sqlText;
        try {
            if (Utils.hasValue(result)) {
                let loopLimit = 1000;
                let p1 = result.indexOf("${");
                let p2 = result.indexOf("}$");
                let replaceText = null;
                let evalText = null;
                let evaluetedValue = null;
                while(p1 > -1 && p2 > -1 && p2 > p1 && loopLimit > 0) {
                    replaceText = result.substr(p1,(p2-p1)+2);
                    evalText = replaceText.substring(2,replaceText.length-2);
                    console.log('executing eval',evalText);
                    evaluetedValue = await eval(evalText);
                    console.log('result eval',evaluetedValue);
                    result = result.replaceAll(replaceText,evaluetedValue);
                    p1 = result.indexOf("${");
                    p2 = result.indexOf("}$");
                    loopLimit --;
                }     
            }
        } catch (e) {
            Utils.logError(e);
        }
        return result;
    }


    /**
     * method to get mounted text according fields of structured query item
     * @created 2024-06-01
     * @version 1.0.0
     */
    static async getMountedSqlText(item?: any,params?: any) : Promise<any> {
        let result = null;
        try {
            if (item) {
                if (typeof item == 'object') {
                    if (item.assembled_sql_text) {
                        result = item.assembled_sql_text;
                    } else {
                        item.before_sql_text = await this.evalSqlText(item.before_sql_text,params);
                        item.sql_text = await this.evalSqlText(item.sql_text,params);
                        result = `${item.before_sql_text||''} ${item.sql_text}`;
                        item.assembled_sql_text = result;
                    }
                } else {
                    result = await this.evalSqlText(item,params);
                }
            }
        } catch (e) {
            Utils.logError(e);
        }
        return result;
    }


    /**
     * @caller this.unifyStructuredQuery
     * @recursive
     * @created 2024-06-01
     * @version 1.0.0
     */
    static async unifyStructuredQueryItems(currentStructure?: any,currentItems?: any,params?: any) : Promise<any> {
        if (Utils.hasValue(currentItems)) {
            if (Utils.typeOf(currentItems) == 'array') {
                if (Utils.typeOf(currentStructure) == 'array') {
                    let preexistent = false;
                    let isEqual = false;
                    let text1;
                    let text2;
                    for(let k in currentItems) {
                        preexistent = false;
                        text1 = await this.getMountedSqlText(currentItems[k],params);                        
                        text1 = text1 || '';                        
                        console.log(k,currentItems[k].id, text1);
                        //find preexistent and unique in groupment
                        for(let j in currentStructure) {

                            text2 = await this.getMountedSqlText(currentStructure[j],params);
                            text2 = text2 || '';
                            isEqual = text1.trim().replace(/\s/g,' ').toLowerCase() == text2.trim().replace(/\s/g,' ').toLowerCase();
                            if (Utils.hasValue(currentItems[k].sql_alias)) {
                                if (Utils.hasValue(currentStructure[j].sql_alias)) {
                                    isEqual = isEqual &&  currentItems[k].sql_alias.trim().toLowerCase() == currentStructure[j].sql_alias.trim().toLowerCase();
                                } else {
                                    isEqual = false;
                                }
                            } else if (Utils.hasValue(currentStructure[j].sql_alias)) {
                                isEqual = false;
                            }


                            if (currentItems[k].sql_object_type_id == Sql_Object_Types.JOIN && currentStructure[j].sql_object_type_id == Sql_Object_Types.JOIN) {
                                if (Utils.hasValue(currentItems[k].subs) && Utils.hasValue(currentStructure[j].subs)) {

                                    if ((currentItems[k].subs[0].sql_text||'').trim().replace(/\s/g,'').toLowerCase() == (currentStructure[j].subs[0].sql_text||'').trim().replace(/\s/g,'').toLowerCase()
                                        && (currentItems[k].subs[0].sql_alias||'').trim().replace(/\s/g,'').toLowerCase() == (currentStructure[j].subs[0].sql_alias||'').trim().replace(/\s/g,'').toLowerCase()

                                        //mostrar isso e ver porque o alias não está sendo computado (diferente no registro e está passando por aqui como igual visao filia + empresa)

                                        && Utils.toBool(currentItems[k].subs[0].is_unique_in_groupment||false) && Utils.toBool(currentStructure[j].subs[0].is_unique_in_groupment||false)
                                    ) {
                                        preexistent = true;
                                        console.log('xxxxxxx-0');
                                        await this.unifyStructuredQueryItems(currentStructure[j].subs, currentItems[k].subs, params);
                                        break;
                                    }
                                }
                            } else if (isEqual) {
                                if (Utils.toBool(currentItems[k].is_unique_in_groupment||false) && Utils.toBool(currentStructure[j].is_unique_in_groupment||false)) {
                                    preexistent = true;
                                    console.log('xxxxxxx-1', text1, text2, text1.trim().replace(/\s/g,' ').toLowerCase(), text2.trim().replace(/\s/g,' ').toLowerCase(), isEqual);
                                    if (Utils.hasValue(currentItems[k].subs)) {
                                        currentStructure[j].subs =  currentStructure[j].subs || [];
                                        await this.unifyStructuredQueryItems(currentStructure[j].subs, currentItems[k].subs, params);
                                    }
                                    break;
                                }
                            }
                        }

                        console.log('xxxxxx0 before pushing',preexistent,k,currentItems[k].id,text1);
                        if (!preexistent) {                            
                            currentStructure.push(currentItems[k]);
                        }
                    }
                } else {
                    throw new Error(`different types structure x current items (${Utils.typeOf(currentStructure)},${Utils.typeOf(currentItems)}) `)
                }
            }    
        }
    }


    /**
     * sort report data fount items considering scope (nested) and numeric_order field
     * @recursive
     * @caller this.getStructuredReportDataItems
     * @created 2024-04-02
     * @version 1.0.0
     */
    static sortNestedReportDataFoutItems(currentItems?: any) : any {        
        if (currentItems) {
            if (Utils.typeOf(currentItems) == 'array') {
                currentItems = currentItems.sort(function(a: any,b: any){return ((a.numeric_order||a.id)-0) - ((b.numeric_order||b.id)-0)});
                for(let k in currentItems) {
                    if (currentItems[k].subs && currentItems[k].subs.length) {
                        currentItems[k].subs = this.sortNestedReportDataFoutItems(currentItems[k].subs);
                    }
                }
            } else if (Utils.typeOf(currentItems) == 'object') { 
                if (currentItems.subs && currentItems.subs.length) {
                    currentItems.subs = this.sortNestedReportDataFoutItems(currentItems.subs);
                }
            }
        } 
        return currentItems;
    }

    /**
     * get report data fount items of an structured query
     * @caller this.unifyStructuredQuery
     * @created 2024-04-02
     * @version 1.0.0
     */
    static async getStructuredReportDataItems(reportDataFount: any,params: any) : Promise<null|any[]> {
        let result = null;
        //get report data fount items
        let query = `
            SELECT
                RFI.*,
                ${reportDataFount.IDVISION||'NULL'} as IDVISION,
                ${reportDataFount.ISVISION||0} as ISVISION,
                ${reportDataFount.ISCONDITIONVISION||0} as ISCONDITIONVISION,
                P.id AS IDPERMISSION,
                C.expression
            FROM
                report_data_fount_items RFI 
                LEFT OUTER JOIN tables T ON (   
                    RFI.sql_object_type_id = ${Sql_Object_Types.TABLE}
                    AND T.id = RFI.sql_object_id
                )
                LEFT OUTER JOIN USERS U ON (
                    U.id = ${params.user.id}
                )
                LEFT OUTER JOIN PERMISSIONS P ON (
                    P.table_id IS NOT NULL 
                    AND P.table_id = T.id 
                    AND (
                        P.user_id = U.id
                        OR (
                            P.user_id IS NULL
                            AND P.access_profile_id = U.access_profile_id
                        )
                    )
                )
                LEFT OUTER JOIN conditions C ON (
                    C.entity_type_id = ${Entities_Types.TABLE}
                    AND C.entity_id = ${Permissions.id}
                    AND C.record_id = P.id
                )
            WHERE
                RFI.report_data_source_id = ${reportDataFount.id}
                AND RFI.status_reg_id = ${Record_Status.ACTIVE}
                AND (
                    ${reportDataFount.ISVISION||0} = 1
                    OR (
                        ${reportDataFount.ISVISION||0} <> 1  
                        AND ${reportDataFount.ISCONDITIONVISION||0} = 1 
                        AND (
                            RFI.sql_object_type_id <> ${Sql_Object_Types.FIELD}
                            OR (
                                RFI.sql_object_type_id = ${Sql_Object_Types.FIELD}
                                AND NOT EXISTS (SELECT 1 FROM report_data_fount_items RFI2 WHERE RFI2.id = RFI.parent_id AND RFI2.sql_object_type_id = ${Sql_Object_Types.SELECT})
                            )

                        )
                    )
                )
            ORDER BY
                COALESCE(RFI.parent_id,RFI.id)
        `;

        let reportsDataItems = await DBConnectionManager.getDefaultDBConnection()?.query(query,{raw:true,type:QueryTypes.SELECT});
        
        if (reportsDataItems && reportsDataItems.length) {

            //scructure in sub nested elements
            let structuredReportsDataItems : any = _.keyBy(reportsDataItems,'id');
            for(let k in structuredReportsDataItems) {
                if (Utils.hasValue(structuredReportsDataItems[k].existence_critery)) {
                    if (!Utils.toBool(eval(structuredReportsDataItems[k].existence_critery))) {
                        structuredReportsDataItems[k].MOVED = true;
                        continue;    
                    };
                }
                if (structuredReportsDataItems[k].parent_id) {
                    structuredReportsDataItems[structuredReportsDataItems[k].parent_id].subs = structuredReportsDataItems[structuredReportsDataItems[k].parent_id].subs || [];
                    structuredReportsDataItems[structuredReportsDataItems[k].parent_id].subs.push(structuredReportsDataItems[k]);
                    structuredReportsDataItems[k].MOVED = true;
                }
            }
            for(let k in structuredReportsDataItems) {
                if (structuredReportsDataItems[k].MOVED) {
                    delete structuredReportsDataItems[k].MOVED;
                    structuredReportsDataItems[k] = null;
                    delete structuredReportsDataItems[k];
                }
            }


            let arrStructuredReportsDataItems = [];
            for(let k in structuredReportsDataItems) {
                arrStructuredReportsDataItems.push(structuredReportsDataItems[k]);
            }
            arrStructuredReportsDataItems = this.sortNestedReportDataFoutItems(arrStructuredReportsDataItems);            
            result = arrStructuredReportsDataItems;
        }
        return result;
    }

    
    /**
     * unify structured queries in on
     * @caller this.getStructuredQueryData
     * @created 2024-04-02
     */
    static async unifyStructuredQuery(structuredQuery?: any[],reportDataFount?: any,params?: any) : Promise<any> {        
        let arrStructuredReportsDataItems = await this.getStructuredReportDataItems(reportDataFount,params);
        //console.log('xxxx-3',JSON.stringify(arrStructuredReportsDataItems)); //ok
        if (arrStructuredReportsDataItems && arrStructuredReportsDataItems.length) {
            structuredQuery = structuredQuery || [];            
            if (!structuredQuery.length) {
                structuredQuery = arrStructuredReportsDataItems
            } else {
                await this.unifyStructuredQueryItems(structuredQuery,arrStructuredReportsDataItems,params);
            }
        } 
        //console.log('xxxx-4',JSON.stringify(structuredQuery)); // fail
        return structuredQuery;
    };


    /**
     * Get strucured data to mount customized query report
     * @caller external
     * @created 2024-07-22
     * @version 2.0.0
     */
    static async getStructuredQueryData(params: any) : Promise<any> {
        let result = null;
        let structuredQueryOrigin = null;
        params = params || {};
        console.log(params);
        let visionsIds = params.visions || [];
        let periods = params.periods || [];
        let conditions = params.conditions || [];
        if (visionsIds.length && periods.length) {            
            if (Utils.typeOf(visionsIds) != "array") {
                visionsIds = Utils.toArray(visionsIds,",");
            }
            visionsIds = visionsIds.map((el: any)=>Utils.hasValue(el)?el:'null');
            if (Utils.typeOf(periods) != "array") {
                periods = Utils.toArray(periods,",");
            }
            periods = periods.map((el: any)=>Utils.hasValue(el)?el:'null');

            //wraper perios in array o 2 elements [[init,end],..]
            periods = Utils.singleArrayTo2LevelArray(periods);
            visionsIds = [...new Set(visionsIds)]; //unique
            if (Utils.hasValue(conditions) && typeof conditions == 'string') {
                conditions = JSON.parse(conditions);
            }
            let minPeriod = null;
            let maxPeriod = null;
            for (let p in periods) {
                for (let d in periods[p]) {
                    if (typeof periods[p][d] != 'object') {
                        periods[p][d] = new Date(periods[p][d]);
                    }
                    if (!minPeriod || minPeriod > periods[p][d]) {
                        minPeriod = periods[p][d];
                    } 
                    if (!maxPeriod || maxPeriod < periods[p][d]) {
                        maxPeriod = periods[p][d];
                    } 
                }
            }
            
            let conditionsVisionsIds = params.conditionsVisionsIds || (conditions||[]).map((el: any)=>(el.reportVision || el.vision || {}).id || el.reportVision || el.vision);  
            conditionsVisionsIds = conditionsVisionsIds.map((el: any)=>Utils.hasValue(el)?el:'null');          
            conditionsVisionsIds = [...new Set(conditionsVisionsIds)]; //unique

            //get report data fount
            let query = `
                SELECT
                    RF.id,
                    RV.id AS IDVISION,                    
                    RF.start_date,
                    RF.end_date,
                    RF.conditions,
                    RF.type_get_expected_data_from,
                    RF.origin_get_expected_data_from,
                    RF.get_expected_data_from,
                    RF.type_get_value_from,
                    RF.origin_get_value_from,
                    RF.get_value_from,
                    COALESCE(DR.numeric_order,DR.id) AS numeric_order,
                    CASE WHEN RV.id IN (${visionsIds.join(',')}) THEN 1 ELSE 0 END AS ISVISION,
                    CASE WHEN RV.id IN (${conditionsVisionsIds.length ? conditionsVisionsIds.join(',') : '-1'}) THEN 1 ELSE 0 END AS ISCONDITIONVISION
                FROM
                    report_visions RV
                    JOIN relationships DR ON (
                        DR.relationship_type_id = ${Relationship_Types.RELATIONSHIP}
                        AND DR.table_1_id = ${Report_Visions.id}
                        AND DR.record_1_id = RV.id
                        AND DR.table_2_id = ${Report_Data_Founts.id}
                        AND DR.status_reg_id = ${Record_Status.ACTIVE}
                        AND COALESCE(DR.start_at,STR_TO_DATE('${minPeriod.toISOString().slice(0, 19).replace('T', ' ')}','%Y-%m-%d %k:%i:%s')) <= STR_TO_DATE('${minPeriod.toISOString().slice(0, 19).replace('T', ' ')}','%Y-%m-%d %k:%i:%s')
                        AND COALESCE(DR.end_at,STR_TO_DATE('${maxPeriod.toISOString().slice(0, 19).replace('T', ' ')}','%Y-%m-%d %k:%i:%s')) <= STR_TO_DATE('${maxPeriod.toISOString().slice(0, 19).replace('T', ' ')}','%Y-%m-%d %k:%i:%s')
                    )
                    JOIN report_data_founts RF ON (
                        RF.id = DR.record_2_id
                        AND RF.status_reg_id = ${Record_Status.ACTIVE}
                        AND COALESCE(RF.start_date,STR_TO_DATE('${minPeriod.toISOString().slice(0, 19).replace('T', ' ')}','%Y-%m-%d %k:%i:%s')) <= STR_TO_DATE('${minPeriod.toISOString().slice(0, 19).replace('T', ' ')}','%Y-%m-%d %k:%i:%s')
                        AND COALESCE(RF.end_date,STR_TO_DATE('${maxPeriod.toISOString().slice(0, 19).replace('T', ' ')}','%Y-%m-%d %k:%i:%s')) <= STR_TO_DATE('${maxPeriod.toISOString().slice(0, 19).replace('T', ' ')}','%Y-%m-%d %k:%i:%s')
                    )
                WHERE
                    (
                        RV.id IN (${visionsIds.join(',')})
                        ${conditionsVisionsIds.length ? `OR RV.id IN (${conditionsVisionsIds.join(',')}) ` : ''}
                    )
                    AND RV.status_reg_id = ${Record_Status.ACTIVE}
                ORDER BY
                    RV.id,
                    COALESCE(DR.numeric_order,DR.id)
            `;

            let reportsDatasFounts : any = await DBConnectionManager.getDefaultDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
            //console.log('xxxxx-2',JSON.stringify(reportsDatasFounts));
            if (reportsDatasFounts && reportsDatasFounts.length) {                
                for(let k in reportsDatasFounts) {
                    if (reportsDatasFounts[k].type_get_value_from.trim().toUpperCase() == 'STRUCTURED QUERY') {

                        //unify all structured report data fount in one
                        structuredQueryOrigin = structuredQueryOrigin || reportsDatasFounts[k].origin_get_value_from;
                        if (structuredQueryOrigin != reportsDatasFounts[k].origin_get_value_from) {
                            throw new Error(`unsuported different origins in same structured report: ${structuredQueryOrigin},${reportsDatasFounts[k].origin_get_value_from}`);
                        }
                        result = result || [];
                        result = await this.unifyStructuredQuery(result,reportsDatasFounts[k],params);                       
                    } else {
                        throw new Error(`type_get_value_from of report data found id ${reportsDatasFounts[k].id} not expected: ${reportsDatasFounts[k].type_get_value_from}`)
                    }
                }                     
            } else {
                throw new Error("relationed reports to visions not found");
            }                    
        } else {
            throw new Error(`missing data (vision or periods)`);
        }
        return {
            origin: structuredQueryOrigin,
            structuredQuery: result            
        }
    }

    
    
    /**
     * 
     * @caller this.mountQuery
     * @recursive
     * @created 2024-06-01
     * @version 1.0.0
     */
    static async mountQueryItems(queryItems?: any,params?: any) : Promise<any> {
        let result = null;        
        if (Utils.typeOf(queryItems) == 'array') {
            result = [];
            for(let k in queryItems) {
                result.push(await this.mountQueryItems(queryItems[k],params));
            }
        } else {
            if (queryItems) {
                result = await this.getMountedSqlText(queryItems, params) || '';
                if (typeof queryItems == 'object') {                    
                    if (Utils.hasValue(queryItems.subs)) {
                        let resultSubs = await this.mountQueryItems(queryItems.subs,params);
                        if (Utils.hasValue(resultSubs)) {
                        let delimiter = ' ';
                            if ([Sql_Object_Types.SELECT,Sql_Object_Types.GROUP_BY, Sql_Object_Types.ORDER_BY].indexOf((queryItems.sql_object_type_id||0)-0) > -1) {
                                delimiter = ','
                            }  else if ([Sql_Object_Types.WHERE,Sql_Object_Types.ON, Sql_Object_Types.HAVING].indexOf((queryItems.sql_object_type_id||0)-0) > -1) {
                                delimiter = ' AND '
                            }           
                            if (queryItems.sql_object_type_id == Sql_Object_Types.SELECT) {
                                for (let i = 0; i < queryItems.subs.length; i++) {                                
                                    if (Utils.hasValue(queryItems.subs[i].assembled_sql_text)) {
                                        result += ` ${queryItems.subs[i].assembled_sql_text}`;
                                        if (i < queryItems.subs.length-1) {
                                            if (queryItems.subs[i+1].sql_object_type_id == Sql_Object_Types.FIELD) {
                                                result += ` ${delimiter}`;
                                            } 
                                        }
                                    }
                                }
                            } else if (queryItems.sql_object_type_id == Sql_Object_Types.FROM) {
                                let openedParents = false;
                                for (let i = 0; i < queryItems.subs.length; i++) {
                                    if (Utils.hasValue(queryItems.subs[i].assembled_sql_text)) {
                                        //open subquery parentesis
                                        if (queryItems.subs[i].sql_object_type_id == Sql_Object_Types.SELECT && !openedParents) {
                                            result += ` ( `;
                                            openedParents = true;
                                        }
                                        result += ` ${queryItems.subs[i].assembled_sql_text}`;
                                        if (i < queryItems.subs.length-1) {
                                            if (queryItems.subs[i+1].sql_object_type_id == Sql_Object_Types.FIELD) {
                                                result += ` ${delimiter}`;
                                            } 
                                        }

                                        //close subquery parentesis
                                        if (queryItems.subs[i].sql_object_type_id == Sql_Object_Types.SELECT && openedParents) {
                                            if (i < queryItems.subs.length-1) {
                                                if (queryItems.subs[i+1].sql_object_type_id == Sql_Object_Types.SELECT) {
                                                    if (!(
                                                        (queryItems.subs[i].sql_text_after_children||'').toLowerCase().indexOf('union') > -1 || (queryItems.subs[i].sql_text||'').toLowerCase().indexOf('union') > -1
                                                        || (queryItems.subs[i+1].before_sql_text||'').toLowerCase().indexOf('union') > -1 || (queryItems.subs[i+1].sql_text||'').toLowerCase().indexOf('union') > -1
                                                    )) {
                                                        result += ` ) `;
                                                        openedParents = false;
                                                    }
                                                } else {
                                                    result += ` ) `;
                                                    openedParents = false;
                                                }
                                            } else {
                                                result += ` ) `;
                                                openedParents = false;
                                            }
                                        }
                                    }
                                }
                            } else if (queryItems.sql_object_type_id == Sql_Object_Types.PIVOT) {
                                result += ` (${resultSubs.join(delimiter)})`;
                            } else {
                                if (Utils.typeOf(resultSubs) == 'array') {
                                    if (resultSubs.length > 0) {
                                        resultSubs = resultSubs.filter((el: any)=>el.trim().replace(/\s/g,'').length > 0);
                                        if (resultSubs.join('').trim().replace(/\s/g,'').length > 0) {
                                            result += ` ${resultSubs.join(delimiter)}`;
                                        }
                                    }
                                } else {
                                    result += ` ${resultSubs}`;
                                }
                            }
                        }
                    }
                    result += ` ${await StructuredQueryUtils.evalSqlText(queryItems.sql_text_after_children,params)||''}`;
                    if (Utils.hasValue(queryItems.sql_alias)) {
                        result += ` ${queryItems.sql_alias}`;
                    }
                    queryItems.assembled_sql_text = result;
                } 
            }
        }
        return result;
    }


    /**
     * @caller this.mountQuery
     * @recursive
     * @created 2024-06-01
     * @version 1.0.0
     */
    static orderStructuredQueryItems(structuredQuery:any[],visionsSort?: any,sup?: any) : any {
        structuredQuery = structuredQuery.sort(function(a,b){
            let result = 0;
            if (sup?.sql_object_type_id == Sql_Object_Types.SELECT) {
                if (a.sql_object_type_id == Sql_Object_Types.FIELD) {
                    if (b.sql_object_type_id == Sql_Object_Types.FIELD) {
                        if (Utils.toBool(a.value_groupment||false)) {
                            if (Utils.toBool(b.value_groupment||false)) {
                                result = visionsSort[a.IDVISION] == visionsSort[b.IDVISION] ? a.numeric_order - b.numeric_order : visionsSort[a.IDVISION] - visionsSort[b.IDVISION];
                            } else {
                                result = 1;
                            }   
                        } else {
                            if (Utils.toBool(b.value_groupment||false)) {
                                result = -1;
                            } else {
                                result = visionsSort[a.IDVISION] == visionsSort[b.IDVISION] ? a.numeric_order - b.numeric_order : visionsSort[a.IDVISION] - visionsSort[b.IDVISION];
                            }   
                        }
                    } else {
                        result = -1;
                    }
                } else if (b.sql_object_type_id == Sql_Object_Types.FIELD) {
                    result = 1;
                } else {
                    result = visionsSort[a.IDVISION] == visionsSort[b.IDVISION] ? a.numeric_order - b.numeric_order : visionsSort[a.IDVISION] - visionsSort[b.IDVISION];
                }
            } else if (sup?.sql_object_type_id == Sql_Object_Types.FROM) {
                result = a.numeric_order - b.numeric_order;
            } else {
                result = visionsSort[a.IDVISION] == visionsSort[b.IDVISION] ? a.numeric_order - b.numeric_order : visionsSort[a.IDVISION] - visionsSort[b.IDVISION];
            }
            return result;
        });
        for(let i = 0; i < structuredQuery.length; i++) {
            if (structuredQuery[i].subs && structuredQuery[i].subs.length) {
                structuredQuery[i].subs = this.orderStructuredQueryItems(structuredQuery[i].subs,visionsSort,structuredQuery[i]);
            }
        }
        return structuredQuery;        
    }

    /**
     * process expression field of condiction associated to permission table of strucured query items
     * @caller this.mountQuery
     * @recursive
     * @created 2024-06-01
     * @version 1.0.0
     */
    static async processAccessCriteriesStructuredQueryItems(params?: any,structuredQuery?: any,pCurrentSelect?: any ) : Promise<any> {
        let currentSelect = pCurrentSelect;
        for(let k in structuredQuery) {
            if (structuredQuery[k].sql_object_type_id == Sql_Object_Types.SELECT) {
                currentSelect = structuredQuery[k];
            }
            if (structuredQuery[k].sql_object_type_id == Sql_Object_Types.TABLE) {
                if (Utils.hasValue(structuredQuery[k].expression)) {

                    structuredQuery[k].expression = await StructuredQueryUtils.evalSqlText(structuredQuery[k].expression, params);
                    structuredQuery[k].expression = structuredQuery[k].expression.replaceAll('__TABLE_ALIAS__',structuredQuery[k].sql_alias);
                    let injected = false;
                    for(let j in pCurrentSelect?.subs || []) {
                        if (pCurrentSelect.subs[j].sql_object_type_id == Sql_Object_Types.WHERE) {
                            pCurrentSelect.subs[j].subs = pCurrentSelect.subs[j].subs || [];
                            pCurrentSelect.subs[j].subs.push(structuredQuery[k].expression);
                            injected = true;
                            break;
                        }
                    }
                    if (!injected) {
                        pCurrentSelect.subs = pCurrentSelect.subs || [];
                        pCurrentSelect.subs.push({
                            sql_object_type_id: Sql_Object_Types.WHERE,
                            subs:[structuredQuery[k].expression]
                        })
                    }
                }
            }
            if (structuredQuery[k].subs && structuredQuery[k].subs.length) {
                //recursive
                await this.processAccessCriteriesStructuredQueryItems(params,structuredQuery[k].subs, currentSelect);
            }
        }
    }


    /**
     * mount query according structured query params
     * @caller external
     * @created 2024-06-01
     * @version 1.0.0
     */
    static async mountQuery(structuredQuery?: any,params?: any) : Promise<string> {
        let visionsIds = params.visions || [];
        let visionsSort : any = {};
        for(let i = 0; i < visionsIds.length; i++) {
            visionsSort[visionsIds[i]] = i;
        }
        console.log('xxxxxx0',JSON.stringify(structuredQuery));
        let orderedStructuredQuery = this.orderStructuredQueryItems(structuredQuery,visionsSort);
        //console.log('xxxxxx1',JSON.stringify(orderedStructuredQuery));
        await this.processAccessCriteriesStructuredQueryItems(params,orderedStructuredQuery);
        //console.log('xxxxxx2',JSON.stringify(orderedStructuredQuery));
        let result = await this.mountQueryItems(orderedStructuredQuery,params);
        if (Utils.typeOf(result) == 'array') {
            result = result.join(' ');
        }
        return result;
    }
}