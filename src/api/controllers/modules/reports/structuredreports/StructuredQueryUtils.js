const { Sequelize, QueryTypes } = require("sequelize");
const { Report_Data_Fount_Items } = require("../../../../database/models/Report_Data_Fount_Items");
const { Utils } = require("../../../utils/Utils")
const _ = require('lodash');
const DBConnectionManager = require("../../../../database/DBConnectionManager");
const { Record_Status } = require("../../../../database/models/Record_Status");
const moment = require("moment");
const { Sql_Object_Types } = require("../../../../database/models/Sql_Object_Types");
const { Entities_Types } = require("../../../../database/models/Entities_Types");
const { Permissions } = require("../../../../database/models/Permissions");
const { EpIntegrationsRegistersController } = require("../../registers/integrations/ep/EpIntegrationsRegistersController");


class StructuredQueryUtils {    
    static sortNestedReportDataFoutItems(currentItems) {        
        if (currentItems) {
            if (Utils.typeOf(currentItems) == 'array') {
                currentItems = currentItems.sort(function(a,b){return ((a.numeric_order||a.id)-0) - ((b.numeric_order||b.id)-0)});
                for(let k in currentItems) {
                    if (currentItems[k].subs && currentItems[k].subs.length) {
                        currentItems[k].subs = StructuredQueryUtils.sortNestedReportDataFoutItems(currentItems[k].subs);
                    }
                }
            } else if (Utils.typeOf(currentItems) == 'object') { 
                if (currentItems.subs && currentItems.subs.length) {
                    currentItems.subs = StructuredQueryUtils.sortNestedReportDataFoutItems(currentItems.subs);
                }
            }
        } 
        return currentItems;
    }


    /**
     * get report data fount items of an structured query
     * @param {*} reportDataFount 
     * @param {*} req 
     * @returns 
     * @created 2024-04-02
     */
    static async getStructuredReportDataItems(reportDataFount,params) {
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
                    C.entity_type_id = ${Entities_Types.DATABASE_TABLE}
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

        let reportsDataItems = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,queryType:QueryTypes.SELECT});
        reportsDataItems = reportsDataItems[0] || [];
        
        if (reportsDataItems && reportsDataItems.length) {

            //scructure in sub nested elements
            let structuredReportsDataItems = _.keyBy(reportsDataItems,'id');
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
            arrStructuredReportsDataItems = StructuredQueryUtils.sortNestedReportDataFoutItems(arrStructuredReportsDataItems);            
            result = arrStructuredReportsDataItems;
        }
        return result;
    }

    static mountPeriodsField(params,field) {
        let result = null;
        let periods = params.periods || [];
        let fieldPeriods = [];
        let newPeriods = [];

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

    static mountPeriodsWhereField(params,field) {
        let result = null;
        let periods = params.periods || [];
        let fieldPeriods = [];
        let newPeriods = [];

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

    static mountAmountOutputField(params,aliasTable) {
        let result = null;
        let considerNormalSales = Utils.toBool(params.considerNormalSales);
        let considerReturns = Utils.toBool(params.considerReturns||false);
        let considerBonuses = Utils.toBool(params.considerBonuses||false);
        if (considerNormalSales || considerBonuses) {
            result = `nvl(${aliasTable}.qtsaida,0)`;
        } else {
            result = `0`;
        }
        /*if (considerReturns) {
            result += `-nvl(${aliasTable}.qtdevolvida,0)`
        }*/
        return result;
    }

    static getOutputCodopers(params) {
        let result = [];
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

    

    static mountAmountReturnsField(params,aliasTable) {
        let result = null;
        let considerReturns = Utils.toBool(params.considerReturns );
        if (considerReturns) {
            result = `CASE WHEN nvl(${aliasTable}.qtdevolvida,0)>0 THEN ${aliasTable}.qtdevolvida ELSE nvl(${aliasTable}.qtent,0) END * -1`;
        } else {
            result = `0`;
        }
        return result;
    }
    
    static mountPivotFields(params) {
        let result = [];
        if (Utils.toBool(params.viewAmount || false)) {
            result.push('SUM(NVL(QT,0)) AS QT');
        }
        if (Utils.toBool(params.viewWeight || false)) {
            result.push('SUM(NVL(PESO,0)) AS PESO');
        }
        if (Utils.toBool(params.viewValue || false)) {
            result.push('SUM(NVL(VALOR,0)) AS VALOR');
        }
        if (result && result.length) {
            result = result.join(',');
        }
        return result;
    }

    static mountPivotInFields(params,field) {
        let result = null;
        let periods = params.periods || [];
        let fieldPeriods = [];
        let newPeriods = [];

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

    static checkExistsConditionsByReportVision(params,idVision) {
        let result = false;
        try {
            let conditions = params.conditions || params.condictions || [];
            if (Utils.hasValue(conditions)) {
                if (typeof conditions == 'string') {
                    conditions = JSON.parse(conditions);
                }
                result = conditions.filter(el=>((el.reportVision || el.vision || {}).id || el.reportVision || el.vision) == idVision).length > 0;
            }
        } catch (e) {
            Utils.logError(e);
        }
        return result;
    }
    static checkExistsCondictionsByReportVision = StructuredQueryUtils.checkExistsConditionsByReportVision;

    static mountConditionsByReportVision(params,idVision,field) {
        let result = null;
        try {
            let conditions = params.conditions || params.condictions|| [];
            if (Utils.hasValue(conditions)) {
                if (typeof conditions == 'string') {
                    conditions = JSON.parse(conditions);
                }
                conditions = conditions.filter(el=>(el.reportVision || el.vision || {}).id || el.reportVision || el.vision == idVision);
                if (Utils.hasValue(conditions)) {
                    let or = [];
                    for(let k in conditions) {
                        if ((conditions[k].selecteds || conditions[k].values) && (conditions[k].selecteds || conditions[k].values).length) {
                            or.push(`${field} ${conditions[k].operation.id || conditions[k].operation} (${(conditions[k].selecteds || conditions[k].values).map(el=>el.id || el ||'null').join(',')})`);
                        }
                    }
                    if (or.length > 1) {
                        result = `(${or.join(' or ')})`;
                    } else {
                        result = or.join(' or ');
                    }
                }
            }
        } catch (e) {
            Utils.logError(e);
        }
        return result;
    }
    static mountCondictionsByReportVision = StructuredQueryUtils.mountConditionsByReportVision;


    static async evalSqlText(sqlText,params) {
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
                    evaluetedValue = await eval(evalText);
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

    static async getMountedSqlText(item,params) {
        let result = null;
        try {
            if (item) {
                if (typeof item == 'object') {
                    if (item.assembled_sql_text) {
                        result = item.assembled_sql_text;
                    } else {
                        item.before_sql_text = await StructuredQueryUtils.evalSqlText(item.before_sql_text,params);
                        item.sql_text = await StructuredQueryUtils.evalSqlText(item.sql_text,params);
                        result = `${item.before_sql_text||''} ${item.sql_text}`;
                        item.assembled_sql_text = result;
                    }
                } else {
                    result = await StructuredQueryUtils.evalSqlText(item,params);
                }
            }
        } catch (e) {
            Utils.logError(e);
        }
        return result;
    }
    
    static async unifyStructuredQueryItems(currentStructure,currentItems,params) {
        if (Utils.hasValue(currentItems)) {
            if (Utils.typeOf(currentItems) == 'array') {
                if (Utils.typeOf(currentStructure) == 'array') {
                    let preexistent = false;
                    let isEqual = false;
                    let text1;
                    let text2;
                    for(let k in currentItems) {
                        preexistent = false;
                        text1 = await StructuredQueryUtils.getMountedSqlText(currentItems[k],params);                        
                        text1 = text1 || '';                        
                        //find preexistent and unique in groupment
                        for(let j in currentStructure) {

                            text2 = await StructuredQueryUtils.getMountedSqlText(currentStructure[j],params);
                            text2 = text2 || '';
                            isEqual = text1.trim().replace(/\s/g,' ').toLowerCase() == text2.trim().replace(/\s/g,' ').toLowerCase();

                            if (currentItems[k].sql_object_type_id == Sql_Object_Types.JOIN && currentStructure[j].sql_object_type_id == Sql_Object_Types.JOIN) {
                                if (Utils.hasValue(currentItems[k].subs) && Utils.hasValue(currentStructure[j].subs)) {

                                    if ((currentItems[k].subs[0].sql_text||'').trim().replace(/\s/g,'').toLowerCase() == (currentStructure[j].subs[0].sql_text||'').trim().replace(/\s/g,'').toLowerCase()
                                        && (currentItems[k].subs[0].sql_alias||'').trim().replace(/\s/g,'').toLowerCase() == (currentStructure[j].subs[0].sql_alias||'').trim().replace(/\s/g,'').toLowerCase()

                                        //mostrar isso e ver porque o alias não está sendo computado (diferente no registro e está passando por aqui como igual visao filia + empresa)

                                        && Utils.toBool(currentItems[k].subs[0].is_unique_in_groupment||false) && Utils.toBool(currentStructure[j].subs[0].is_unique_in_groupment||false)
                                    ) {
                                        preexistent = true;
                                        await StructuredQueryUtils.unifyStructuredQueryItems(currentStructure[j].subs, currentItems[k].subs, params);
                                        break;
                                    }
                                }
                            } else if (isEqual) {
                                if (Utils.toBool(currentItems[k].is_unique_in_groupment||false) && Utils.toBool(currentStructure[j].is_unique_in_groupment||false)) {
                                    preexistent = true;
                                    if (Utils.hasValue(currentItems[k].subs)) {
                                        currentStructure[j].subs =  currentStructure[j].subs || [];
                                        await StructuredQueryUtils.unifyStructuredQueryItems(currentStructure[j].subs, currentItems[k].subs, params);
                                    }
                                    break;
                                }
                            }
                        }

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
     * unify structured queries in on
     * @param {*} structuredQuery current structured unified query
     * @param {*} reportDataFount query to unify into the current structured query
     * @param {*} params 
     * @returns 
     * @created 2024-04-02
     */
    static async unifyStructuredQuery(structuredQuery,reportDataFount,params) {        
        let arrStructuredReportsDataItems = await StructuredQueryUtils.getStructuredReportDataItems(reportDataFount,params);
        if (arrStructuredReportsDataItems && arrStructuredReportsDataItems.length) {
            structuredQuery = structuredQuery || [];            
            if (!structuredQuery.length) {
                structuredQuery = arrStructuredReportsDataItems
            } else {
                await StructuredQueryUtils.unifyStructuredQueryItems(structuredQuery,arrStructuredReportsDataItems,params);
            }
        } 
        return structuredQuery;
    };

    static async mountQueryItems(queryItems,params) {
        let result = null;        
        if (Utils.typeOf(queryItems) == 'array') {
            result = [];
            for(let k in queryItems) {
                result.push(await StructuredQueryUtils.mountQueryItems(queryItems[k],params));
            }
        } else {
            if (queryItems) {
                result = await StructuredQueryUtils.getMountedSqlText(queryItems, params) || '';
                if (typeof queryItems == 'object') {                    
                    if (Utils.hasValue(queryItems.subs)) {
                        let resultSubs = await StructuredQueryUtils.mountQueryItems(queryItems.subs,params);
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
                                        resultSubs = resultSubs.filter(el=>el.trim().replace(/\s/g,'').length > 0);
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

    static orderStructuredQueryItems(structuredQuery,visionsSort,sup) {
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
                structuredQuery[i].subs = StructuredQueryUtils.orderStructuredQueryItems(structuredQuery[i].subs,visionsSort,structuredQuery[i]);
            }
        }
        return structuredQuery;        
    }

    static async processAccessCriteriesStructuredQueryItems(params,structuredQuery,pCurrentSelect) {
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
                await StructuredQueryUtils.processAccessCriteriesStructuredQueryItems(params,structuredQuery[k].subs, currentSelect);
            }
        }
    }

    static async mountQuery(structuredQuery,params) {
        let visionsIds = params.visions || [];
        let visionsSort = {};
        for(let i = 0; i < visionsIds.length; i++) {
            visionsSort[visionsIds[i]] = i;
        }
        let orderedStructuredQuery = StructuredQueryUtils.orderStructuredQueryItems(structuredQuery,visionsSort);
        await StructuredQueryUtils.processAccessCriteriesStructuredQueryItems(params,orderedStructuredQuery);
        let result = await StructuredQueryUtils.mountQueryItems(orderedStructuredQuery,params);
        if (Utils.typeOf(result) == 'array') {
            result = result.join(' ');
        }
        //incluir a clausula in no structured na pagina no pivot para testar
        return result;
    }
}

module.exports = {StructuredQueryUtils}