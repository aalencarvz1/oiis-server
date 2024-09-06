const { Sequelize, QueryTypes } = require("sequelize");
const { ReportsDatasFountsItems } = require("../../../../database/models/ReportsDatasFountsItems");
const { Utils } = require("../../../utils/Utils")
const _ = require('lodash');
const DBConnectionManager = require("../../../../database/DBConnectionManager");
const { StatusRegs } = require("../../../../database/models/StatusRegs");
const moment = require("moment");
const { SqlObjectsTypes } = require("../../../../database/models/SqlObjectsTypes");
const { EntitiesTypes } = require("../../../../database/models/EntitiesTypes");
const { Permissions } = require("../../../../database/models/Permissions");
const { EpIntegrationsRegistersController } = require("../../registers/integrations/ep/EpIntegrationsRegistersController");


class StructuredQueryUtils {    
    static sortNestedReportDataFoutItems(currentItems) {        
        if (currentItems) {
            if (Utils.typeOf(currentItems) == 'array') {
                currentItems = currentItems.sort(function(a,b){return ((a.ORDERNUM||a.id)-0) - ((b.ORDERNUM||b.id)-0)});
                for(let k in currentItems) {
                    if (currentItems[k].SUBS && currentItems[k].SUBS.length) {
                        currentItems[k].SUBS = StructuredQueryUtils.sortNestedReportDataFoutItems(currentItems[k].SUBS);
                    }
                }
            } else if (Utils.typeOf(currentItems) == 'object') { 
                if (currentItems.SUBS && currentItems.SUBS.length) {
                    currentItems.SUBS = StructuredQueryUtils.sortNestedReportDataFoutItems(currentItems.SUBS);
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
                ${reportDataFount.ISCONDICTIONVISION||0} as ISCONDICTIONVISION,
                P.id AS IDPERMISSION,
                C.EXPRESSION
            FROM
                REPORTSDATASFOUNTSITEMS RFI 
                LEFT OUTER JOIN datatables T ON (   
                    RFI.IDSQLOBJECTTYPE = ${SqlObjectsTypes.TABLE}
                    AND T.id = RFI.IDSQLOBJECT
                )
                LEFT OUTER JOIN USERS U ON (
                    U.id = ${params.user.id}
                )
                LEFT OUTER JOIN PERMISSIONS P ON (
                    P.IDTABLE IS NOT NULL 
                    AND P.IDTABLE = T.id 
                    AND (
                        P.IDUSER = U.id
                        OR (
                            P.IDUSER IS NULL
                            AND P.IDACCESSPROFILE = U.IDACCESSPROFILE
                        )
                    )
                )
                LEFT OUTER JOIN CONDICTIONS C ON (
                    C.IDENTITYTYPE = ${EntitiesTypes.DATABASE_TABLE}
                    AND C.IDENTITY = ${Permissions.id}
                    AND C.IDREGISTER = P.id
                )
            WHERE
                RFI.IDREPORTDATAFOUNT = ${reportDataFount.id}
                AND RFI.status_reg_id = ${StatusRegs.ACTIVE}
                AND (
                    ${reportDataFount.ISVISION||0} = 1
                    OR (
                        ${reportDataFount.ISVISION||0} <> 1  
                        AND ${reportDataFount.ISCONDICTIONVISION||0} = 1 
                        AND (
                            RFI.IDSQLOBJECTTYPE <> ${SqlObjectsTypes.FIELD}
                            OR (
                                RFI.IDSQLOBJECTTYPE = ${SqlObjectsTypes.FIELD}
                                AND NOT EXISTS (SELECT 1 FROM REPORTSDATASFOUNTSITEMS RFI2 WHERE RFI2.id = RFI.IDSUP AND RFI2.IDSQLOBJECTTYPE = ${SqlObjectsTypes.SELECT})
                            )

                        )
                    )
                )
            ORDER BY
                COALESCE(RFI.IDSUP,RFI.id)
        `;

        let reportsDataItems = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,queryType:QueryTypes.SELECT});
        reportsDataItems = reportsDataItems[0] || [];
        
        if (reportsDataItems && reportsDataItems.length) {

            //scructure in sub nested elements
            let structuredReportsDataItems = _.keyBy(reportsDataItems,'id');
            for(let k in structuredReportsDataItems) {
                if (Utils.hasValue(structuredReportsDataItems[k].EXISTENCECRITERY)) {
                    Utils.log('executing eval',structuredReportsDataItems[k].EXISTENCECRITERY);
                    if (!Utils.toBool(eval(structuredReportsDataItems[k].EXISTENCECRITERY))) {
                        structuredReportsDataItems[k].MOVED = true;
                        continue;    
                    };
                }
                if (structuredReportsDataItems[k].IDSUP) {
                    structuredReportsDataItems[structuredReportsDataItems[k].IDSUP].SUBS = structuredReportsDataItems[structuredReportsDataItems[k].IDSUP].SUBS || [];
                    structuredReportsDataItems[structuredReportsDataItems[k].IDSUP].SUBS.push(structuredReportsDataItems[k]);
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
        } else {
            Utils.log(`reports data fount items not found for report data fount id ${reportDataFount.id}`);
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
        //Utils.log('view weigth find...');
        let result = [];
        if (Utils.toBool(params.viewAmount || false)) {
            result.push('SUM(NVL(QT,0)) AS QT');
        }
        if (Utils.toBool(params.viewWeight || false)) {
            //Utils.log('view weigth true');
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
        //console.log('antes',periods);
        periods = Utils.singleArrayTo2LevelArray(periods);
        //console.log('depois',periods);

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

    static checkExistsCondictionsByReportVision(params,idVision) {
        let result = false;
        try {
            let condictions = params.condictions || [];
            if (Utils.hasValue(condictions)) {
                if (typeof condictions == 'string') {
                    condictions = JSON.parse(condictions);
                }
                result = condictions.filter(el=>((el.reportVision || el.vision || {}).id || el.reportVision || el.vision) == idVision).length > 0;
            }
        } catch (e) {
            Utils.log(e);
        }
        Utils.log('result of checkExistsCondictionsByReportVision', result);
        return result;
    }

    static mountCondictionsByReportVision(params,idVision,field) {
        let result = null;
        try {
            let condictions = params.condictions || [];
            if (Utils.hasValue(condictions)) {
                Utils.log('has condictions',condictions);
                if (typeof condictions == 'string') {
                    condictions = JSON.parse(condictions);
                }
                Utils.log('has condictions 2',condictions, idVision);
                condictions = condictions.filter(el=>(el.reportVision || el.vision || {}).id || el.reportVision || el.vision == idVision);
                Utils.log('has condictions 3',condictions, Utils.hasValue(condictions));
                if (Utils.hasValue(condictions)) {
                    let or = [];
                    Utils.log('okx1');
                    for(let k in condictions) {
                        if ((condictions[k].selecteds || condictions[k].values) && (condictions[k].selecteds || condictions[k].values).length) {
                            Utils.log('okx2');
                            or.push(`${field} ${condictions[k].operation.id || condictions[k].operation} (${(condictions[k].selecteds || condictions[k].values).map(el=>el.id || el ||'null').join(',')})`);
                        }
                    }
                    if (or.length > 1) {
                        result = `(${or.join(' or ')})`;
                    } else {
                        result = or.join(' or ');
                    }
                }
                Utils.log('condictions result',result);
            }
        } catch (e) {
            Utils.log(e);
        }
        return result;
    }

    static async evalSqlText(sqlText,params) {
        let result = sqlText;
        //console.log('antes evel',sqlText,params);
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
                    Utils.log('executing eval',evalText);
                    evaluetedValue = await eval(evalText);
                    Utils.log('result of evel',evaluetedValue);
                    result = result.replaceAll(replaceText,evaluetedValue);
                    p1 = result.indexOf("${");
                    p2 = result.indexOf("}$");
                    loopLimit --;
                }     
            }
        } catch (e) {
            Utils.log(e);
        }
        return result;
    }

    static async getMountedSqlText(item,params) {
        let result = null;
        try {
            if (item) {
                if (typeof item == 'object') {
                    if (item.MOUNTEDSQLTEXT) {
                        result = item.MOUNTEDSQLTEXT;
                    } else {
                        item.BEFORESQLTEXT = await StructuredQueryUtils.evalSqlText(item.BEFORESQLTEXT,params);
                        item.SQLTEXT = await StructuredQueryUtils.evalSqlText(item.SQLTEXT,params);
                        result = `${item.BEFORESQLTEXT||''} ${item.SQLTEXT}`;
                        item.MOUNTEDSQLTEXT = result;
                    }
                } else {
                    result = await StructuredQueryUtils.evalSqlText(item,params);
                }
            }
        } catch (e) {
            Utils.log(e);
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

                            if (currentItems[k].IDSQLOBJECTTYPE == SqlObjectsTypes.JOIN && currentStructure[j].IDSQLOBJECTTYPE == SqlObjectsTypes.JOIN) {
                                if (Utils.hasValue(currentItems[k].SUBS) && Utils.hasValue(currentStructure[j].SUBS)) {

                                    //Utils.log('y2k',currentItems[k].SUBS[0].SQLTEXT,currentStructure[j].SUBS[0].SQLTEXT,currentItems[k].SUBS[0].SQLALIAS,currentStructure[j].SUBS[0].SQLALIAS);

                                    if ((currentItems[k].SUBS[0].SQLTEXT||'').trim().replace(/\s/g,'').toLowerCase() == (currentStructure[j].SUBS[0].SQLTEXT||'').trim().replace(/\s/g,'').toLowerCase()
                                        && (currentItems[k].SUBS[0].SQLALIAS||'').trim().replace(/\s/g,'').toLowerCase() == (currentStructure[j].SUBS[0].SQLALIAS||'').trim().replace(/\s/g,'').toLowerCase()

                                        //mostrar isso e ver porque o alias não está sendo computado (diferente no registro e está passando por aqui como igual visao filia + empresa)

                                        && Utils.toBool(currentItems[k].SUBS[0].UNIQUEINGROUPMENT||false) && Utils.toBool(currentStructure[j].SUBS[0].UNIQUEINGROUPMENT||false)
                                    ) {
                                        preexistent = true;
                                        await StructuredQueryUtils.unifyStructuredQueryItems(currentStructure[j].SUBS, currentItems[k].SUBS, params);
                                        break;
                                    }
                                }
                            } else if (isEqual) {
                                if (Utils.toBool(currentItems[k].UNIQUEINGROUPMENT||false) && Utils.toBool(currentStructure[j].UNIQUEINGROUPMENT||false)) {
                                    preexistent = true;
                                    if (Utils.hasValue(currentItems[k].SUBS)) {
                                        currentStructure[j].SUBS =  currentStructure[j].SUBS || [];
                                        await StructuredQueryUtils.unifyStructuredQueryItems(currentStructure[j].SUBS, currentItems[k].SUBS, params);
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
        } else {
            Utils.log(`reports data fount items not found for report data fount id ${reportDataFount.id}`);
        }
        //Utils.log('unified structured query',JSON.stringify(structuredQuery));
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
                    if (Utils.hasValue(queryItems.SUBS)) {
                        let resultSubs = await StructuredQueryUtils.mountQueryItems(queryItems.SUBS,params);
                        if (Utils.hasValue(resultSubs)) {
                        let delimiter = ' ';
                            if ([SqlObjectsTypes.SELECT,SqlObjectsTypes.GROUP_BY, SqlObjectsTypes.ORDER_BY].indexOf((queryItems.IDSQLOBJECTTYPE||0)-0) > -1) {
                                delimiter = ','
                            }  else if ([SqlObjectsTypes.WHERE,SqlObjectsTypes.ON, SqlObjectsTypes.HAVING].indexOf((queryItems.IDSQLOBJECTTYPE||0)-0) > -1) {
                                delimiter = ' AND '
                            }           
                            if (queryItems.IDSQLOBJECTTYPE == SqlObjectsTypes.SELECT) {
                                for (let i = 0; i < queryItems.SUBS.length; i++) {                                
                                    if (Utils.hasValue(queryItems.SUBS[i].MOUNTEDSQLTEXT)) {
                                        result += ` ${queryItems.SUBS[i].MOUNTEDSQLTEXT}`;
                                        if (i < queryItems.SUBS.length-1) {
                                            if (queryItems.SUBS[i+1].IDSQLOBJECTTYPE == SqlObjectsTypes.FIELD) {
                                                result += ` ${delimiter}`;
                                            } 
                                        }
                                    }
                                }
                            } else if (queryItems.IDSQLOBJECTTYPE == SqlObjectsTypes.FROM) {
                                let openedParents = false;
                                for (let i = 0; i < queryItems.SUBS.length; i++) {
                                    if (Utils.hasValue(queryItems.SUBS[i].MOUNTEDSQLTEXT)) {
                                        //open subquery parentesis
                                        if (queryItems.SUBS[i].IDSQLOBJECTTYPE == SqlObjectsTypes.SELECT && !openedParents) {
                                            result += ` ( `;
                                            openedParents = true;
                                        }
                                        result += ` ${queryItems.SUBS[i].MOUNTEDSQLTEXT}`;
                                        if (i < queryItems.SUBS.length-1) {
                                            if (queryItems.SUBS[i+1].IDSQLOBJECTTYPE == SqlObjectsTypes.FIELD) {
                                                result += ` ${delimiter}`;
                                            } 
                                        }

                                        //close subquery parentesis
                                        if (queryItems.SUBS[i].IDSQLOBJECTTYPE == SqlObjectsTypes.SELECT && openedParents) {
                                            if (i < queryItems.SUBS.length-1) {
                                                if (queryItems.SUBS[i+1].IDSQLOBJECTTYPE == SqlObjectsTypes.SELECT) {
                                                    if (!(
                                                        (queryItems.SUBS[i].SQLTEXTAFTERCHILDREN||'').toLowerCase().indexOf('union') > -1 || (queryItems.SUBS[i].SQLTEXT||'').toLowerCase().indexOf('union') > -1
                                                        || (queryItems.SUBS[i+1].BEFORESQLTEXT||'').toLowerCase().indexOf('union') > -1 || (queryItems.SUBS[i+1].SQLTEXT||'').toLowerCase().indexOf('union') > -1
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
                            } else if (queryItems.IDSQLOBJECTTYPE == SqlObjectsTypes.PIVOT) {
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
                    result += ` ${await StructuredQueryUtils.evalSqlText(queryItems.SQLTEXTAFTERCHILDREN,params)||''}`;
                    if (Utils.hasValue(queryItems.SQLALIAS)) {
                        result += ` ${queryItems.SQLALIAS}`;
                    }
                    queryItems.MOUNTEDSQLTEXT = result;
                } 
            }
        }
        return result;
    }

    static orderStructuredQueryItems(structuredQuery,visionsSort,sup) {
        structuredQuery = structuredQuery.sort(function(a,b){
            let result = 0;
            if (sup?.IDSQLOBJECTTYPE == SqlObjectsTypes.SELECT) {
                if (a.IDSQLOBJECTTYPE == SqlObjectsTypes.FIELD) {
                    if (b.IDSQLOBJECTTYPE == SqlObjectsTypes.FIELD) {
                        if (Utils.toBool(a.VALUEGROUPMENT||false)) {
                            if (Utils.toBool(b.VALUEGROUPMENT||false)) {
                                result = visionsSort[a.IDVISION] == visionsSort[b.IDVISION] ? a.ORDERNUM - b.ORDERNUM : visionsSort[a.IDVISION] - visionsSort[b.IDVISION];
                            } else {
                                result = 1;
                            }   
                        } else {
                            if (Utils.toBool(b.VALUEGROUPMENT||false)) {
                                result = -1;
                            } else {
                                result = visionsSort[a.IDVISION] == visionsSort[b.IDVISION] ? a.ORDERNUM - b.ORDERNUM : visionsSort[a.IDVISION] - visionsSort[b.IDVISION];
                            }   
                        }
                    } else {
                        result = -1;
                    }
                } else if (b.IDSQLOBJECTTYPE == SqlObjectsTypes.FIELD) {
                    result = 1;
                } else {
                    result = visionsSort[a.IDVISION] == visionsSort[b.IDVISION] ? a.ORDERNUM - b.ORDERNUM : visionsSort[a.IDVISION] - visionsSort[b.IDVISION];
                }
            } else if (sup?.IDSQLOBJECTTYPE == SqlObjectsTypes.FROM) {
                result = a.ORDERNUM - b.ORDERNUM;
            } else {
                result = visionsSort[a.IDVISION] == visionsSort[b.IDVISION] ? a.ORDERNUM - b.ORDERNUM : visionsSort[a.IDVISION] - visionsSort[b.IDVISION];
            }
            //Utils.log(visionsSort[a.IDVISION],visionsSort[b.IDVISION],a.ORDERNUM,b.ORDERNUM,visionsSort[a.IDVISION] == visionsSort[b.IDVISION],a.ORDERNUM - b.ORDERNUM,visionsSort[a.IDVISION] - visionsSort[b.IDVISION],visionsSort[a.IDVISION] == visionsSort[b.IDVISION] ? a.ORDERNUM - b.ORDERNUM : visionsSort[a.IDVISION] - visionsSort[b.IDVISION],result);
            return result;
        });
        for(let i = 0; i < structuredQuery.length; i++) {
            if (structuredQuery[i].SUBS && structuredQuery[i].SUBS.length) {
                structuredQuery[i].SUBS = StructuredQueryUtils.orderStructuredQueryItems(structuredQuery[i].SUBS,visionsSort,structuredQuery[i]);
            }
        }
        return structuredQuery;        
    }

    static async processAccessCriteriesStructuredQueryItems(params,structuredQuery,pCurrentSelect) {
        let currentSelect = pCurrentSelect;
        for(let k in structuredQuery) {
            //Utils.log('xxx',structuredQuery[k]);
            if (structuredQuery[k].IDSQLOBJECTTYPE == SqlObjectsTypes.SELECT) {
                currentSelect = structuredQuery[k];
            }
            if (structuredQuery[k].IDSQLOBJECTTYPE == SqlObjectsTypes.TABLE) {
                if (Utils.hasValue(structuredQuery[k].EXPRESSION)) {
                    structuredQuery[k].EXPRESSION = await StructuredQueryUtils.evalSqlText(structuredQuery[k].EXPRESSION, params);
                    structuredQuery[k].EXPRESSION = structuredQuery[k].EXPRESSION.replaceAll('__TABLE_ALIAS__',structuredQuery[k].SQLALIAS);
                    Utils.log('xxxxxxx', structuredQuery[k].EXPRESSION);
                    let injected = false;
                    for(let j in pCurrentSelect?.SUBS || []) {
                        if (pCurrentSelect.SUBS[j].IDSQLOBJECTTYPE == SqlObjectsTypes.WHERE) {
                            pCurrentSelect.SUBS[j].SUBS = pCurrentSelect.SUBS[j].SUBS || [];
                            pCurrentSelect.SUBS[j].SUBS.push(structuredQuery[k].EXPRESSION);
                            injected = true;
                            break;
                        }
                    }
                    if (!injected) {
                        pCurrentSelect.SUBS = pCurrentSelect.SUBS || [];
                        pCurrentSelect.SUBS.push({
                            IDSQLOBJECTTYPE: SqlObjectsTypes.WHERE,
                            SUBS:[structuredQuery[k].EXPRESSION]
                        })
                    }
                }
            }
            if (structuredQuery[k].SUBS && structuredQuery[k].SUBS.length) {
                await StructuredQueryUtils.processAccessCriteriesStructuredQueryItems(params,structuredQuery[k].SUBS, currentSelect);
            }
        }
    }

    static async mountQuery(structuredQuery,params) {
        //Utils.log('mounting'); 
        let visionsIds = params.visions || [];
        let visionsSort = {};
        for(let i = 0; i < visionsIds.length; i++) {
            visionsSort[visionsIds[i]] = i;
        }
        //Utils.log('sorted visions',visionsSort);
        let orderedStructuredQuery = StructuredQueryUtils.orderStructuredQueryItems(structuredQuery,visionsSort);
        await StructuredQueryUtils.processAccessCriteriesStructuredQueryItems(params,orderedStructuredQuery);
        //Utils.log('unified structured query ordereds',JSON.stringify(orderedStructuredQuery));
        let result = await StructuredQueryUtils.mountQueryItems(orderedStructuredQuery,params);
        if (Utils.typeOf(result) == 'array') {
            result = result.join(' ');
        }
        //incluir a clausula in no structured na pagina no pivot para testar
        return result;
    }
}

module.exports = {StructuredQueryUtils}