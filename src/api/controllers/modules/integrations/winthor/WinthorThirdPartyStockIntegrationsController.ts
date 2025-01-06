import Utils from "../../../utils/Utils.js";
import BaseIntegrationsRegistersController from "../BaseIntegrationsRegistersController.js";
import DatabaseUtils from "../../../database/DatabaseUtils.js";
import Produtos_Armazenados_Terceiros from "../../../../database/models/winthor/Produtos_Armazenados_Terceiros.js";
import PcProdut from "../../../../database/models/winthor/PcProdut.js";
import { Sequelize } from "sequelize";

export default class WinthorThirdPartyStockIntegrationsController extends BaseIntegrationsRegistersController{

    static async get(params?:any) : Promise<void | Produtos_Armazenados_Terceiros[]> {
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
}