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

export default class PcProdutController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcProdut;
    }  

    static async integrate(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let queryParams = params.queryParams || params || {};
            let winthorData = await PcProdut.findOne({
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
            campo: String;
            operador: any;
            valor: String | number | null;
        }

        let where : Filter[] = req.body.filters
        console.log(where)
        try {
            let result: any;
            let query: any;
            if(where.length > 0) {
            query =`
            SELECT
                CODPROD,
                DESCRICAO,
                EMBALAGEM,
                UNIDADE,
                PESOLIQ,
                PESOBRUTO,
                CODEPTO,
                TEMREPOS,
                QTUNIT,
                DTCADASTRO,
                DTEXCLUSAO,
                DTULTALTCOM,
                PRAZOVAL,
                REVENDA,
                QTUNITCX,
                IMPORTADO,
                CODAUXILIAR
            FROM
                PCPRODUT
            WHERE
             `
            const conditions = where.map(f => {
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
            result = await DBConnectionManager.getWinthorDBConnection()?.query(query, {type: QueryTypes.SELECT})
        }else{
            query =`
            SELECT
                CODPROD,
                DESCRICAO,
                EMBALAGEM,
                UNIDADE,
                PESOLIQ,
                PESOBRUTO,
                CODEPTO,
                TEMREPOS,
                QTUNIT,
                DTCADASTRO,
                DTEXCLUSAO,
                DTULTALTCOM,
                PRAZOVAL,
                REVENDA,
                QTUNITCX,
                IMPORTADO,
                CODAUXILIAR
            FROM
                PCPRODUT
            WHERE

                CODPROD LIKE '%${req.body.termo}%'
                OR DESCRICAO LIKE '%${req.body.termo}%'
                OR EMBALAGEM LIKE '%${req.body.termo}%'
                OR UNIDADE LIKE '%${req.body.termo}%'
                OR CODEPTO LIKE '%${req.body.termo}%'
                OR DTCADASTRO LIKE '%${req.body.termo}%'
                OR DTEXCLUSAO LIKE '%${req.body.termo}%'
                OR DTULTALTCOM LIKE '%${req.body.termo}%'
                OR PRAZOVAL LIKE '%${req.body.termo}%'
                OR CODAUXILIAR LIKE '%${req.body.termo}%'
             `
             result = await DBConnectionManager.getWinthorDBConnection()?.query(query, {type: QueryTypes.SELECT})
        }
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