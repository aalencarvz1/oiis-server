const { QueryTypes } = require("sequelize");
const { Utils } = require("../../../utils/Utils");
const DBConnectionManager = require("../../../../database/DBConnectionManager");
const _ = require('lodash');
const { RegistersController } = require("../../registers/RegistersController");

/**
 * Class controller to handle wms module
 * @author Alencar
 * @created 2023-29-08
 */
class LogisticOrdersController extends RegistersController {


    
    static async getwithwinthordata(req,res,next) {
        try {
            let queryParams = req.body.queryParams || {};
            queryParams.raw = true;
            let where = [];
            if (req.body.initDate) {
                where.push(`trunc(c.dtsaida) >= to_date('${req.body.initDate}','yyyy-mm-dd')`);
            }
            if (req.body.endDate) {
                where.push(`trunc(c.dtsaida) <= to_date('${req.body.endDate}','yyyy-mm-dd')`);
            }
            if (req.body.codfilial) {
                if (Utils.typeOf(req.body.codfilial) !== 'array') {
                    req.body.codfilial = Utils.toArray(req.body.codfilial);
                }
                req.body.codfilial = req.body.codfilial.map(el=>Utils.hasValue(el)?el:'null');
                where.push(`s.codfilial in (${req.body.codfilial.join(',')})`);
            }
            if (req.body.codmotorista) {
                if (Utils.typeOf(req.body.codmotorista) !== 'array') {
                    req.body.codmotorista = Utils.toArray(req.body.codmotorista);
                }
                req.body.codmotorista = req.body.codmotorista.map(el=>Utils.hasValue(el)?el:'null');
                where.push(`c.codmotorista in (${req.body.codmotorista.join(',')})`);
            }
            if (req.body.codveiculo) {
                if (Utils.typeOf(req.body.codveiculo) !== 'array') {
                    req.body.codveiculo = Utils.toArray(req.body.codveiculo);
                }
                req.body.codveiculo = req.body.codveiculo.map(el=>Utils.hasValue(el)?el:'null');
                where.push(`c.codveiculo in (${req.body.codveiculo.join(',')})`);
            }
            if (req.body.identifier) {
                let identifier = Utils.typeOf(req.body.identifier) == 'array' ? req.body.identifier : req.body.identifier.split(',');
                identifier = identifier.map(el=>Utils.hasValue(el)?el:'null');
                where.push(`c.numcar in (${identifier.join(',')})`);
            }
            if (where.length) where = ` where ${where.join(' and ')} `
            else where = ' where 1=2 ';//prevent massive database get
            let query = `
                select
                    DTSAIDA,
                    NUMCAR,
                    DESTINO,
                    CODMOTORISTA,
                    MOTORISTA,
                    CODVEICULO,                            
                    PLACA,                            
                    COUNT(DISTINCT CGC) AS NUMENT,
                    COUNT(DISTINCT NUMTRANSVENDA) AS NUMNOTAS,
                    sum(nvl(TOTPESO,0)) AS TOTPESO,
                    sum(nvl(TOTPESO,0)) - sum(nvl(TOTPESODEV,0)) AS TOTPESOLIQ,
                    sum(nvl(VLTOTAL,0)) AS VLTOTAL,
                    sum(nvl(VLTOTAL,0)) - sum(nvl(VLTOTALDEV,0)) AS VLTOTALLIQ,
                    COUNT(DISTINCT DNFSARECEBER) AS DNFSARECEBER,
                    sum(nvl(DARECEBER,0)) AS DARECEBER,
                    COUNT(DISTINCT CARTAONFSARECEBER) AS CARTAONFSARECEBER,
                    sum(nvl(CARTAOARECEBER,0)) AS CARTAOARECEBER,
                    COUNT(DISTINCT CHEQUENFSARECEBER) AS CHEQUENFSARECEBER,
                    sum(nvl(CHEQUEARECEBER,0)) AS CHEQUEARECEBER,
                    0 AS PIXNFSARECEBER,
                    0 AS PIXARECEBER
                FROM (
                    select       
                        c.DTSAIDA,                 
                        c.NUMCAR,                            
                        c.DESTINO,
                        c.codmotorista,
                        e.nome as MOTORISTA,
                        c.codveiculo,
                        v.PLACA,
                        to_number(regexp_replace(s.cgc,'[^0-9]','')) as cgc,
                        '0'||s.numtransvenda AS NUMTRANSVENDA,
                        nvl(m.qt,m.qtcont) * coalesce(m.pesoliq,p.pesoliq,1) as TOTPESO,
                        nvl(m.qtdevol,0) * coalesce(m.pesoliq,p.pesoliq,1) as TOTPESODEV,
                        nvl(m.qt,m.qtcont) * nvl(m.punit,m.punitcont) as VLTOTAL,
                        nvl(m.qtdevol,0) * nvl(m.punit,m.punitcont) as VLTOTALDEV,
                        case when s.codcob in ('D','DH') then '0'||s.numtransvenda ELSE NULL end as DNFSARECEBER,
                        case when s.codcob in ('D','DH') then nvl(m.qt,m.qtcont) * nvl(m.punit,m.punitcont) ELSE NULL end as DARECEBER,
                        case when s.codcob in ('CCEO','CCO3','CCVM','CCV3','CDEO','CDO3','CDVM','CDV3') then '0'||s.numtransvenda ELSE NULL end as CARTAONFSARECEBER,
                        case when s.codcob in ('CCEO','CCO3','CCVM','CCV3','CDEO','CDO3','CDVM','CDV3') then nvl(m.qt,m.qtcont) * nvl(m.punit,m.punitcont) ELSE NULL end as CARTAOARECEBER,
                        case when s.codcob in ('CH','CHP','CHV') then '0'||s.numtransvenda ELSE NULL end as CHEQUENFSARECEBER,
                        case when s.codcob in ('CH','CHP','CHV') then nvl(m.qt,m.qtcont) * nvl(m.punit,m.punitcont) ELSE NULL end as CHEQUEARECEBER
                    from
                        jumbo.pccarreg c
                        left outer join jumbo.pcempr e on e.matricula = c.codmotorista
                        left outer join jumbo.pcveicul v on v.codveiculo = c.codveiculo
                        left outer join jumbo.pcnfsaid s on s.numcar = c.numcar and s.dtcancel is null
                        left outer join jumbo.pcmov m on m.numtransvenda = s.numtransvenda and m.dtcancel is null
                        left outer join jumbo.pcprodut p on p.codprod = m.codprod
                    ${where}                        
                    union all
                    select       
                        c.DTSAIDA,                 
                        c.NUMCAR,                            
                        c.DESTINO,
                        c.codmotorista,
                        e.nome as MOTORISTA,
                        c.codveiculo,
                        v.PLACA,
                        to_number(regexp_replace(ps.coddocidentificador,'[^0-9]','')) as cgc,
                        '1'||s.cod as numtransvenda,                                
                        nvl(m.qtsaida,0) * coalesce(m.pesoliqun,1) as TOTPESO,
                        nvl(m.qtdevolvida,0) * coalesce(m.pesoliqun,1) as TOTPESODEV,
                        nvl(m.qtsaida,0) * nvl(m.vlun,0) as VLTOTAL,
                        nvl(m.qtdevolvida,0) * nvl(m.vlun,0) as VLTOTALDEV,
                        NULL as DNFSARECEBER,
                        NULL as DARECEBER,
                        null as CARTAONFSARECEBER,
                        null as CARTAOARECEBER,
                        NULL as CHEQUENFSARECEBER,
                        NULL as CHEQUEARECEBER
                    from
                        jumbo.pccarreg c                                
                        join ep.epunifcargas u on u.nrcarga = c.numcar
                        join ep.epunifcargas u2 on u2.id = u.id and u2.idorigeminfo > 0
                        left outer join jumbo.pcempr e on e.matricula = c.codmotorista
                        left outer join jumbo.pcveicul v on v.codveiculo = c.codveiculo
                        left outer join ep.epnfssaida s on s.nrcarga = u2.nrcarga and s.codorigeminfo > 0 and s.dtcancel is null
                        left outer join ep.epclientes cl on cl.cod = s.codcliente
                        left outer join ep.eppessoas ps on ps.cod = cl.codpessoa
                        left outer join ep.epmovimentacoessaida m on m.codnfsaida = s.cod and m.dtcancel is null
                        left outer join jumbo.pcprodut p on p.codprod = m.codprod
                    ${where} 
                )                       
                group by
                    DTSAIDA,
                    NUMCAR,
                    DESTINO,
                    CODMOTORISTA,
                    MOTORISTA,
                    CODVEICULO,                            
                    PLACA
                order by
                    1

            `;

            res.data = await DBConnectionManager.getWinthorDBConnection().query(query,{raw:true,queryType:QueryTypes.SELECT});
            res.data = res.data[0] || [];

            if (res.data.length) {
                let numCars = res.data.map(el=>el.NUMCAR);
                query = `
                    select
                        l.ID,
                        l.IDENTIFIER,
                        l.IDLOGISTICSTATUS,
                        ls.NAME as LOGISTICSTATUS
                    from
                        logisticorders l
                        left outer join logisticstatus ls on ls.id = l.idlogisticstatus
                    where
                        l.IDENTIFIER in (${numCars.join(',')})
                `;
                let logData = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,queryType:QueryTypes.SELECT});
                logData = logData[0] || [];
                if (logData) {
                    logData = _.keyBy(logData,'IDENTIFIER');
                    Utils.log(logData);
                    for(let kj in res.data) {                                
                        if (logData[res.data[kj].NUMCAR.toString()]) {
                            res.data[kj].IDLOGISTICORDER = logData[res.data[kj].NUMCAR.toString()].ID;
                            res.data[kj].IDLOGISTICSTATUS = logData[res.data[kj].NUMCAR.toString()].IDLOGISTICSTATUS;
                            res.data[kj].LOGISTICSTATUS = logData[res.data[kj].NUMCAR.toString()].LOGISTICSTATUS;
                        }
                    }
                }
            }                    
            res.sendResponse(200,true);  
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }
    
}

module.exports = {LogisticOrdersController}