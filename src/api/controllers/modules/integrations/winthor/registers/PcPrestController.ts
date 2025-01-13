import DatabaseUtils from "../../../../database/DatabaseUtils.js";
import PcPrest from "../../../../../database/models/winthor/PcPrest.js";
import PcCob from "../../../../../database/models/winthor/PcCob.js";
import { Op, QueryTypes, Sequelize, Transaction } from "sequelize";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";
import DataSwap from "../../../../data/DataSwap.js";
import Utils from "../../../../utils/Utils.js";
import DBConnectionManager from "../../../../../database/DBConnectionManager.js";
import PcEstcr from "../../../../../database/models/winthor/PcEstcr.js";
import PcClient from "../../../../../database/models/winthor/PcClient.js";
import PcConsum from "../../../../../database/models/winthor/PcConsum.js";

export default class PcPrestController extends WinthorBaseRegistersIntegrationsController{

    static getTableClassModel() : any {
        return PcPrest;
    }  

    static async closePixPayment(params?: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            if (params?.numtrans) {
                let pcPrest : any = await PcPrest.findOne({
                    where:{
                        [Op.and]:[{
                            NUMTRANSVENDA:params.numtrans                        
                        },{
                            DTPAG: {
                                [Op.is]: null
                            }
                        },{
                            DTCANCEL: {
                                [Op.is]: null
                            }
                        },{
                            CODCOB: {
                                [Op.notIn]: ['DESD','CRED','DEVT','ESTR', 'CANC'] 
                            }
                        },{
                            VALOR:Utils.toNumber(params.valor)
                        },Sequelize.where(
                            Sequelize.fn('nvl',Sequelize.col('PREST'),1),
                            Sequelize.literal(Utils.firstValid([params?.prest,1]))
                        )]
                    }
                });
                if (pcPrest) {
                    let dowed = false;
                    let wintConnection : any = DBConnectionManager.getWinthorDBConnection();
                    await wintConnection.transaction(async(transaction: Transaction)=>{
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
                            type: QueryTypes.SELECT,
                            model: PcPrest,                                                        
                        });
                        if (Utils.hasValue(pcPrest)) {
                            pcPrest = pcPrest[0];
                        }
                        if (Utils.hasValue(pcPrest)) {
                            let pcCob = await PcCob.findOne({
                                raw: true,
                                attributes:[
                                    [Sequelize.fn("nvl",Sequelize.col('CARTAO'),Sequelize.literal("'N'")),"CARTAO"]
                                ],
                                where:{
                                    CODCOB: pcPrest.CODCOB
                                }
                            });

                            if (pcCob) {
                                let pcEstcr : any = await wintConnection.query(`
                                    select
                                        * 
                                    from
                                        JUMBO.PCESTCR
                                    where
                                        codbanco=748
                                        and codcob='D'
                                    FOR UPDATE NOWAIT
                                `,{
                                    type: QueryTypes.SELECT,
                                    model: PcEstcr,
                                });                        
                                if (Utils.hasValue(pcEstcr)) {
                                    pcEstcr = pcEstcr[0];
                                }

                                if (Utils.hasValue(pcEstcr)) {

                                    if (pcCob.CARTAO == 'S') {

                                        let pcClient : any = await PcClient.findOne({
                                            raw:true,
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
                                            type:QueryTypes.INSERT,
                                            transaction:transaction
                                        });


                                        let newPcPrest = await PcPrest.findOne({
                                            where:{
                                                [Op.and]:[{
                                                    NUMTRANSVENDA:params.numtrans                        
                                                },Sequelize.where(
                                                    Sequelize.fn('nvl',Sequelize.col('PREST'),1),
                                                    Sequelize.literal(((Utils.firstValid([params?.prest,1])-0)+1).toString())
                                                )]
                                            },
                                            transaction:transaction
                                        });

                                        if (newPcPrest) {
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
                                            await oldPcPrest.save({transaction:transaction});

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
                                                type:QueryTypes.INSERT,
                                                transaction:transaction
                                            });
                                        }
                                    }
                                } else {
                                    throw new Error(`PCESTCR not found ${'748'} ${'D'}`);
                                }


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
                                    type: QueryTypes.SELECT,
                                    model: PcConsum
                                });
                                if (Utils.hasValue(pcConsum)) {
                                    pcConsum = pcConsum[0];
                                }
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
                                    type:QueryTypes.UPDATE,
                                    transaction:transaction
                                });

                                pcPrest.CODCOB = 'D';
                                pcPrest.VPAGO = Utils.toNumber(params.valor);
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

                                await pcPrest.save({transaction:transaction});

                                await wintConnection.query(`
                                    INSERT INTO pclogcr (
                                        codfilial, duplic, prest, data,rotina, codcli, numtransvenda, codfunc
                                    ) VALUES (
                                        ${pcPrest.CODFILIAL}, ${pcPrest.DUPLIC}, ${pcPrest.PREST}, TRUNC(SYSDATE), '1207-2', ${pcPrest.CODCLI}, ${pcPrest.NUMTRANSVENDA}, 142
                                    )
                                `,{
                                    type:QueryTypes.INSERT,
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
                                    type:QueryTypes.INSERT,
                                    transaction:transaction
                                });



                                /*@todo rastrear as tabelas antes para ver se é so isso que é alterado */
                                pcEstcr.VALOR = (Utils.toNumber(pcEstcr?.VALOR) || 0) + (Utils.toNumber(params.valor) || 0);


                                await pcEstcr.save({transaction:transaction});

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
                                    ${Utils.toNumber(params.valor)},
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
                                    type:QueryTypes.INSERT,
                                    transaction:transaction
                                });                                

                                /*pcPrest.NUMTRANS = numtrans;
                                await pcPrest.save({transaction:transaction});
                                DESNECESSARIO, JA SALVO NO INICIO*/
                            } else {
                                throw new Error(`PCCOB ${pcPrest.CODCOB} not found`);
                            }

                            /*LEMBRAR O USUARIO DE FAZER A CONCILIAÇÃO NA 604*/

                            dowed = true;
                        } 
                        return true; //if in here, no errors occured, commit transaction
                    });
                    result.success = true;
                } 
            } else {
                throw new Error("missing data");
            } 
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }

    static async getAllWarePixCobs(params?:any) : Promise<any> {
        let queryParams : any = params.queryParams || params;
        queryParams = await DatabaseUtils.prepareQueryParams(queryParams || {});      
        queryParams.include = queryParams.include || [];
        queryParams.include.push({
            model: PcCob,
            required:true,
            raw:true,
            attributes:[],
            on:{
            [Op.and]: [
                Sequelize.where(Sequelize.col(`${PcCob.tableName}.CODCOB`),'=',Sequelize.col(`${PcPrest.tableName}.CODCOB`)),
                Sequelize.where(Sequelize.fn('coalesce',Sequelize.col(`${PcCob.tableName}.BOLETO`),'N'),'=',Sequelize.literal(`'N'`)),
                {
                    CODCOB: {
                        [Op.notIn] : ['DEP','DESD','ESTR','CANC'],        
                    }
                },
                {
                    CODCOB: {
                        [Op.notLike] : '%BNF%',
                    }
                },
                {
                    CODCOB: {
                        [Op.notLike] : '%DEV%',
                    }
                }
            ]
            }
        });
        queryParams.where.VALOR = {[Op.gt] : 0};
        return await PcPrest.findAll(queryParams);  
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}