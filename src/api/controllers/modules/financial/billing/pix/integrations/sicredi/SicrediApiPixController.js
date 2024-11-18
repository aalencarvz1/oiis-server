const fs = require('node:fs');
const fetchNode = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

//import fetchNode from "node-fetch";
//const fetchNode = require('node:fetch');
const https = require('node:https');
const path = require('node:path');
const { Utils } = require('../../../../../../utils/Utils');


class SicrediApiPixController {

    static #pixKey = "+5545991334657";
    static #RECUSIVE_LIMIT = 5;
    static #apiPixSicrediToken = null;
    static #apiPixSicrediScope = "cob.write+cob.read+cobv.write+cobv.read+webhook.read+webhook.write";
    //static #apiPixSicrediLoginAutorization = "Basic T0RVMU1qSXdORE13TURBeE9UQTZNREF3TVRweFdqTTpJVWRFWGpoWWN5dDFhemxqS0Vreg=="; //Basic Base64(client_id:client_secret) homolog
    static #apiPixSicrediLoginAutorization = "Basic T0RVMU1qSXdORE13TURBeE9UQTZNREF3TVRwSlpEazpTamRDV1c5RVh5dDFRR2d6VlVNNQ=="; //Basic Base64(client_id:client_secret) production

    
    static #apiPixSicrediCertificate = fs.existsSync(path.resolve(__dirname,'../../../../../../../assets/certificates/sicredi/api_pix/sicredi_certs/85522043000190.pem'))
        ? fs.readFileSync(
            path.resolve(__dirname,'../../../../../../../assets/certificates/sicredi/api_pix/sicredi_certs/85522043000190.pem'),
            'utf-8'
        )
        : null;
    static #apiPixSicredikey = fs.existsSync(path.resolve(__dirname,'../../../../../../../assets/certificates/sicredi/api_pix/APLICACAO.key'))
        ? fs.readFileSync(
            path.resolve(__dirname,'../../../../../../../assets/certificates/sicredi/api_pix/APLICACAO.key'),
            'utf-8'                            
        )
        : null;
    static #apiPixSicrediCertPhrase = " aAazZz$ Xy|Z? JUMBO alimENTOS_ _  * $ lkjsaLkLKJLKJkjkjJKJKJkjkjk";

    static #httpsAgent = new https.Agent({
        cert: SicrediApiPixController.#apiPixSicrediCertificate,
        key: SicrediApiPixController.#apiPixSicredikey,
        passphrase: SicrediApiPixController.#apiPixSicrediCertPhrase
    });

    static #apiPixSicrediBasePath = "https://api-pix.sicredi.com.br/";  
    static #apiPixSicrediApiBasePath = "api/v2/";   
    static #apiPisSicrediAddress = SicrediApiPixController.#apiPixSicrediBasePath + SicrediApiPixController.#apiPixSicrediApiBasePath;

    static #DefaultResponse = {
        success : false,
        status : -1,
        data : null,
        message: null,
        exception: null
    }

    static DEFAULT_RESPONSE_SUCCESS_STATUS = [200,201,202,203,204,205];

    static async #handleApiRequestResult(
        apiRequestResponse, 
        resultObject,
        successesCodes,
        dataJsonExpected,        
        caller, //to recall if token expired
        ...callerParams
    ) {
        let logFile = null;
        let log = null;
        try {
            resultObject = resultObject || {...SicrediApiPixController.#DefaultResponse};
            successesCodes = successesCodes || SicrediApiPixController.DEFAULT_RESPONSE_SUCCESS_STATUS;
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
                } catch (errorJson) {
                    Utils.log(errorJson);
                    resultObject.data = responseText;
                    resultObject.exception = errorJson;
                    resultObject.message = errorJson.message || errorJson;
                }
                if (responseJson != null) {
                    if (responseJson?.status == 403 && responseJson?.detail?.indexOf('expired') > -1 && caller) {
                        callerParams[1] = callerParams[1] || true; //new token
                        callerParams[2] = callerParams[2] || 0; //recursive count
                        if (callerParams[2] > SicrediApiPixController.#RECUSIVE_LIMIT) throw new Error("recursive limit extrapoled");
                        Utils.log(`recursing, login expired ${caller.name}`);
                        return await caller(...callerParams);
                    } else {
                        resultObject.data = responseJson;
                        resultObject.exception = responseJson;
                        resultObject.message = (responseJson?.title||'title') + ":" + (responseJson?.detail || '');
                        if (responseJson?.violacoes?.length) {
                            resultObject.message += ':' + responseJson?.violacoes?.map(el=>`${el?.razao}(${el?.propriedade})`).join(',');
                        }
                    }
                } else {
                    resultObject.data = responseText;
                }
            }
        } catch (e) {            
            resultObject.exception = e;
            resultObject.message = e.message || e;
            resultObject.success = false;
            Utils.log(e);
        } 
        return resultObject;
    }


    static #login = async (newToken) => {
        let result = {...SicrediApiPixController.#DefaultResponse};

        try {
            if (!SicrediApiPixController.#apiPixSicrediToken || newToken) {
                let params = new URLSearchParams();                
                params.append('grant_type','client_credentials');
                params.append('scope',SicrediApiPixController.#apiPixSicrediScope);
                let options = {
                    method: "POST",
                    body: params,
                    headers:{
                        "Accept":"*/*",
                        "Authorization": SicrediApiPixController.#apiPixSicrediLoginAutorization,
                        "Content-Type":"application/x-www-form-urlencoded"
                    },
                    agent: SicrediApiPixController.#httpsAgent
                }
                Utils.log('logging on api pix wieth params',options);
                let apiPixRequestResponse = await fetchNode(SicrediApiPixController.#apiPixSicrediBasePath + "/oauth/token",options);
                Utils.log('response api pix login',apiPixRequestResponse);
                await SicrediApiPixController.#handleApiRequestResult(apiPixRequestResponse,result,null,true);
                if (!result?.data?.access_token) throw new Error("api response not contain access_token");
                SicrediApiPixController.#apiPixSicrediToken = result?.data?.access_token;
            } else if (SicrediApiPixController.#apiPixSicrediToken) {
                result.data = {access_token: SicrediApiPixController.#apiPixSicrediToken};
                result.success = true;
            }
        } catch (e) {
            Utils.log(e);
            result.exception = e;
            result.message = e.message || e;
            result.success = false;
        }    
        return result;
    }

    static getDefaultApiRequestHeaders(){
        return {
            "Accept":"*/*",
            "Authorization": `Bearer ${SicrediApiPixController.#apiPixSicrediToken}`,
            "Content-Type":"application/json"
        };
    }

    static getDefaultApiRequestOptions(params){
        params = params || {};
        let result = {
            method: params?.method || "GET",
            headers: params?.headers || SicrediApiPixController.getDefaultApiRequestHeaders(),
            agent: SicrediApiPixController.#httpsAgent
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

    static getDefaultInitDateTiime(date){
        let result = new Date();
        if (date) result.setDate(date);
        result.setHours(0);
        result.setUTCHours(0);
        result.setMinutes(0);
        result.setSeconds(0);
        result.setMilliseconds(0);
        result = result.toISOString();
        return result;
    }

    static getDefaultEndDateTiime(date){
        let result = new Date();
        if (date) result.setDate(date);
        result.setHours(23);
        result.setUTCHours(23);
        result.setMinutes(59);
        result.setSeconds(59);
        result.setMilliseconds(99);
        result = result.toISOString();
        return result;
    }

    static async getPix(p_PixReqParams,getNewApiPixToken,recursiveCount) {
        let result = {...SicrediApiPixController.#DefaultResponse};
        try {
            let logged = await SicrediApiPixController.#login(getNewApiPixToken || false);
            Utils.log('response of logged api pix',logged);
            if (logged) {
                p_PixReqParams = p_PixReqParams || {};
                let status = p_PixReqParams?.status;
                let inicio = p_PixReqParams?.init || SicrediApiPixController.getDefaultInitDateTiime();
                let fim = p_PixReqParams?.end || SicrediApiPixController.getDefaultEndDateTiime();                
                if (inicio.length == 10) inicio += "T00:00:00Z";
                if (fim.length == 10) fim += "T23:59:59Z";

                let pixParams = {
                    inicio:inicio,
                    fim:fim,
                    "paginacao.itensPorPagina":1000
                };
                if (Utils.hasValue(status)) {
                    pixParams.status = status;
                }
                
                let options = SicrediApiPixController.getDefaultApiRequestOptions();
                let url = null;
                if (p_PixReqParams.txid) {
                    url = new URL(SicrediApiPixController.#apiPisSicrediAddress + `cob/${p_PixReqParams.txid}`);
                } else {
                    url = new URL(SicrediApiPixController.#apiPisSicrediAddress + "cob");
                }
                url.search = new URLSearchParams(pixParams).toString();
                let apiPixRequestResponse = await fetchNode(url,options);
                await SicrediApiPixController.#handleApiRequestResult(apiPixRequestResponse,result,null,true,SicrediApiPixController.getPix,p_PixReqParams);                
            } else {
                throw new Error("not logged on api pix sicredi");
            }
        } catch (e) {
            Utils.log(e);
            result.exception = e;
            result.message = e.message || e;
            result.success = false;
        }
        return result;
    }


    static async createPix(p_PixReqParams,getNewApiPixToken,recursiveCount) {
        let result = {...SicrediApiPixController.#DefaultResponse};
        try {
            let logged = await SicrediApiPixController.#login(getNewApiPixToken || false);
            if (logged) {
                p_PixReqParams = p_PixReqParams || {};
                if (!p_PixReqParams || !p_PixReqParams?.valor?.original) throw new Error("missing data");
                p_PixReqParams.valor.original = Utils.toNumber(p_PixReqParams.valor.original);
                if (!p_PixReqParams.valor.original || p_PixReqParams.valor.original < 0) throw new Error("value invalid");

                p_PixReqParams.calendario = p_PixReqParams?.calendario || {expiracao:864000};
                p_PixReqParams.chave = p_PixReqParams?.chave || SicrediApiPixController.#pixKey;
            
                let options = SicrediApiPixController.getDefaultApiRequestOptions({method:"POST",body:p_PixReqParams});
                let apiPixRequestResponse = await fetchNode(SicrediApiPixController.#apiPisSicrediAddress + "cob",options);
                await SicrediApiPixController.#handleApiRequestResult(apiPixRequestResponse,result,null,true,SicrediApiPixController.createPix,p_PixReqParams);
            } else {
                throw new Error("not logged on api pix sicredi");
            } 
        } catch (e) {
            Utils.log(e);
            result.exception = e;
            result.message = e.message || e;
            result.success = false;
        }
        return result;       
    }

    static async deletePix(p_PixReqParams,getNewApiPixToken,recursiveCount) {
        let result = {...SicrediApiPixController.#DefaultResponse};
        try {
            let logged = await SicrediApiPixController.#login(getNewApiPixToken || false);
            if (logged) {
                p_PixReqParams = p_PixReqParams || {};
                if (!p_PixReqParams || !p_PixReqParams?.txid) throw new Error("missing data");
                let url = new URL(`${SicrediApiPixController.#apiPisSicrediAddress}cob/${p_PixReqParams.txid}`);
                p_PixReqParams.status = 'REMOVIDA_PELO_USUARIO_RECEBEDOR';

                //not allowed update txid on bacen pix api
                p_PixReqParams.txid = null;
                delete p_PixReqParams.txid;
                let options = SicrediApiPixController.getDefaultApiRequestOptions({method:"PATCH",body:p_PixReqParams});                
                let apiPixRequestResponse = await fetchNode(url,options);
                await SicrediApiPixController.#handleApiRequestResult(apiPixRequestResponse,result,null,true,SicrediApiPixController.deletePix,p_PixReqParams);                
            } else {
                throw new Error("not logged on api pix sicredi");
            }        
        } catch (e) {
            Utils.log(e);
            result.exception = e;
            result.message = e.message || e;
            result.success = false;
        }
        return result;
    }

    static async getPixWebHooks(p_PixReqParams,getNewApiPixToken,recursiveCount) {
        let result = {...SicrediApiPixController.#DefaultResponse};
        try {
            let logged = await SicrediApiPixController.#login(getNewApiPixToken || false);
            if (logged) {
                
                p_PixReqParams = p_PixReqParams || {};
                let pixParams = {};
                let url = null;
                if (p_PixReqParams?.chave) {
                    url = new URL(SicrediApiPixController.#apiPisSicrediAddress + "webhook" + '/' + p_PixReqParams.chave);
                } else {
                    url = new URL(SicrediApiPixController.#apiPisSicrediAddress + "webhook");
                    let inicio = p_PixReqParams?.init || SicrediApiPixController.getDefaultInitDateTiime();
                    let fim = p_PixReqParams?.end || SicrediApiPixController.getDefaultEndDateTiime();                
                    if (inicio.length == 10) inicio += "T00:00:00Z";
                    if (fim.length == 10) fim += "T23:59:59Z";

                    pixParams = {
                        inicio:inicio,
                        fim:fim
                    };
                }
                let options = SicrediApiPixController.getDefaultApiRequestOptions();                
                
                url.search = new URLSearchParams(pixParams).toString();
                let apiPixRequestResponse = await fetchNode(url,options);
                await SicrediApiPixController.#handleApiRequestResult(apiPixRequestResponse,result,null,true,SicrediApiPixController.getPixWebHooks,p_PixReqParams);
            } else {
                throw new Error("not logged on api pix sicredi");
            }
        } catch (e) {
            Utils.log(e);
            result.exception = e;
            result.message = e.message || e;
            result.success = false;
        }
        return result;
    }


    static async createPixWebHook(p_PixReqParams,getNewApiPixToken,recursiveCount) {
        let result = {...SicrediApiPixController.#DefaultResponse};
        try {
            let logged = await SicrediApiPixController.#login(getNewApiPixToken || false);
            if (logged) {
                p_PixReqParams = p_PixReqParams || {};
                if (!p_PixReqParams?.RECEPTORKEY  || !p_PixReqParams.EXTERNALADDRESS) throw new Error("missing data");
                let url = new URL(`${SicrediApiPixController.#apiPisSicrediAddress}webhook/${p_PixReqParams.RECEPTORKEY}`);
                let pixParams = {
                    webhookUrl:p_PixReqParams.EXTERNALADDRESS
                };
                let options = SicrediApiPixController.getDefaultApiRequestOptions({
                    method:"PUT",
                    headers:{...SicrediApiPixController.getDefaultApiRequestHeaders(),'x-skip-mtls-checking':true},
                    body:pixParams
                }); 
                let apiPixRequestResponse = await fetchNode(url,options);
                await SicrediApiPixController.#handleApiRequestResult(apiPixRequestResponse,result,null,false,SicrediApiPixController.createPixWebHook,p_PixReqParams);                            
            } else {
                throw new Error("not logged on api pix sicredi");
            } 
        } catch (e) {
            Utils.log(e);
            result.exception = e;
            result.message = e.message || e;
            result.success = false;
        }
        return result;       
    }


    static async deletePixWebHook(p_PixReqParams,getNewApiPixToken,recursiveCount) {
        let result = {...SicrediApiPixController.#DefaultResponse};
        try {
            let logged = await SicrediApiPixController.#login(getNewApiPixToken || false);
            if (logged) {
                p_PixReqParams = p_PixReqParams || {};
                if (!p_PixReqParams?.chave) throw new Error("missing data");
                let url = new URL(`${SicrediApiPixController.#apiPisSicrediAddress}webhook/${p_PixReqParams.chave}`);
                let options = SicrediApiPixController.getDefaultApiRequestOptions({method:"DELETE"}); 
                let apiPixRequestResponse = await fetchNode(url,options);
                await SicrediApiPixController.#handleApiRequestResult(apiPixRequestResponse,result,null,false,SicrediApiPixController.deletePixWebHook,p_PixReqParams);                
            } else {
                throw new Error("not logged on api pix sicredi");
            } 
        } catch (e) {
            Utils.log(e);
            result.exception = e;
            result.message = e.message || e;
            result.success = false;
        }
        return result;       
    }

}
module.exports = { SicrediApiPixController }