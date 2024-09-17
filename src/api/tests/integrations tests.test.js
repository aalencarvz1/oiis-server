const fs = require('fs');
const path = require('path');
process.env.API_INTERNAL_PROTOCOL = process?.env?.API_INTERNAL_PROTOCOL || "http";
process.env.API_INTERNAL_IP = process?.env?.API_INTERNAL_IP || "localhost";
process.env.API_PORT = process?.env?.API_PORT || "3004";
process.env.HAS_WINTHOR_INTEGRATION = process?.env?.HAS_WINTHOR_INTEGRATION || "false";
process.env.HAS_EP_INTEGRATION = process?.env?.HAS_EP_INTEGRATION || "false";
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
tablesNamesIgnoresFKErrors=[
    'companies'
]


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

function toBool(pValue){
    let result = false;
    if (typeof pValue !== "undefined" && pValue != null) {
        if (typeof pValue == "boolean") {
            result = pValue;
        } else if (typeof pValue == "string") {
            if (["0","false","not","no","n","não"," ","","null"].indexOf(pValue.trim().toLowerCase()) == -1) {
                result = true;
            }
        } else if (typeof pValue == "number") {
            if (pValue != 0) {
                return true;
            }
        } else {
            result = pValue?true:false;
        }
    }
    //Utils.log('to bool',pValue,result);
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
                id:params.id
            }
        }
    });
    //console.log('DELETING',`${params.endPoint}`,params,options);
    jsonData = await callApi(`${params.endPoint}`,options, true);    
    expect(tablesNamesIgnoresFKErrors.indexOf(params.tableName.trim().toLowerCase()) > -1 || jsonData.success).toBeTruthy();
    return jsonData;
}

async function createData(tableName,valuesToCreate){
    //console.log('creating', tableName,valuesToCreate);
    let fieldUpdate = Object.keys(valuesToCreate)[0] || 'name';
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
    expect(hasValue(jsonDataCreate.data.id)).toBeTruthy();
    //delete
    let crudToDelete = crudsToDelete.find(el=>el.tableName == tableName);
    if (crudToDelete) {
        crudToDelete.id.in.push(jsonDataCreate.data.id)
    } else {
        crudsToDelete.push({
            tableName: tableName,
            endPoint: endPoint,
            id:{
                in:[jsonDataCreate.data.id]
            },
            data: jsonDataCreate.data
        });
    } 
    expect(jsonDataCreate.data[fieldUpdate]).toEqual(testString);
    //console.log('created',tableName,jsonDataCreate.data);
}

async function updateData(tableName,valuesToCreate){
    let fieldUpdate = Object.keys(valuesToCreate)[0] || 'name';
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
                    id: dataToUpdate.id
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
    let origin = datas['data_origins'].find(el=>el.name == 'WINTHOR');
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
    expect(hasValue(jsonResponse.data.id)).toBeTruthy();
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
        if (b == 'tables' && ['connections','schemas'].indexOf(a) > -1) 
            return -1
        else return 0;
    });

    //console.log('fileList',fileList);

    for(let i in fileList) {
        //break;
        let modelName = fileList[i].replace(/\d|\-|create|\.js/g,'').trim().toLowerCase();
        
        //if (['maps_api_responses'].indexOf(modelName) > -1)
        describe(modelName,()=>{
            let getParamsToCreate = ()=>{
                return {                    
                    name:testString
                }
            };
            let getParamsToIntegrate = null;
            switch(modelName) {
                case 'errors':                                        
                    getParamsToCreate = ()=>{
                        return {                    
                            object_name:testString
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
                case 'tables':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'connections';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName); 
                        let parentTableName2 = 'schemas';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2); 
                        return {
                            name:testString,                            
                            data_connection_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            schema_id:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                        }
                    }
                    
                    break;  
                case 'parameters':            
                    getParamsToCreate = ()=>{
                        let parentTableName = 'data_types';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            name:testString,                            
                            IDDATATYPE:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'parameter_values':
                    getParamsToCreate = () => {
                        let parentTableName = 'parameters';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            value:testString,                            
                            IDPARAMETER:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'countries':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'continents';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            name:testString,                            
                            continent_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    
                    if (toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
                        getParamsToIntegrate = ()=>{
                            return {
                                tableName: modelName,
                                winthorTableName: 'PCPAIS',
                                winthorTableFields: ['CODPAIS','DESCRICAO'],
                                endPointIntegration: `${baseApiEndPoint}${endPoints.registers.path}/locations/${modelName}/integrations/${modelName}_integration_controller/integrate`,
                                identifierWithorField: 'CODPAIS',
                                fieldUpdate: 'name'
                            }
                        };
                    }
                    break;
                case 'states':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'countries';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            name:testString,                            
                            IDCOUNTRY:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                
                    if (toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
                        getParamsToIntegrate = ()=>{
                            return {
                                tableName: modelName,
                                winthorTableName: 'PCESTADO',
                                winthorTableFields: [
                                    'CODPAIS',
                                    '(SELECT P.DESCRICAO FROM JUMBO.PCPAIS P WHERE P.CODPAIS = PCESTADO.CODPAIS) AS PAIS',
                                    'UF',
                                    'ESTADO'
                                ],
                                endPointIntegration: `${baseApiEndPoint}${endPoints.registers.path}/locations/${modelName}/integrations/${modelName}_integration_controller/integrate`,
                                identifierWithorField: 'UF',
                                fieldUpdate: 'name'
                            }
                        };               
                    }     
                    break;
                case 'cities': 
                    getParamsToCreate = ()=>{
                        let parentTableName = 'states';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            name:testString,                            
                            state_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                
                    if (toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
                        getParamsToIntegrate = ()=>{
                            return {
                                tableName: modelName,
                                winthorTableName: 'PCCIDADE',
                                winthorTableFields: [
                                    'UF',
                                    'CODCIDADE',
                                    'NOMECIDADE'
                                ],
                                endPointIntegration: `${baseApiEndPoint}${endPoints.registers.path}/locations/${modelName}/integrations/${modelName}_integration_controller/integrate`,
                                identifierWithorField: 'CODCIDADE',
                                fieldUpdate: 'name'
                            }
                        };
                    }
                    break;
                case 'neighborhoods':
                case 'streets':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'cities';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            name:testString,                            
                            IDCITY:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;                
                case 'people':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'identifier_types';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            name:testString,                            
                            identifier_doc_type_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            identifier_doc:testString
                        }
                    };

                    if (toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
                        getParamsToIntegrate = ()=>{
                            return {
                                tableName: modelName,
                                winthorTableName: 'PCCLIENT',
                                winthorTableFields: [
                                    'CODCLI',
                                    'TIPOFJ',
                                    'CGCENT',
                                    'CODFILIALNF',
                                    'CLIENTE',
                                    'FANTASIA'
                                ],
                                endPointIntegration: `${baseApiEndPoint}${endPoints.registers.path}/${modelName}/integrations/${modelName}_integration_controller/integrate`,
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
                                fieldUpdate: 'name'
                            }
                        };                 
                    }   
                    break;
                case 'warehouses':
                case 'business_units':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'people';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'companies';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            alias:testString,                            
                            people_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            company_id:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                        }
                    };

                    if (toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
                        getParamsToIntegrate = ()=>{
                            return {
                                tableName: modelName,
                                winthorTableName: 'PCFILIAL',
                                winthorTableFields: [
                                    'CODIGO',
                                    'CGC',
                                    'RAZAOSOCIAL',
                                    'FANTASIA',
                                    'CIDADE',
                                    'UF',
                                    'CODCLI'
                                ],
                                endPointIntegration: `${baseApiEndPoint}${endPoints.registers.path}/people/${modelName}/integrations/${modelName}_integration_controller/integrate`,
                                identifierWithorField: 'CODIGO',
                                fieldUpdate: 'alias'
                            }
                        };         
                    }           
                    break;
                case 'users':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'people';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'access_profiles';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            alias:testString,                            
                            people_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            IDACCESSESPROFILE:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            EMAIL :`${testString}@${testString}`,
                            PASSWORD :`${testString}`,
                        }
                    };
                    break;
                case 'permissions':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'users';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'access_profiles';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'power_types';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);        
                        return {
                            observations:testString,                            
                            IDUSER:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            IDACCESSESPROFILE:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            IDPOWERTYPE:parent3?.id.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).id || undefined,
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
                            alias:testString,                            
                            people_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };

                    if (toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
                        if (modelName == 'clients') {                        
                            getParamsToIntegrate = ()=>{
                                return {
                                    tableName: modelName,
                                    winthorTableName: 'PCCLIENT',
                                    winthorTableFields: undefined,
                                    endPointIntegration: `${baseApiEndPoint}${endPoints.registers.path}/people/${modelName}/integrations/${modelName}_integration_controller/integrate`,
                                    identifierWithorField: 'CODCLI',
                                    fieldUpdate: 'alias'
                                }
                            };   
                        } else if (modelName == 'companies') {
                            getParamsToIntegrate = ()=>{
                                return {
                                    tableName: modelName,
                                    winthorTableName: 'PCFILIAL',
                                    winthorTableFields: [
                                        'CODIGO',
                                        'CGC',
                                        'RAZAOSOCIAL',
                                        'FANTASIA',
                                        'CIDADE',
                                        'UF',
                                        'CODCLI'
                                    ],
                                    endPointIntegration: `${baseApiEndPoint}${endPoints.registers.path}/people/${modelName}/integrations/${modelName}_integration_controller/integrate`,
                                    identifierWithorField: 'CODIGO',
                                    fieldUpdate: 'alias'
                                }
                            };
                        }
                    }
                    break;
                case 'objectives':
                    getParamsToCreate = ()=>{                        
                        return {
                            name:testString,                            
                            start_date:new Date(),
                            end_date:new Date(),
                        }
                    };
                    break;
                case 'logistic_reasons': 
                    if (toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {                   
                        getParamsToIntegrate = ()=>{
                            return {
                                tableName: modelName,
                                winthorTableName: 'PCTABDEV',
                                winthorTableFields: [
                                    'CODDEVOL',
                                    'MOTIVO',
                                    'TIPO'
                                ],
                                endPointIntegration: `${baseApiEndPoint}${endPoints.registers.path}/logistic/reasons/integrations/${modelName}_integration_controller/integrate`,
                                identifierWithorField: 'CODDEVOL',
                                fieldUpdate: 'name'
                            }
                        };
                    }
                    break;
                case 'report_data_fount_items':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'report_data_founts';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'sql_object_types';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            SQLTEXT:testString,                            
                            IDREPORTDATAFOUNT:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            IDSQLOBJECTTYPE:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'api_requests':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'apis';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            name:testString,                            
                            api_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'api_request_calls':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'api_requests';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);  
                        return {
                            on_receive_response:testString,                            
                            api_request_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'api_responses':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'api_request_calls';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            response:testString,                            
                            api_request_call_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'maps_api_responses':
                    getParamsToCreate = ()=>{
                        return {
                            response:testString
                        }
                    };
                    break;
                case 'sql_processes': 
                    getParamsToCreate = ()=>{
                        let parentTableName = 'sql_object_types';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            name:testString,                            
                            IDSQLOBJECTTYPE:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'relationships':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'relationship_types';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'tables';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            value:testString,                            
                            IDRELATIONSHIPTYPE:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            IDTABLE1:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            IDTABLE2:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'greatnesses':
                case 'packagings':
                    getParamsToCreate = ()=>{
                        return {
                            name:testString,                            
                            sigla:testString
                        }
                    };
                    break;
                case 'ncms':
                    getParamsToCreate = ()=>{
                        return {
                            description:testString,
                            CHAPTER: 1,
                            NCM: 1                            
                        }
                    };
                    break;
                case 'measurement_units':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'greatnesses';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            name:testString,                            
                            IDGREATNESS:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            sigla: testString,
                        }
                    };
                    break;
                case 'user_tokens':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'users';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            TOKEN:testString,                            
                            IDUSER:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break; 
                case 'user_profile_timeworks':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'users';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            name:testString,                            
                            IDUSER:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;                            
                case 'user_timeworks':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'user_profile_timeworks';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            observations:testString,                           
                            STARTAT:testString,                            
                            IDUSERPROFILETIMEWORK:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            WEEKDAY:0,                            
                            ENDAT:testString
                        }
                    };
                    break;  
                case 'routines':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'routine_types';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'modules';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            name:testString,                            
                            IDROUTINETYPE:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            IDMODULE:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;                           
                case 'routine_contents':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'routines';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            name:testString,                            
                            IDROUTINE:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break; 
                case 'texts':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'languages';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            TEXT:testString,                            
                            IDLANGUAGE:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
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
                            IDLANGUAGE:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            IDTEXT:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;                                           
                case 'relationship_values':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'relationships';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'identifier_types';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'data_types';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);        
                        return {
                            value:testString,                            
                            IDDATARELATIONSHIP:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            identifier_type_id:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            IDDATATYPE:parent3?.id.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;   
                case 'datasvalues':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'tables';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'value_names';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            value:testString,                            
                            IDTABLE:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            value_name_id:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            IDREG:1
                        }
                    };
                    break; 
                case 'datashierarchies':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'tables';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            observations:testString,                            
                            IDTABLEPARENT:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            IDTABLESUBORDINATED:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            IDPARENT:1,
                            IDSUBORDINATED:1
                        }
                    };
                    break;
                case 'postal_codes':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'address_types';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'cities';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            POSTALCODE:testString,                            
                            address_type_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            IDCITY:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'postal_codes_x_streets':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'postal_codes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'neighborhoods';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'streets';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);        
                        return {
                            observations:testString,                            
                            postal_code_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            neighborhood_id:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            street_id:parent3?.id.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;   
                case 'postal_codes_x_paths':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'postal_codes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            state_number:testString,                            
                            postal_code_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'addresses':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'address_types';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            number:testString,                            
                            address_type_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'contacts':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'contact_types';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        return {
                            name:testString,                            
                            contact_type_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'people_x_addresses':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'people';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'addresses';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            observations:testString,                            
                            people_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            IDADDRESS:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'people_x_contacts':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'people';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'contacts';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            observations:testString,                            
                            people_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            IDCONTACT:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'warehouse_addresses':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'warehouses';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'warehouse_address_types';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);                 
                        let parentTableName3 = 'identifier_types';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);       
                        return {
                            identifier:testString,                            
                            IDWAREHOUSE: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            IDWAREHOUSEADDRESSTYPE: parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            identifier_type_id: parent3?.id.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'warehouse_address_coordinates':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'warehouse_addresses';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'warehouse_address_types';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            value:testString,                            
                            warehouse_address_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            IDCOORDINATETYPE:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'warehouse_address_dimensions':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'warehouse_addresses';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'identifier_types';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);                 
                        let parentTableName3 = 'measurement_units';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);       
                        return {
                            observations:testString,                            
                            warehouse_address_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            dimension_type_id: parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            measurement_unit_id: parent3?.id.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'warehouse_address_capacities':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'warehouse_addresses';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'identifier_types';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);                 
                        let parentTableName3 = 'measurement_units';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);          
                        return {
                            observations:testString,                            
                            warehouse_address_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            capacity_type_id: parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            measurement_unit_id: parent3?.id.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'suppliers':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'people';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);           
                        return {
                            alias:testString,                            
                            people_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'collaborator_contracts':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'collaborators';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'contract_types';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            observations:testString,                            
                            collaborator_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            contract_type_id:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'collaborators_x_functions':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'collaborator_contracts';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'collaborator_functions';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            observations:testString,                            
                            contrract_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            function_id:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'condictions':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'entities_types';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);       
                        return {
                            observations:testString,                            
                            entity_type_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            entity_id:1
                        }
                    };
                    break;
                case 'condiction_items':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'condictions';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);             
                        return {
                            value:testString,                            
                            condiction_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'container_type_dimensions':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'container_types';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'identifier_types';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);                 
                        let parentTableName3 = 'measurement_units';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);             
                        return {
                            observations:testString,                            
                            container_type_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            dimension_type_id: parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            measurement_unit_id: parent3?.id.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'container_type_capacities':
                    getParamsToCreate = ()=>{
                        let tableName = 'container_type_capacities';
                        let parentTableName = 'container_types';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'identifier_types';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);                 
                        let parentTableName3 = 'measurement_units';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);           
                        return {
                            observations:testString,                            
                            container_type_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            capacity_type_id: parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            measurement_unit_id: parent3?.id.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'items':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'identifier_types';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'ncms';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            identifier:testString,                            
                            identifier_type_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            ncm_id:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            name: testString
                        }
                    };
                    break;
                case 'lots':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'identifier_types';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);           
                        return {
                            identifier:testString,                            
                            identifier_type_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            entity_id:1
                        }
                    };
                    break;
                case 'containers':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'container_types';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'identifier_types';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            identifier:testString,                            
                            container_type_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            identifier_type_id:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'items_x_lots_x_containers':
                    getParamsToCreate = ()=>{
                        let tableName = 'items_x_lots_x_containers';
                        let parentTableName = 'items';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'lots';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'containers';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);          
                        return {
                            observations:testString,                            
                            item_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            lot_id: parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            container_id: parent3?.id.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'stock_entities':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'companies';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);           
                        return {
                            observations:testString,                            
                            company_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'item_stocks':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'items_x_lots_x_containers';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'stock_entities';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'measurement_units';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);        
                        let parentTableName4 = 'packagings';
                        let parent4 = crudsToDelete.find(el=>el.tableName == parentTableName4);     
                        return {
                            observations:testString,                            
                            item_lot_container_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            stock_entity_id: parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            measurement_unit_id: parent3?.id.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).id || undefined,
                            packaging_id: parent4?.id.in[0] || ((datas[parentTableName4]||[])[(datas[parentTableName4]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'item_stock_units':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'item_stocks';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);       
                        return {
                            identifier:testString,                            
                            stock_item_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;                
                case 'item_x_meas_x_pack_x_identif':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'items';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'packagings';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            identifier:testString,                            
                            item_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            packaging_id:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;                
                case 'movements':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'movement_types';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);           
                        return {
                            identifier:testString,                            
                            type_mov_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break; 
                case 'movement_groups':
                    getParamsToCreate = ()=>{
                        return {
                            identifier:testString
                        }
                    };
                    break;
                case 'movements_x_groups':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'movement_groups';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'movements';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            observations:testString,                            
                            IDGROUPMOVEMENT:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            mov_id:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'movements_x_entities':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'movements';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'movement_entity_relationship_types';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'stock_entities';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);         
                        return {
                            observations:testString,                            
                            mov_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            IDMOVENTITYRELATIONSHIPTYPE: parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            stock_entity_id: parent3?.id.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'movs_x_items_stocks':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'movements';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'movement_types';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'item_stocks';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);               
                        return {
                            observations:testString,                            
                            mov_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            type_mov_id: parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            stock_item_id: parent3?.id.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;                
                case 'item_mov_amounts':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'movs_x_items_stocks';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'movement_types';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'measurement_units';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);        
                        let parentTableName4 = 'packagings';
                        let parent4 = crudsToDelete.find(el=>el.tableName == parentTableName4);        
                        return {
                            observations:testString,                            
                            mov_x_item_stock_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            type_mov_id: parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            measurement_unit_id: parent3?.id.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).id || undefined,
                            packaging_id: parent4?.id.in[0] || ((datas[parentTableName4]||[])[(datas[parentTableName4]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'item_mov_units':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'item_mov_amounts';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);           
                        return {
                            observations:testString,                            
                            item_mov_amt_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break; 
                case 'item_mov_amount_restrictions':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'item_mov_amounts';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);         
                        return {
                            value:testString,                            
                            item_mov_amt_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break; 
                case 'item_mov_xml_import_id_conversions':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'clients';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'items';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'measurement_units';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);        
                        let parentTableName4 = 'packagings';
                        let parent4 = crudsToDelete.find(el=>el.tableName == parentTableName4);           
                        return {
                            emitent_doc:testString,                            
                            owner_client_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            item_id: parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            measurement_unit_id: parent3?.id.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).id || undefined,
                            packaging_id: parent4?.id.in[0] || ((datas[parentTableName4]||[])[(datas[parentTableName4]||[]).length-1]||{}).id || undefined,
                            origin_item_id:testString,
                            xml_quantity_field_name:testString
                        }
                    };
                    break;
                case 'sql_objects':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'sql_object_types';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);          
                        return {
                            name:testString,                            
                            IDSQLOBJECTTYPE: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'logistic_orders':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'logistic_mov_types';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);           
                        return {
                            identifier:testString,                            
                            logistic_mov_type_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'logistic_orders_x_movs':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'logistic_orders';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'movements';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            unmoved_qty_notes:testString,                            
                            logistic_order_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            mov_id:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'logistic_orders_x_items_mov_amt':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'logistic_orders_x_movs';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'item_mov_amounts';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            unmoved_qty_notes:testString,                            
                            mov_logistic_order_id:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            item_mov_amt_id:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;                
                case 'logistic_orders_x_movs_x_receipt_values':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'logistic_orders';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'financial_value_forms';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'currencies';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);        
                        return {
                            PROOFS:testString,                            
                            logistic_order_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            financial_value_form_id: parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            expected_currency_id: parent3?.id.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;                  
                case 'logistic_orders_x_dest_values':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'logistic_orders';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'financial_value_forms';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        let parentTableName3 = 'financial_value_mov_types';
                        let parent3 = crudsToDelete.find(el=>el.tableName == parentTableName3);        
                        return {
                            observations:testString,                            
                            logistic_order_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            logistic_order_financial_value_form_id: parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined,
                            financial_value_mov_type_dest: parent3?.id.in[0] || ((datas[parentTableName3]||[])[(datas[parentTableName3]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;                
                case 'logistic_logs':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'tables';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);          
                        return {
                            json_object:testString,                            
                            table_ref_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            record_ref_id:1
                        }
                    };
                    break;                
                case 'tasks_x_status_x_users':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'tasks';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);        
                        let parentTableName2 = 'users';
                        let parent2 = crudsToDelete.find(el=>el.tableName == parentTableName2);        
                        return {
                            observations:testString,                            
                            IDTASK:parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            IDUSER:parent2?.id.in[0] || ((datas[parentTableName2]||[])[(datas[parentTableName2]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;
                case 'tasks_x_status_x_users_logs':
                    getParamsToCreate = ()=>{
                        let tableName = 'tasks_x_status_x_users_logs';
                        let parentTableName = 'tasks_x_status_x_users';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);           
                        return {
                            operation:testString,                            
                            IDTASKXSTATUSXUSER: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;     
                case 'commission_entitiy_codes':
                    getParamsToCreate = ()=>{
                        let tableName = 'commission_entitiy_codes';
                        let parentTableName = 'tables';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);           
                        return {
                            name:testString,                            
                            table_entity_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined,
                            record_entity_id:1
                        }
                    };
                    break;             
                case 'commission_items':
                    getParamsToCreate = ()=>{
                        let parentTableName = 'commission_entitiy_codes';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);             
                        return {
                            name:testString,                            
                            commission_entity_code_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
                        }
                    };
                    break;             
                case 'commission_values':
                    getParamsToCreate = ()=>{
                        let tableName = 'commission_values';
                        let parentTableName = 'commission_items';
                        let parent = crudsToDelete.find(el=>el.tableName == parentTableName);         
                        return {
                            name:testString,                            
                            commission_item_id: parent?.id.in[0] || ((datas[parentTableName]||[])[(datas[parentTableName]||[]).length-1]||{}).id || undefined
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
        
        //if (modelName == 'data_origins') break;
        //if (modelName == 'people') break;
        //if (modelName == 'people_x_contacts') break;
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



