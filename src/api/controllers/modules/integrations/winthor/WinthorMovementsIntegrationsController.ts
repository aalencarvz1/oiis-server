import Utils from "../../../utils/Utils.js";
import BaseIntegrationsRegistersController from "../BaseIntegrationsRegistersController.js";
import DatabaseUtils from "../../../database/DatabaseUtils.js";
import Produtos_Armazenados_Terceiros from "../../../../database/models/winthor/Produtos_Armazenados_Terceiros.js";
import PcProdut from "../../../../database/models/winthor/PcProdut.js";
import { QueryTypes, Sequelize } from "sequelize";
import DBConnectionManager from "../../../../database/DBConnectionManager.js";

export default class WinthorMovementsIntegrationsController extends BaseIntegrationsRegistersController{

    static async getWinthorPurchaseSuggestions(params?:any) : Promise<void | Produtos_Armazenados_Terceiros[]> {
        let query = `
            select
                pcest.codfilial,
                pcprodut.codprod,
                pcprodut.descricao,
                pcprodut.codfornec,
                pcfornec.fornecedor,
                pcprodut.codepto,
                pcdepto.descricao as departamento,
                pcprodut.qtunitcx,
                pcprodut.unidade,
                nvl(pcfornec.prazoentrega,0) as prazoentrega,
                nvl(pcprodut.temrepos,0) as temrepos,
                sum(nvl(pcest.qtest,0)) as qtest,
                sum(nvl(pcest.qtestger,0)) as qtestger,
                sum(nvl(pt.qt,0)) as qtterc,
                sum(nvl(pcest.qtpendente,0)) as qtpendente,
                sum(nvl(pcest.qtreserv,0)) as qtreserv,
                sum(nvl(pcest.estmin,0)) as estmin,
                sum(nvl(pcest.qtbloqueada,0)) as qtbloqueada,
                sum(nvl(pcest.qtpedida,0) / decode(nvl(pcprodut.qtunitcx,0),0,1,pcprodut.qtunitcx) ) as qtpedida,
                sum(nvl(pcest.qtestger,0)) as qttotal,
                gdt1.descricao || gdt2.descricao as curva,
                (select pcgirodiamemoria.json from jumbo.pcgirodiamemoria where pcgirodiamemoria.codprod = pcprodut.codprod and pcgirodiamemoria.codfilial = pcest.codfilial) as json
            from
                jumbo.pcprodut 
                join jumbo.pcest on pcest.codprod = pcprodut.codprod
                left outer join jumbo.pcfornec on pcfornec.codfornec = pcprodut.codfornec
                left outer join jumbo.pcdepto on pcdepto.codepto = pcprodut.codepto
                left outer join jumbo.PCGIRODIATABELAS GDT1 on GDT1.CHAVE = PCEST.CURVA
                left outer join jumbo.PCGIRODIATABELAS GDT2 on GDT2.CHAVE = PCEST.SUBCURVA
                left outer join jumbo.PRODUTOS_ARMAZENADOS_TERCEIROS pt on pt.codprod = pcprodut.codprod and pt.codfilial = pcest.codfilial
            __WHERE__
            group by
                pcest.codfilial,
                pcprodut.codprod,
                pcprodut.descricao,
                pcprodut.codfornec,
                pcfornec.fornecedor,
                pcprodut.codepto,
                pcdepto.descricao,
                pcprodut.qtunitcx,
                pcprodut.unidade,
                nvl(pcfornec.prazoentrega,0),
                nvl(pcprodut.temrepos,0),
                gdt1.descricao || gdt2.descricao
        `;

        let where = params?.queryParams?.where || params?.where || {};
        if (Utils.hasValue(where)) {
            where = DatabaseUtils.whereToString(where,PcProdut)
            query = query.replace('__WHERE__',` where ${where} `);
        } else {
            query = query.replace('__WHERE__',' ');
        }

        return await DBConnectionManager.getWinthorDBConnection()?.query(
            query,{
            raw:true,type:QueryTypes.SELECT
        });
    }         
}