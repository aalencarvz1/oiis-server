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
import { QueryTypes } from "sequelize";
import BaseRegistersController from "../../../registers/BaseRegistersController.js";

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
    }

    
    
    static {
        this.configureDefaultRequestHandlers([this.get_product_data]);
    }
}