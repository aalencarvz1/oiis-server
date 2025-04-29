import { NextFunction, Request, Response } from "express";
import Data_Origins from "../../../../../database/models/Data_Origins.js";
import Identifier_Types from "../../../../../database/models/Identifier_Types.js";
import Items from "../../../../../database/models/Items.js";
import Ncms from "../../../../../database/models/Ncms.js";
import PcProdut from "../../../../../database/models/winthor/PcProdut.js";
import DataSwap from "../../../../data/DataSwap.js";
import Utils from "../../../../utils/Utils.js";
import PcNcmController from "./PcNcmController.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";
import DBConnectionManager from "../../../../../database/DBConnectionManager.js";
import { Op, QueryTypes, Sequelize } from "sequelize";
import PcEst from "../../../../../database/models/winthor/PcEst.js";
import PcFornec from "../../../../../database/models/winthor/PcFornec.js";
import PcDepto from "../../../../../database/models/winthor/PcDepto.js";
import { at } from "lodash";
import QueryBuilder from "../../../../database/QueryBuilder.js";
import PcProdFilial from "../../../../../database/models/winthor/PcProdFilial.js";
import PcEmbalagem from "../../../../../database/models/winthor/PcEmbalagem.js";
import PcFilial from "../../../../../database/models/winthor/PcFilial.js";
import Integration_Rules from "../../../../../database/models/Integration_Rules.js";

export default class PcProdutController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcProdut;
    }  

    static checkGtin(data: any, field: string) : void {
        if (Utils.hasValue(data[`GTINCODAUXILIAR${field}`])) {
            if (Utils.hasValue(data[`CODAUXILIAR${field}`])) {
                if (Utils.toNumber(data[`GTINCODAUXILIAR${field}`]) != data[`CODAUXILIAR${field}`]?.length) {
                    throw new Error(`wrong CODAUXILIAR${field} length (${Utils.toNumber(data[`GTINCODAUXILIAR${field}`])} <> ${data[`CODAUXILIAR${field}`]?.length})`);
                }
            } else {
                throw new Error(`missing CODAUXILIAR${field}`);
            }
        }
    }

    static async checkRules(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let rulesFails = [];
            let where : any = {
                data_origin_id: params.data_origin_id,
                table_id: params.table_id,
                check_at_back: 1
            };
            if (params.isInsert) where.check_on_insert = 1;
            if (params.isUpdate) where.check_on_update = 1;
            if (params.isDelete) where.check_on_delete = 1;

            let rules = await Integration_Rules.findAll({
                raw:true,
                where: where
            });

            if (Utils.hasValue(rules)) {
                params.GRAMATURA = params.GRAMATURA || "[0-9]*,*[0-9]*X*[0-9]*,*[0-9]+(KG|UN|GR|LT|ML)";
                for(let k in rules) {   
                    if (Utils.hasValue(rules[k].rule)) {
                        let check = true;
                        if (Utils.hasValue(rules[k].condition_to_check)) {                            
                            check = Utils.toBool(await Utils.evalText(rules[k].condition_to_check,params));
                        }
                        if (check) {
                            let result : any = Utils.toBool(await Utils.evalText(rules[k].rule,params));
                            console.log('checking rule ', rules[k].rule, params,result);
                            if (result !== true) {
                                rulesFails.push({
                                    rule: {...rules[k],rule: await Utils.evalReplaceVarsText(rules[k].rule,params)},
                                    result: result                                
                                });
                            }
                        }
                    }
                }
            }
            if (Utils.hasValue(rulesFails)) {
                result.message = 'rules check failed';
                result.data = rulesFails;
                result.success = false;
            } else {
                result.success = true;
            }
        } catch (e) {
            result.setException(e);
        }
        return result;
    }


    /**
     * put (create) a record of table model of this controller (PCPRODUT) and correlated records (PCPRODFILIAL, PCEST, PCEMBALAGEM)
     * this method use transaction to commit statements if no has errors, otherrise, rollback 
     * @override
     * @created 2025-03-26
     * @version 1.0.0
     */
    static async _put(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let queryParams = params.queryParams || params;            

            //check commom fields
            this.checkGtin(queryParams,'');
            this.checkGtin(queryParams,'2');
            this.checkGtin(queryParams,'TRIB');
            queryParams.CODPRODPRINC = queryParams.CODPRODPRINC || queryParams.CODPROD;
            queryParams.CODPRODMASTER = queryParams.CODPRODMASTER || queryParams.CODPROD;
            queryParams.TIPOMERC = queryParams.TIPOMERC || 'L';
            queryParams.OBS2 = queryParams.OBS2 || '  ';
            queryParams.DTCADASTRO = queryParams.DTCADASTRO || new Date();
            queryParams.NBM = queryParams.NBM || queryParams.CODNCMEX?.replaceAll(/[^0-9]/).substring(0,8);            
            queryParams.CODFUNCCADASTRO = queryParams.CODFUNCCADASTRO || 142;
            queryParams.REVENDA = queryParams.REVENDA || 'S';
            queryParams.MODULO = queryParams.MODULO || 1;
            queryParams.RUA = queryParams.RUA || 1;
            queryParams.APTO = queryParams.APTO || 1;
            queryParams.ENVIAECOMMERCE = queryParams.ENVIAECOMMERCE || 'S';
            queryParams.ACEITAVENDAFRACAO = queryParams.ACEITAVENDAFRACAO || 'N';
            queryParams.APROVEITACREDICMS = queryParams.APROVEITACREDICMS || 'S';            
            queryParams.APROVEITACREDPISCOFINS = queryParams.APROVEITACREDPISCOFINS || 'S';
            queryParams.APROVEITACREDICMSCONT = queryParams.APROVEITACREDICMSCONT || 'S';
            queryParams.CHECARMULTIPLOVENDABNF = queryParams.CHECARMULTIPLOVENDABNF || 'S';
            queryParams.CHECARMULTIPLOVENDABNF = queryParams.CHECARMULTIPLOVENDABNF || 'S';
            queryParams.CONSIISUSPENSOBASEICMS = queryParams.CONSIISUSPENSOBASEICMS || 'S';
            queryParams.CONSIPISUSPENSOBASEICMS = queryParams.CONSIPISUSPENSOBASEICMS || 'S';
            queryParams.EXIBESEMESTOQUEECOMMERCE = queryParams.EXIBESEMESTOQUEECOMMERCE || 'N';
            queryParams.ESTOQUEPORDTVALIDADE = null;


            //check rules (Integration_Rules)
            let resultRules = await this.checkRules({
                isInsert: 1,
                data_origin_id: Data_Origins.WINTHOR, 
                table_id: PcProdut.id,
                data: queryParams
            });


            if (!resultRules?.success) {
                result.setDataSwap(resultRules);
                throw new Error(`rules check failed`);
            }

            await DBConnectionManager.getWinthorDBConnection()?.transaction(async transaction=>{

                result.data = await this.getTableClassModel().createData({queryParams,transaction});
                //result.data = await PcProdut.create(queryParams,{isNewRecord: true, transaction});

                if (Utils.hasValue(result.data)) {


                    //create items x filial (PCPRODFILIAL)
                    let query = `
                        INSERT INTO PCPRODFILIAL    
                            (CODPROD,                  
                            CODFILIAL,                
                            CODCOMPRADOR,             
                            PROIBIDAVENDA,            
                            FORALINHA,                
                            REVENDA,                  
                            ESTOQUEIDEAL,             
                            MULTIPLO,                 
                            CHECARMULTIPLOVENDABNF,   
                            ACEITAVENDAFRACAO,        
                            QTMINAUTOSERV,            
                            QTMINIMAATACADO,          
                            QTMINIMAATACADOF,         
                            ATIVO,                    
                            PISCOFINSRETIDO,          
                            PERPIS,                   
                            PERCOFINS,                
                            CLASSE,                   
                            CLASSEVENDA,              
                            CLASSEESTOQUE,            
                            CODDISPESTRUTURA,         
                            PCOMREP1,                 
                            PCOMINT1,                 
                            PCOMEXT1,                 
                            ESTOQUEPORSERIE,
                            ENVIAPRODUTOECOMMERCE,
                            UTILIZAQTDESUPMULTIPLA,
                            TIPOARREDUNIDMASTER,
                            REGIMEESPECIAL,
                            ICMSDIFERIDO,
                            SUJDESONERACAO,
                            PERMITECREDITOPRESUMIDO
                        )          
                        SELECT PCPRODUT.CODPROD,   
                            PCFILIAL.CODIGO,    
                            NULL,               
                            DECODE(PCPRODUT.OBS, 'PV', 'S', 'N') PROIBIDAVENDA,           
                            DECODE(PCPRODUT.OBS2, 'FL', 'S', 'N') FORADELINHA,            
                            PCPRODUT.REVENDA,                                                   
                            0,                                                                  
                            PCPRODUT.MULTIPLO,                                                  
                            NVL(PCPRODUT.CHECARMULTIPLOVENDABNF, 'N') CHECARMULTIPLOVENDABNF, 
                            NVL(PCPRODUT.ACEITAVENDAFRACAO, 'N') ACEITAVENDAFRACAO,           
                            0,                                                                  
                            0,                                                                  
                            0,                                                                  
                            'S',                                                              
                            NVL(PCPRODUT.PISCOFINSRETIDO, 'N') PISCOFINSRETIDO,               
                            NULL,                                                               
                            NULL,                                                               
                            PCPRODUT.CLASSE,                                                    
                            PCPRODUT.CLASSEVENDA,                                               
                            PCPRODUT.CLASSEESTOQUE,                                             
                            0,                                                                  
                            PCPRODUT.PCOMREP1,                                                  
                            PCPRODUT.PCOMINT1,                                                  
                            PCPRODUT.PCOMEXT1,                                                  
                            'N',
                            PCPRODUT.ENVIAECOMMERCE,
                            'N',
                            'N',
                            'N',
                            'N',
                            'N',
                            'N'
                        FROM PCPRODUT, PCFILIAL                                                  
                        WHERE PCFILIAL.CODIGO <> '99'                                           
                            AND PCFILIAL.CODIGO IS NOT NULL                                         
                            and PCFILIAL.DTEXCLUSAO is null
                            and PCFILIAL.DTFIMATIVIDADE IS NULL
                            and PCFILIAL.CODIGO NOT IN ('99')
                            AND PCPRODUT.CODPROD IS NOT NULL                                        
                            AND NOT EXISTS(
                                SELECT PCPRODFILIAL.CODPROD                                              
                                FROM PCPRODFILIAL                                                
                                WHERE PCPRODFILIAL.CODPROD = PCPRODUT.CODPROD                     
                                    AND PCPRODFILIAL.CODFILIAL = PCFILIAL.CODIGO
                            )
                            AND PCPRODUT.CODPROD = '${queryParams.CODPROD}'
                    `;
                    await DBConnectionManager.getWinthorDBConnection()?.query(query, {type: QueryTypes.INSERT, transaction})


                    //get items x filial records (PCPRODFILIAL)
                    let prodsFilial = await PcProdFilial.findAll({
                        raw:true,
                        include:[{
                            model: PcFilial,
                            attributes:[],
                            where:{
                                DTEXCLUSAO: {
                                    [Op.is]: null
                                },
                                DTFIMATIVIDADE: {
                                    [Op.is]: null
                                },
                                CODIGO:{
                                    [Op.ne]: '99'
                                }
                            }
                        }],
                        where:[
                            {
                                CODPROD: queryParams.CODPROD

                            },
                            Sequelize.literal(`not exists(select 1 from jumbo.pcest e where e.codfilial = ${PcProdFilial.tableName}.CODFILIAL and e.codprod = ${queryParams.CODPROD})`)
                        ],
                        transaction                    
                    });
                    

                    //create stock records (PCEST)
                    for(let k in prodsFilial) {
                        await PcEst.create({
                            CODPROD: queryParams.CODPROD,
                            CODFILIAL: prodsFilial[k].CODFILIAL,
                            MODULO: queryParams.MODULO,
                            RUA: queryParams.RUA,
                            APTO: queryParams.APTO,
                            MODULOCX: queryParams.MODULOCX || queryParams.MODULO,
                            RUACX: queryParams.RUACX || queryParams.RUA,
                            APTOCX: queryParams.APTOCX || queryParams.APTO,
                            TEMESTOQUEECOMMERCE: queryParams.ENVIAECOMMERCE
                        },{transaction});
                    }
                    
                    
                    //get filiais
                    let filiais = await PcFilial.findAll({
                        raw:true,
                        where:{
                            DTEXCLUSAO: {
                                [Op.is]:null
                            },
                            DTFIMATIVIDADE: {
                                [Op.is]:null
                            },
                            CODIGO:{
                                [Op.ne]: '99'
                            }
                        },
                        transaction
                    });
                    if (Utils.hasValue(filiais)) {


                        //create packages registers (PCEMBALAGEM)
                        for(let k in filiais) {
                            if(Utils.hasValue(queryParams.CODAUXILIAR) && Utils.hasValue(queryParams.EMBALAGEM) && Utils.hasValue(queryParams.UNIDADE) && Utils.hasValue(queryParams.QTUNIT)) {
                                let resultTemp = await PcEmbalagem.saveOrCreate({
                                    where:{
                                        CODAUXILIAR: queryParams.CODAUXILIAR,
                                        CODFILIAL: filiais[k].CODIGO,
                                        CODPROD: queryParams.CODPROD
                                    },values:{
                                        EMBALAGEM: queryParams.EMBALAGEM,
                                        UNIDADE: queryParams.UNIDADE,
                                        QTUNIT: queryParams.QTUNIT,
                                        ENVIAFV: queryParams.ENVIAFV,
                                        ENVIAECOMMERCE: queryParams.ENVIAECOMMERCE,
                                        ATIVOECOMMERCE: queryParams.ENVIAECOMMERCE
                                    },
                                    transaction
                                });
                                if (!resultTemp?.success) resultTemp.throw();
                            }
                            if(Utils.hasValue(queryParams.CODAUXILIAR2) && Utils.hasValue(queryParams.EMBALAGEMMASTER) && Utils.hasValue(queryParams.UNIDADE) && Utils.hasValue(queryParams.QTUNITCX)) {
                                let resultTemp = await PcEmbalagem.saveOrCreate({
                                    where:{
                                        CODAUXILIAR: queryParams.CODAUXILIAR2,
                                        CODFILIAL: filiais[k].CODIGO,
                                        CODPROD: queryParams.CODPROD
                                    },values:{
                                        EMBALAGEM: queryParams.EMBALAGEMMASTER,
                                        UNIDADE: queryParams.UNIDADE,
                                        QTUNIT: queryParams.QTUNITCX,
                                        ENVIAFV: queryParams.ENVIAFV,
                                        ENVIAECOMMERCE: queryParams.ENVIAECOMMERCE,
                                        ATIVOECOMMERCE: queryParams.ENVIAECOMMERCE
                                    },
                                    transaction
                                });
                                if (!resultTemp?.success) resultTemp.throw();
                            }
                        }
                    }
                    
                } else {
                    throw new Error(`error on create product`);
                }
                result.success = true;
                return true;
            });
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }

    /**
     * Integration request methods handlers, by default, not can change origin information, only get     
     * @requesthandler
     * @override
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async put(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let params = req.body;
            params.user = req.user;
            res.setDataSwap(await this._put(params));
        } catch (e: any) {
            res.setException(e);
        }
        res.sendResponse();
    }

    static async integrate(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let queryParams = params.queryParams || params || {};
            let winthorData : any = await PcProdut.findOne({
                raw:true,
                where:{
                    CODPROD: queryParams.id_at_origin || queryParams.item_id || queryParams.id || queryParams.CODPROD
                }
            });
            if (winthorData) {
                queryParams.data_origin_id = Data_Origins.WINTHOR;
                queryParams.id_at_origin = queryParams.id_at_origin || winthorData.CODPROD;
                queryParams.identifier_type_id = queryParams.identifier_type_id || Identifier_Types.CODE;
                queryParams.identifier = queryParams.identifier || winthorData.CODPROD;        
                if (!Utils.hasValue(queryParams.ncm_id)) {
                    let ncm = await Ncms.getOrCreate({
                        raw:true,
                        where:{                            
                            ncm: winthorData.NBM,
                            exception: Utils.hasValue(winthorData.CODNCMEX.split('.')[1]) ? winthorData.CODNCMEX.split('.')[1] : null
                        },                        
                        transaction:params.transaction,
                        createMethod: PcNcmController.integrate
                    });
                    queryParams.ncm_id = ncm.id;
                }
                queryParams.name = queryParams.name || winthorData.DESCRICAO;
                queryParams.description = queryParams.description;
                queryParams.default_expiration_time = queryParams.default_expiration_time || winthorData.PRAZOVAL;
                result.data = await Items.create(queryParams,{transaction:params.transaction});
                if (result.data) {
                    result.data = result.data.dataValues;
                    result.success = true;
                }
            } else {
                throw new Error(`winthor item ${queryParams.id_at_origin || queryParams.item_id || queryParams.id || queryParams.CODPROD} not found`)
            }
        } catch (e) {
            result.setException(e);
        }
        return result;
    }

    
    /**
     * get product data according request parameters
     * @version 1.2.0
     * @created 2025-03-25
     */
    static async get_product_data(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || {};
            let search = req.body.search;
            let searchStock = req.body.searchStock;
            let filters = req.body.filters;
            let groupFiliais = Utils.toBool(Utils.firstValid([req.body.groupFiliais, true]));

            queryParams.raw = Utils.firstValid([queryParams.raw, true]);

            //especified fiels on queryParams or default
            queryParams.attributes = queryParams.attributes || [
                'CODPROD',
                'CODFAB',
                'DESCRICAO',                
                'CODEPTO',
                'CODFORNEC',
                'EMBALAGEM',
                'UNIDADE',
                'QTUNITCX',
                'PESOLIQ',
                'PESOBRUTO',                
                'TEMREPOS',
                'QTUNIT',
                'DTCADASTRO',
                'DTEXCLUSAO',
                'DTULTALTER',
                'PRAZOVAL',
                'REVENDA',                
                'IMPORTADO',
                'CODAUXILIAR'
            ];
            queryParams.where = queryParams.where || {};
            queryParams.where[Op.and] = queryParams.where[Op.and] || [];

            if (Utils.toBool(req.body.includeJoins)) {
                queryParams.include = [{
                    model: PcEst,
                    attributes:groupFiliais 
                        ? [
                            [Sequelize.fn('SUM',Sequelize.col('QTEST')),'QTEST'],
                            [Sequelize.fn('MAX',Sequelize.col('DTULTENT')),'DTULTENT'],
                            [Sequelize.fn('MAX',Sequelize.col('DTULTSAIDA')),'DTULTSAIDA']
                        ]
                        : [
                            'CODFILIAL',
                            'QTEST',
                            'DTULTENT',
                            'DTULTSAIDA',
                        ]
                },{
                    model: PcFornec,
                    attributes:[
                        'FORNECEDOR',
                        'CGC'
                    ]
                },{
                    model: PcDepto,
                    attributes:[
                        'DESCRICAO'
                    ]
                }]
                        
            }


            //handle search term
            if (Utils.hasValue(search?.term?.value)) {                

                //allow multiple terms with comma(,) separator
                console.log('xxxxxxxxx',search);
                search.term.value = search.term.value.trim().toUpperCase().split(',');

                let orTerm = [];

                //especied fields on searchTem
                if (Utils.hasValue(search.term.fields)) {
                    console.log('xxxxxxxxx1',search.term.fields);
                    //search.term.fields = Utils.toArray(search.term.fields);
                    for(let j in search.term.fields) {
                        for(let k in search.term.value) {
                            orTerm.push(
                                Sequelize.where(
                                    Sequelize.fn('UPPER',Sequelize.col(`${PcProdut.tableName}.${search.term.fields[j]}`)),
                                    Op.like,
                                    `%${search.term.value[k]}%`
                                )
                            )
                        }
                    }
                } else {
                    console.log('xxxxxxxxx2',search.term.fields);
                    //not especied fields
                    for(let k in search.term.value) {
                        orTerm.push(
                            Sequelize.where(
                                Sequelize.col(`${PcProdut.tableName}.CODPROD`),
                                Op.like,
                                `%${search.term.value[k]}%`
                            )
                        )
                        orTerm.push(
                            Sequelize.where(
                                Sequelize.fn('UPPER',Sequelize.col(`${PcProdut.tableName}.DESCRICAO`)),
                                Op.like,
                                `%${search.term.value[k]}%`
                            )
                        )
                    }
                }
                queryParams.where[Op.and].push({
                    [Op.or]:orTerm
                });
            } //end handle search term


            //department filter
            if (Utils.hasValue(search.departments)) {
                queryParams.where[Op.and].push({
                    CODEPTO: {
                        [Op.in]:search.departments.map((el: any)=>el.id || el)
                    }
                });
            }

            //supplier filter
            if (Utils.hasValue(search.suppliers)) {
                queryParams.where[Op.and].push({
                    CODFORNEC: {
                        [Op.in]:search.suppliers.map((el: any)=>el.id || el)
                    }
                });
            }

            //active | inactive filter
            if (Utils.hasValue(search.actives) && Utils.toBool(search.actives)
                && !(Utils.hasValue(search.inactives) && Utils.toBool(search.inactives))) {
                queryParams.where[Op.and].push({
                    DTEXCLUSAO: {
                        [Op.is]:null
                    }
                },{
                    OBS2: {
                        [Op.ne]: 'FL'
                    }                    
                })
            } else if (Utils.hasValue(search.inactives) && Utils.toBool(search.inactives)
                && !(Utils.hasValue(search.actives) && Utils.toBool(search.actives))
            ) {
                queryParams.where[Op.and].push({
                    [Op.or]:[{
                        DTEXCLUSAO: {
                            [Op.not]:null
                        }
                    },{
                        OBS2: 'FL'
                    }]
                })
            }

            //date filter
            if (Utils.hasValue(search.date?.values)) {
                if (search.date.comparator == 'between') {
                    if (["DTULTENT","DTULTSAIDA"].indexOf(search.date.field.toUpperCase().trim()) > -1) {
                        queryParams.where[Op.and].push(Sequelize.where(
                            Sequelize.col(`${PcEst.tableName}.${search.date.field}`),
                            Op.between,
                            search.date.values.map((el: any)=>Sequelize.literal(`TO_DATE('${el}','yyyy-mm-dd')`))
                        ));
                    } else {
                        queryParams.where[Op.and].push({
                            [search.date.field]: {
                                [Op.between]:search.date.values
                            }
                        })
                    }
                } else {
                    if (["DTULTENT","DTULTSAIDA"].indexOf(search.date.field.toUpperCase().trim()) > -1) {
                        queryParams.where[Op.and].push(Sequelize.where(
                            Sequelize.col(`${PcEst.tableName}.${search.date.field}`),
                            QueryBuilder.getSequelizeOperator(search.date.comparator),
                            Sequelize.literal(`TO_DATE('${search.date.values[0]}','yyyy-mm-dd')`)
                        ));
                    } else {
                        queryParams.where[Op.and].push({
                            [search.date.field]: {
                                [QueryBuilder.getSequelizeOperator(search.date.comparator)]:search.date.values[0]
                            }
                        })
                    }
                }
            }


            //stock filter
            if (Utils.hasValue(search.stock?.values)) {
                if (search.stock.comparator == 'between') {
                    queryParams.where[Op.and].push(Sequelize.where(
                        Sequelize.col(`${PcEst.tableName}.${search.stock.field}`),
                        Op.between,
                        search.stock.values.map((el: any)=>Utils.toNumber(el))
                    ));
                } else {
                    queryParams.where[Op.and].push(Sequelize.where(
                        Sequelize.col(`${PcEst.tableName}.${search.stock.field}`),
                        QueryBuilder.getSequelizeOperator(search.stock.comparator),
                        Utils.toNumber(search.stock.values[0])
                    ));
                }
            }


            //adjust group by clause, if necessary
            if (groupFiliais) {
                queryParams.group = queryParams.attributes.map((el: any)=>Sequelize.col(`${PcProdut.tableName}.${el}`));
                if (Utils.toBool(req.body.includeJoins)) {
                    queryParams.group = [...queryParams.group, ...queryParams.include[1].attributes.map((el: any)=>Sequelize.col(`${PcFornec.tableName}.${el}`))];
                    queryParams.group = [...queryParams.group, ...queryParams.include[2].attributes.map((el: any)=>Sequelize.col(`${PcDepto.tableName}.${el}`))];
                }
            }

            res.data = await PcProdut.findAll(queryParams);
            res.success = true;
        } catch (e: any) {
            res.setException(e);            
        }
        res.sendResponse();
    }

    
    
    static {
        this.configureDefaultRequestHandlers([this.get_product_data]);
    }
}