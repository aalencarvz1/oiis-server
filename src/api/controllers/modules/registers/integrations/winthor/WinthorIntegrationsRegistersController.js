const path = require("path");
const { Sequelize, QueryTypes } = require("sequelize");
const { Utils } = require("../../../../utils/Utils");
const { PcFilial } = require("../../../../../database/models/winthor/PcFilial");
const { DatabaseUtils } = require("../../../../database/DatabaseUtils");
const { PcClient } = require("../../../../../database/models/winthor/PcClient");
const { Identifier_Types } = require("../../../../../database/models/Identifier_Types");
const { Data_Origins } = require("../../../../../database/models/Data_Origins");
const { RegistersController } = require("../../RegistersController");
const DBConnectionManager = require("../../../../../database/DBConnectionManager");


/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-25-08
 */
class WinthorIntegrationsRegistersController extends RegistersController {

    /**
     * @override
     * @returns 
     * @created 2024-07-17
     * @version 1.0.0
     * @todo override this in inherited registers controllers if directory returned is another
     */
    static getDatabaseModelsPath(){        
        return `${super.getDatabaseModelsPath()}${path.sep}winthor`;
    }

    /**
     * @override
     * @returns 
     * @created 2024-07-17
     * @version 1.0.0
     * @todo override this in inherited registers controllers if directory returned is another
     */
    static getDirName(){
        return __dirname;
    }

    /*************************************************
     * INIT PEOPLE INTEGRATIONS
     *************************************************/    
    static async getPeopleByIdentifiersDocs(identifiersDocs, options) {
        let result = null;
        try {
            if (identifiersDocs) {
                if (Utils.typeOf(identifiersDocs) != 'array') identifiersDocs = identifiersDocs.toString().split(',');
                let whereIdentifiersDocs = identifiersDocs.map(el=>{
                    let r = {};
                    let and = [];
                    if (typeof el == 'object') {
                        if (el.TIPOFJ) {
                            and.push({
                                TIPOFJ : el.TIPOFJ
                            });
                        }
                        if (el.CGCENT) {
                            and.push(Sequelize.where(
                                Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),
                                '=',
                                Sequelize.cast(Sequelize.fn('regexp_replace',el.CGCENT,'[^0-9]',''),'DECIMAL(32)')
                            ));
                        }
                    } else {
                        and.push(Sequelize.where(
                            Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),
                            '=',
                            Sequelize.cast(Sequelize.fn('regexp_replace',el,'[^0-9]',''),'DECIMAL(32)')
                        ));
                    }
                    r[Sequelize.Op.and] = and;
                    return r;
                });

                let findParams = {
                    raw:true,
                    where:{
                        [Sequelize.Op.or]:whereIdentifiersDocs
                    }
                };
                if (options && options?.attributes) {
                    findParams.attributes = options.attributes;
                } else {
                    findParams.attributes = Object.keys(PcClient.fields).map(el=>Sequelize.col(`${PcClient.tableName}.${el}`));
                }
                result = await PcClient.getModel().findAll(findParams);
            }
        } catch (e) {
            Utils.log(e);
        }
        return result;
    }

    static async getPeopleByIdentifierDocToIntegrate(identifiersDocs) {
        let result = null;
        try {
            result = await this.getPeopleByIdentifiersDocs(
                identifiersDocs,{
                    attributes:[
                        [Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),'id'], //for people, use document as id to avoid duplicate registers
                        [Sequelize.literal(`${Data_Origins.WINTHOR}`),'data_origin_id'],
                        ['CODCLI','id_at_origin'],
                        [Sequelize.literal(`case when PCCLIENT.TIPOFJ = 'F' then ${Identifier_Types.CPF} else ${Identifier_Types.CNPJ} end`),'identifier_doc_type_id'],
                        [Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),'identifier_doc'],
                        ['CLIENTE','name'],
                        ['FANTASIA','fantasy'],
                        [Sequelize.fn('coalesce','CODFILIALNF','1'),'CODFILIALNF']
                    ]
                }
            )
        } catch (e) {
            Utils.log(e);
        }
        return result;
    }     
    /*************************************************
     * END PEOPLE INTEGRATIONS
     *************************************************/    



    /*************************************************
     * INIT CLIENTS INTEGRATIONS
     *************************************************/        
    static async getClientsByIdentifierDocToIntegrate(identifiersDocs) {
        let result = null;
        try {
            result = await this.getPeopleByIdentifiersDocs(
                identifiersDocs,{
                    attributes:[
                        [Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),'id'], //for people, use document as id to avoid duplicate registers
                        [Sequelize.literal(`${Data_Origins.WINTHOR}`),'data_origin_id'],
                        ['CODCLI','id_at_origin'],
                        [Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),'people_id'] //for people, use document as id to avoid duplicate registers
                    ]
                }
            )
        } catch (e) {
            Utils.log(e);
        }
        return result;
    }    
    /*************************************************
     * END CLIENTS INTEGRATIONS
     *************************************************/     
    
    

    /**
     * change winthor client to use margin by order 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-10-16
     * @version 1.0.0
     */
    static async changeClientToMarginByOrder(req,res,next) {
        try {
            let codcli = req.body.codcli;
            if (Utils.hasValue(codcli)) {
                codcli = Utils.toArray(codcli);

                //use transaction over all process
                await DBConnectionManager.getWinthorDBConnection().transaction(async (transaction)=>{

                    //select all clientes requesteds
                    let query = `
                        select
                            c.codcli,
                            c.codplpag,
                            p.descricao,
                            coalesce(c.codfilialnf,case when c.codusur1 between 200 and 299 then '2' else '1' end) as codfilialnf,
                            p.numdias,                            
                            coalesce(
                                p2.codplpag,
                                (
                                    select min(p3.codplpag)
                                    from jumbo.pcplpag p3
                                    where p3.descricao like '%MARGEM%'
                                )
                            ) as "new_codplpag"                             
                        from
                            jumbo.pcclient c
                            join jumbo.pcplpag p on p.codplpag = c.codplpag
                            left outer join jumbo.pcplpag p2 on p2.numdias = p.numdias and p2.descricao like '%MARGEM%'
                        where
                            c.codcli in (${codcli.join(',')})
                    `;

                    let clients = await DBConnectionManager.getWinthorDBConnection().query(query,{type:QueryTypes.SELECT, transaction:transaction});
                    console.log(clients);

                    //iterate each client
                    for(let row in clients) {

                        //update client record
                        query = `
                            update 
                                jumbo.pcclient 
                            set 
                                codplpag = ${clients[row].new_codplpag},
                                usadebcredrca = 'N',
                                plpagneg='S'
                            where
                                codcli = ${clients[row].CODCLI}
                        `;
                        await DBConnectionManager.getWinthorDBConnection().query(query,{type:QueryTypes.UPDATE, transaction:transaction});

                        //get plans wich client has acess
                        query = `
                            select 
                                *
                            from
                                jumbo.pcplpag p
                            where 
                                p.numdias <= ${clients[row].NUMDIAS}
                                and p.descricao like '%MARGEM%'
                            order by
                                p.numdias
                        `;
                        let plans = await DBConnectionManager.getWinthorDBConnection().query(query,{type:QueryTypes.SELECT, transaction:transaction});

                        //delete previous records from pcplpagcli (routine 308 winthor)
                        query = `
                            delete 
                            from
                                jumbo.pcplpagcli
                            where
                                codcli=${clients[row].CODCLI}
                        `;
                        await DBConnectionManager.getWinthorDBConnection().query(query,{type:QueryTypes.DELETE, transaction:transaction});

                        //iterate each plan client has access
                        for(let rowPlan in plans) {

                            //insert restriction in plan if not exists
                            query = `
                                select 
                                    1
                                from
                                    jumbo.pcplpagrestricao pr
                                where 
                                    pr.tiporestricao = 'CL'
                                    and pr.codplpag = ${plans[rowPlan].CODPLPAG}
                                    and pr.codrestricao = ${clients[row].CODCLI}
                            `;
                            let restriction = await DBConnectionManager.getWinthorDBConnection().query(query,{type:QueryTypes.SELECT, transaction:transaction});
                            if (!Utils.hasValue(restriction)) {
                                query = `
                                    insert into jumbo.pcplpagrestricao (
                                        codplpag,
                                        tiporestricao,
                                        codrestricao
                                    ) values (
                                        ${plans[rowPlan].CODPLPAG},
                                        'CL',
                                        ${clients[row].CODCLI}
                                    )
                                `;
                                await DBConnectionManager.getWinthorDBConnection().query(query,{type:QueryTypes.INSERT, transaction:transaction});
                            }

                            //insert specific plan wich client has acess (routine 308 winthor)
                            query = `
                                insert into jumbo.pcplpagcli (
                                    codplpag,
                                    codcli
                                ) values (
                                    ${plans[rowPlan].CODPLPAG},
                                    ${clients[row].CODCLI}
                                )
                            `;
                            await DBConnectionManager.getWinthorDBConnection().query(query,{type:QueryTypes.INSERT, transaction:transaction});
                        }


                        //delete previous records from pctabprcli
                        query = `
                            delete 
                            from
                                jumbo.pctabprcli
                            where
                                codcli=${clients[row].CODCLI}
                        `;
                        await DBConnectionManager.getWinthorDBConnection().query(query,{type:QueryTypes.DELETE, transaction:transaction});

                        //re-insert client price table
                        query = `
                            insert into jumbo.pctabprcli (
                                codcli,
                                codfilialnf,
                                numregiao,
                                dtultalter,
                                codfuncultalter
                            ) values (
                                ${clients[row].CODCLI},
                                ${clients[row].CODFILIALNF},
                                ${clients[row].CODFILIALNF == 2 ? 110 : 101},
                                sysdate,
                                142
                            )
                        `;
                        await DBConnectionManager.getWinthorDBConnection().query(query,{type:QueryTypes.INSERT, transaction:transaction});                        
                    }                    

                    res.success = true;
                    return res.success;
                });
            } else {
                throw new Error("missing data");
            }            
        } catch (e) {
            res.setException(e);            
        }
        res.sendResponse();
    }
    

    static async processPostAsWinthorRegister(req,res,next,route,arrRoute,level) {
        try {
            level++;
            Utils.log(route,level,arrRoute[level]);
                        
            
            
            let tableClassModel = null;
            let resolvedPath = require.resolve(`../../../../../database/models/winthor/${arrRoute[level]}`).toLowerCase();
            let ind = Object.keys(require.cache).join(',').toLowerCase().split(',').indexOf(resolvedPath);
            //Utils.log('loading module dinamic',resolvedPath,ind);
            if (ind > -1) {
                let keyCache = Object.keys(require.cache)[ind];
                let realKey = Utils.getKey(require.cache[keyCache].exports,arrRoute[level]);
                if (Utils.hasValue(realKey)) {
                    tableClassModel = require.cache[keyCache].exports[realKey];
                } else {
                    tableClassModel = require.cache[keyCache].exports;
                }
            } else {
                let tempp = require(resolvedPath);
                let realKey = Utils.getKey(tempp,arrRoute[level]);
                if (Utils.hasValue(realKey)) {
                    tableClassModel = tempp[realKey];
                } else {
                    tableClassModel = tempp;
                }
            }

            //Utils.log('dinamic loaded required tablemodel',tableClassModel);
            let params = req.body;
            let queryParams = params.queryParams || params || {};
            if (arrRoute[level+1].trim().toLowerCase() == 'get') {
                Utils.log('x',queryParams);
                if (!queryParams.where && Object.keys(queryParams).length && !queryParams.query) {
                    Utils.log('x2');
                    queryParams = {
                        where:queryParams
                    }
                }
            }
            Utils.log('queryParams',queryParams);        
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            switch(tableClassModel.name.trim().toLowerCase()) {
                case PcFilial.name.trim().toLocaleLowerCase():
                    //Utils.log(route,level+1,arrRoute[level+1]);
                    switch(arrRoute[level+1].trim().toLowerCase()) {
                        case 'get':                                                        
                            queryParams.where.CODIGO = {
                                [Sequelize.Op.notIn]:[99]
                            };                            
                            break;
                    }
                    break;
                case PcClient.name.trim().toLocaleLowerCase():
                    //Utils.log(route,level+1,arrRoute[level+1]);
                    switch(arrRoute[level+1].trim().toLowerCase()) {
                        case 'get':                            
                            queryParams.attributes = queryParams.attributes || [];
                            if (!queryParams.attributes.length) queryParams.attributes.push(Sequelize.literal(`${PcClient.tableName}.*`));                            
                            break;
                    }
                    break;
            }

            level++;
            //Utils.log(route,level,arrRoute[level]);
            switch(arrRoute[level].trim().toLowerCase()) {
                case 'get':
                    queryParams.raw = true;                    
                    res.data = await tableClassModel.getModel().getData(queryParams);
                    res.sendResponse(200,true,null,res.data);
                    break;                    
                default:
                    if (typeof tableClassModel[arrRoute[level]] === 'function') {
                        res.data = await tableClassModel[arrRoute[level]](queryParams);
                        res.sendResponse(200,true,null,res.data);
                    } else {
                        throw new Error(`resource level not expected: ${arrRoute[level]} of ${route}`);
                    }
            }            
        } catch (e) {
            Utils.log(e);
            res.sendResponse(417,false,e.message || e,null,e);
        }
    }


    static async processPostAsWinthorPcClientToPeopleRegister(req,res,next,route,arrRoute,level) {
        level++;
        //Utils.log(route,level,arrRoute[level]);
        switch(arrRoute[level].trim().toLowerCase()) {
            case 'integrate':
                res.setDataSwap(await this.integratePeople(req.body));
                res.sendResponse();
                break;
            default:
                throw new Error(`resource level not expected: ${arrRoute[level]} of ${route}`);
                break;
        }         
    }
    
    static async processPostAsWinthorPcClientRegister(req,res,next,route,arrRoute,level) {
        level++;
        //Utils.log(route,level,arrRoute[level]);
        switch(arrRoute[level].trim().toLowerCase()) {
            case 'people':
                await this.processPostAsWinthorPcClientToPeopleRegister(req,res,next,route,arrRoute,level);
                break;
            default:
                level--;
                level--;
                await this.processPostAsWinthorRegister(req,res,next,route,arrRoute,level);
                //throw new Error(`resource level not expected: ${arrRoute[level]} of ${route}`);
                break;
        }         
    }

    /**
     * * Process route as array of levels. ex: /modules/inputs/purchases/forecast/get as ['modules','inputs','purchases','forecast','get']
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @param {*} arrRoute 
     * @param {*} level 
     * @created 2023-08-25
     * @deprecated 2024-07-12 use processRequest instead
     */
    static async processPostAsRoute(req,res,next,route,arrRoute,level) {
        level++;
        //Utils.log(route,level,arrRoute[level]);
        switch(arrRoute[level].trim().toLowerCase()) {
            case 'pcclient':
                await this.processPostAsWinthorPcClientRegister(req,res,next,route,arrRoute,level);
                break;
            default:
                level--;
                await this.processPostAsWinthorRegister(req,res,next,route,arrRoute,level);
                break;
        }         
    }

}

module.exports = {WinthorIntegrationsRegistersController}