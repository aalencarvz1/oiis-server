const { PcClient } = require("../../../../../../../database/models/winthor/PcClient");
const { Utils } = require('../../../../../../utils/Utils');
const { Sequelize, QueryTypes } = require('sequelize');
const { PcPixCobrancaDados } = require('../../../../../../../database/models/winthor/PcPixCobrancaDados');
const { SicrediApiPixController } = require('./SicrediApiPixController');
const { PcPrest } = require('../../../../../../../database/models/winthor/PcPrest');
const DBConnectionManager = require('../../../../../../../database/DBConnectionManager');
const { PcEstcr } = require('../../../../../../../database/models/winthor/PcEstcr');
const { PcConsum } = require('../../../../../../../database/models/winthor/PcConsum');
const { PcCob } = require('../../../../../../../database/models/winthor/PcCob');
const { PcNfsaid } = require("../../../../../../../database/models/winthor/PcNfsaid");
const { Parameter_Values } = require("../../../../../../../database/models/Parameter_Values");
const { Parameters } = require("../../../../../../../database/models/Parameters");
const { RegistersController } = require("../../../../../registers/RegistersController");


/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-25-08
 */
class SicrediIntegrationsPixController extends RegistersController{
    static #pixKey = "+5545991334657";    

    static async get(req,res,next) {
        try {                                       
            let result = await SicrediApiPixController.getPix(req.body || {});
            res.sendResponse(
                result?.status || 501,
                result?.success || false, 
                result?.message,
                result?.data,
                result?.exception
            );
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    static async create(req,res,next) {
        try {
            let bodyParams = req?.body || {};            
            if (!bodyParams || !bodyParams?.value) throw new Error("missing data");
            let pcClient = null;
            let trans = null;
            let nf = null;

            let pixParams = {
                valor: {
                    original: Utils.toNumber(bodyParams?.value)
                },
                chave: this.#pixKey
            };

            if (!pixParams.valor.original || pixParams.valor.original < 0) throw new Error("value invalid");


            let integrateWinthor = Utils.toBool(await Parameter_Values.get(Parameters.HAS_WINTHOR_INTEGRATION));


            //ESTA RETORNANDO false, VER PORQUE

            Utils.log('integrateWinthor',integrateWinthor);

            if (bodyParams?.codcli) {
                if (integrateWinthor) {
                    pcClient = await PcClient.getModel().findOne({
                        raw:true,
                        attributes:Object.keys(PcClient.fields).map(el=>Sequelize.col(`${PcClient.tableName}.${el}`)),
                        where:{
                            CODCLI:bodyParams.codcli
                        }
                    });                
                    
                    if (!pcClient) throw new Error("client not found");
                    pixParams.devedor = {
                        nome: (pcClient.CLIENTE || '').substring(0,199) 
                    };

                    if (pcClient.TIPOFJ == 'J') pixParams.devedor.cnpj = pcClient.CGCENT.replace(/[^0-9]/g,'')
                    else pixParams.devedor.cpf = pcClient.CGCENT.replace(/[^0-9]/g,'');
                }
            }

            if (Utils.hasValue(bodyParams?.numtrans)) {
                if (integrateWinthor) {
                    trans = await PcNfsaid.getModel().findOne({
                        raw: true,
                        where:{
                            NUMTRANSVENDA: bodyParams.numtrans,
                            ESPECIE: 'NF',
                            DTCANCEL: {
                                [Sequelize.Op.is] : null
                            }
                        }
                    });
                    //if (!trans) throw new Error("numtrans not found");                                        
                    
                    let wherePix = [{
                        NUMTRANSVENDA:bodyParams.numtrans,
                    }];
                    
                    if (Utils.hasValue(bodyParams?.prest)) {
                        wherePix.push({PREST:bodyParams.prest});
                    }
                    wherePix.push({STATUS: {
                        [Sequelize.Op.in] : ['ATIVA','CONCLUIDA']
                    }});                    

                    let pixWinthor = await PcPixCobrancaDados.getModel().findOne({
                        where:{                               
                            [Sequelize.Op.and]: wherePix
                        }
                    });
                    if (pixWinthor) throw new Error("pix exists on winthor with numtransvenda and status='ATIVA' or status='CONCLUIDA'");
                 }

                pixParams.infoAdicionais = pixParams?.infoAdicionais || [];
                pixParams.infoAdicionais.push({
                    nome:"numtrans",
                    valor:bodyParams.numtrans
                });
            }

            if (Utils.hasValue(bodyParams?.numnf)) {
                if (integrateWinthor) {
                    nf = await PcNfsaid.getModel().findOne({
                        raw: true,
                        where:{
                            NUMNOTA: bodyParams?.numnf,
                            ESPECIE: 'NF',
                            DTCANCEL: {
                                [Sequelize.Op.is] : null
                            }
                        }
                    });
                    //if (!nf) throw new Error("numnf not found");
                }
                pixParams.infoAdicionais = pixParams?.infoAdicionais || [];
                pixParams.infoAdicionais.push({
                    nome:"numnf",
                    valor:bodyParams.numnf
                });
            }

            if (Utils.hasValue(bodyParams?.prest)) {
                pixParams.infoAdicionais = pixParams?.infoAdicionais || [];
                pixParams.infoAdicionais.push({
                    nome:"prest",
                    valor:bodyParams.prest
                });
            }

            let responseJson = await SicrediApiPixController.createPix(pixParams);                      
            if (!responseJson) throw new Error("responseJson is null");
            res.data = responseJson?.data || responseJson;
            if (res?.data?.status != 'ATIVA' && res?.data?.status > 400 && res?.data?.status < 499) {
                throw new Error((res?.data?.title || '')+':' + (res?.data?.detail || '') + '('+res?.data?.violacoes.reduce((prev,current)=>prev += current?.razao + '['+current?.propriedade+']')+')');
            }
            
            if ((res?.data?.status || '') == 'ATIVA' && Utils.hasValue(res?.data?.txid)) {

                if (integrateWinthor && bodyParams?.numtrans) {                     
                    let whereOr = [{                                
                        NUMTRANSPAGDIGITAL: res?.data?.txid
                    }];                    
                    let whereOrAnd = [{
                        STATUS:'ATIVA'
                    }];
                    if (bodyParams?.numtrans) whereOrAnd.push({NUMTRANSVENDA:bodyParams.numtrans});
                    if (bodyParams?.prest) whereOrAnd.push({PREST:bodyParams.prest});

                    whereOr.push({[Sequelize.Op.and]:whereOrAnd});
                    let pixWinthor = await PcPixCobrancaDados.getModel().findOne({
                        where:{[Sequelize.Op.or] : whereOr}
                    });
                    if (pixWinthor) {
                        pixWinthor.STATUS =  res?.data?.status;
                        pixWinthor.FILIAL =  trans?.CODFILIAL || nf?.CODFILIAL || pcClient?.CODFILIALNF;
                        pixWinthor.LINK =  res?.data?.location;
                        pixWinthor.QRCODE =  res?.data?.pixCopiaECola;
                        pixWinthor.VENCIMENTO =  res?.data?.calendario?.vencimento;
                        pixWinthor.DESCRICAO =  res?.data?.solicitacaoPagador;
                        pixWinthor.NUMTRANSVENDA =  bodyParams?.numtrans;
                        pixWinthor.PREST =  bodyParams?.prest;
                        await pixWinthor.save();
                    } else {
                        pixWinthor = await PcPixCobrancaDados.getModel().create({
                            NUMTRANSPAGDIGITAL: res?.data?.txid,
                            STATUS: res?.data?.status,
                            FILIAL: trans?.CODFILIAL || nf?.CODFILIAL || pcClient?.CODFILIALNF,
                            LINK: res?.data?.location,
                            QRCODE: res?.data?.pixCopiaECola,
                            VENCIMENTO: res?.data?.calendario?.vencimento,
                            DESCRICAO: res?.data?.solicitacaoPagador,
                            NUMTRANSVENDA: bodyParams?.numtrans,
                            PREST:bodyParams?.prest
                        });
                    }
                }

                res.sendResponse(200,true);
            } else {
                res.sendResponse(200,false,)
            }                           
        } catch (e) {
            Utils.log(e);
            res.sendResponse(501,false,e.message || e, null, e);
        }
    }
    static put = this.create;

    static async delete(req,res,next) {
        try {
            
            let bodyParams = req?.body || {};
            if (!bodyParams || !bodyParams?.identifiers) throw new Error("missing data");
            
            
            let txIdentifiers = bodyParams.identifiers;
            res.data = [];


            if (Utils.typeOf(txIdentifiers) != 'array') {
                txIdentifiers = txIdentifiers.split(',');
            }

            for(let key in txIdentifiers) {
                let responseJson = await SicrediApiPixController.deletePix({txid:txIdentifiers[key]});                
                if (!responseJson) throw new Error("responseJson is null");
                if (responseJson?.data?.status > 400 && responseJson?.data?.status < 499 ) {
                    throw new Error((responseJson?.data?.title || '')+':' + (responseJson?.data?.detail || '') + '('+responseJson?.data?.violacoes.reduce((prev,current)=>prev += current?.razao + '['+current?.propriedade+']')+')');
                }
                res.data.push(responseJson?.data || responseJson);                    

                if (Utils.toBool(await Parameter_Values.get(Parameters.HAS_WINTHOR_INTEGRATION))) {
                    let pixWinthor = await PcPixCobrancaDados.getModel().findOne({
                        where:{
                            NUMTRANSPAGDIGITAL: txIdentifiers[key]
                        }
                    });
                    if (pixWinthor) {
                        pixWinthor.STATUS =  responseJson?.data?.status;
                        await pixWinthor.save();
                    } 
                }
            }
            res.sendResponse(200,true);                                
        } catch (e) {
            Utils.log(e);
            res.sendResponse(501,false,e.message || e, null, e);
        }
    }


    static async getPixWebHooks(req,res) {
        try {                        
            let result = await SicrediApiPixController.getPixWebHooks(req.body || {});
            res.sendResponse(
                result?.status || 501,
                result?.success || false, 
                result?.message,
                result?.data,
                result?.exception
            );                     
        } catch (e) {
            Utils.log(e);
            res.sendResponse(501,false,e.message || e, null, e);
        }
    }

    static async createPixWebHook(req,res) {
        try {
            let result = await SicrediApiPixController.createPixWebHook(req.body || {});
            res.sendResponse(
                result?.status || 501,
                result?.success || false, 
                result?.message,
                result?.data,
                result?.exception
            ); 
        } catch (e) {
            Utils.log(e);
            res.sendResponse(501,false,e.message || e, null, e);
        }
    }

    static async deletePixWebHook(req,res,next,getNewApiPixToken,recursiveCount) {
        try {            
            let bodyParams = req?.body || {};
            if (!bodyParams || !bodyParams?.identifiers) throw new Error("missing data");
            
            
            let webhookIdentifiers = bodyParams.identifiers;
            res.exception = [];

            for(let key in webhookIdentifiers) {
                let responseJson = await SicrediApiPixController.deletePixWebHook({chave:webhookIdentifiers[key]});
                if (responseJson?.status != 204) {
                    res.exception.push(responseJson);                                        
                }                
            }
            if (res.exception.length > 0) {
                res.sendResponse(501,false,res.exception.map(el=>(el?.data?.title || '')+':' + (el?.data?.detail || '')));
            } else {
                res.sendResponse(200,true);                                
            }
        } catch (e) {
            Utils.log(e);
            res.sendResponse(501,false,e.message || e, null, e);
        }
    }

    static async downWinthorTitle(params) {
        Utils.log("downWinthorTitle","INIT");
        let result = false;
        try {
            if (params.numtrans) {
                Utils.log("downWinthorTitle",params);
                let pcPrest = await PcPrest.getModel().findOne({
                    where:{
                        [Sequelize.Op.and]:[{
                            NUMTRANSVENDA:params.numtrans                        
                        },{
                            DTPAG: {
                                [Sequelize.Op.is]: null
                            }
                        },{
                            DTCANCEL: {
                                [Sequelize.Op.is]: null
                            }
                        },{
                            CODCOB: {
                                [Sequelize.Op.notIn]: ['DESD','CRED','DEVT','ESTR', 'CANC'] 
                            }
                        },{
                            VALOR:Utils.toNumber(params.pix.valor.original)
                        },Sequelize.where(
                            Sequelize.fn('nvl',Sequelize.col('PREST'),1),
                            Sequelize.literal(Utils.firstValid([params?.prest,1]))
                        )]
                    }
                });
                if (pcPrest) {
                    let dowed = false;
                    let wintConnection = DBConnectionManager.getWinthorDBConnection();
                    await wintConnection.transaction(async transaction=>{
                        Utils.log("downWinthorTitle","ok1");
                        pcPrest = await wintConnection.query(`
                            select
                                *
                            from 
                                JUMBO.PCPREST p
                            where
                                p.NUMTRANSVENDA = ${params.numtrans}
                                and p.dtpag is null
                                and p.dtcancel is null
                                and p.codcob not in ('DESD','CRED','DEVT','ESTR', 'CANC')
                                and nvl(p.prest,1) = ${Utils.firstValid([params?.prest,1])}
                            FOR UPDATE NOWAIT
                        `,{
                            queryType: QueryTypes.SELECT,
                            model: PcPrest.getModel(wintConnection),                                                        
                        });
                        if (pcPrest) {
                            pcPrest = pcPrest[0];
                        }
                        Utils.log("downWinthorTitle","ok2");
                        Utils.log("pcPrest",pcPrest);
                        Utils.log("downWinthorTitle","ok2.1");
                        if (pcPrest) {
                            Utils.log("downWinthorTitle","ok3");
                            let pcCob = await PcCob.getModel(wintConnection).findOne({
                                raw: true,
                                attributes:[
                                    Sequelize.literal("nvl(CARTAO,'N') as CARTAO")
                                ],
                                where:{
                                    CODCOB: pcPrest.CODCOB
                                }
                            });

                            if (pcCob) {
                                let pcEstcr = await wintConnection.query(`
                                    select
                                        * 
                                    from
                                        JUMBO.PCESTCR
                                    where
                                        codbanco=748
                                        and codcob='D'
                                    FOR UPDATE NOWAIT
                                `,{
                                    queryType: QueryTypes.SELECT,
                                    model: PcEstcr.getModel(wintConnection),
                                });                        
                                if (pcEstcr) {
                                    pcEstcr = pcEstcr[0];
                                }
                                Utils.log("downWinthorTitle","ok3.1");                                

                                if (pcEstcr) {

                                    if (pcCob.CARTAO == 'S') {

                                        let pcClient = await PcClient.getModel(wintConnection).findOne({
                                            raw:true,
                                            attributes:Object.keys(PcClient.fields).map(el=>Sequelize.col(`${PcClient.tableName}.${el}`)),
                                            where:{
                                                CODCLI: pcPrest.CODCLI
                                            }
                                        });

                                        //DESDOBRAMENTO
                                        await wintConnection.query(`
                                            INSERT INTO PCPREST (
                                                numtransvenda,
                                                codcli,
                                                dtemissao,
                                                prest,
                                                duplic,
                                                valor,
                                                codcob,
                                                dtvenc,
                                                codfilial,
                                                codfilialnf,
                                                codusur,
                                                vpago,
                                                dtpag,
                                                vldevol,
                                                perdesc,
                                                dtbaixa,
                                                codfuncfecha,
                                                codfunccxmot,
                                                codbaixa,
                                                dtfecha,
                                                dtcxmot,
                                                dtestorno,
                                                dtultalter,
                                                codfuncultalter,
                                                obs,
                                                obs2,
                                                tipoprest,
                                                numtransvendast,
                                                numassocdni,
                                                dtassociadnicli,
                                                codfuncdnicli,
                                                txpermprevisto,
                                                dtrecebimentoprevisto,
                                                txpermprevreal,
                                                obstitulo,
                                                historigdesdobramento,
                                                nsuhost,
                                                dtmovimentocx,
                                                dttransacaocc,
                                                valormulta,
                                                codcobsefaz,
                                                pastaarquivoboleto,
                                                percomliq,
                                                valordescorig,
                                                nsutef,
                                                dtvencvale,
                                                agrupado,
                                                codadmcartao,
                                                presttef,
                                                dtemissaoorig,
                                                tipooperacaotef,
                                                bloqdesdemitentedif,
                                                codautorizacaotef,
                                                numcartao,
                                                codfuncconcil,
                                                dtconcil,
                                                dtconcilvenc,
                                                codfuncconcilvenc,
                                                somatxboleto,
                                                permiteestorno,
                                                codemitentepedido,
                                                dtcriacao,
                                                chequeterceiro,
                                                dtbaixacred,
                                                qtparcelaspos,
                                                codagentecobranca,
                                                dtprocessamento,
                                                dtaberturaconta,
                                                codfuncprorrog,
                                                codusur4,
                                                percom4,
                                                dtpagcomissao2,
                                                dtpagcomissao3,
                                                dtpagcomissao4,
                                                codprofissional,
                                                rotinalanc,
                                                dtcxmothhmmss,
                                                vlroutrosacresc,
                                                numtrans,
                                                dtdevol,
                                                dtlancprorrog,
                                                dtvencorig,
                                                codsupervisor,
                                                tipo,
                                                linhadig,
                                                codbarra,
                                                valororig,
                                                codcoborig,
                                                codepto,
                                                dtvendor,
                                                percom,
                                                valorliqcom,
                                                vltxboleto,
                                                nossonumbco2,
                                                codmotorista,
                                                codfuncvale,
                                                codhistvale,
                                                dtpagcomissao,
                                                dvcob,
                                                numtransentdevcli,
                                                numped,
                                                codfuncdesd,
                                                codfuncvend,
                                                numcontacorrente,
                                                horadesd,
                                                minutodesd,
                                                horafecha,
                                                minutofecha,
                                                cgccpfch,
                                                codusur2,
                                                numcheckout,
                                                codfunccheckout,
                                                compensacaobco,
                                                dvagencia,
                                                dvconta,
                                                dvcheque,
                                                codusur3,
                                                rotdesd,
                                                percom2,
                                                percom3,
                                                tipoportador,
                                                codportador,
                                                codocorrbaixa,
                                                numbordero,
                                                dtbordero,
                                                codfuncbordero,
                                                numdiasprazoprotesto,
                                                codbancocm,
                                                txperm,
                                                operacao,
                                                status,
                                                valordesc,
                                                boleto,
                                                numbanco,
                                                numagencia,
                                                numcheque,
                                                dtlancch,
                                                numcar,
                                                dtdesd,
                                                nossonumbco
                                            ) select
                                                p.numtransvenda,
                                                p.codcli,
                                                p.dtemissao,
                                                nvl(p.prest,0)+1,
                                                p.duplic,
                                                p.valor,
                                                'D',
                                                p.dtvenc,
                                                p.codfilial,
                                                p.codfilialnf,
                                                p.codusur,
                                                null,
                                                null,
                                                p.vldevol,
                                                p.perdesc,
                                                null,
                                                null,
                                                null,
                                                null,
                                                null,
                                                null,
                                                p.dtestorno,
                                                p.dtultalter,
                                                142,
                                                p.obs,
                                                'Desdobrado via api pix',
                                                p.tipoprest,
                                                p.numtransvendast,
                                                p.numassocdni,
                                                p.dtassociadnicli,
                                                p.codfuncdnicli,
                                                p.txpermprevisto,
                                                trunc(sysdate),
                                                p.txpermprevreal,
                                                p.obstitulo,
                                                p.duplic || '-' || p.prest,
                                                p.nsuhost,
                                                p.dtmovimentocx,
                                                p.dttransacaocc,
                                                p.valormulta,
                                                p.codcobsefaz,
                                                p.pastaarquivoboleto,
                                                p.percomliq,
                                                p.valordescorig,
                                                p.nsutef,
                                                nvl(p.dtvencvale,to_date('31/12/1999','dd/mm/yyyy')),
                                                p.agrupado,
                                                p.codadmcartao,
                                                p.presttef,
                                                p.dtemissaoorig,
                                                p.tipooperacaotef,
                                                p.bloqdesdemitentedif,
                                                p.codautorizacaotef,
                                                p.numcartao,
                                                p.codfuncconcil,
                                                p.dtconcil,
                                                p.dtconcilvenc,
                                                p.codfuncconcilvenc,
                                                p.somatxboleto,
                                                p.permiteestorno,
                                                p.codemitentepedido,
                                                null,
                                                p.chequeterceiro,
                                                p.dtbaixacred,
                                                p.qtparcelaspos,
                                                p.codagentecobranca,
                                                p.dtprocessamento,
                                                p.dtaberturaconta,
                                                p.codfuncprorrog,
                                                p.codusur4,
                                                p.percom4,
                                                p.dtpagcomissao2,
                                                p.dtpagcomissao3,
                                                p.dtpagcomissao4,
                                                p.codprofissional,
                                                1228,
                                                p.dtcxmothhmmss,
                                                p.vlroutrosacresc,
                                                null,
                                                p.dtdevol,
                                                p.dtlancprorrog,
                                                p.dtvencorig,
                                                p.codsupervisor,
                                                p.tipo,
                                                p.linhadig,
                                                p.codbarra,
                                                p.valororig,
                                                p.codcob,
                                                p.codepto,
                                                p.dtvendor,
                                                p.percom,
                                                p.valorliqcom,
                                                p.vltxboleto,
                                                p.nossonumbco2,
                                                p.codmotorista,
                                                p.codfuncvale,
                                                p.codhistvale,
                                                p.dtpagcomissao,
                                                p.dvcob,
                                                p.numtransentdevcli,
                                                p.numped,
                                                142,
                                                p.codfuncvend,
                                                p.numcontacorrente,
                                                to_char(sysdate,'hh24'),
                                                to_char(sysdate,'mi'),
                                                null,
                                                null,
                                                nvl(p.cgccpfch,'${pcClient.CGCENT}'),
                                                p.codusur2,
                                                p.numcheckout,
                                                p.codfunccheckout,
                                                p.compensacaobco,
                                                p.dvagencia,
                                                p.dvconta,
                                                p.dvcheque,
                                                p.codusur3,
                                                1228,
                                                p.percom2,
                                                p.percom3,
                                                p.tipoportador,
                                                p.codportador,
                                                p.codocorrbaixa,
                                                p.numbordero,
                                                p.dtbordero,
                                                p.codfuncbordero,
                                                p.numdiasprazoprotesto,
                                                p.codbancocm,
                                                p.txperm,
                                                p.operacao,
                                                p.status,
                                                p.valordesc,
                                                p.boleto,
                                                p.numbanco,
                                                p.numagencia,
                                                p.numcheque,
                                                p.dtlancch,
                                                p.numcar,
                                                trunc(sysdate),
                                                p.nossonumbco
                                            from
                                                PCPREST p
                                            where 
                                                p.numtransvenda = ${pcPrest.NUMTRANSVENDA}
                                                and nvl(p.prest,1) = ${Utils.firstValid([pcPrest.PREST,1])}                                    
                                        `,{
                                            type:Sequelize.QueryTypes.INSERT,
                                            transaction:transaction
                                        });

                                        Utils.log("downWinthorTitle","ok3.1");

                                        let newPcPrest = await PcPrest.getModel(wintConnection).findOne({
                                            where:{
                                                [Sequelize.Op.and]:[{
                                                    NUMTRANSVENDA:params.numtrans                        
                                                },Sequelize.where(
                                                    Sequelize.fn('nvl',Sequelize.col('PREST'),1),
                                                    Sequelize.literal((Utils.firstValid([params?.prest,1])-0)+1)
                                                )]
                                            },
                                            transaction:transaction
                                        });
                                        Utils.log("downWinthorTitle","ok3.2");

                                        if (newPcPrest) {
                                            Utils.log("downWinthorTitle","ok3.2.1");
                                            let oldPcPrest = pcPrest;
                                            pcPrest = newPcPrest;
                                            oldPcPrest.CODCOB = "DESD";
                                            oldPcPrest.DTDESD = Sequelize.literal("TRUNC(SYSDATE)");
                                            oldPcPrest.DTCXMOT = Sequelize.literal("TRUNC(SYSDATE)");
                                            oldPcPrest.VPAGO = Utils.toNumber(oldPcPrest.VALOR);
                                            oldPcPrest.DTPAG = Sequelize.literal("TRUNC(SYSDATE)");
                                            oldPcPrest.CODFUNCULTALTER = 142, 
                                            oldPcPrest.DTFECHA = Sequelize.literal("TRUNC(SYSDATE)");
                                            oldPcPrest.CODFUNCDESD = 142, 
                                            oldPcPrest.ROTDESD = 1228, 
                                            oldPcPrest.DTBAIXA = Sequelize.literal("TRUNC(SYSDATE)");
                                            oldPcPrest.HORADESD = Sequelize.literal("TO_CHAR(SYSDATE,'HH24')");
                                            oldPcPrest.MINUTODESD = Sequelize.literal("TO_CHAR(SYSDATE,'MI')");
                                            oldPcPrest.CARTORIO = 'N';
                                            oldPcPrest.PROTESTO = 'N'; 
                                            oldPcPrest.DTEMISSAOORIG = Sequelize.col('DTEMISSAO'), 
                                            oldPcPrest.DTCRIACAO = Sequelize.literal("TRUNC(SYSDATE)");
                                            oldPcPrest.MINUTOFECHA = Sequelize.literal("TO_CHAR(SYSDATE,'MI')");                                    
                                            oldPcPrest.HORAFECHA = Sequelize.literal("TO_CHAR(SYSDATE,'HH24')");
                                            oldPcPrest.PRESTTEF = oldPcPrest.PREST;
                                            oldPcPrest.CODBAIXA = 93; //CODFUNC OU TIPO DE BAIXA???
                                            oldPcPrest.OBS2 = 'Desdobrado via api pix';
                                            Utils.log("downWinthorTitle","ok3.2.2");
                                            await oldPcPrest.save({transaction:transaction});
                                            Utils.log("downWinthorTitle","ok3.2.3");

                                            await wintConnection.query(`
                                                INSERT INTO PCDESD (
                                                    NUMTRANSVENDADEST,
                                                    PRESTDEST,
                                                    CODCLIDEST,
                                                    NUMTRANSVENDAORIG,
                                                    PRESTORIG,
                                                    CODCLIORIG,
                                                    DTLANC,
                                                    CODROTINA,
                                                    CODFUNCCXMOT
                                                ) VALUES (
                                                    ${newPcPrest.NUMTRANSVENDA},
                                                    ${newPcPrest.PREST},
                                                    ${newPcPrest.CODCLI},
                                                    ${oldPcPrest.NUMTRANSVENDA},
                                                    ${oldPcPrest.PREST},
                                                    ${oldPcPrest.CODCLI},
                                                    sysdate,
                                                    1228,
                                                    142
                                                )
                                            `,{
                                                type:Sequelize.QueryTypes.INSERT,
                                                transaction:transaction
                                            });
                                            Utils.log("downWinthorTitle","ok3.2.4");
                                        }
                                    }
                                } else {
                                    throw new Error(`PCESTCR not found ${'748'} ${'D'}`);
                                }


                                Utils.log("downWinthorTitle","ok4");
                                let pcConsum = await wintConnection.query(`
                                    select 
                                        nvl(PROXNUMTRANS,0) PROXNUMTRANS,
                                        nvl(PROXNUMLANC,0) PROXNUMLANC 
                                    from
                                        JUMBO.PCCONSUM
                                    where
                                        1=1
                                    FOR UPDATE                                    
                                `,{
                                    queryType: QueryTypes.SELECT,
                                    model: PcConsum.getModel(wintConnection)
                                });
                                if (pcConsum) {
                                    pcConsum = pcConsum[0];
                                }
                                Utils.log("downWinthorTitle","ok5");
                                let numtrans = (pcConsum?.PROXNUMTRANS||0)-0;
                                //pcConsum.PROXNUMTRANS = numtrans+2;//winthor faz duas vezes lock e duas vezes update + 1 sequencialmente //Sequelize.literal('nvl(PROXNUMTRANS,0) + 1'); NAO FUNCIONA ASSIM
                                let numlanc = (pcConsum?.PROXNUMLANC||0)-0;
                                //pcConsum.PROXNUMLANC = numlanc + 1;//Sequelize.literal('nvl(PROXNUMLANC,0) + 1');


                                await wintConnection.query(`
                                    UPDATE 
                                        JUMBO.PCCONSUM 
                                    SET
                                        PROXNUMTRANS = nvl(PROXNUMTRANS,1) + 2, 
                                        PROXNUMLANC = nvl(PROXNUMLANC,1) + 1 
                                `,{
                                    type:Sequelize.QueryTypes.UPDATE,
                                    transaction:transaction
                                });

                                //await pcConsum.save({transaction:transaction});
                                //Utils.log("downWinthorTitle","ok6",numtrans,numlanc);
                                pcPrest.CODCOB = 'D';
                                pcPrest.VPAGO = Utils.toNumber(params.pix.valor.original);
                                pcPrest.TXPERM = Sequelize.fn('decode',Sequelize.col('TXPERM'),Sequelize.literal('0'),Sequelize.literal('null'),Sequelize.col('TXPERM'));
                                pcPrest.DTPAG = Sequelize.literal('trunc(sysdate)');
                                pcPrest.VALORDESC = 0;
                                pcPrest.PERDESC = 0;
                                pcPrest.VALORMULTA = 0;
                                pcPrest.VLRDESPBANCARIAS = 0;
                                pcPrest.VLRDESPCARTORAIS = 0;
                                pcPrest.VLROUTROSACRESC = 0;
                                pcPrest.VLRTOTDESPESASEJUROS = 0;
                                pcPrest.DTVENCVALE = Sequelize.fn('to_date',Sequelize.literal("'31/12/1899'"),Sequelize.literal("'dd/mm/yyyy'"));
                                pcPrest.CODHISTVALE = 0;
                                pcPrest.CODFUNCVALE = 0;
                                pcPrest.DTULTALTER = Sequelize.literal('trunc(sysdate)');
                                pcPrest.CODFUNCULTALTER = 142;                        
                                pcPrest.DTBAIXA = Sequelize.literal('trunc(sysdate)');
                                pcPrest.CODBAIXA = 142;
                                pcPrest.DTFECHA = Sequelize.fn('nvl',Sequelize.col('DTFECHA'),Sequelize.literal('trunc(sysdate)'));
                                pcPrest.DTCXMOT = Sequelize.literal('trunc(sysdate)');
                                pcPrest.CODFUNCCXMOT = 142;
                                pcPrest.CARTORIO = 'N';
                                pcPrest.PROTESTO = 'N';
                                pcPrest.OBS2 = 'Baixado via api pix';
                                pcPrest.OBSTITULO = 'Baixado via api pix';
                                pcPrest.CODBANCO = 748;
                                pcPrest.CODBARRA = null;
                                pcPrest.LINHADIG = null;                                                                            
                                pcPrest.CODCOBBANCO = 'D';
                                pcPrest.NUMDIASCARENCIA = 0;
                                pcPrest.DATAHORAMINUTOBAIXA = Sequelize.literal('sysdate');
                                pcPrest.CODFUNCFECHA = Sequelize.literal("(CASE WHEN NVL(CODFUNCFECHA,0) = 0 THEN 142 ELSE CODFUNCFECHA END)");

                                pcPrest.NUMTRANS = numtrans; //erro
                                pcPrest.ROTINALANCULTALT = 'API PIX';
                                pcPrest.ROTINAPAG = '[PCSIS1207 - 33.00.04.06]';
                                pcPrest.ROTINAFECHA = '[PCSIS1207 - 33.00.04.06]';

                                Utils.log("downWinthorTitle","ok7");
                                await pcPrest.save({transaction:transaction});
                                Utils.log("downWinthorTitle","ok8");

                                await wintConnection.query(`
                                    INSERT INTO pclogcr (
                                        codfilial, duplic, prest, data,rotina, codcli, numtransvenda, codfunc
                                    ) VALUES (
                                        ${pcPrest.CODFILIAL}, ${pcPrest.DUPLIC}, ${pcPrest.PREST}, TRUNC(SYSDATE), '1207-2', ${pcPrest.CODCLI}, ${pcPrest.NUMTRANSVENDA}, 142
                                    )
                                `,{
                                    type:Sequelize.QueryTypes.INSERT,
                                    transaction:transaction
                                });

                                //rotina 1207 insere duas vezes este log
                                await wintConnection.query(`
                                    INSERT INTO pclogcr (
                                        codfilial, duplic, prest, data,rotina, codcli, numtransvenda, codfunc
                                    ) VALUES (
                                        ${pcPrest.CODFILIAL}, ${pcPrest.DUPLIC}, ${pcPrest.PREST}, TRUNC(SYSDATE), '1207-2', ${pcPrest.CODCLI}, ${pcPrest.NUMTRANSVENDA}, 142
                                    )
                                `,{
                                    type:Sequelize.QueryTypes.INSERT,
                                    transaction:transaction
                                });


                                Utils.log("downWinthorTitle","ok9");

                            
                                Utils.log("downWinthorTitle","ok10.1",pcEstcr.VALOR,Utils.toNumber(pcEstcr.VALOR),params.pix.valor.original,Utils.toNumber(params.pix.valor.original),Utils.toNumber(pcEstcr.VALOR) + Utils.toNumber(params.pix.valor.original));


                                /*@todo rastrear as tabelas antes para ver se é so isso que é alterado */
                                pcEstcr.VALOR = Utils.toNumber(pcEstcr.VALOR) + Utils.toNumber(params.pix.valor.original);


                                await pcEstcr.save({transaction:transaction});
                                Utils.log("downWinthorTitle","ok10.2",pcEstcr.VALOR);

                                /*@todo rastrear as tabelas antes para ver se é so isso que é alterado */
                                await wintConnection.query(`INSERT INTO PCMOVCR (     
                                    NUMTRANS,          
                                    DATA,              
                                    CODBANCO,          
                                    CODCOB,            
                                    HISTORICO,         
                                    HISTORICO2,        
                                    VALOR,             
                                    TIPO,              
                                    NUMCARR,           
                                    NUMDOC,            
                                    VLSALDO,           
                                    DTCOMPENSACAO,   
                                    CODFUNCCOMP,   
                                    HORA,              
                                    MINUTO,            
                                    CODFUNC,           
                                    CODCONTADEB,     
                                    CODCONTACRED,    
                                    INDICE,            
                                    CODROTINALANC,
                                    ROTINALANCAMENTO
                                ) VALUES (   
                                    ${numtrans},         
                                    trunc(sysdate),             
                                    748,
                                    'D',
                                    'BAIXA DE PAGAMENTO VIA API PIX',        
                                    SUBSTR(NVL((select c.cliente from JUMBO.PCCLIENT c where c.codcli=${pcPrest.CODCLI}),''),0,194) || ' (BI)',
                                    ${Utils.toNumber(params.pix.valor.original)},
                                    'D',             
                                    ${pcPrest.NUMTRANSVENDA||0},
                                    null,           
                                    ${pcEstcr.VALOR},          
                                    null,  
                                    null,  
                                    to_char(sysdate,'hh24'),             
                                    to_char(sysdate,'mi'),           
                                    142,          
                                    (SELECT B.CODCONTABIL FROM PCBANCO B WHERE B.CODBANCO = 748),    
                                    (SELECT PARAMFILIAL.OBTERCOMONUMBER('CON_CODCONTCLI', '99') FROM DUAL),   
                                    'A',           
                                    1207,
                                    '[PCSIS1207 - 33.00.04.06]'
                                )`,{
                                    type:Sequelize.QueryTypes.INSERT,
                                    transaction:transaction
                                });                                
                                Utils.log("downWinthorTitle","ok10.3");

                                /*pcPrest.NUMTRANS = numtrans;
                                await pcPrest.save({transaction:transaction});
                                DESNECESSARIO, JA SALVO NO INICIO*/
                                Utils.log("downWinthorTitle","ok10.4");
                            } else {
                                throw new Error(`PCCOB ${pcPrest.CODCOB} not found`);
                            }

                            /*LEMBRAR O USUARIO DE FAZER A CONCILIAÇÃO NA 604*/

                            dowed = true;
                            Utils.log("downWinthorTitle","ok11");
                        } else {
                            Utils.log("downWinthorTitle","not found PCPREST");
                        } 
                        Utils.log("downWinthorTitle","okxxxxxx20");
                        return true; //if in here, no errors occured, commit transaction
                    });
                    result = dowed;
                } else {
                    Utils.log("downWinthorTitle","PCPREST not found");
                }
            } 
        } catch (e) {
            Utils.log("downWinthorTitle","error",e.message);
            Utils.log(e);
        }
        Utils.log("downWinthorTitle","END");
        return result;
    }

    static getFieldFromInfo(pix,field) {
        let result = null;
        try {
            if (pix.infoAdicionais?.length) {
                for(let keyInfo in pix.infoAdicionais) {
                    if (pix.infoAdicionais[keyInfo]?.nome == field) {
                        result = pix.infoAdicionais[keyInfo].valor;
                        break;
                    }
                }
            }
        } catch (e) {
            Utils.log(e);
        }
        return result;
    }

    /**
     * called in job
     */
    static async checkCompletedsPix(){
        try {
            let inicio = new Date();
            inicio.setDate(inicio.getDate()-15);
            inicio.setHours(0);
            inicio.setUTCHours(0);
            inicio.setMinutes(0);
            inicio.setSeconds(0);
            inicio.setMilliseconds(0);
            inicio = inicio.toISOString();
            let result = await SicrediApiPixController.getPix({
                init:inicio,
                end: SicrediApiPixController.getDefaultEndDateTiime(),
                status:'CONCLUIDA'
            });
            if (result?.success) {
                Utils.log('cobs concluidas: ',result?.data?.cobs?.length);
                if (Utils.toBool(await Parameter_Values.get(Parameters.HAS_WINTHOR_INTEGRATION)) == true) {
                    for(let key in result?.data?.cobs) {
                        let numtrans = null;
                        let numnf = null;
                        let prest = null;
                        let pixWint = await PcPixCobrancaDados.getModel().findOne({
                            where:{
                                NUMTRANSPAGDIGITAL: result.data.cobs[key].txid,
                                BAIXADOPCPRESTVIAAPI: 0
                            }
                        });
                        if (pixWint) {
                            if (Utils.hasValue(pixWint.NUMTRANSVENDA)) {
                                numtrans = pixWint.NUMTRANSVENDA || this.getFieldFromInfo(result.data.cobs[key],'numtrans');
                                prest = pixWint.PREST || this.getFieldFromInfo(result.data.cobs[key],'prest');
                            } else {
                                numtrans = this.getFieldFromInfo(result.data.cobs[key],'numtrans');
                                prest = this.getFieldFromInfo(result.data.cobs[key],'prest');
                            }
                            if (pixWint.STATUS != result.data.cobs[key].status) { 
                                pixWint.STATUS = result.data.cobs[key].status;                            
                                await pixWint.save();
                                Utils.log("PcPixCobrancaDados updated status",pixWint.STATUS);
                            }
                        } else {
                            numtrans = this.getFieldFromInfo(result.data.cobs[key],'numtrans');
                            prest = this.getFieldFromInfo(result.data.cobs[key],'prest');
                        }

                        if (!numtrans) {
                            numnf = this.getFieldFromInfo(result.data.cobs[key],'numnf');
                        }
                        if ((pixWint?.STATUS || result.data.cobs[key].status) == 'CONCLUIDA' && (pixWint?.BAIXADOPCPRESTVIAAPI || 0) == 0) {
                            let downed = false;
                            if (numtrans) {
                                downed = await this.downWinthorTitle({numtrans:numtrans,prest:prest,pix:result.data.cobs[key]});
                            } else if (numnf) {
                                downed = await this.downWinthorTitle({numnf:numnf,prest:prest,pix:result.data.cobs[key]});
                            }
                            if (downed === true && pixWint) {
                                pixWint.BAIXADOPCPRESTVIAAPI = 1;
                                await pixWint.save();
                            }
                        }
                    }
                }
            } else {
                Utils.log('result of SicrediApiPixController.getPix not success',result);
            }
        } catch (e) {
            Utils.log("error on checkCompletedsPix");
            Utils.log(e);
        }
    }

    static async receiveWebhookInformation(req,res,next,getNewApiPixToken,recursiveCount) {
        try {
            let log = `${(new Date()).toISOString()} ${req?.method} ${req?.socket?.remoteAddress} ${JSON.stringify(req?.body||{})}`;
            Utils.log(log);
            Utils.log(req);
            let body = req?.body || {};
            let pix = body?.pix || [];
            Utils.log('implement receive webhook request');
            if (pix.length) {
                for(let key in pix) {
                    let txid = pix[key].txid;
                    let value = pix[key].valor;
                    if (Utils.toBool(await Parameter_Values.get(Parameters.HAS_WINTHOR_INTEGRATION)) == true) {
                        pixWinthor = await PcPixCobrancaDados.getModel().findOne({
                            where:{
                                NUMTRANSPAGDIGITAL: txid
                            }
                        });
                        if (pixWinthor) {
                            //IMPLEMENTAR CONFORME LOG DA 1207 AO BAIXAR UM TITULO
                            //VER SE MUDA O STATUS DA COB DO PIX TAMBÉM E ATUALIZAR a PcPixCobrancaDados também
                            Utils.log('implement down title with webhook call and winthor title');
                        } else {
                            //pixTemp = this.getPix()
                            Utils.log('implement down title with webhook call');
                        }
                    }
                }
            }
            res.sendResponse(200,true);
        } catch (e) {
            Utils.log(e);
            res.sendResponse(501,false,e.message || e, null, e);
        }
    }

}

module.exports = {SicrediIntegrationsPixController}