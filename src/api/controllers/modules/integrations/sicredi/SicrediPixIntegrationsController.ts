import Utils from "../../../utils/Utils.js";
import DataSwap from "../../../data/DataSwap.js";
import path from "path";
import * as fs from 'node:fs';
import fetch from 'node-fetch';
import * as https from 'node:https';
import { fileURLToPath } from "node:url";
import Parameter_Values from "../../../../database/models/Parameter_Values.js";
import Parameters from "../../../../database/models/Parameters.js";
import PcClient from "../../../../database/models/winthor/PcClient.js";
import { Op } from "sequelize";
import PcNfsaid from "../../../../database/models/winthor/PcNfsaid.js";
import PcPixCobrancaDados from "../../../../database/models/winthor/PcPixCobrancaDados.js";
import PcPrestController from "../winthor/registers/PcPrestController.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default class SicrediPixIntegrationsController{

    private static pixKey = "+5545991334657";
    private static RECUSIVE_LIMIT = 5;
    private static apiPixSicrediToken = null;
    private static apiPixSicrediScope = "cob.write+cob.read+cobv.write+cobv.read+webhook.read+webhook.write";
    //private static apiPixSicrediLoginAutorization = "Basic T0RVMU1qSXdORE13TURBeE9UQTZNREF3TVRweFdqTTpJVWRFWGpoWWN5dDFhemxqS0Vreg=="; //Basic Base64(client_id:client_secret) homolog
    private static apiPixSicrediLoginAutorization = "Basic T0RVMU1qSXdORE13TURBeE9UQTZNREF3TVRwSlpEazpTamRDV1c5RVh5dDFRR2d6VlVNNQ=="; //Basic Base64(client_id:client_secret) production
    
    
    
    private static apiPixSicrediCertificate = fs.existsSync(path.resolve(__dirname,'../../../../../../assets/certificates/sicredi/api_pix/sicredi_certs/85522043000190.pem'))
        ? fs.readFileSync(
            path.resolve(__dirname,'../../../../../../assets/certificates/sicredi/api_pix/sicredi_certs/85522043000190.pem'),
            'utf-8'
        )
        : undefined;
    private static apiPixSicredikey = fs.existsSync(path.resolve(__dirname,'../../../../../../assets/certificates/sicredi/api_pix/APLICACAO.key'))
        ? fs.readFileSync(
            path.resolve(__dirname,'../../../../../../assets/certificates/sicredi/api_pix/APLICACAO.key'),
            'utf-8'                            
        )
        : undefined;
    private static apiPixSicrediCertPhrase = " aAazZz$ Xy|Z? JUMBO alimENTOS_ _  * $ lkjsaLkLKJLKJkjkjJKJKJkjkjk";

    private static httpsAgent = new https.Agent({
        cert: SicrediPixIntegrationsController.apiPixSicrediCertificate,
        key: SicrediPixIntegrationsController.apiPixSicredikey,
        passphrase: SicrediPixIntegrationsController.apiPixSicrediCertPhrase
    });

    private static apiPixSicrediBasePath = "https://api-pix.sicredi.com.br/";  
    private static apiPixSicrediApiBasePath = "api/v2/";   
    private static apiPisSicrediAddress = SicrediPixIntegrationsController.apiPixSicrediBasePath + SicrediPixIntegrationsController.apiPixSicrediApiBasePath;

    static DEFAULT_RESPONSE_SUCCESS_STATUS = [200,201,202,203,204,205];

    private static async handleApiRequestResult(
        apiRequestResponse: any, 
        resultObject?: DataSwap,
        successesCodes?: any,
        dataJsonExpected?: boolean,        
        caller?: Function, //to recall if token expired
        ...callerParams: any
    ) {
        let logFile = null;
        let log = null;
        try {
            resultObject = resultObject || new DataSwap();
            successesCodes = successesCodes || SicrediPixIntegrationsController.DEFAULT_RESPONSE_SUCCESS_STATUS;
            dataJsonExpected = dataJsonExpected || false;
            resultObject.status = apiRequestResponse.status;
            let responseText = await apiRequestResponse.text();
            if (successesCodes.indexOf(resultObject.status) > -1) {    
                if (dataJsonExpected) {                                    
                    let responseJson = JSON.parse(responseText);
                    if (!responseJson) throw new Error("responseJson is null");                    
                    resultObject.data = responseJson;                    
                    if (!isNaN(resultObject?.data?.status||"x")) {
                        resultObject.status = resultObject.data.status - 0;
                        if (successesCodes.indexOf(resultObject.status) > -1) {
                            resultObject.success = true;
                        } else {
                            resultObject.success = false;
                        }
                    } else {
                        resultObject.success = true;
                    }
                } else {
                    resultObject.success = true;
                }
            } else {
                resultObject.success = false;
                let responseJson = null;
                try {
                    responseJson = JSON.parse(responseText);                        
                } catch (errorJson: any) {
                    Utils.logError(errorJson);
                    resultObject.data = responseText;
                    resultObject.exception = errorJson;
                    resultObject.message = errorJson.message || errorJson;
                }
                if (responseJson != null) {
                    if (responseJson?.status == 403 && responseJson?.detail?.indexOf('expired') > -1 && caller) {
                        callerParams[1] = callerParams[1] || true; //new token
                        callerParams[2] = callerParams[2] || 0; //recursive count
                        if (callerParams[2] > SicrediPixIntegrationsController.RECUSIVE_LIMIT) throw new Error("recursive limit extrapoled");
                        return await caller(...callerParams);
                    } else {
                        resultObject.data = responseJson;
                        resultObject.exception = responseJson;
                        resultObject.message = (responseJson?.title||'title') + ":" + (responseJson?.detail || '');
                        if (responseJson?.violacoes?.length) {
                            resultObject.message += ':' + responseJson?.violacoes?.map((el: any)=>`${el?.razao}(${el?.propriedade})`).join(',');
                        }
                    }
                } else {
                    resultObject.data = responseText;
                }
            }
        } catch (e: any) {            
            resultObject?.setException(e);
            Utils.logError(e);
        } 
        return resultObject;
    }

    private static login = async (newToken?: any) => {
        let result = new DataSwap();

        try {
            if (!SicrediPixIntegrationsController.apiPixSicrediToken || newToken) {
                let params = new URLSearchParams();                
                params.append('grant_type','client_credentials');
                params.append('scope',SicrediPixIntegrationsController.apiPixSicrediScope);
                let options = {
                    method: "POST",
                    body: params,
                    headers:{
                        "Accept":"*/*",
                        "Authorization": SicrediPixIntegrationsController.apiPixSicrediLoginAutorization,
                        "Content-Type":"application/x-www-form-urlencoded"
                    },
                    agent: SicrediPixIntegrationsController.httpsAgent
                }
                let apiPixRequestResponse = await fetch(SicrediPixIntegrationsController.apiPixSicrediBasePath + "/oauth/token",options);
                await SicrediPixIntegrationsController.handleApiRequestResult(apiPixRequestResponse,result,null,true);
                if (!result?.data?.access_token) throw new Error("api response not contain access_token");
                SicrediPixIntegrationsController.apiPixSicrediToken = result?.data?.access_token;
            } else if (SicrediPixIntegrationsController.apiPixSicrediToken) {
                result.data = {access_token: SicrediPixIntegrationsController.apiPixSicrediToken};
                result.success = true;
            }
        } catch (e: any) {
            result.setException(e);
        }    
        return result;
    } 

    static getDefaultApiRequestHeaders(){
        return {
            "Accept":"*/*",
            "Authorization": `Bearer ${SicrediPixIntegrationsController.apiPixSicrediToken}`,
            "Content-Type":"application/json"
        };
    }

    static getDefaultApiRequestOptions(params?: any) : any {
        params = params || {};
        let result : any = {
            method: params?.method || "GET",
            headers: params?.headers || SicrediPixIntegrationsController.getDefaultApiRequestHeaders(),
            agent: SicrediPixIntegrationsController.httpsAgent
        }
        if (params?.body) {
            if (typeof params.body == 'string') {
                result.body = params.body;
            } else {
                result.body = JSON.stringify(params.body);
            }
        }
        return result;
    }

    static getDefaultInitDateTiime(date?: any) : string{
        let result : any = new Date();
        if (date) result.setDate(date);
        result.setHours(0);
        result.setUTCHours(0);
        result.setMinutes(0);
        result.setSeconds(0);
        result.setMilliseconds(0);
        result = result.toISOString();
        return result;
    }

    static getDefaultEndDateTiime(date? : any) : string{
        let result : any = new Date();
        if (date) result.setDate(date);
        result.setHours(23);
        result.setUTCHours(23);
        result.setMinutes(59);
        result.setSeconds(59);
        result.setMilliseconds(99);
        result = result.toISOString();
        return result;
    }
    
    static async get(p_PixReqParams: any,getNewApiPixToken?: boolean,recursiveCount?: number) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let logged = await SicrediPixIntegrationsController.login(getNewApiPixToken || false);
            if (logged) {
                p_PixReqParams = p_PixReqParams || {};
                let status = p_PixReqParams?.status;
                let inicio = p_PixReqParams?.init || p_PixReqParams?.inicio || SicrediPixIntegrationsController.getDefaultInitDateTiime();
                let fim = p_PixReqParams?.end || p_PixReqParams?.fim || SicrediPixIntegrationsController.getDefaultEndDateTiime();                
                if (inicio.length == 10) inicio += "T00:00:00Z";
                if (fim.length == 10) fim += "T23:59:59Z";

                let pixParams : any = {
                    inicio:inicio,
                    fim:fim,
                    "paginacao.itensPorPagina":1000
                };
                if (Utils.hasValue(status)) {
                    pixParams.status = status;
                }
                
                let options = SicrediPixIntegrationsController.getDefaultApiRequestOptions();
                let url = null;
                if (p_PixReqParams.txid) {
                    url = new URL(SicrediPixIntegrationsController.apiPisSicrediAddress + `cob/${p_PixReqParams.txid}`);
                } else {
                    url = new URL(SicrediPixIntegrationsController.apiPisSicrediAddress + "cob");
                }
                url.search = new URLSearchParams(pixParams).toString();
                let apiPixRequestResponse = await fetch(url,options);
                await SicrediPixIntegrationsController.handleApiRequestResult(apiPixRequestResponse,result,null,true,SicrediPixIntegrationsController.get,p_PixReqParams);                
            } else {
                throw new Error("not logged on api pix sicredi");
            }
        } catch (e) {
            Utils.logError(e);
            result.setException(e);
        }
        return result;
    }

    static async createPix(p_PixReqParams: any ,getNewApiPixToken?: boolean,recursiveCount?: number) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let logged = await SicrediPixIntegrationsController.login(getNewApiPixToken || false);
            if (logged) {
                p_PixReqParams = p_PixReqParams || {};
                if (!p_PixReqParams || !p_PixReqParams?.valor?.original) throw new Error("missing data");
                p_PixReqParams.valor.original = Utils.toNumber(p_PixReqParams.valor.original);
                if (!p_PixReqParams.valor.original || p_PixReqParams.valor.original < 0) throw new Error("value invalid");

                p_PixReqParams.calendario = p_PixReqParams?.calendario || {expiracao:864000};
                p_PixReqParams.chave = p_PixReqParams?.chave || SicrediPixIntegrationsController.pixKey;
            
                let options = SicrediPixIntegrationsController.getDefaultApiRequestOptions({method:"POST",body:p_PixReqParams});
                let apiPixRequestResponse = await fetch(SicrediPixIntegrationsController.apiPisSicrediAddress + "cob",options);
                await SicrediPixIntegrationsController.handleApiRequestResult(apiPixRequestResponse,result,null,true,SicrediPixIntegrationsController.createPix,p_PixReqParams);
            } else {
                throw new Error("not logged on api pix sicredi");
            } 
        } catch (e: any) {
            result.setException(e);
        }
        return result;       
    }

    static async deletePix(p_PixReqParams?: any,getNewApiPixToken?: boolean,recursiveCount?: number) : Promise<DataSwap>{
        let result = new DataSwap();
        try {
            let logged = await SicrediPixIntegrationsController.login(getNewApiPixToken || false);
            if (logged) {
                p_PixReqParams = p_PixReqParams || {};
                if (!p_PixReqParams || !p_PixReqParams?.txid) throw new Error("missing data");
                let url = new URL(`${SicrediPixIntegrationsController.apiPisSicrediAddress}cob/${p_PixReqParams.txid}`);
                p_PixReqParams.status = 'REMOVIDA_PELO_USUARIO_RECEBEDOR';

                //not allowed update txid on bacen pix api
                p_PixReqParams.txid = null;
                delete p_PixReqParams.txid;
                let options = SicrediPixIntegrationsController.getDefaultApiRequestOptions({method:"PATCH",body:p_PixReqParams});                
                let apiPixRequestResponse = await fetch(url,options);
                await SicrediPixIntegrationsController.handleApiRequestResult(apiPixRequestResponse,result,null,true,SicrediPixIntegrationsController.deletePix,p_PixReqParams);                
            } else {
                throw new Error("not logged on api pix sicredi");
            }        
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }

    static async create(params?: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            params = params || {};            
            if (!params || !params?.value) throw new Error("missing data");
            let pcClient = null;
            let trans = null;
            let nf = null;

            let pixParams : any = {
                valor: {
                    original: Utils.toNumber(params?.value)
                },
                chave: SicrediPixIntegrationsController.pixKey
            };

            if (!pixParams.valor.original || pixParams.valor.original < 0) throw new Error("value invalid");


            let integrateWinthor = Utils.toBool(await Parameter_Values.get(Parameters.HAS_WINTHOR_INTEGRATION));


            //ESTA RETORNANDO false, VER PORQUE

            if (params?.codcli) {
                if (integrateWinthor) {
                    pcClient = await PcClient.findOne({
                        raw:true,
                        //attributes:Object.keys(PcClient.fields).map(el=>Sequelize.col(`${PcClient.tableName}.${el}`)),
                        where:{
                            CODCLI:params.codcli
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

            if (Utils.hasValue(params?.numtrans)) {
                if (integrateWinthor) {
                    trans = await PcNfsaid.findOne({
                        raw: true,
                        where:{
                            NUMTRANSVENDA: params.numtrans,
                            ESPECIE: 'NF',
                            DTCANCEL: {
                                [Op.is] : null
                            }
                        }
                    });
                    //if (!trans) throw new Error("numtrans not found");                                        
                    
                    let wherePix : any = [{
                        NUMTRANSVENDA:params.numtrans,
                    }];
                    
                    if (Utils.hasValue(params?.prest)) {
                        wherePix.push({PREST:params.prest});
                    }
                    wherePix.push({STATUS: {
                        [Op.in] : ['ATIVA','CONCLUIDA']
                    }});                    

                    let pixWinthor = await PcPixCobrancaDados.findOne({
                        where:{                               
                            [Op.and]: wherePix
                        }
                    });
                    if (pixWinthor) throw new Error("pix exists on winthor with numtransvenda and status='ATIVA' or status='CONCLUIDA'");
                 }

                pixParams.infoAdicionais = pixParams?.infoAdicionais || [];
                pixParams.infoAdicionais.push({
                    nome:"numtrans",
                    valor:params.numtrans
                });
            }

            if (Utils.hasValue(params?.numnf)) {
                if (integrateWinthor) {
                    nf = await PcNfsaid.findOne({
                        raw: true,
                        where:{
                            NUMNOTA: params?.numnf,
                            ESPECIE: 'NF',
                            DTCANCEL: {
                                [Op.is] : null
                            }
                        }
                    });
                    //if (!nf) throw new Error("numnf not found");
                }
                pixParams.infoAdicionais = pixParams?.infoAdicionais || [];
                pixParams.infoAdicionais.push({
                    nome:"numnf",
                    valor:params.numnf
                });
            }

            if (Utils.hasValue(params?.prest)) {
                pixParams.infoAdicionais = pixParams?.infoAdicionais || [];
                pixParams.infoAdicionais.push({
                    nome:"prest",
                    valor:params.prest
                });
            }

            let responseJson : any = await SicrediPixIntegrationsController.createPix(pixParams);                      
            if (!responseJson) throw new Error("responseJson is null");
            result.data = responseJson?.data || responseJson;
            if (result.data?.status != 'ATIVA' && result.data?.status > 400 && result.data?.status < 499) {
                console.error(result.data);
                throw new Error((result.data?.title || '')+':' + (result.data?.detail || '') + '('+result.data?.violacoes?.reduce((prev?: any,current?: any)=>prev += current?.razao + '['+current?.propriedade+']')+')');
            }
            
            if ((result.data?.status || '') == 'ATIVA' && Utils.hasValue(result.data?.txid)) {

                if (integrateWinthor && params?.numtrans) {                     
                    let whereOr : any = [{                                
                        NUMTRANSPAGDIGITAL: result.data?.txid
                    }];                    
                    let whereOrAnd : any = [{
                        STATUS:'ATIVA'
                    }];
                    if (params?.numtrans) whereOrAnd.push({NUMTRANSVENDA:params.numtrans});
                    if (params?.prest) whereOrAnd.push({PREST:params.prest});

                    whereOr.push({[Op.and]:whereOrAnd});
                    let pixWinthor : any = await PcPixCobrancaDados.findOne({
                        where:{[Op.or] : whereOr}
                    });
                    if (pixWinthor) {
                        pixWinthor.STATUS =  result.data?.status;
                        pixWinthor.FILIAL =  trans?.CODFILIAL || nf?.CODFILIAL || pcClient?.CODFILIALNF;
                        pixWinthor.LINK =  result.data?.location;
                        pixWinthor.QRCODE =  result.data?.pixCopiaECola;
                        pixWinthor.VENCIMENTO =  result.data?.calendario?.vencimento;
                        pixWinthor.DESCRICAO =  result.data?.solicitacaoPagador;
                        pixWinthor.NUMTRANSVENDA =  params?.numtrans;
                        pixWinthor.PREST =  params?.prest;
                        await pixWinthor.save();
                    } else {
                        pixWinthor = await PcPixCobrancaDados.create({
                            NUMTRANSPAGDIGITAL: result.data?.txid,
                            STATUS: result.data?.status,
                            FILIAL: trans?.CODFILIAL || nf?.CODFILIAL || pcClient?.CODFILIALNF,
                            LINK: result.data?.location,
                            QRCODE: result.data?.pixCopiaECola,
                            VENCIMENTO: result.data?.calendario?.vencimento,
                            DESCRICAO: result.data?.solicitacaoPagador,
                            NUMTRANSVENDA: params?.numtrans,
                            PREST:params?.prest
                        });
                    }
                }

                result.success = true;
            } else {
                result.success = false;
            }                           
        } catch (e) {
            result.setException(e);
        }
        return result;
    }



    static async delete(params?: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            
            params = params || {};
            if (!params || !params?.identifiers) throw new Error("missing data");
            
            
            let txIdentifiers = params.identifiers;
            result.data = [];


            if (Utils.typeOf(txIdentifiers) != 'array') {
                txIdentifiers = txIdentifiers.split(',');
            }

            for(let key in txIdentifiers) {
                let responseJson = await SicrediPixIntegrationsController.deletePix({txid:txIdentifiers[key]});                
                if (!responseJson) throw new Error("responseJson is null");
                if (responseJson?.data?.status > 400 && responseJson?.data?.status < 499 ) {
                    throw new Error((responseJson?.data?.title || '')+':' + (responseJson?.data?.detail || '') + '('+responseJson?.data?.violacoes.reduce((prev?:any,current?:any)=>prev += current?.razao + '['+current?.propriedade+']')+')');
                }
                result.data.push(responseJson?.data || responseJson);                    

                if (Utils.toBool(await Parameter_Values.get(Parameters.HAS_WINTHOR_INTEGRATION))) {
                    let pixWinthor = await PcPixCobrancaDados.findOne({
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
            result.success = true;
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }

    static getFieldFromInfo(pix: any,field?: string) : any{
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
            Utils.logError(e);
        }
        return result;
    }



    /**
     * called in job
     */
    static async checkCompletedsPix(){
        try {
            let inicio : any = new Date();
            inicio.setDate(inicio.getDate()-15);
            inicio.setHours(0);
            inicio.setUTCHours(0);
            inicio.setMinutes(0);
            inicio.setSeconds(0);
            inicio.setMilliseconds(0);
            inicio = inicio.toISOString();
            let result = await SicrediPixIntegrationsController.get({
                init:inicio,
                end: SicrediPixIntegrationsController.getDefaultEndDateTiime(),
                status:'CONCLUIDA'
            });
            if (result?.success) {
                if (Utils.toBool(await Parameter_Values.get(Parameters.HAS_WINTHOR_INTEGRATION)) == true) {
                    for(let key in result?.data?.cobs) {
                        let numtrans = null;
                        let numnf = null;
                        let prest = null;
                        let pixWint = await PcPixCobrancaDados.findOne({
                            where:{
                                NUMTRANSPAGDIGITAL: result.data.cobs[key].txid,
                                BAIXADOPCPRESTVIAAPI: 0
                            }
                        });
                        if (pixWint) {
                            if (Utils.hasValue(pixWint.NUMTRANSVENDA)) {
                                numtrans = pixWint.NUMTRANSVENDA || SicrediPixIntegrationsController.getFieldFromInfo(result.data.cobs[key],'numtrans');
                                prest = pixWint.PREST || SicrediPixIntegrationsController.getFieldFromInfo(result.data.cobs[key],'prest');
                            } else {
                                numtrans = SicrediPixIntegrationsController.getFieldFromInfo(result.data.cobs[key],'numtrans');
                                prest = SicrediPixIntegrationsController.getFieldFromInfo(result.data.cobs[key],'prest');
                            }
                            if (pixWint.STATUS != result.data.cobs[key].status) { 
                                pixWint.STATUS = result.data.cobs[key].status;                            
                                await pixWint.save();
                            }
                        } else {
                            numtrans = SicrediPixIntegrationsController.getFieldFromInfo(result.data.cobs[key],'numtrans');
                            prest = SicrediPixIntegrationsController.getFieldFromInfo(result.data.cobs[key],'prest');
                        }

                        if (!numtrans) {
                            numnf = SicrediPixIntegrationsController.getFieldFromInfo(result.data.cobs[key],'numnf');
                        }
                        if ((pixWint?.STATUS || result.data.cobs[key].status) == 'CONCLUIDA' && (pixWint?.BAIXADOPCPRESTVIAAPI || 0) == 0) {
                            let downed : any = null;
                            if (numtrans) {
                                downed = await PcPrestController.closePixPayment({
                                    numtrans:numtrans,
                                    prest:prest,
                                    valor:Utils.toNumber(result.data.cobs[key].pix[0]?.valor?.original || result.data.cobs[key].pix[0]?.valor)
                                });
                            } else if (numnf) {
                                downed = await PcPrestController.closePixPayment({
                                    numnf:numnf,
                                    prest:prest,
                                    valor:Utils.toNumber(result.data.cobs[key].pix[0]?.valor?.original || result.data.cobs[key].pix[0]?.valor)
                                });
                            }
                            if (downed?.success && pixWint) {
                                pixWint.BAIXADOPCPRESTVIAAPI = 1;
                                await pixWint.save();
                            }
                        }
                    }
                }
            } 
        } catch (e) {
            Utils.logError(e);
        }
    }

}