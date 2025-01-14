import { Sequelize } from "sequelize";
import PcProdut from "../../../../../database/models/winthor/PcProdut.js";
import Produtos_Armazenados_Terceiros from "../../../../../database/models/winthor/Produtos_Armazenados_Terceiros.js";
import DatabaseUtils from "../../../../database/DatabaseUtils.js";
import Utils from "../../../../utils/Utils.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";
import { NextFunction, Request, Response } from "express";
import BaseRegistersController from "../../../registers/BaseRegistersController.js";

export default class Produtos_Armazenados_TerceirosController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return Produtos_Armazenados_Terceiros;
    }  

    static async getWithJoins(params?:any) : Promise<void | Produtos_Armazenados_Terceiros[]> {
        let queryParams = params?.queryParams || params || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = Utils.firstValid([queryParams.raw,true]);
        if (params.include_pcprodut) {
            queryParams.include = queryParams.include || [];
            queryParams.include.push({
                raw:true,
                model:PcProdut,
                attributes:[
                    Sequelize.literal(`${PcProdut.tableName}.DESCRICAO AS descricao`),
                    Sequelize.literal(`${PcProdut.tableName}.UNIDADE AS unidade`)
                ],
                on:Sequelize.where(Sequelize.col(`${PcProdut.tableName}.CODPROD`),Sequelize.col(`${Produtos_Armazenados_Terceiros.tableName}.CODPROD`))
            });
        }

        return await Produtos_Armazenados_Terceiros.findAll(queryParams);
    } 

    /**
     * @requesthandler
     * @override
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async put(req: Request, res: Response, next: NextFunction) : Promise<void> {
        BaseRegistersController.put.bind(this)(req,res,next);
    }

    /**
     * @requesthandler
     * @override
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async patch(req: Request, res: Response, next: NextFunction) : Promise<void> {
        BaseRegistersController.patch.bind(this)(req,res,next);
    }

    /**
     * @requesthandler
     * @override
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async delete(req: Request, res: Response, next: NextFunction) : Promise<void> {
        BaseRegistersController.delete.bind(this)(req,res,next);
    }
    
    
    static {
        this.configureDefaultRequestHandlers();
    }
}