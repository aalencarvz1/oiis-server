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
class Logistic_Orders_Controller extends RegistersController {


    
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
                    DTSAIDA as "out_date",
                    NUMCAR as "id",
                    DESTINO as "destiny",
                    CODMOTORISTA as "driver_id",
                    MOTORISTA as "driver_name",
                    CODVEICULO as "vehicle_id",
                    PLACA as "plate",
                    COUNT(DISTINCT CGC) AS "deliveries_qty",
                    COUNT(DISTINCT NUMTRANSVENDA) AS "invoices_qty",
                    sum(nvl("total_weight",0)) AS "total_weight",
                    sum(nvl("total_weight",0)) - sum(nvl("total_return_weight",0)) AS "total_liq_weight",
                    sum(nvl("total_value",0)) AS "total_value",
                    sum(nvl("total_value",0)) - sum(nvl(VLTOTALDEV,0)) AS "total_liq_value",
                    COUNT(DISTINCT DNFSARECEBER) AS "invoices_to_delivery_money_qty",
                    sum(nvl(DARECEBER,0)) AS "invoices_to_delivery_money_value",
                    COUNT(DISTINCT CARTAONFSARECEBER) AS "invoices_to_delivery_card_qty",
                    sum(nvl(CARTAOARECEBER,0)) AS "invoices_to_delivery_card_value",
                    COUNT(DISTINCT CHEQUENFSARECEBER) AS "invoices_to_delivery_check_qty",
                    sum(nvl(CHEQUEARECEBER,0)) AS "invoices_to_delivery_check_value",
                    0 AS "invoices_to_delivery_pix_qty",
                    0 AS "invoices_to_delivery_pix_value"
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
                        nvl(m.qt,m.qtcont) * coalesce(m.pesoliq,p.pesoliq,1) as "total_weight",
                        nvl(m.qtdevol,0) * coalesce(m.pesoliq,p.pesoliq,1) as "total_return_weight",
                        nvl(m.qt,m.qtcont) * nvl(m.punit,m.punitcont) as "total_value",
                        nvl(m.qtdevol,0) * nvl(m.punit,m.punitcont) as VLTOTALDEV,
                        case when s.codcob in ('D','DH') then '0'||s.numtransvenda ELSE NULL end as DNFSARECEBER,
                        case when s.codcob in ('D','DH') then nvl(m.qt,m.qtcont) * nvl(m.punit,m.punitcont) ELSE NULL end as DARECEBER,
                        case when s.codcob in ('CCEO','CCO3','CCVM','CCV3','CDEO','CDO3','CDVM','CDV3') then '0'||s.numtransvenda ELSE NULL end as CARTAONFSARECEBER,
                        case when s.codcob in ('CCEO','CCO3','CCVM','CCV3','CDEO','CDO3','CDVM','CDV3') then nvl(m.qt,m.qtcont) * nvl(m.punit,m.punitcont) ELSE NULL end as CARTAOARECEBER,
                        case when s.codcob in ('CH','CHP','CHV') then '0'||s.numtransvenda ELSE NULL end as CHEQUENFSARECEBER,
                        case when s.codcob in ('CH','CHP','CHV') then nvl(m.qt,m.qtcont) * nvl(m.punit,m.punitcont) ELSE NULL end as CHEQUEARECEBER
                    from
                        JUMBO.PCCARREG c
                        left outer join JUMBO.PCEMPR e on e.matricula = c.codmotorista
                        left outer join JUMBO.PCVEICUL v on v.codveiculo = c.codveiculo
                        left outer join JUMBO.PCNFSAID s on s.numcar = c.numcar and s.dtcancel is null
                        left outer join JUMBO.PCMOV m on m.numtransvenda = s.numtransvenda and m.dtcancel is null
                        left outer join JUMBO.PCPRODUT p on p.codprod = m.codprod
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
                        nvl(m.qtsaida,0) * coalesce(m.pesoliqun,1) as total_weight,
                        nvl(m.qtdevolvida,0) * coalesce(m.pesoliqun,1) as total_return_weight,
                        nvl(m.qtsaida,0) * nvl(m.vlun,0) as total_value,
                        nvl(m.qtdevolvida,0) * nvl(m.vlun,0) as VLTOTALDEV,
                        NULL as DNFSARECEBER,
                        NULL as DARECEBER,
                        null as CARTAONFSARECEBER,
                        null as CARTAOARECEBER,
                        NULL as CHEQUENFSARECEBER,
                        NULL as CHEQUEARECEBER
                    from
                        JUMBO.PCCARREG c                                
                        join EP.EPUNIFCARGAS u on u.nrcarga = c.numcar
                        join EP.EPUNIFCARGAS u2 on u2.id = u.id and u2.idorigeminfo > 0
                        left outer join JUMBO.PCEMPR e on e.matricula = c.codmotorista
                        left outer join JUMBO.PCVEICUL v on v.codveiculo = c.codveiculo
                        left outer join EP.EPNFSSAIDA s on s.nrcarga = u2.nrcarga and s.codorigeminfo > 0 and s.dtcancel is null
                        left outer join EP.EPCLIENTES cl on cl.cod = s.codcliente
                        left outer join EP.EPPESSOAS ps on ps.cod = cl.codpessoa
                        left outer join EP.EPMOVIMENTACOESSAIDA m on m.codnfsaida = s.cod and m.dtcancel is null
                        left outer join JUMBO.PCPRODUT p on p.codprod = m.codprod
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

            res.data = await DBConnectionManager.getWinthorDBConnection().query(query,{raw:true,type:QueryTypes.SELECT});

            if (res.data.length) {
                let numCars = res.data.map(el=>el.id);
                query = `
                    select
                        l.id,
                        l.identifier,
                        l.logistic_status_id,
                        ls.name as "logistic_status_name"
                    from
                        logistic_orders l
                        left outer join logistic_status ls on ls.id = l.logistic_status_id
                    where
                        l.identifier in (${numCars.join(',')})
                `;
                let logData = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,type:QueryTypes.SELECT});

                if (Utils.hasValue(logData)) {
                    logData = _.keyBy(logData,'identifier');
                    for(let kj in res.data) {                                
                        if (logData[res.data[kj].id.toString()]) {
                            res.data[kj].logistic_order_id = logData[res.data[kj].id.toString()].id;
                            res.data[kj].logistic_status_id = logData[res.data[kj].id.toString()].logistic_status_id;
                            res.data[kj].logistic_status_name = logData[res.data[kj].id.toString()].logistic_status_name;
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

module.exports = {Logistic_Orders_Controller}