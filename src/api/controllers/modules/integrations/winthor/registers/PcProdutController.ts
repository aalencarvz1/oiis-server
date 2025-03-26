import { NextFunction, Request, Response } from "express";
import Data_Origins from "../../../../../database/models/Data_Origins.js";
import Identifier_Types from "../../../../../database/models/Identifier_Types.js";
import Items from "../../../../../database/models/Items.js";
import Ncms from "../../../../../database/models/Ncms.js";
import PcProdut from "../../../../../database/models/winthor/PcProdut.js";
import DataSwap from "../../../../data/DataSwap.js";
import Utils from "../../../../utils/Utils.js";
import PcNcmController from "./PcNcmsController.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";
import DBConnectionManager from "../../../../../database/DBConnectionManager.js";
import { Op, QueryTypes, Sequelize } from "sequelize";
import BaseRegistersController from "../../../registers/BaseRegistersController.js";
import PcEst from "../../../../../database/models/winthor/PcEst.js";
import PcFornec from "../../../../../database/models/winthor/PcFornec.js";
import PcDepto from "../../../../../database/models/winthor/PcDepto.js";
import { at } from "lodash";
import QueryBuilder from "../../../../database/QueryBuilder.js";

export default class PcProdutController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcProdut;
    }  

    /**
     * Integration request methods handlers, by default, not can change origin information, only get     
     * @requesthandler
     * @override
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async put(req: Request, res: Response, next: NextFunction) : Promise<void> {
        BaseRegistersController.put.bind(this)(req, res, next);
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
                            data_origin_id: Data_Origins.WINTHOR,
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

    /*
    @version 1.0.0
    @comments 
        2025-03-25 - Alencar: Função comentada para efeito de manter o histórico de como foi criada, pois foi criada corretamente, conforme a logica do negócio, porém, dada a evolução do front, ela precisará de atualizações
    */
   /*
    static async get_product_data(req: Request, res: Response, next: NextFunction) : Promise<void> {
        
        type Filter = {
            campo: String | null;
            operador: any | null;
            valor: String | number | null;
        }
        let campos = ['pp.codprod',
            'pp.codfab',
            'pp.descricao',
            'pe.codfilial',
            'pe.qtest',
            'pe.dtultent',
            'pe.dtultsaida',
            'pp.embalagem',
            'pp.unidade',
            'pp.pesoliq',
            'pp.pesobruto',
            'pp.codepto',
            'pp.temrepos',
            'pp.qtunit',
            'pp.dtcadastro',
            'pp.dtexclusao',
            'pp.dtultaltcom',
            'pp.prazoval',
            'pp.revenda',
            'pp.qtunitcx',
            'pp.importado',
            'pp.codauxiliar']

        let camposTerm = [
            'pp.codprod',
            'pp.codfab',
            'pe.codfilial',
            ]

        let whereAvanced : Filter[] = req.body.filters || null
        let whereTerm = req.body.termo || null
        console.log(whereAvanced,"Pesquisa avançada")
        console.log(whereTerm,"Pesquisa por termo")
        try {
            let result: any;
            let query: any;
            query =`
            SELECT
                ${campos}
            FROM
                pcprodut pp 
                join pcest pe on(
                    pp.codprod = pe.codprod
                )
            WHERE 
     
            `
            if(Utils.hasValue(whereAvanced[0].campo) && Utils.hasValue(whereAvanced[0].operador) && Utils.hasValue(whereAvanced[0].valor)){
        
                    const conditions = whereAvanced.map(f => {
                        const { campo, operador, valor } = f;
                        if (valor === null || valor === undefined) {
                            return `(${campo} IS NULL)`;
                        }
                        if (campo === 'DTCADASTRO' || campo === 'DTEXCLUSAO' || campo === 'DTULTALTCOM') {
                            return `${campo} = TO_DATE('${valor}', 'dd/mm/yyyy')`; // Para datas
                        }
                        if (typeof valor === 'number') {
                            return `(${campo} ${operador || '='} ${valor})`;
                        }
                        if (typeof valor === 'string') {
                            return `(${campo} ${operador || 'LIKE'} '${valor}')`;
                        }
                        return `(${campo} ${operador || '='} '${valor}')`;
                    });
                    query += conditions.join(' AND ');
                    console.log("Where1")
                }else{  
                    
                    
                        const conditions = camposTerm.map( c => `${ c } = '${ whereTerm }'` );
                        query += conditions.join(' or ');
                    
                }
            result = await DBConnectionManager.getWinthorDBConnection()?.query(query, {type: QueryTypes.SELECT})
       
            if(result){
                res.status(200).json(result)
            }else{
                res.status(404).json({message: 'Nenhum registro encontrado.'})
            }
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }*/



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
                search.term.value = search.term.value.trim().toUpperCase().split(',');

                let orTerm = [];

                //especied fields on searchTem
                if (Utils.hasValue(search.term.fields)) {
                    search.term.fields = Utils.toArray(search.term.fields);
                    for(let i in search.term.fields) {
                        for(let k in search.term.value) {
                            orTerm.push(
                                Sequelize.where(
                                    Sequelize.fn('UPPER',Sequelize.col(search.term.fields[i])),
                                    Op.like,
                                    `%${search.term.value[k]}%`
                                )
                            )
                        }
                    }
                } else {

                    //not especied fields
                    for(let k in search.term.value) {
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