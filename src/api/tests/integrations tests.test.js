const fs = require('fs');
const path = require('path');
process.env.API_INTERNAL_PROTOCOL = process?.env?.API_INTERNAL_PROTOCOL || "http";
process.env.API_INTERNAL_IP = process?.env?.API_INTERNAL_IP || "localhost";
process.env.API_PORT = process?.env?.API_PORT || "3004";
let loggedUser = null;
let userToken = null;
let userRefreshToken = null;
const baseApiEndPoint = `${process.env.API_INTERNAL_PROTOCOL}://${process.env.API_INTERNAL_IP}:${process.env.API_PORT}`;
const defaultApiHeaders = {
    Accept:'application/json',
    "Content-Type":"application/json"
}
let loggedApiHeaders = {
    ...defaultApiHeaders
}
let defaultLoggedOptions = {
    method:'GET',
    headers: {...loggedApiHeaders}
}
let endPoints = null;
let crudsToDelete = [];
let longTimeRun = 30000;
let normalTimeRun =5000;
let datas = {};
const testString = '__TEST__';
let canDelete = false;


//helper functions
function _typeOf(value) {
    let r = typeof value;
    if (typeof NodeList != 'undefined') {
        if (Array.isArray(value) || value instanceof NodeList || value instanceof Array) {
            r = "array";
        }
    } else {
        if (Array.isArray(value) || value instanceof Array) {
            r = "array";
        }
    }
    return r;
}

function hasValue(pValue){
    let result = false;
    let tpof = _typeOf(pValue);
    if (tpof !== "undefined" && pValue != null) {
        if (tpof == "object") {
            if (Object.keys(pValue).length > 0
                || Object.getOwnPropertySymbols(pValue).length > 0
                || ['DATE'].indexOf(pValue?.constructor?.name?.toUpperCase()) > - 1
            ) {
                result = true;
            } 
        } else if (tpof == "array") {
            if (pValue.length > 0) {
                result = true;
            }
        } else if (tpof == "string") {
            if (pValue.trim().length > 0) {
                result = true;
            }
        } else {
            result = true;
        }
    }
    return result;
}

async function refreshToken() {
    let endPoint = `${baseApiEndPoint}${endPoints.refreshtoken.path}`;
    options = {
        ...defaultLoggedOptions,        
        method:'POST',
        body: JSON.stringify({
            refreshToken: userRefreshToken
        })
    };    
    let jsonData = await callApi(endPoint,options);
    //console.log('response of refreshtoken',jsonData);
    expect(hasValue(jsonData?.data?.token)).toBeTruthy();
    expect(hasValue(jsonData?.data?.refreshToken)).toBeTruthy();
    expect(hasValue(jsonData?.data?.user)).toBeTruthy();
    loggedUser = jsonData.data.user;
    userToken = jsonData.data.token;
    userRefreshToken = jsonData.data.refreshToken;
    loggedApiHeaders["x-access-token"] = userToken;
    defaultLoggedOptions = {
        method:'GET',
        headers: {...loggedApiHeaders}
    }
    console.log('refreshing token success');
    return jsonData;
}

async function callApi(endPoint,options, notCheckErrors){
    let resultJson = null;
    options = options || {
        method:'GET',
        headers:defaultApiHeaders
    }
    let resultRequest = await fetch(endPoint,options);

    if (resultRequest.status != 200) {
        resultJson = await resultRequest.json();        
        if (resultJson.message.trim().indexOf('expired') > -1){
            resultJson = await refreshToken();
            if (resultJson?.success) {
                options.headers["x-access-token"] = resultJson.data.token;
                resultJson = await callApi(endPoint,options);
                return  resultJson;
            } else {
                console.log('refresh token not returned 200, returned ',resultJson);            
            }
        } else {
            console.log(endPoint,options,resultJson);
        }
    } 
    if (!notCheckErrors) {
        expect(resultRequest.status).toEqual(200);
        expect(resultRequest.statusText).toEqual("OK");
    }
    resultJson = await resultRequest.json();
    if (!resultJson?.success) console.log(endPoint,options,resultJson);
    if (!notCheckErrors) {
        expect(resultJson?.success || false).toBeTruthy();
    }
    return resultJson;
}

async function getDataFromTable(tableName,checkHasData) {
    let endPoint = `${baseApiEndPoint}${endPoints.registerscontroller.path}/${tableName}`;
    let options = {
        ...defaultLoggedOptions
    }
    let jsonData = await callApi(endPoint,options);
    if (checkHasData) expect(hasValue(jsonData?.data)).toBeTruthy();
    datas[tableName] = jsonData?.data;
    return jsonData?.data;
}

async function getDataFromWinthorTable(params) {
    let endPoint = `${baseApiEndPoint}${endPoints.registers.path}/integrations/winthor/winthorintegrationsregisterscontroller/${params.winthorTableName}/get`;     
    let options = {
        ...defaultLoggedOptions,
        method:'POST',
        body: JSON.stringify({
            queryParams:{
                attributes:params.fields
            }
        })
    };
    let jsonData = await callApi(endPoint,options);
    if (!params.notCheckHasData) expect(hasValue(jsonData?.data)).toBeTruthy();
    datas[params.winthorTableName] = jsonData?.data;
    return jsonData?.data;
}


async function crudDelete(params) {
    let jsonData = null;
    let options = {...defaultLoggedOptions}
    options.method = 'DELETE';
    options.body = JSON.stringify({
        queryParams:{
            where:{
                ID:params.ID
            }
        }
    });
    //console.log('DELETING',`${params.endPoint}`,options);
    jsonData = await callApi(`${params.endPoint}`,options, true);    
    expect(jsonData.success).toBeTruthy();
    return jsonData;
}

async function createData(tableName,valuesToCreate){
    //console.log('creating', tableName,valuesToCreate);
    let fieldUpdate = Object.keys(valuesToCreate)[0] || 'NAME';
    valuesToCreate = valuesToCreate || {};
    let endPoint = `${baseApiEndPoint}${endPoints.registerscontroller.path}/${tableName}`;     
    let options = {...defaultLoggedOptions}
    options.method = 'PUT';
    options.body = JSON.stringify({
        ...valuesToCreate,
        [fieldUpdate] : testString
    });
    //console.log(options);
    let jsonDataCreate = await callApi(`${endPoint}`,options);
    expect(hasValue(jsonDataCreate.data.ID)).toBeTruthy();
    //delete
    let crudToDelete = crudsToDelete.find(el=>el.tableName == tableName);
    if (crudToDelete) {
        crudToDelete.ID.in.push(jsonDataCreate.data.ID)
    } else {
        crudsToDelete.push({
            tableName: tableName,
            endPoint: endPoint,
            ID:{
                in:[jsonDataCreate.data.ID]
            },
            data: jsonDataCreate.data
        });
    } 
    expect(jsonDataCreate.data[fieldUpdate]).toEqual(testString);
    //console.log('created',tableName,jsonDataCreate.data);
}

async function updateData(tableName,valuesToCreate){
    let fieldUpdate = Object.keys(valuesToCreate)[0] || 'NAME';
    valuesToCreate = valuesToCreate || {};
    let endPoint = `${baseApiEndPoint}${endPoints.registerscontroller.path}/${tableName}`;     
    let options = {...defaultLoggedOptions}
    options.method = 'PATCH';
    let dataToUpdate = crudsToDelete.find(el=>el.tableName == tableName)?.data;
    expect(hasValue(dataToUpdate)).toBeTruthy();    
    //console.log(dataToUpdate);
    let previousValue = null;
    for(let i = 0; i < 2; i++) {
        previousValue = previousValue || dataToUpdate[fieldUpdate];
        let newValue = `${previousValue}${i == 0 ? testString : ''}`;
        
        options.body = JSON.stringify({
            queryParams:{
                where:{
                    ID: dataToUpdate.ID
                },
                values:{
                    [fieldUpdate]: newValue
                }
            }  
        });
        //console.log(fieldUpdate,options);
        let jsonDataUpdated = await callApi(endPoint,options);
        //console.log(jsonDataUpdated);
        expect(jsonDataUpdated.data[fieldUpdate]).toEqual(newValue);
    }
};

async function integrateDataFromWinthorTable(params) {
    let options = {...defaultLoggedOptions,method:'POST'}
    let origin = datas['originsdatas'].find(el=>el.NAME == 'WINTHOR');
    let valuesToCreate = null;
    let data = await getDataFromWinthorTable(params);
    if (typeof params.identifierWithorField == 'function') {
        valuesToCreate = params.identifierWithorField(origin,data);
    } else {
        valuesToCreate = {
            origin:origin,
            identifiers:[data[0][params.identifierWithorField] || params.identifierWithorField]
        };
    }
    options.body = JSON.stringify(valuesToCreate);
    let jsonResponse = await callApi(params.endPointIntegration,options);
    jsonResponse.data = jsonResponse.data[0];
    expect(hasValue(jsonResponse.data.ID)).toBeTruthy();
}

describe('Running api call tests',()=>{
    
    test('api onlne', async() => {
        let endPoint = `${baseApiEndPoint}/api/online`;
        let jsonData = await callApi(endPoint);
    });

    test('get end points (not logged)', async() => {
        let endPoint = `${baseApiEndPoint}/api/endpoints`;
        let jsonData = await callApi(endPoint);
        expect(Object.keys(jsonData.data||{}).length || 0).toBeGreaterThanOrEqual(3);
        expect(hasValue(jsonData?.data?.login)).toBeTruthy();
        endPoints = jsonData.data;
    });    

    test('login', async() => {
        let endPoint = `${baseApiEndPoint}${endPoints.login.path}`;
        let options = {
            method:'POST',
            headers:{...defaultApiHeaders},
            body:JSON.stringify({
                email:"system@system",
                password:"system"
            })
        }
        let jsonData = await callApi(endPoint,options);  
        expect(hasValue(jsonData?.data?.token)).toBeTruthy();
        expect(hasValue(jsonData?.data?.refreshToken)).toBeTruthy();
        expect(hasValue(jsonData?.data?.user)).toBeTruthy();
        loggedUser = jsonData.data.user;
        userToken = jsonData.data.token;
        userRefreshToken = jsonData.data.refreshToken;
        loggedApiHeaders["x-access-token"] = userToken;
        defaultLoggedOptions = {
            method:'GET',
            headers: {...loggedApiHeaders}
        }
    });

    test('get end points (logged)', async() => {
        let endPoint = `${baseApiEndPoint}/api/endpoints`;
        let options = {
            ...defaultLoggedOptions
        }
        let jsonData = await callApi(endPoint,options);
        expect(Object.keys(jsonData.data||{}).length || 0).toBeGreaterThanOrEqual(10);
        expect(hasValue(jsonData?.data?.routinescontroller)).toBeTruthy();
        expect(hasValue(jsonData?.data?.registerscontroller)).toBeTruthy();
        endPoints = jsonData.data;
    });

    const directoryPath = path.resolve(__dirname,'../../api/database/migrations');
    let fileList = fs.readdirSync(directoryPath);
    fileList = fileList.filter(el=>el.trim().toLowerCase().indexOf('create-table')>-1);
    fileList = fileList.map(el=>el.replace(/\d|\-create\-table\-|\.js/g,'').trim().toLowerCase());
    fileList.sort(function(a,b){
        if (b == 'datatables' && ['dataconnections','dataschemas'].indexOf(a) > -1) 
            return -1
        else return 0;
    });

    //console.log('fileList',fileList);

    for(let i in fileList) {
        //break;
        let modelName = fileList[i].replace(/\d|\-|create|\.js/g,'').trim().toLowerCase();
        
        //if (['originsdatas','identifierstypes','people','companies','businessesunits'].indexOf(modelName) > -1)
        describe(modelName,()=>{
            let getParamsToCreate = ()=>{
                return {                    
                    NAME:testString
                }
            };
            let getParamsToIntegrate = null;
            switch(modelName) {
                case 'errors':                                        
                    getParamsToCreate = ()=>{
                        return {                    
                            OBJECTNAME:testString
                        }
                    };
                    break;
                case 'logs':
                    getParamsToCreate = ()=>{
                        return {                    
                            PROCESSNAME:testString
                        }
                    };
                    break; 
                case 'datatables':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'dataconnections';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName); 
                        let parentTableName2 = 'dataschemas';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2); 
                        return {
                            NAME:testString,                            
                            IDDATACONNECTION:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDSCHEMA:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                        }
                    }
                    
                    break;  
                case 'parameters':            
                    getParamsToCreate = ()=>{
                        let parentTableName = 'datatypes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            NAME:testString,                            
                            IDDATATYPE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'parametersvalues':
                    getParamsToCreate = () => {
                        let parentTableName = 'parameters';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            VALUE:testString,                            
                            IDPARAMETER:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'countries':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'continents';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            NAME:testString,                            
                            IDCONTINENT:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    
                    getParamsToIntegrate = ()=>{
                        return {
                            tableName: modelName,
                            winthorTableName: 'pcpais',
                            winthorTableFields: ['CODPAIS','DESCRICAO'],
                            endPointIntegration: `${baseApiEndPoint}${endPoints.registers.path}/locations/${modelName}/integrations/${modelName}integrationscontroller/integrate`,
                            identifierWithorField: 'CODPAIS',
                            fieldUpdate: 'NAME'
                        }
                    };
                    break;
                case 'states':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'countries';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            NAME:testString,                            
                            IDCOUNTRY:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                
                    getParamsToIntegrate = ()=>{
                        return {
                            tableName: modelName,
                            winthorTableName: 'pcestado',
                            winthorTableFields: [
                                'CODPAIS',
                                '(SELECT P.DESCRICAO FROM JUMBO.PCPAIS P WHERE P.CODPAIS = PCESTADO.CODPAIS) AS PAIS',
                                'UF',
                                'ESTADO'
                            ],
                            endPointIntegration: `${baseApiEndPoint}${endPoints.registers.path}/locations/${modelName}/integrations/${modelName}integrationscontroller/integrate`,
                            identifierWithorField: 'UF',
                            fieldUpdate: 'NAME'
                        }
                    };                    
                    break;
                case 'cities': 
                    getParamsToCreate = ()=>{
                        let parentTableName = 'states';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            NAME:testString,                            
                            IDSTATE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                
                    getParamsToIntegrate = ()=>{
                        return {
                            tableName: modelName,
                            winthorTableName: 'pccidade',
                            winthorTableFields: [
                                'UF',
                                'CODCIDADE',
                                'NOMECIDADE'
                            ],
                            endPointIntegration: `${baseApiEndPoint}${endPoints.registers.path}/locations/${modelName}/integrations/${modelName}integrationscontroller/integrate`,
                            identifierWithorField: 'CODCIDADE',
                            fieldUpdate: 'NAME'
                        }
                    };
                    break;
                case 'neighborhoods':
                case 'streets':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'cities';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            NAME:testString,                            
                            IDCITY:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;                
                case 'people':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'identifierstypes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            NAME:testString,                            
                            IDIDENTIFIERDOCTYPE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDENTIFIERDOC:testString
                        }
                    };

                    getParamsToIntegrate = ()=>{
                        return {
                            tableName: modelName,
                            winthorTableName: 'pcclient',
                            winthorTableFields: [
                                'CODCLI',
                                'TIPOFJ',
                                'CGCENT',
                                'CODFILIALNF',
                                'CLIENTE',
                                'FANTASIA'
                            ],
                            endPointIntegration: `${baseApiEndPoint}${endPoints.registers.path}/${modelName}/integrations/${modelName}integrationscontroller/integrate`,
                            identifierWithorField: (origin,data)=>{
                                return {
                                    origin:origin,
                                    identifiers:[data[0].CODCLI],
                                    registersIdentifiersDocs: [{
                                        TIPOFJ:data[0].TIPOFJ,
                                        CGCENT:data[0].CGCENT
                                    }]
                                }
                            },
                            fieldUpdate: 'NAME'
                        }
                    };                    
                    break;
                case 'warehouses':
                case 'businessesunits':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'people';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'companies';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            ALIAS:testString,                            
                            IDPEOPLE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDCOMPANY:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                        }
                    };

                    getParamsToIntegrate = ()=>{
                        return {
                            tableName: modelName,
                            winthorTableName: 'pcfilial',
                            winthorTableFields: [
                                'CODIGO',
                                'CGC',
                                'RAZAOSOCIAL',
                                'FANTASIA',
                                'CIDADE',
                                'UF',
                                'CODCLI'
                            ],
                            endPointIntegration: `${baseApiEndPoint}${endPoints.registers.path}/people/${modelName}/integrations/${modelName}integrationscontroller/integrate`,
                            identifierWithorField: 'CODIGO',
                            fieldUpdate: 'ALIAS'
                        }
                    };                    
                    break;
                case 'users':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'people';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'accessesprofiles';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            ALIAS:testString,                            
                            IDPEOPLE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDACCESSESPROFILE:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            EMAIL :`${testString}@${testString}`,
                            PASSWORD :`${testString}`,
                        }
                    };
                    break;
                case 'permissions':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'users';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'accessesprofiles';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'powerstypes';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);        
                        return {
                            OBSERVATIONS:testString,                            
                            IDUSER:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDACCESSESPROFILE:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDPOWERTYPE:parent3?.ID.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).ID || undefined,
                            ALLOWEDACCESS :1
                        }
                    };
                    break;
                case 'companies':
                case 'clients':
                case 'collaborators':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'people';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            ALIAS:testString,                            
                            IDPEOPLE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };

                    if (modelName == 'clients') {
                        getParamsToIntegrate = ()=>{
                            return {
                                tableName: modelName,
                                winthorTableName: 'pcclient',
                                winthorTableFields: undefined,
                                endPointIntegration: `${baseApiEndPoint}${endPoints.registers.path}/people/${modelName}/integrations/${modelName}integrationscontroller/integrate`,
                                identifierWithorField: 'CODCLI',
                                fieldUpdate: 'ALIAS'
                            }
                        };   
                    } else if (modelName == 'companies') {
                        getParamsToIntegrate = ()=>{
                            return {
                                tableName: modelName,
                                winthorTableName: 'pcfilial',
                                winthorTableFields: [
                                    'CODIGO',
                                    'CGC',
                                    'RAZAOSOCIAL',
                                    'FANTASIA',
                                    'CIDADE',
                                    'UF',
                                    'CODCLI'
                                ],
                                endPointIntegration: `${baseApiEndPoint}${endPoints.registers.path}/people/${modelName}/integrations/${modelName}integrationscontroller/integrate`,
                                identifierWithorField: 'CODIGO',
                                fieldUpdate: 'ALIAS'
                            }
                        };
                    }
                    break;
                case 'objectives':
                    getParamsToCreate = ()=>{                        
                        return {
                            NAME:testString,                            
                            STARTDATE:new Date(),
                            ENDDATE:new Date(),
                        }
                    };
                    break;
                case 'logisticreasons':                    
                    getParamsToIntegrate = ()=>{
                        return {
                            tableName: modelName,
                            winthorTableName: 'pctabdev',
                            winthorTableFields: [
                                'CODDEVOL',
                                'MOTIVO',
                                'TIPO'
                            ],
                            endPointIntegration: `${baseApiEndPoint}${endPoints.registers.path}/logistic/reasons/integrations/${modelName}integrationscontroller/integrate`,
                            identifierWithorField: 'CODDEVOL',
                            fieldUpdate: 'NAME'
                        }
                    };
                    break;
                case 'reportsdatasfountsitems':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'reportsdatasfounts';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'sqlobjectstypes';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            SQLTEXT:testString,                            
                            IDREPORTDATAFOUNT:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDSQLOBJECTTYPE:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'apisrequests':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'apis';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            NAME:testString,                            
                            IDAPI:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'apisrequestscalls':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'apisrequests';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);  
                        return {
                            ONRECEIVEWEBHOOKRESPONSE:testString,                            
                            IDAPIREQUEST:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'apisresponses':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'apisrequestscalls';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            RESPONSE:testString,                            
                            IDAPIREQUESTCALL:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'apismapsresponses':
                    getParamsToCreate = ()=>{
                        return {
                            RESPONSE:testString
                        }
                    };
                    break;
                case 'sqlprocesses': 
                    getParamsToCreate = ()=>{
                        let parentTableName = 'sqlobjectstypes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            NAME:testString,                            
                            IDSQLOBJECTTYPE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'datasrelationships':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'datarelationshiptypes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'datatables';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            VALUE:testString,                            
                            IDRELATIONSHIPTYPE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDTABLE1:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDTABLE2:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'greatnesses':
                case 'packagings':
                    getParamsToCreate = ()=>{
                        return {
                            NAME:testString,                            
                            SIGLA:testString
                        }
                    };
                    break;
                case 'ncms':
                    getParamsToCreate = ()=>{
                        return {
                            DESCRIPTION:testString,
                            CHAPTER: 1,
                            NCM: 1                            
                        }
                    };
                    break;
                case 'measurementsunits':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'greatnesses';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            NAME:testString,                            
                            IDGREATNESS:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            SIGLA: testString,
                        }
                    };
                    break;
                case 'userstokens':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'users';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            TOKEN:testString,                            
                            IDUSER:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break; 
                case 'usersprofilestimeswork':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'users';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            NAME:testString,                            
                            IDUSER:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;                            
                case 'userstimeswork':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'usersprofilestimeswork';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            OBSERVATIONS:testString,                           
                            STARTAT:testString,                            
                            IDUSERPROFILETIMEWORK:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            WEEKDAY:0,                            
                            ENDAT:testString
                        }
                    };
                    break;  
                case 'routines':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'routinestypes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'modules';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            NAME:testString,                            
                            IDROUTINETYPE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDMODULE:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;                           
                case 'routinescontent':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'routines';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            NAME:testString,                            
                            IDROUTINE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break; 
                case 'texts':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'languages';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            TEXT:testString,                            
                            IDLANGUAGE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break; 
                case 'translates':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'languages';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'texts';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            TRANSLATED:testString,                            
                            IDLANGUAGE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDTEXT:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;                                           
                case 'datasrelationshipsvalues':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'datasrelationships';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'identifierstypes';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'datatypes';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);        
                        return {
                            VALUE:testString,                            
                            IDDATARELATIONSHIP:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDIDENTIFIERTYPE:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDDATATYPE:parent3?.ID.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;   
                case 'datasvalues':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'datatables';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'valuesnames';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            VALUE:testString,                            
                            IDTABLE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDVALUENAME:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDREG:1
                        }
                    };
                    break; 
                case 'datashierarchies':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'datatables';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            OBSERVATIONS:testString,                            
                            IDTABLEPARENT:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDTABLESUBORDINATED:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDPARENT:1,
                            IDSUBORDINATED:1
                        }
                    };
                    break;
                case 'postalcodes':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'addressestypes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'cities';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            POSTALCODE:testString,                            
                            IDADDRESSTYPE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDCITY:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'postalcodesxstreets':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'postalcodes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'neighborhoods';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'streets';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);        
                        return {
                            OBSERVATIONS:testString,                            
                            IDPOSTALCODE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDNEIGHBORHOOD:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDSTREET:parent3?.ID.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;   
                case 'postalcodesxpaths':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'postalcodes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            STARTNUMBER:testString,                            
                            IDPOSTALCODE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'addresses':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'addressestypes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            NUMBER:testString,                            
                            IDADDRESSTYPE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'contacts':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'contactstypes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            NAME:testString,                            
                            IDCONTACTTYPE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'peoplexaddresses':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'people';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'addresses';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            OBSERVATIONS:testString,                            
                            IDPEOPLE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDADDRESS:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'peoplexcontacts':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'people';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'contacts';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            OBSERVATIONS:testString,                            
                            IDPEOPLE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDCONTACT:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'warehousesaddresses':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'warehouses';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'warehousesaddressestypes';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);                 
                        let parentTableName3 = 'identifierstypes';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);       
                        return {
                            IDENTIFIER:testString,                            
                            IDWAREHOUSE: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDWAREHOUSEADDRESSTYPE: parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDIDENTIFIERTYPE: parent3?.ID.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'warehousesaddressescoordinates':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'warehousesaddresses';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'warehousesaddressestypes';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            VALUE:testString,                            
                            IDWAREHOUSEADDRESS:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDCOORDINATETYPE:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'warehousesaddressesdimensions':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'warehousesaddresses';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'identifierstypes';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);                 
                        let parentTableName3 = 'measurementsunits';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);       
                        return {
                            OBSERVATIONS:testString,                            
                            IDWAREHOUSEADDRESS: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDDIMENSIONTYPE: parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDMEASUREMENTUNIT: parent3?.ID.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'warehousesaddressescapacities':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'warehousesaddresses';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'identifierstypes';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);                 
                        let parentTableName3 = 'measurementsunits';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);          
                        return {
                            OBSERVATIONS:testString,                            
                            IDWAREHOUSEADDRESS: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDCAPACITYTYPE: parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDMEASUREMENTUNIT: parent3?.ID.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'suppliers':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'people';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);           
                        return {
                            ALIAS:testString,                            
                            IDPEOPLE: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'collaboratorscontracts':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'collaborators';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'contractstypes';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            OBSERVATIONS:testString,                            
                            IDCOLLABORATOR:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDCONTRACTTYPE:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'collaboratorsxfunctions':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'collaboratorscontracts';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'collaboratorsfunctions';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            OBSERVATIONS:testString,                            
                            IDCONTRACT:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDFUNCTION:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'condictions':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'entitiestypes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);       
                        return {
                            OBSERVATIONS:testString,                            
                            IDENTITYTYPE: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDENTITY:1
                        }
                    };
                    break;
                case 'condictionsitems':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'condictions';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);             
                        return {
                            VALUE:testString,                            
                            IDCONDICTION: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'conteinerstypesdimensions':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'conteinerstypes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'identifierstypes';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);                 
                        let parentTableName3 = 'measurementsunits';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);             
                        return {
                            OBSERVATIONS:testString,                            
                            IDCONTEINERTYPE: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDDIMENSIONTYPE: parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDMEASUREMENTUNIT: parent3?.ID.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'conteinerstypescapacities':
                    getParamsToCreate = ()=>{
                        let tableName = 'conteinerstypescapacities';
                        let parentTableName = 'conteinerstypes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'identifierstypes';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);                 
                        let parentTableName3 = 'measurementsunits';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);           
                        return {
                            OBSERVATIONS:testString,                            
                            IDCONTEINERTYPE: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDCAPACITYTYPE: parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDMEASUREMENTUNIT: parent3?.ID.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'items':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'identifierstypes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'ncms';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            IDENTIFIER:testString,                            
                            IDIDENTIFIERTYPE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDNCM:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            NAME: testString
                        }
                    };
                    break;
                case 'lots':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'identifierstypes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);           
                        return {
                            IDENTIFIER:testString,                            
                            IDIDENTIFIERTYPE: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDENTITY:1
                        }
                    };
                    break;
                case 'conteiners':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'conteinerstypes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'identifierstypes';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            IDENTIFIER:testString,                            
                            IDCONTENIERTYPE:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDIDENTIFIERTYPE:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'itemsxlotsxconteiners':
                    getParamsToCreate = ()=>{
                        let tableName = 'itemsxlotsxconteiners';
                        let parentTableName = 'items';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'lots';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'conteiners';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);          
                        return {
                            OBSERVATIONS:testString,                            
                            IDITEM: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDLOT: parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDCONTEINER: parent3?.ID.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'stocksentities':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'companies';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);           
                        return {
                            OBSERVATIONS:testString,                            
                            IDCOMPANY: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'itemsstocks':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'itemsxlotsxconteiners';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'stocksentities';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'measurementsunits';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);        
                        let parentTableName4 = 'packagings';
                        let parent4 = crudsToDelete.find(el=>el.tableName == parentTableName4);     
                        return {
                            OBSERVATIONS:testString,                            
                            IDITEMXLOTXCONTEINER: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDSTOCKENTITY: parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDMEASUREMENTUNIT: parent3?.ID.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).ID || undefined,
                            IDPACKAGING: parent4?.ID.in[0] || ((datas[parentTableName4]||[])[(datas[parentTableName4]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'itemsstocksunits':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'itemsstocks';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);       
                        return {
                            IDENTIFIER:testString,                            
                            IDITEMSTOCK: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;                
                case 'itemsxmeaxpackxidentif':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'items';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'packagings';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            IDENTIFIER:testString,                            
                            IDITEM:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDPACKAGING:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;                
                case 'movements':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'movementstypes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);           
                        return {
                            IDENTIFIER:testString,                            
                            IDTYPEMOV: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break; 
                case 'groupsmovements':
                    getParamsToCreate = ()=>{
                        return {
                            IDENTIFIER:testString
                        }
                    };
                    break;
                case 'groupedsmovements':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'groupsmovements';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'movements';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            OBSERVATIONS:testString,                            
                            IDGROUPMOVEMENT:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDMOV:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'movementsxentities':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'movements';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'movementsentitiesrelationshipstypes';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'stocksentities';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);         
                        return {
                            OBSERVATIONS:testString,                            
                            IDMOV: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDMOVENTITYRELATIONSHIPTYPE: parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDSTOCKENTITY: parent3?.ID.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'movsxitemsstocks':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'movements';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'movementstypes';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'itemsstocks';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);               
                        return {
                            OBSERVATIONS:testString,                            
                            IDMOV: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDTYPEMOV: parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDITEMSTOCK: parent3?.ID.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;                
                case 'itemsmovsamounts':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'movsxitemsstocks';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'movementstypes';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'measurementsunits';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);        
                        let parentTableName4 = 'packagings';
                        let parent4 = crudsToDelete.find(el=>el.tableName == parentTableName4);        
                        return {
                            OBSERVATIONS:testString,                            
                            IDMOVXITEMSTOCK: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDTYPEMOV: parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDMEASUREMENTUNIT: parent3?.ID.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).ID || undefined,
                            IDPACKAGING: parent4?.ID.in[0] || ((datas[parentTableName4]||[])[(datas[parentTableName4]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'itemsmovsunits':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'itemsmovsamounts';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);           
                        return {
                            OBSERVATIONS:testString,                            
                            IDITEMMOVAMT: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break; 
                case 'itemsmovsamountsrestrictions':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'itemsmovsamounts';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);         
                        return {
                            VALUE:testString,                            
                            IDITEMMOVAMT: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break; 
                case 'itemsmovsxmlimportidsconversions':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'clients';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'items';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'measurementsunits';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);        
                        let parentTableName4 = 'packagings';
                        let parent4 = crudsToDelete.find(el=>el.tableName == parentTableName4);           
                        return {
                            DOCEMITENT:testString,                            
                            IDOWNERCLIENT: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDITEM: parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDMEASUREMENTUNIT: parent3?.ID.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).ID || undefined,
                            IDPACKAGING: parent4?.ID.in[0] || ((datas[parentTableName4]||[])[(datas[parentTableName4]||[]).length-1]||{}).ID || undefined,
                            IDITEMORIGIN:testString,
                            FIELDXMLAMOUNT:testString
                        }
                    };
                    break;
                case 'sqlobjects':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'sqlobjectstypes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);          
                        return {
                            NAME:testString,                            
                            IDSQLOBJECTTYPE: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'logisticorders':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'logisticmovtypes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);           
                        return {
                            IDENTIFIER:testString,                            
                            IDLOGISTICMOVTYPE: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'logisticordersxmovs':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'logisticorders';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'movements';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            OBSERVATIONSNOTMOVIMENTEDAMT:testString,                            
                            IDLOGISTICORDER:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDMOV:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'logisticordersxitemsmovamt':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'logisticordersxmovs';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'itemsmovsamounts';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            OBSERVATIONSNOTMOVIMENTEDAMT:testString,                            
                            IDLOGISTICORDERXMOV:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDITEMMOVAMT:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;                
                case 'logisticordersxmovsxreceiptvalues':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'logisticorders';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'financialvalueforms';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'currenciestypes';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);        
                        return {
                            PROOFS:testString,                            
                            IDLOGISTICORDER: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDFINANCIALVALUEFORM: parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDCURRENCYTYPEEXPECTED: parent3?.ID.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;                  
                case 'logisticordersxdestvalues':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'logisticorders';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'financialvalueforms';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'financialvaluemovtypes';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);        
                        return {
                            OBSERVATIONS:testString,                            
                            IDLOGISTICORDER: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDLOGORDFINANCIALVALUEFORM: parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined,
                            IDFINANCIALVALUEMOVTYPEDEST: parent3?.ID.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;                
                case 'logisticlogs':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'datatables';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);          
                        return {
                            JSONOBJECT:testString,                            
                            IDTABLEREF: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDREGISTERREF:1
                        }
                    };
                    break;                
                case 'tasksxstatusxusers':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'tasks';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'users';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            OBSERVATIONS:testString,                            
                            IDTASK:parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDUSER:parent2?.ID.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;
                case 'tasksxstatusxuserslogs':
                    getParamsToCreate = ()=>{
                        let tableName = 'tasksxstatusxuserslogs';
                        let parentTableName = 'tasksxstatusxusers';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);           
                        return {
                            OPERATION:testString,                            
                            IDTASKXSTATUSXUSER: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;     
                case 'commissionsentitiescodes':
                    getParamsToCreate = ()=>{
                        let tableName = 'commissionsentitiescodes';
                        let parentTableName = 'datatables';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);           
                        return {
                            NAME:testString,                            
                            IDTABLEENTITY: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined,
                            IDREGISTERENTITY:1
                        }
                    };
                    break;             
                case 'commissionsitems':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'commissionsentitiescodes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);             
                        return {
                            NAME:testString,                            
                            IDCOMMISSIONENTITYCODE: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;             
                case 'commissionsvalues':
                    getParamsToCreate = ()=>{
                        let tableName = 'commissionsvalues';
                        let parentTableName = 'commissionsitems';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);         
                        return {
                            NAME:testString,                            
                            IDCOMMISSIONITEM: parent?.ID.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).ID || undefined
                        }
                    };
                    break;          
            }

            test(`create`, async() => {
                //console.log(modelName,getParamsToCreate());
                await createData(modelName,getParamsToCreate());
            });
            test(`read`, async() => {
                await getDataFromTable(modelName,true);
            });
            test(`update`, async() => {
                await updateData(modelName,getParamsToCreate());
            });            
            test('delete (forward)',()=>{
                expect(true).toBeTruthy();
            });
            if (typeof getParamsToIntegrate == 'function') {
                describe('integration',()=>{
                    test('read',async()=>{
                        await getDataFromWinthorTable(getParamsToIntegrate());
                    },longTimeRun);
                    test('integrate',async()=>{
                        await integrateDataFromWinthorTable(getParamsToIntegrate());
                    },longTimeRun);
                });
            }
        });
        //break;
        
        //if (modelName == 'originsdatas') break;
        //if (modelName == 'people') break;
        //if (modelName == 'peoplexcontacts') break;
        //if (modelName == 'companies') break;
        //if (modelName == 'clients') break;
    }

    afterAll(async ()=>{
        //console.log('CRUDS FOR DELETE',crudsToDelete.map(el=>el.tableName));
        for(let i = crudsToDelete.length-1; i >= 0 ; i--) {
            await crudDelete(crudsToDelete[i]);
        }
    },60000);
});



