const { QueryTypes } = require("sequelize");
const DBConnectionManager = require("../../../../../../database/DBConnectionManager");
const { DataSwap } = require("../../../../../data/DataSwap");
const { RegistersController } = require("../../../RegistersController");
const { Utils } = require("../../../../../utils/Utils");
const { DatabaseUtils } = require("../../../../../database/DatabaseUtils");
const { PcProdut } = require("../../../../../../database/models/winthor/PcProdut");

/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2024-10-11
 */
class WinthorMovementsIntegrationsRegistersController extends RegistersController {
    
    static async integrateWinthorMovement(movType, idAtOrigin, integrateItems) {
        result = new DataSwap();
        try {
            
            result.success = true;
        } catch (e) {
            result.setException(e);
        }
        return result;
    }

    static async getwinthorinputs(req,res) {
        try {
            let query = `
                SELECT
                    e.codfilial,
                    e.dtent,
                    e.numnota,
                    e.numtransent,
                    e.vltotal,
                    e.codfornec,
                    e.cgc,
                    f.fornecedor,
                    e.uf,
                    coalesce(d.xmlnfe,x.dadosxml) as xml
                FROM
                    jumbo.pcnfent e    
                    left outer join jumbo.pcfornec f on f.codfornec = e.codfornec
                    left outer join jumbo.PCDOCELETRONICO d on D.MOVIMENTO = 'E' and d.numtransacao = e.numtransent
                    left outer join jumbo.PCNFENTXML x on x.chavenfe = e.chavenfe
                WHERE
                    e.dtent BETWEEN '01/09/2019' AND '30/09/2024'
                    AND e.dtcancel IS NULL
                    and exists (
                        select
                            1
                        from
                            jumbo.pcmov m 
                        where 
                            m.numtransent = e.numtransent
                            AND m.codoper IN ( 'E', 'EB' )
                            AND m.dtcancel IS NULL     
                    )
                order by
                    e.dtent
            `;
            res.data = await DBConnectionManager.getWinthorDBConnection().query(query,{raw:true,type:QueryTypes.SELECT});
            res.sendResponse(200,true);
        } catch (e) {
            res.setException(e);
            res.sendResponse();
        }
    }

    static async getWinthorPurchaseSuggestions(req,res) {
        try {
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
                    sum(nvl(pcest.qtestger,0)) + sum(nvl(pt.qt,0)) as qttotal,
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

            let where = req.body?.queryParams?.where || req.body?.where || {};
            if (Utils.hasValue(where)) {
                where = DatabaseUtils.whereToString(where,PcProdut)
                query = query.replace('__WHERE__',` where ${where} `);
            } else {
                query = query.replace('__WHERE__',' ');
            }

            res.data = await DBConnectionManager.getWinthorDBConnection().query(
                query,{
                raw:true,type:QueryTypes.SELECT
            });
            res.sendResponse(200,true);
        } catch (e) {
            res.setException(e);
            res.sendResponse();
        }
    }
    
}

module.exports = {WinthorMovementsIntegrationsRegistersController}