const { Sequelize, QueryTypes } = require("sequelize");
const DBConnectionManager = require("../../../../../../database/DBConnectionManager");
const { Utils } = require("../../../../../utils/Utils");
const _ = require('lodash');
const { Parameter_Values } = require("../../../../../../database/models/Parameter_Values");
const { Parameters } = require("../../../../../../database/models/Parameters");
const { RegistersController } = require("../../../../registers/RegistersController");
const { DatabaseUtils } = require("../../../../../database/DatabaseUtils");

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
                    u.id as "id",
                    o.cod as "idorigin",
                    o.nome as "origin",
                    c.codfilial as "codfilial",
                    cj.numcar AS "cargo_number",
                    v.placa AS "plate",
                    cj.totpeso AS "totalweight",
                    cj.dtsaida AS "outputdate",
                    cj.destino AS "destiny",
                    cj.numnotas AS "invoicesamt",
                    cj.nument  AS "deliveriesamt",
                    cj.qtitens AS "itemsamt"
                from 
                    JUMBO.PCCARREG cj 
                    join JUMBO.PCPEDC c on c.numcar = cj.numcar 
                    left outer join EP.EPORIGENSINFO o on o.cod = 0 
                    left outer join JUMBO.PCVEICUL v on (v.codveiculo = cj.codveiculo) 
                    left outer join EP.EPUNIFCARGAS u on (u.idorigeminfo = 0 and u.nrcarga = cj.numcar) 
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
                    left outer join EP.EPORIGENSINFO o on o.cod = 1 
                    left outer join EP.EPNFSSAIDA s on (s.nrcarga = ca.nro_carga and s.codorigeminfo = 1) 
                    left outer join EP.EPUNIFCARGAS u on (u.idorigeminfo = 1 and u.nrcarga = ca.nro_carga) 
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
            Utils.logError(e);
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
                        EP.EPUNIFCARGAS u
                    where                        
                        ${identifiers.map(el=>`(u.IDORIGEMINFO = ${el.idorigin} AND u.NRCARGA = ${el.cargo_number})`).join(' or ')}
                `
                let data = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});
                data = data[0] || [];
                if (data.length) {
                    throw new Error('one or more loadings already unified')
                }


                //check if is same rca
                if (Utils.toBool(await Parameter_Values.get(Parameters.HAS_WINTHOR_INTEGRATION)) == true && Utils.toBool(await Parameter_Values.get(Parameters.WMS_OUTPUT_INTEGRATION_CHECK_RCA)) == true) {
                    let loadingsWinthor = [];
                    let loadingsBroker = [];
                    for(let key in identifiers) {
                        if (identifiers[key].idorigin == 0) loadingsWinthor.push(identifiers[key].cargo_number)
                        else loadingsBroker.push(identifiers[key].cargo_number);
                    }
                    let rcasWinthor = [];
                    if (loadingsWinthor.length) {
                        query = `
                            select distinct
                                CODUSUR
                            from
                                JUMBO.PCPEDC 
                            where
                                numcar in (${loadingsWinthor.join(',')})
                        `;
                        let dataRcasWinthor = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});
                        rcasWinthor = dataRcasWinthor[0] || [];
                    }

                    let rcasBroker = [];
                    if (loadingsBroker.length) {
                        query = `
                            select distinct
                                pr.idrca as CODUSUR
                            from
                                consulta.PLACAWINTXPLACABROKER pb
                                join consulta.PLACASXRCAS pr on pr.IDPLACAX = pb.id 
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

                    if (rcasWinthor.length && rcasBroker.length) {
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

                query = `select max(coalesce(id,0))+1 as PROXID from EP.EPUNIFCARGAS`;
                data = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});
                data = data[0] || [];
                let proxId = data[0].PROXID || 1;
                res.data = proxId;
                let queries = identifiers.map(el=>`insert into EP.EPUNIFCARGAS values (${proxId},${el.idorigin},${el.cargo_number},sysdate,${req.user.id})`);
                for (let key in queries) {
                    await DBConnectionManager.getConsultDBConnection().query(queries[key],{queryType:Sequelize.QueryTypes.INSERT});
                }
                res.sendResponse(200,true);

            } else {
                throw new Error("select more than 1 to proced");
            }
        } catch (e) {
            Utils.logError(e);
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
                        EP.EPUNIFCARGAS
                    where
                        ${identifiers.map(el=>` (IDORIGEMINFO=${el.idorigin} AND NRCARGA=${el.cargo_number}) `).join(' OR ')}
                `
                data = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});

                data = data[0] || [];
                if (data.length) {
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
                    if (identifiers[key].idorigin == 0) {
                        winthorLoads.push(identifiers[key].cargo_number)
                    } else {
                        brokerLoads.push(identifiers[key].cargo_number);
                    }
                }

                if (winthorLoads.length > 0) {
                    query = `
                        select max(codfilial) as CODFILIAL from JUMBO.PCPEDC where numcar in (${winthorLoads.join(',')})
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
                            JUMBO.PCCARREG cr 
                            JOIN JUMBO.PCPEDC pc ON ( pc.numcar = cr.numcar ) 
                            JOIN JUMBO.PCPEDI pi ON ( pi.numped = pc.numped ) 
                            LEFT OUTER JOIN JUMBO.PCPRODUT p ON ( p.codprod = pi.codprod )     
                            LEFT OUTER JOIN JUMBO.PCEST e on (e.codprod = pi.codprod and e.codfilial = nvl(pi.codfilialretira, pc.codfilial))                             
                            left outer join JUMBO.PCPRODFILIAL pf on (pf.codfilial = nvl(pi.codfilialretira, pc.codfilial) and pf.codprod = pi.codprod)  
                            LEFT OUTER JOIN JUMBO.PCVEICUL v on (v.codveiculo = cr.codveiculo) 
                            LEFT OUTER JOIN JUMBO.PCCONSUM cs ON ( 1 = 1 ) 	 
                            left outer join EP.EPUNIFCARGAS uc on (uc.nrcarga = cr.numcar and uc.idorigeminfo = 0)
                            left outer join JUMBO.PCLOTE l on (l.codfilial = e.codfilial and l.codprod = p.codprod and l.numlote = pi.numlote)
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
                            (select max(cr.numcar) from JUMBO.PCCARREG cr where cr.numcar in (${winthorLoads.join(',')})) as numcarjumbo,
                            max(ca.nro_carga) as numcarbroker,
                            max(ca.dt_saida) as dtsaida,
                            (select max(cr.destino) from JUMBO.PCCARREG cr where cr.numcar in (${winthorLoads.join(',')})) as destino,
                            (select max(v.placa) from JUMBO.PCCARREG cr left outer join JUMBO.PCVEICUL v on (v.codveiculo = cr.codveiculo) where cr.numcar in (${winthorLoads.join(',')})) as placajumbo,   
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
                            LEFT OUTER JOIN JUMBO.PCPRODUT p on (p.codprod = ca.cd_item) 
                            left outer join JUMBO.PCEST e on (e.codprod = ca.cd_item and e.codfilial = ${codFilial}) 
                            join JUMBO.PCCONSUM cs on 1=1 
                            left outer join EP.EPUNIFCARGAS uc on (uc.nrcarga = ca.nro_carga and uc.idorigeminfo = 1)
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
            Utils.logError(e);
            res.sendResponse(501,false,e.message || e,null,e);
        }
    }    



    static async getVariableWeightSeparationMap(req,res) {
        try {
            let where = req.body?.queryParams?.where;
            console.log('where antes',where);
            where = DatabaseUtils.whereToString(where);
            console.log('where depois',where);
            if (!Utils.hasValue(where)) {
                where = '1=2';
            }
            let query = `
                select
                    pcpedc.codfilial,
                    pcfilial.cidade as filial,
                    pcpraca.rota as codrota,
                    pcrotaexp.descricao as rota,
                    pcpedc.codpraca,
                    pcpraca.praca,
                    case 
                        when nvl(pcconsum.utilizaendporfilial,'N') = 'S' then 
                            coalesce(pcest.rua,pcest.modulo,pcest.numero,pcest.apto) 
                        else 
                            coalesce(pcprodut.rua,pcprodut.modulo,pcprodut.numero,pcprodut.apto) 
                    end as cam,
                    pcpedc.numcar,
                    pcpedc.codcli,
                    pcclient.cliente,
                    pcpedc.codusur as codrca,
                    pcusuari.nome as rca,
                    pcpedc.numped,
                    pcpedc.data,
                    pcpedc.posicao,
                    pcpedi.codprod,
                    pcprodut.codfab,
                    pcprodut.descricao,
                    nvl(pcembalagem.embalagem,pcprodut.embalagem) as embalagem,
                    nvl(pcpedi.unidade,pcprodut.unidade) as unidade,
                    pclote.dtvalidade,
                    nvl(pcpedi.qtunitcx,pcprodut.qtunitcx) as qtunitcx,
                    pcprodut.multiplo,
                    pcpedi.qt + nvl(pcpedi.qtdifpeso,0) as qt,
                    (pcpedi.qt + nvl(pcpedi.qtdifpeso,0)) / nvl(pcpedi.qtunitcx,pcprodut.qtunitcx) as qtcx,
                    case 
                        when nvl(pcpedi.qtdifpeso,0) <> 0 then
                            pcpedi.qt
                        else
                            null
                    end as qtpesado
                from
                    jumbo.pcpedc 
                    join jumbo.pcconsum on 1=1
                    join jumbo.pcfilial on pcfilial.codigo = pcpedc.codfilial
                    join jumbo.pcclient on pcclient.codcli = pcpedc.codcli
                    join jumbo.pcusuari on pcusuari.codusur = pcpedc.codusur
                    join jumbo.pcpedi on pcpedi.numped = pcpedc.numped
                    join jumbo.pcprodut on (
                        pcprodut.codprod = pcpedi.codprod
                        AND nvl(pcprodut.tipoestoque, 'PA') = 'FR'
                        AND nvl(pcprodut.pesovariavel, 'N') = 'S'
                    )
                    join jumbo.pcest on (
                        pcest.codfilial = pcpedc.codfilial
                        and pcest.codprod = pcpedi.codprod
                    )
                    left outer join jumbo.pcembalagem on (
                        pcembalagem.codfilial = pcpedc.codfilial
                        and pcembalagem.codauxiliar = pcpedi.codauxiliar
                    )
                    left outer join jumbo.pcpraca on pcpraca.codpraca = pcpedc.codpraca
                    left outer join jumbo.pcrotaexp on pcrotaexp.codrota = pcpraca.rota
                    left outer join jumbo.pclote on (pclote.codfilial = pcpedc.codfilial and pclote.codprod = pcpedi.codprod and pclote.numlote = pcpedi.numlote)
                where
                    ${where}
            `;
            let dataResult = await DBConnectionManager.getWinthorDBConnection().query(
                query,
                {
                    type:QueryTypes.SELECT
                }
            );

            console.log(dataResult);

            res.data = dataResult || [];


            res.sendResponse(200,true);
        } catch (e) {
            Utils.logError(e);
            res.sendResponse(501,false,e.message || e,null,e);
        }
    }
}

module.exports = {WmsOuputsIntegrationsWinthorController}