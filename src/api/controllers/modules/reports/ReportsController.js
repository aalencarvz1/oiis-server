const { Sequelize, QueryTypes } = require("sequelize");
const { ReportsDatasFounts } = require("../../../database/models/ReportsDatasFounts");
const { Utils } = require("../../utils/Utils");
const DBConnectionManager = require("../../../database/DBConnectionManager");
const { ReportsVisions } = require("../../../database/models/ReportsVisions");
const { DataRelationshipTypes } = require("../../../database/models/DataRelationshipTypes");
const { StatusRegs } = require("../../../database/models/StatusRegs");
const _ = require('lodash');
const { StructuredQueryUtils } = require("./structuredreports/StructuredQueryUtils");
const { RegistersController } = require("../registers/RegistersController");


/**
 * Class controller to handle modules module
 * @author Alencar
 * @created 2023-25-08
 */
class ReportsController extends RegistersController{

    static async getReportDataFount(req) {        
        let queryParams = {
            raw:true,
            where:{}
        };
        //Utils.log('body',req.body);
        //Utils.log('query',req.query);
        let dates = req.body.dates || req.query?.dates || [];
        if (Utils.typeOf(dates) != 'array') {
            dates = dates.split(',');
        }
        let id = req.body.id || req.body.REPORTID || req.body.REPORTDATAFOUNTID || req.query?.id || req.query?.REPORTID || req.query?.REPORTDATAFOUNTID;
        if (id) {
            queryParams.where.id = id;
        } 
        let name = req.body.name || req.body.REPORTNAME || req.body.REPORTDATANAME || req.query?.name || req.query?.REPORTNAME || req.query?.REPORTDATANAME;
        if (name) {
            queryParams.where.name = name;
        } 

        if (dates && dates.length) {
            dates[0] = new Date(dates[0]);
            dates[1] = new Date(dates[1] || dates[0]);
            queryParams.where.STARTDATE = {[Sequelize.Op.lte]: dates[0]};
            queryParams.where.ENDDATE = {[Sequelize.Op.gte]: dates[1]};
        }
        //Utils.log(queryParams);
        return await ReportsDatasFounts.getModel().findOne(queryParams);
    }


    static async getData(req,res,next,pReport) {
        let result = null;
        try {            
            Utils.log('test',req.body,req.query);        
            let report = pReport || await this.getReportDataFount(req);
            if (report) {
                if (Utils.hasValue(req.query?.dates)) {
                    if (Utils.typeOf(req.query.dates != 'array')) {
                        req.query.dates = req.query.dates.split(',');
                    }
                }
                if ((report.GETVALUEFROMTYPE||'').trim().toLowerCase() == 'query') {
                    if ((report.GETVALUEFROMORIGIN||'').trim().toLowerCase() == 'ep') {
                        let query = report.GETVALUEFROM;
                        let loopLimit = 1000;
                        let p1 = query.indexOf("${");
                        let p2 = query.indexOf("}$");
                        let replaceText = null;
                        let evalText = null;
                        let evaluetedValue = null;


                        //to use in eval code
                        let params = req.body || req.query || {};
                        params.user = req.user;


                        while(p1 > -1 && p2 > -1 && p2 > p1 && loopLimit > 0) {
                            replaceText = query.substr(p1,(p2-p1)+2);
                            evalText = replaceText.substring(2,replaceText.length-2);
                            //Utils.log('*************************************',p1,p2,`|${replaceText}|`,`|${evalText}|`);
                            evaluetedValue = await eval(evalText);
                            //Utils.log('evaluetedValue', evalText, evaluetedValue);
                            query = query.replaceAll(replaceText,evaluetedValue);
                            p1 = query.indexOf("${");
                            p2 = query.indexOf("}$");
                            loopLimit --;
                        }                    
                        result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType:QueryTypes.SELECT});
                        result = result[0] || [];
                    } else {
                        throw new Error(`not expected GETVALUEFROMTYPE: ${report.GETVALUEFROMORIGIN}`)    
                    }
                } else {
                    throw new Error(`not expected GETVALUEFROMTYPE: ${report.GETVALUEFROMTYPE}`)
                }
            } else {
                throw new Error("report data fount not found or not valid at informed dates");
            }
        } catch (e) {
            console.log('cath block',e);
            if (res) {
                res.setException(e);
                res.sendResopnse(517,false);
            } else {
                throw e;
            }
        } finally {
            if (res && !res.exception) {
                console.log('finally block x1');
                res.data = result;
                res.success = true;
                res.sendResponse(200,true);
            }
            console.log('finally block x2');
            return result;
        }
        
    }


    /**
     * Get data from customized (structured) query
     * @param {*} params
     * @returns 
     * @created 2024-07-22
     * @version 2.0.0
     */
    static async getStructuredQueryData(params) {
        let result = null;
        let structuredQueryOrigin = null;
        params = params || {};
        console.log('params',params.visions);
        let visionsIds = params.visions || [];
        let periods = params.periods || [];
        let condictions = params.condictions || [];
        if (visionsIds.length && periods.length) {            
            if (Utils.typeOf(visionsIds) != "array") {
                visionsIds = Utils.toArray(visionsIds,",");
            }
            visionsIds = visionsIds.map(el=>Utils.hasValue(el)?el:'null');
            if (Utils.typeOf(periods) != "array") {
                periods = Utils.toArray(periods,",");
            }
            periods = periods.map(el=>Utils.hasValue(el)?el:'null');

            //wraper perios in array o 2 elements [[init,end],..]
            periods = Utils.singleArrayTo2LevelArray(periods);
            visionsIds = [...new Set(visionsIds)]; //unique
            if (Utils.hasValue(condictions) && typeof condictions == 'string') {
                condictions = JSON.parse(condictions);
            }
            Utils.log('visionsIds',visionsIds,'periods',periods);
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
            
            let condictionsVisionsIds = params.condictionsVisionsIds || (condictions||[]).map(el=>(el.reportVision || el.vision || {}).id || el.reportVision || el.vision);  
            condictionsVisionsIds = condictionsVisionsIds.map(el=>Utils.hasValue(el)?el:'null');          
            condictionsVisionsIds = [...new Set(condictionsVisionsIds)]; //unique
            Utils.log('visionsIds',visionsIds,'periods',periods,'min max period',minPeriod,maxPeriod, 'condictionsVisionsIds',condictionsVisionsIds);

            //get report data fount
            let query = `
                SELECT
                    RF.id,
                    RV.id AS IDVISION,                    
                    RF.STARTDATE,
                    RF.ENDDATE,
                    RF.CONDICTIONS,
                    RF.GETEXPECTEDDATAFROMTYPE,
                    RF.GETEXPECTEDDATAFROMORIGIN,
                    RF.GETEXPECTEDDATAFROM,
                    RF.GETVALUEFROMTYPE,
                    RF.GETVALUEFROMORIGIN,
                    RF.GETVALUEFROM,
                    COALESCE(DR.ORDERNUM,DR.id) AS ORDERNUM,
                    CASE WHEN RV.id IN (${visionsIds.join(',')}) THEN 1 ELSE 0 END AS ISVISION,
                    CASE WHEN RV.id IN (${condictionsVisionsIds.length ? condictionsVisionsIds.join(',') : '-1'}) THEN 1 ELSE 0 END AS ISCONDICTIONVISION
                FROM
                    REPORTSVISIONS RV
                    JOIN DATASRELATIONSHIPS DR ON (
                        DR.IDRELATIONSHIPTYPE = ${DataRelationshipTypes.RELATIONSHIP}
                        AND DR.IDTABLE1 = ${ReportsVisions.id}
                        AND DR.IDREG1 = RV.id
                        AND DR.IDTABLE2 = ${ReportsDatasFounts.id}
                        AND DR.status_reg_id = ${StatusRegs.ACTIVE}
                        AND COALESCE(DR.STARTMOMENT,STR_TO_DATE('${minPeriod.toISOString().slice(0, 19).replace('T', ' ')}','%Y-%m-%d %k:%i:%s')) <= STR_TO_DATE('${minPeriod.toISOString().slice(0, 19).replace('T', ' ')}','%Y-%m-%d %k:%i:%s')
                        AND COALESCE(DR.ENDMOMENT,STR_TO_DATE('${maxPeriod.toISOString().slice(0, 19).replace('T', ' ')}','%Y-%m-%d %k:%i:%s')) <= STR_TO_DATE('${maxPeriod.toISOString().slice(0, 19).replace('T', ' ')}','%Y-%m-%d %k:%i:%s')
                    )
                    JOIN REPORTSDATASFOUNTS RF ON (
                        RF.id = DR.IDREG2
                        AND RF.status_reg_id = ${StatusRegs.ACTIVE}
                        AND COALESCE(RF.STARTDATE,STR_TO_DATE('${minPeriod.toISOString().slice(0, 19).replace('T', ' ')}','%Y-%m-%d %k:%i:%s')) <= STR_TO_DATE('${minPeriod.toISOString().slice(0, 19).replace('T', ' ')}','%Y-%m-%d %k:%i:%s')
                        AND COALESCE(RF.ENDDATE,STR_TO_DATE('${maxPeriod.toISOString().slice(0, 19).replace('T', ' ')}','%Y-%m-%d %k:%i:%s')) <= STR_TO_DATE('${maxPeriod.toISOString().slice(0, 19).replace('T', ' ')}','%Y-%m-%d %k:%i:%s')
                    )
                WHERE
                    (
                        RV.id IN (${visionsIds.join(',')})
                        ${condictionsVisionsIds.length ? `OR RV.id IN (${condictionsVisionsIds.join(',')}) ` : ''}
                    )
                    AND RV.status_reg_id = ${StatusRegs.ACTIVE}
                ORDER BY
                    RV.id,
                    COALESCE(DR.ORDERNUM,DR.id)
            `;

            let reportsDatasFounts = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
            reportsDatasFounts = reportsDatasFounts[0] || [];
            if (reportsDatasFounts && reportsDatasFounts.length) {                
                for(let k in reportsDatasFounts) {
                    if (reportsDatasFounts[k].GETVALUEFROMTYPE.trim().toUpperCase() == 'STRUCTURED QUERY') {

                        //unify all structured report data fount in one
                        structuredQueryOrigin = structuredQueryOrigin || reportsDatasFounts[k].GETVALUEFROMORIGIN;
                        if (structuredQueryOrigin != reportsDatasFounts[k].GETVALUEFROMORIGIN) {
                            throw new Error(`unsuported different origins in same structured report: ${structuredQueryOrigin},${reportsDatasFounts[k].GETVALUEFROMORIGIN}`);
                        }
                        result = result || [];
                        result = await StructuredQueryUtils.unifyStructuredQuery(result,reportsDatasFounts[k],params);                       
                    } else {
                        throw new Error(`GETVALUEFROMTYPE of report data found id ${reportsDatasFounts[k].id} not expected: ${reportsDatasFounts[k].GETVALUEFROMTYPE}`)
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
     * Get data from customized (structured) reports
     * @param {*} req 
     * @returns 
     * @created 2024-04-02
     * @version 3.0.0
     */
    static async getCustomizedReportData(req,res,next) {
        try {
            res.data = null;
            let params = req.body || req.query || {};
            params.user = req.user;
            let structuredQueryData = await this.getStructuredQueryData(params);            
            if (structuredQueryData) {

                //mount unified query
                let query = await StructuredQueryUtils.mountQuery(structuredQueryData.structuredQuery,params);
                Utils.log('mounted query',query);
                let connection = await DBConnectionManager.getConnectionBySchemaName(structuredQueryData.origin);
                if (!connection) {
                    throw new Error(`connection data not found with schema name:${structuredQueryData.origin}`);
                }

                //get unified query data
                let data = await connection.query(query);
                data = data[0] || [];
                Utils.log(data);
                res.data = res.data || [];
                res.data.push({
                    DATA: data
                });                        
                res.success = true;
            } else {
                throw new Error(`structured data query not found`);
            }
        } catch (e) {
            res.setException(e);
        } finally {
            res.sendResponse();
        }
    }

     /**
     * Get data from customized (structured) reports
     * @param {*} req 
     * @returns 
     * @created 2024-04-02
     * @version 2.0.0
     */
     static async getCommissionsData(req,res,next) {
        try {
            res.data = null;
            let query = `
                SELECT
                    c.*
                FROM
                    ep."commissions" c
                where
                    nvl(c."active",1) = 1
                    and trunc(nvl(c."startdate",sysdate)) <= trunc(sysdate)
                    and trunc(nvl(c."enddate",sysdate)) >= trunc(sysdate)
            `;
            let commissionsData = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType:QueryTypes.SELECT});
            commissionsData = commissionsData[0] || [];
            if (commissionsData && commissionsData.length > 0) {                                    
                let allCondictions = [];
                let allCondictionsVisions = [];
                for(let i = 0; i < commissionsData.length; i++) {
                    console.log(commissionsData[i]);
                    let condiction = [];
                    condiction.push(`cm."id" = ${commissionsData[i].id}`)
                    switch((commissionsData[i].entityname || 'rca').trim().toLowerCase()) {
                        case 'rca':
                            condiction.push(`v.cod = ${commissionsData[i].entityid}`);
                            break;
                        default:
                            throw new Error(`not expected entity name: ${commissionsData[i].entityname}`)
                    }
                    condiction.push(`(${commissionsData[i].condictionjoin})`);                    
                    allCondictions.push(condiction.join(' and '));
                    if (Utils.hasValue(commissionsData[i].condictionreportsvisionsids)) {
                        commissionsData[i].condictionreportsvisionsids = Utils.toArray(commissionsData[i].condictionreportsvisionsids);
                        allCondictionsVisions = allCondictionsVisions.concat(commissionsData[i].condictionreportsvisionsids);
                    }
                }
                allCondictions = [...new Set(allCondictions)];
                allCondictionsVisions = [...new Set(allCondictionsVisions)];

                let structuredQueryParams = {};
                structuredQueryParams.visions = [8,10]; //rca,depto
                structuredQueryParams.periods = req.body?.periods || req.query?.periods;
                structuredQueryParams.viewAmount = false;
                structuredQueryParams.viewWeight = false;
                structuredQueryParams.viewValue = true;
                structuredQueryParams.considerBonuses = false;
                structuredQueryParams.considerNormalSales = true;
                structuredQueryParams.considerReturns = true;
                structuredQueryParams.user = req.user;
                if (Utils.typeOf(structuredQueryParams.periods) != "array") {
                    structuredQueryParams.periods = Utils.toArray(structuredQueryParams.periods,",");
                }
                structuredQueryParams.periods = structuredQueryParams.periods.map(el=>Utils.hasValue(el)?el:'null');
                
                //wraper perios in array o 2 elements [[init,end],..]
                structuredQueryParams.periods = Utils.singleArrayTo2LevelArray(structuredQueryParams.periods);
                structuredQueryParams.condictionsVisionsIds = Utils.hasValue(allCondictionsVisions) ? allCondictionsVisions : undefined;
                let structuredQueryData = await this.getStructuredQueryData(structuredQueryParams);  
                let reportQuery = await StructuredQueryUtils.mountQuery(structuredQueryData.structuredQuery,structuredQueryParams);
                reportQuery = reportQuery.replace(/\s{2,}/g,' ').trim();                
                reportQuery = reportQuery.split(' where ');
                reportQuery[0] += ` join ep."commissions" cm on (
                    lower(nvl(cm."entityname",'rca')) = 'rca'
                    and cm."entityid" = s.codvendedor
                    and (${allCondictions.join(') or (')})
                ) `;
                reportQuery[1] += ` join ep."commissions" cm on (
                    lower(nvl(cm."entityname",'rca')) = 'rca'
                    and cm."entityid" = e.codvendedor
                    and (${allCondictions.join(') or (')})
                ) `;
                reportQuery = reportQuery.join(' where ');

                let p1 = reportQuery.search(/\,\s*CASE\s+WHEN\s+s\.dtemissao/i);
                reportQuery = reportQuery.substring(0,p1-1) + `,
                    cm."name" as COMMISSAO,
                    cm."percent1name",
                    cm."percent1",
                    cm."percent2name",
                    cm."percent2"
                ` + reportQuery.substring(p1);

                p1 = reportQuery.search(/\,\s*CASE\s+WHEN\s+e\.dtemissao/i);
                reportQuery = reportQuery.substring(0,p1-1) + `,
                    cm."name" as COMMISSAO,
                    cm."percent1name",
                    cm."percent1",
                    cm."percent2name",
                    cm."percent2"
                ` + reportQuery.substring(p1);
                Utils.log('mounted query',reportQuery);
                res.data = await DBConnectionManager.getEpDBConnection().query(reportQuery,{raw:true,queryType:QueryTypes.SELECT});
                res.data = res.data[0] || [];
                res.data = [{DATA:res.data}];
                console.log(res.data);
                res.success = true;
            } else {
                throw new Error('no commissions data found');
            }
        } catch (e) {
            res.setException(e);
        } finally {
            res.sendResponse();
        }
    }
}

module.exports = {ReportsController}