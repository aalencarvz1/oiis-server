import { Op, QueryTypes, Sequelize } from "sequelize";
import DBConnectionManager from "../../../database/DBConnectionManager.js";
import Report_Data_Founts from "../../../database/models/Report_Data_Founts.js";
import DataSwap from "../../data/DataSwap.js";
import BaseRegistersController from "../registers/BaseRegistersController.js";
import { NextFunction, Request, Response } from "express";
import StructuredQueryUtils from "./StructuredQueryUtils.js";
import Utils from "../../utils/Utils.js";
import EpIntegrationsRegistersController from "../integrations/ep/EpIntegrationsRegistersController.js";
import Sql_Object_Types from "../../../database/models/Sql_Object_Types.js";


export default class ReportsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Report_Data_Founts;
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


    static async getReportDataFount(params : any) : Promise<any>{                
        let queryParams : any = {
            raw:true,
            where:{}
        };
        let dates = params.dates || [];
        if (Utils.typeOf(dates) != 'array') {
            dates = dates.split(',');
        }
        let id = params.id || params.REPORTID || params.REPORTDATAFOUNTID;
        if (id) {
            queryParams.where.id = id;
        } 
        let name = params.name || params.REPORTNAME || params.REPORTDATANAME;
        if (name) {
            queryParams.where.name = name;
        } 

        if (dates && dates.length) {
            dates[0] = new Date(dates[0]);
            dates[1] = new Date(dates[1] || dates[0]);            
            queryParams.where[Op.or] = queryParams.where[Op.or] || [];
            queryParams.where[Op.or].push({
                [Op.and]:[
                    Sequelize.where(
                        Sequelize.fn('coalesce',Sequelize.cast(Sequelize.col('start_date'), 'datetime'),Sequelize.cast(dates[0],'datetime')),
                        Op.lte,
                        Sequelize.cast(dates[0],'datetime')
                    ),
                    Sequelize.where(
                        Sequelize.fn('coalesce',Sequelize.cast(Sequelize.col('end_date'), 'datetime'),Sequelize.cast(dates[0],'datetime')),
                        Op.gte,
                        Sequelize.cast(dates[0],'datetime')
                    )
                ]
            });
            queryParams.where[Op.or].push({
                [Op.and]:[
                    Sequelize.where(
                        Sequelize.fn('coalesce',Sequelize.cast(Sequelize.col('end_date'), 'datetime'),Sequelize.cast(dates[1],'datetime')),
                        Op.gte,
                        Sequelize.cast(dates[1],'datetime')
                    ),
                    Sequelize.where(
                        Sequelize.fn('coalesce',Sequelize.cast(Sequelize.col('start_date'), 'datetime'),Sequelize.cast(dates[1],'datetime')),
                        Op.lte,
                        Sequelize.cast(dates[1],'datetime')
                    )
                ]
            });
        }
        return await Report_Data_Founts.findOne(queryParams);
    }


    static async getData(params?: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {            
            let report = params?.pReport || await this.getReportDataFount(params);
            if (report) {
                if (Utils.hasValue(params?.dates)) {
                    if (Utils.typeOf(params.dates) != 'array') {
                        params.dates = params.dates.split(',');
                    }
                }
                if ((report.type_get_value_from||'').trim().toLowerCase() == 'query') {
                    let connectiton = DBConnectionManager.getDefaultDBConnection();
                    if ((report.origin_get_value_from||'').trim().toLowerCase() == 'ep') {
                        connectiton = DBConnectionManager.getEpDBConnection();
                    } else if ((report.origin_get_value_from||'').trim().toLowerCase() == 'winthor') {
                        connectiton = DBConnectionManager.getWinthorDBConnection();
                    } else {
                        throw new Error(`not expected type_get_value_from: ${report.origin_get_value_from}`)    
                    }

                    let query = report.get_value_from;
                    let loopLimit = 1000;
                    let p1 = query.indexOf("${");
                    let p2 = query.indexOf("}$");
                    let replaceText = null;
                    let evalText = null;
                    let evaluetedValue = null;

                    while(p1 > -1 && p2 > -1 && p2 > p1 && loopLimit > 0) {
                        replaceText = query.substr(p1,(p2-p1)+2);
                        evalText = replaceText.substring(2,replaceText.length-2);
                       // console.log('executing eval ', evalText);
                        evaluetedValue = await eval(evalText);
                        //console.log('result',evaluetedValue);
                        query = query.replaceAll(replaceText,evaluetedValue);
                        p1 = query.indexOf("${");
                        p2 = query.indexOf("}$");
                        loopLimit --;
                    }                    
                    result.data = await connectiton?.query(query,{raw:true,type:QueryTypes.SELECT});
                    result.success = true;
                } else {
                    throw new Error(`not expected type_get_value_from: ${report.type_get_value_from}`)
                }
            } else {
                throw new Error("report data fount not found or not valid at informed dates");
            }
        } catch (e: any) {
            result.setException(e);
        } 
        return result;       
    }


    /**
     * Get data from customized (structured) reports
     * @created 2024-04-02
     * @version 3.0.0
     */
    static async getCustomizedReportData(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            result.data = null;
            let structuredQueryData = await StructuredQueryUtils.getStructuredQueryData(params);            
            if (structuredQueryData) {

                //mount unified query
                console.log('xxxxxxxx-1',JSON.stringify(structuredQueryData));
                let query = await StructuredQueryUtils.mountQuery(structuredQueryData.structuredQuery,params);
                let connection = await DBConnectionManager.getConnectionBySchemaName(structuredQueryData.origin);
                if (!connection) {
                    throw new Error(`connection data not found with schema name:${structuredQueryData.origin}`);
                }

                //get unified query data
                
                let data = await connection.query(query,{
                    raw:true,
                    type:QueryTypes.SELECT,
                    mapToModel: false,
                    nest:true
                });
                data = data || [];
                result.data = result.data || [];
                result.data.push({
                    DATA: data
                });                        
                result.success = true;
            } else {
                throw new Error(`structured data query not found`);
            }
        } catch (e : any) {
            result.setException(e);
        } 
        return result;
    }


    static findVisionFields(params : any, visionId: number, parentTypeId?: number) : any[] {
        let result : any[] = [];
        if (Utils.hasValue(params)) {
            if (Utils.typeOf(params) == 'array') {
                for(let i = 0; i < params.length; i++) {
                    if (parentTypeId == Sql_Object_Types.SELECT && params[i].IDVISION == visionId && params[i].sql_object_type_id == Sql_Object_Types.FIELD
                        && params[i].numeric_order < 900000 && params[i].sql_text != '*'
                    ) {
                        result.push(params[i]);
                    } else if (Utils.hasValue(params[i].subs)){
                        result = [...result,...this.findVisionFields(params[i].subs,visionId,params[i].sql_object_type_id)];
                    }
                } 
            } else {
                if (parentTypeId == Sql_Object_Types.SELECT && params.IDVISION == visionId && params.sql_object_type_id == Sql_Object_Types.FIELD
                    && params.numeric_order < 900000 && params.sql_text != '*'
                ) {
                    result.push(params);
                } else if (Utils.hasValue(params.subs)){
                    result = [...result,...this.findVisionFields(params.subs,visionId,params.sql_object_type_id)];
                }
            }
        }
        return result;
    }


    /**
     * Get data from customized (structured) positivity
     * @created 2025-02-11
     * @version 3.0.0
     */
    static async getCustomizedPositivityData(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            result.data = null;
            let columnsVisions = params.visions;
            params.visions = [...new Set([...params.visions,...params.positivityVisions])];
            let structuredQueryData = await StructuredQueryUtils.getStructuredQueryData(params);
            let columns : any[] = [];
            let columnsPivot : any[] = [];

            //normal columns
            for(let i = 0; i < columnsVisions.length; i++) {
                columns = [...columns,...this.findVisionFields(structuredQueryData.structuredQuery,columnsVisions[i])];
            }
            columns = [...new Set(columns.map(el=>el.sql_alias))];

            //pivoted columns
            for(let i = 0; i < params.positivityVisions.length; i++) {
                columnsPivot = [...columnsPivot,...this.findVisionFields(structuredQueryData.structuredQuery,params.positivityVisions[i])];
            }
            columnsPivot = [...new Set([...columnsPivot,{sql_alias:"periodos"}].map(el=>el.sql_alias))];
            let pivotColumn = columnsPivot.join('_');
            pivotColumn += '_xml';
            pivotColumn = `XMLSERIALIZE(CONTENT ${pivotColumn} as clob) as xml`
            columns.push(pivotColumn);

            
            if (structuredQueryData) {

                //mount unified query
                let query = await StructuredQueryUtils.mountQuery(structuredQueryData.structuredQuery,params);
                query = query.trim().replace(/\s{2,}/g," ");
                query = query.replace(/select\s+\*\s+from/i,`select ${columns.join(',')} from`);
                query = query.replace(/pivot\s*\(/i,"pivot xml(");
                query = query.replace(/for\s+periodos/i,`for (${columnsPivot.join(',')})`);
                let p1 = query.indexOf("for (")+4;
                p1 = query.indexOf(")",p1+1);
                p1 = query.indexOf("in (",p1+1)+4;
                let p2 = query.indexOf(")",p1+1);
                query = `${query.substring(0,p1)}${columnsPivot.map(el=>"any").join(",")}${query.substring(p2)}`;
                let connection = await DBConnectionManager.getConnectionBySchemaName(structuredQueryData.origin);
                if (!connection) {
                    throw new Error(`connection data not found with schema name:${structuredQueryData.origin}`);
                }
                
                let data = await connection.query(query,{
                    raw:true,
                    type:QueryTypes.SELECT
                });
                data = data || [];
                result.data = result.data || [];
                result.data.push({
                    DATA: data
                });                        
                result.success = true;
            } else {
                throw new Error(`structured data query not found`);
            }
        } catch (e : any) {
            result.setException(e);
        } 
        return result;
    }


    /**
     * @created 2024-04-02
     * @version 2.0.0
     */
    static async getCommissionsData(params?: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            result.data = null;
            let query = `
                SELECT
                    c.*
                FROM
                    ep."commissions" c
                where
                    nvl(c."active",1) = 1
                    and trunc(nvl(c."start_date",sysdate)) <= trunc(sysdate)
                    and trunc(nvl(c."end_date",sysdate)) >= trunc(sysdate)
            `;
            let commissionsData : any = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type:QueryTypes.SELECT});

            if (commissionsData && commissionsData.length > 0) {                                    
                let allConditions : any = [];
                let allConditionsVisions : any = [];
                for(let i = 0; i < commissionsData.length; i++) {
                    let condition = [];
                    condition.push(`cm."id" = ${commissionsData[i].id}`)
                    switch((commissionsData[i].entityname || 'rca').trim().toLowerCase()) {
                        case 'rca':
                            condition.push(`v.cod = ${commissionsData[i].entityid}`);
                            break;
                        default:
                            throw new Error(`not expected entity name: ${commissionsData[i].entityname}`)
                    }
                    condition.push(`(${commissionsData[i].conditionjoin})`);                    
                    allConditions.push(condition.join(' and '));
                    if (Utils.hasValue(commissionsData[i].conditionreportsvisionsids)) {
                        commissionsData[i].conditionreportsvisionsids = Utils.toArray(commissionsData[i].conditionreportsvisionsids);
                        allConditionsVisions = allConditionsVisions.concat(commissionsData[i].conditionreportsvisionsids);
                    }
                }
                allConditions = [...new Set(allConditions)];
                allConditionsVisions = [...new Set(allConditionsVisions)];

                let structuredQueryParams : any = {};
                structuredQueryParams.visions = [8,10]; //rca,depto
                structuredQueryParams.periods = params?.periods;
                structuredQueryParams.viewAmount = false;
                structuredQueryParams.viewWeight = false;
                structuredQueryParams.viewValue = true;
                structuredQueryParams.considerBonuses = false;
                structuredQueryParams.considerNormalSales = true;
                structuredQueryParams.considerReturns = true;
                structuredQueryParams.user = params?.user;
                if (Utils.typeOf(structuredQueryParams.periods) != "array") {
                    structuredQueryParams.periods = Utils.toArray(structuredQueryParams.periods,",");
                }
                structuredQueryParams.periods = structuredQueryParams.periods.map((el: any)=>Utils.hasValue(el)?el:'null');
                
                //wraper perios in array o 2 elements [[init,end],..]
                structuredQueryParams.periods = Utils.singleArrayTo2LevelArray(structuredQueryParams.periods);
                structuredQueryParams.conditionsVisionsIds = Utils.hasValue(allConditionsVisions) ? allConditionsVisions : undefined;
                let structuredQueryData = await StructuredQueryUtils.getStructuredQueryData(structuredQueryParams);  
                let reportQuery : any = await StructuredQueryUtils.mountQuery(structuredQueryData.structuredQuery,structuredQueryParams);
                reportQuery = reportQuery.replace(/\s{2,}/g,' ').trim();                
                reportQuery = reportQuery.split(' where ');
                reportQuery[0] += ` join ep."commissions" cm on (
                    lower(nvl(cm."entityname",'rca')) = 'rca'
                    and cm."entityid" = s.codvendedor
                    and (${allConditions.join(') or (')})
                ) `;
                reportQuery[1] += ` join ep."commissions" cm on (
                    lower(nvl(cm."entityname",'rca')) = 'rca'
                    and cm."entityid" = e.codvendedor
                    and (${allConditions.join(') or (')})
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
                result.data = await DBConnectionManager.getEpDBConnection()?.query(reportQuery,{raw:true,type:QueryTypes.SELECT});
                result.data = [{DATA:result.data}];
                result.success = true;
            } else {
                throw new Error('no commissions data found');
            }
        } catch (e) {
            result.setException(e);
        } 
        return result;
    }


    /**
     * get data according request parameters, parameterid is essential
     * @requesthandler
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async get_data(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let params = req.body || req.query || {};
            params.user = req.user;
            res.setDataSwap(await this.getData(params));
        } catch (e: any) {
            res.setException(e);
        }
        res.sendResponse();
    }


    /**
     * get customized report data according request parameters and configured registers of report data fount
     * @requesthandler
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async get_customized_report_data(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let params = req.body || req.query || {};
            params.user = req.user;
            res.setDataSwap(await this.getCustomizedReportData(params));
        } catch (e: any) {
            res.setException(e);
        }
        res.sendResponse();
    }

    
    /**
     * get customized positivity data according request parameters and configured registers of report data fount
     * @requesthandler
     * @created 2025-02-11
     * @version 1.0.0
     */
    static async get_customized_positivity_data(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let params = req.body || req.query || {};
            params.user = req.user;
            res.setDataSwap(await this.getCustomizedPositivityData(params));
        } catch (e: any) {
            res.setException(e);
        }
        res.sendResponse();
    }

    

    /**
     * get commision data
     * @requesthandler
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async get_commissions_data(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let params = req.body || req.query || {};
            params.user = req.user;
            res.setDataSwap(await this.getCommissionsData(params));
        } catch (e: any) {
            res.setException(e);
        }
        res.sendResponse();
    }


    static {
        this.configureDefaultRequestHandlers([
            this.get_data,
            this.get_customized_report_data,
            this.get_customized_positivity_data,
            this.get_commissions_data
        ]);
    }
}
