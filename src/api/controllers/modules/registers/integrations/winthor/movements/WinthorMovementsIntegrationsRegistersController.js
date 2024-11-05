const { QueryTypes } = require("sequelize");
const DBConnectionManager = require("../../../../../../database/DBConnectionManager");
const { DataSwap } = require("../../../../../data/DataSwap");
const { RegistersController } = require("../../../RegistersController");

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
            res.data = await DBConnectionManager.getWinthorDBConnection().query(query,{raw:true,queryType:QueryTypes.SELECT});
            res.sendResponse(200,true);
        } catch (e) {
            res.setException(e);
            res.sendResponse();
        }
    }
    
}

module.exports = {WinthorMovementsIntegrationsRegistersController}