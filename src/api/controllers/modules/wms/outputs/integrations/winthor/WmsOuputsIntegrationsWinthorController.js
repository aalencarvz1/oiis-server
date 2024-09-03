const { Sequelize } = require("sequelize");
const DBConnectionManager = require("../../../../../../database/DBConnectionManager");
const { Utils } = require("../../../../../utils/Utils");
const _ = require('lodash');
const { ParametersValues } = require("../../../../../../database/models/ParametersValues");
const { Parameters } = require("../../../../../../database/models/Parameters");
const { RegistersController } = require("../../../../registers/RegistersController");

/**
 * Class controller to handle wms module
 * @author Alencar
 * @created 2023-29-08
 */
class WmsOuputsIntegrationsWinthorController extends RegistersController{
    
    static async getLoadsWithBroker(req,res,next) {
        try {
            let params = req.body || {};
            let id = params?.id || [];
            if (Utils.typeOf(id) !== 'array') {
                id = id.toString().split(',');
                id = id.map(el=>Utils.hasValue(el) ? el : 'null');
            }
            let codFilial = params?.codFilial || [];
            if (Utils.typeOf(codFilial) !== 'array') {
                codFilial = codFilial.toString().split(',');
                codFilial = codFilial.map(el=>Utils.hasValue(el) ? el : 'null');
            }
            let winthorLoadNumber = params?.winthorLoadNumber || [];
            if (Utils.typeOf(winthorLoadNumber) !== 'array') {
                winthorLoadNumber = winthorLoadNumber.toString().split(',');
                winthorLoadNumber = winthorLoadNumber.map(el=>Utils.hasValue(el) ? el : 'null');
            }
            let auroraLoadNumber = params?.auroraLoadNumber || [];
            if (Utils.typeOf(auroraLoadNumber) !== 'array') {
                auroraLoadNumber = auroraLoadNumber.toString().split(',');
                auroraLoadNumber = auroraLoadNumber.map(el=>Utils.hasValue(el) ? el : 'null');
            }
            
            let query = `
                select 
                    u.id as ID,
                    o.cod as IDORIGIN,
                    o.nome as ORIGIN,
                    c.codfilial as CODFILIAL,
                    cj.numcar AS LOADINGNUMBER,
                    v.placa AS PLATE,
                    cj.totpeso AS TOTALWEIGHT,
                    cj.dtsaida AS OUTPUTDATE,
                    cj.destino AS DESTINY,
                    cj.numnotas AS INVOICESAMT,
                    cj.nument  AS DELIVERIESAMT,
                    cj.qtitens AS ITEMSAMT
                from 
                    jumbo.pccarreg cj 
                    join jumbo.pcpedc c on c.numcar = cj.numcar 
                    left outer join ep.eporigensinfo o on o.cod = 0 
                    left outer join jumbo.pcveicul v on (v.codveiculo = cj.codveiculo) 
                    left outer join ep.epunifcargas u on (u.idorigeminfo = 0 and u.nrcarga = cj.numcar) 
                where 
                    1=1
                    ${id?.length ? ` and u.id in (${id.join(',')}) ` : ' ' }
                    ${winthorLoadNumber?.length ? ` and cj.numcar in (${winthorLoadNumber.join(',')}) ` : (!id?.length ? ' and cj.numcar in (-999) ' : ' ')}
                    ${codFilial?.length ? ` and c.codfilial in (${codFilial.join(',')}) ` : ' '}
                group by 
                    o.cod,
                    o.nome,
                    c.codfilial,
                    cj.numcar,
                    v.placa,
                    cj.totpeso,
                    cj.dtsaida,
                    cj.destino,
                    cj.numnotas,
                    cj.nument,
                    cj.qtitens,
                    u.id 
                union all 
                select 
                    u.id,
                    o.cod,                    
                    o.nome,
                    null,
                    ca.nro_carga,
                    ca.placa,
                    sum(ca.qtde),
                    ca.dt_saida,
                    null,
                    count(distinct s.numnotaorigem),
                    count(distinct s.codcliente),
                    count(distinct ca.cd_item)                
                from 
                    consulta.sjdcargaaur_import ca 
                    left outer join ep.eporigensinfo o on o.cod = 1 
                    left outer join ep.epnfssaida s on (s.nrcarga = ca.nro_carga and s.codorigeminfo = 1) 
                    left outer join ep.epunifcargas u on (u.idorigeminfo = 1 and u.nrcarga = ca.nro_carga) 
                where 
                    1=1
                    ${id?.length ? ` and u.id in (${id.join(',')}) ` : ' ' }
                    ${auroraLoadNumber?.length ? ` and ca.nro_carga in (${auroraLoadNumber.join(',')}) ` : (!id?.length ? ' and ca.nro_carga in (-999) ' : ' ')}
                group by 
                    o.cod,
                    o.nome,
                    null,
                    ca.nro_carga,
                    ca.placa,
                    ca.dt_saida,
                    null,
                    u.id 
            `
            res.data = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});
            res.data = res.data[0] || [];
            res.sendResponse(200,true);
        } catch (e) {
            Utils.log(e);
            res.sendResponse(501,false,e.message || e,null,e);
        }
    }

    static async unifyLoadings(req,res,next) {
        try {
            let identifiers = req.body.identifiers || []; 
            if (Utils.typeOf(identifiers) != 'array') {
                identifiers = identifiers.split(',');
            }
            identifiers = identifiers.map(el=>Utils.hasValue(el) ? el : 'null');           
            if (identifiers.length > 1) {

                //check if are already unified
                let query = `
                    select
                        1
                    from
                        ep.epunifcargas u
                    where                        
                        ${identifiers.map(el=>`(u.IDORIGEMINFO = ${el.IDORIGIN} AND u.NRCARGA = ${el.LOADINGNUMBER})`).join(' or ')}
                `
                let data = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});
                data = data[0] || [];
                if (data.length) {
                    throw new Error('one or more loadings already unified')
                }


                //check if is same rca
                if (Utils.toBool(await ParametersValues.get(Parameters.HAS_WINTHOR_INTEGRATION)) == true && Utils.toBool(await ParametersValues.get(Parameters.WMS_OUTPUT_INTEGRATION_CHECK_RCA)) == true) {
                    let loadingsWinthor = [];
                    let loadingsBroker = [];
                    for(let key in identifiers) {
                        if (identifiers[key].IDORIGIN == 0) loadingsWinthor.push(identifiers[key].LOADINGNUMBER)
                        else loadingsBroker.push(identifiers[key].LOADINGNUMBER);
                    }
                    //Utils.log('loadingsWinthor',loadingsWinthor);
                    let rcasWinthor = [];
                    if (loadingsWinthor.length) {
                        query = `
                            select distinct
                                CODUSUR
                            from
                                jumbo.pcpedc 
                            where
                                numcar in (${loadingsWinthor.join(',')})
                        `;
                        let dataRcasWinthor = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});
                        rcasWinthor = dataRcasWinthor[0] || [];
                    }
                    //Utils.log('rcasWinthor',rcasWinthor);

                    let rcasBroker = [];
                    //Utils.log('loadingsBroker',loadingsBroker);
                    if (loadingsBroker.length) {
                        query = `
                            select distinct
                                pr.idrca as CODUSUR
                            from
                                consulta.PLACAWINTXPLACABROKER pb
                                join consulta.PLACASXRCAS pr on pr.IDPLACAX = pb.ID 
                            WHERE
                                pb.PLACABROKER in (
                                    select distinct
                                        upper(trim(regexp_replace(ca.placa,'[^0-9A-Za-z]',''))) as placa
                                    from
                                        consulta.sjdcargaaur_import ca
                                    where
                                        ca.nro_carga in (${loadingsBroker.join(',')})
                                )
                        `;
                        let dataRcasBroker = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});
                        rcasBroker = dataRcasBroker[0] || [];
                    }
                    //Utils.log('rcasBroker',rcasBroker);

                    if (rcasWinthor.length && rcasBroker.length) {
                        //Utils.log('ok2');
                        let same = false;
                        for(let key in rcasWinthor) {
                            for(let k2 in rcasBroker) {
                                if (rcasWinthor[key].CODUSUR == rcasBroker[k2].CODUSUR) {
                                    same = true;
                                    break;
                                }
                            }
                        }
                        if (!same) {
                            throw new Error('impossible to connect loads that do not contain rca in common');
                        }
                    }
                }

                query = `select max(coalesce(id,0))+1 as PROXID from ep.epunifcargas`;
                data = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});
                data = data[0] || [];
                let proxId = data[0].PROXID || 1;
                res.data = proxId;
                let queries = identifiers.map(el=>`insert into ep.epunifcargas values (${proxId},${el.IDORIGIN},${el.LOADINGNUMBER},sysdate,${req.user.ID})`);
                for (let key in queries) {
                    await DBConnectionManager.getConsultDBConnection().query(queries[key],{queryType:Sequelize.QueryTypes.INSERT});
                }
                res.sendResponse(200,true);

            } else {
                throw new Error("select more than 1 to proced");
            }
        } catch (e) {
            Utils.log(e);
            res.sendResponse(501,false,e.message || e,null,e);
        }
    }

    static async getLoadingsItemsForPrint(req,res,next) {
        try {
            let identifiers = req.body.identifiers || [];
            if (Utils.typeOf(identifiers) != 'array') {
                identifiers = identifiers.split(',');
            }
            identifiers = identifiers.map(el=>Utils.hasValue(el) ? el : 'null');           
            let codFilial = req.body?.codFilial || [];

            if (Utils.typeOf(codFilial) !== 'array') codFilial = codFilial.toString().split(',');
            if (codFilial.length) codFilial = Math.max(...codFilial);
            if (!Utils.hasValue(codFilial)) codFilial = 1;

            let query = null;
            let data = null;

            //CHECK UNIFIEDS OR NOT
            if (identifiers.length > 1) {
                query = `
                    select
                        count(1) as UNIFIEDS,
                        count(distinct id) as DISTID
                    from
                        ep.epunifcargas
                    where
                        ${identifiers.map(el=>` (IDORIGEMINFO=${el.IDORIGIN} AND NRCARGA=${el.LOADINGNUMBER}) `).join(' OR ')}
                `
                data = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});

                data = data[0] || [];
                if (data.length) {
                    Utils.log('xxx',data[0].UNIFIEDS,identifiers.length);
                    if (data[0].UNIFIEDS != identifiers.length) throw new Error('cannot print different non-unified payloads');
                    if (data[0].DISTID > 1) throw new Error('não é possível imprimir unificações diferentes juntas(1)');
                } else {
                    throw new Error('cannot print different non-unified payloads')
                }
            }


            if (identifiers.length) {

                let winthorLoads = [];
                let brokerLoads = [];
                for(let key in identifiers) {
                    if (identifiers[key].IDORIGIN == 0) {
                        winthorLoads.push(identifiers[key].LOADINGNUMBER)
                    } else {
                        brokerLoads.push(identifiers[key].LOADINGNUMBER);
                    }
                }

                if (winthorLoads.length > 0) {
                    query = `
                        select max(codfilial) as CODFILIAL from jumbo.pcpedc where numcar in (${winthorLoads.join(',')})
                    `;
                    data = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});
                    data = data[0] || [];
                    codFilial = data[0].CODFILIAL;
                } else {
                    winthorLoads.push(-999);
                }

                if (brokerLoads.length == 0) brokerLoads.push(-999);

                let positionOrders = req.body?.positionOrders || [];
                if (Utils.typeOf(positionOrders) !== 'array') positionOrders = codFilpositionOrdersial.toString().split(',');
                if (!positionOrders.length) positionOrders.push('B','P','L','M','F');

                query = `
                    select  
                        max(idunifcarga) as idunifcarga,
                        max(codfilial) as codfilial,
                        max(numcarjumbo) as numcarjumbo,
                        max(numcarbroker) as numcarbroker,
                        max(dtsaida) as dtsaida,
                        max(destino) as destino,
                        max(placajumbo) as placajumbo,
                        max(placabroker) as placabroker,
                        max(case when ${codFilial} in (1,3) and cam = 3 then 2 else cam end) as cam,
                        codprod,
                        numlote,
                        dtvalidade,
                        codfab,
                        descricao || case when codprod = 30444 then ' ITAJAI ' ELSE '' END as descricao,
                        max(unidade) as unidade,
                        max(qtunitcx) as qtunitcx,
                        sum(nvl(qt,0)) as qt,
                        sum(nvl(pesobruto,0)) as pesobruto,
                        CASE 
                            WHEN (max(nvl(qtunitcx,1)) > 0 ) AND ( sum(nvl(qt,0)) >= max(nvl(qtunitcx,1)) ) THEN 
                                trunc(sum(nvl(qt,0)) / max(nvl(qtunitcx,1))) 
                            ELSE 
                                0 
                        END as qtmaster,
                        CASE 
                            WHEN (max(nvl(qtunitcx,1)) > 0 ) AND ( sum(nvl(qt,0)) >= max(nvl(qtunitcx,1)) ) THEN 
                                sum(nvl(qt,0)) - ( trunc(sum(nvl(qt,0)) / max(nvl(qtunitcx,1))) * max(nvl(qtunitcx,1)) ) 
                            ELSE 
                                sum(nvl(qt,0)) 
                        END  as qtunitaria 
                        from ( 
                        select 
                            max(uc.id) as idunifcarga,                            
                            max(to_char(pc.codfilial)) as codfilial,
                            max(cr.numcar) as numcarjumbo,
                            (select max(nro_carga) from consulta.sjdcargaaur_import ca where ca.nro_carga in (${brokerLoads.join(',')})) as numcarbroker,
                            max(cr.dtsaida) as dtsaida,
                            max(cr.destino) as destino,
                            max(v.placa) as placajumbo,
                            (select max(placa) from consulta.sjdcargaaur_import ca where ca.nro_carga in (${brokerLoads.join(',')})) as placabroker,
                            max(CASE 
                                WHEN nvl(cs.utilizaendporfilial,'N') = 'S' THEN coalesce(e.rua,e.modulo,e.numero,e.apto) 
                                ELSE coalesce(p.rua,p.modulo,p.numero,p.apto) 
                            END) as cam,
                            pi.codprod,
                            l.numlote,
                            l.dtvalidade,
                            p.codfab as codfab,
                            p.descricao,
                            p.unidade as unidade,
                            nvl(p.qtunitcx,1) as qtunitcx,
                            sum(nvl(pi.qt,0)) as qt,
                            SUM(nvl(pi.qt, 0) * nvl(pi.pesobruto, p.pesobruto)) as pesobruto 
                        from 
                            jumbo.pccarreg cr 
                            JOIN jumbo.pcpedc pc ON ( pc.numcar = cr.numcar ) 
                            JOIN jumbo.pcpedi pi ON ( pi.numped = pc.numped ) 
                            LEFT OUTER JOIN jumbo.pcprodut p ON ( p.codprod = pi.codprod )     
                            LEFT OUTER JOIN jumbo.pcest e on (e.codprod = pi.codprod and e.codfilial = nvl(pi.codfilialretira, pc.codfilial))                             
                            left outer join jumbo.pcprodfilial pf on (pf.codfilial = nvl(pi.codfilialretira, pc.codfilial) and pf.codprod = pi.codprod)  
                            LEFT OUTER JOIN jumbo.pcveicul v on (v.codveiculo = cr.codveiculo) 
                            LEFT OUTER JOIN jumbo.pcconsum cs ON ( 1 = 1 ) 	 
                            left outer join ep.epunifcargas uc on (uc.nrcarga = cr.numcar and uc.idorigeminfo = 0)
                            left outer join jumbo.pclote l on (l.codfilial = e.codfilial and l.codprod = p.codprod and l.numlote = pi.numlote)
                        where 
                            cr.numcar in (${winthorLoads.join(',')}) 
                            AND pi.qt > 0 
                            AND pc.posicao in ('${positionOrders.join("','")}')
                            AND pc.origemped IN ( 'R','T','F','C','W' ) 
                            AND pc.condvenda NOT IN ( 4, 7, 14 ) 
                        group by 
                            pi.codprod,
                            l.numlote,
                            l.dtvalidade,
                            p.codfab,
                            p.descricao,
                            p.unidade,
                            nvl(p.qtunitcx,1) 
                        union all     
                        select 
                                max(uc.id) as idunifcarga,
                            to_char(${codFilial}) as codfilial,
                            (select max(cr.numcar) from jumbo.pccarreg cr where cr.numcar in (${winthorLoads.join(',')})) as numcarjumbo,
                            max(ca.nro_carga) as numcarbroker,
                            max(ca.dt_saida) as dtsaida,
                            (select max(cr.destino) from jumbo.pccarreg cr where cr.numcar in (${winthorLoads.join(',')})) as destino,
                            (select max(v.placa) from jumbo.pccarreg cr left outer join jumbo.pcveicul v on (v.codveiculo = cr.codveiculo) where cr.numcar in (${winthorLoads.join(',')})) as placajumbo,   
                            max(ca.placa) as placabroker,
                            max(CASE 
                                WHEN nvl(cs.utilizaendporfilial,'N') = 'S' THEN coalesce(e.rua,e.modulo,e.numero,e.apto) 
                                ELSE coalesce(p.rua,p.modulo,p.numero,p.apto) 
                            END) as cam,
                            ca.cd_item as codprod,
                            null as numlote,
                            null as dtvalidade,
                            p.codfab as codfab,
                            p.descricao,
                            p.unidade as unidade,
                            nvl(p.qtunitcx,1) as qtunitcx,
                            SUM(nvl(ca.qtde, 0)) as qt,
                            SUM(nvl(ca.qtde, 0) + nvl(ca.qtde_emb, 0)) pesobruto 
                        from 
                            consulta.sjdcargaaur_import ca 
                            LEFT OUTER JOIN jumbo.pcprodut p on (p.codprod = ca.cd_item) 
                            left outer join jumbo.pcest e on (e.codprod = ca.cd_item and e.codfilial = ${codFilial}) 
                            join jumbo.pcconsum cs on 1=1 
                            left outer join ep.epunifcargas uc on (uc.nrcarga = ca.nro_carga and uc.idorigeminfo = 1)
                        where 
                            ca.nro_carga in (${brokerLoads.join(',')})     
                        group by 
                            ca.cd_item,
                            null,
                            null,
                            p.codfab,                            
                            p.descricao,
                            p.unidade,
                            nvl(p.qtunitcx,1) 
                        ) 
                        group by 
                        codprod,
                        numlote,
                        dtvalidade,
                        codfab,
                        descricao 
                        order by  
                        9,10,12
                `
                res.data = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});
                res.data = res.data[0] || [];
                res.sendResponse(200,true);
            } else {
                throw new Error("missing data");
            }
        } catch (e) {
            Utils.log(e);
            res.sendResponse(501,false,e.message || e,null,e);
        }
    }    
}

module.exports = {WmsOuputsIntegrationsWinthorController}