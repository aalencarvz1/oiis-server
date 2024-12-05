const path = require("path");
const { DataSwap } = require("../data/DataSwap");
const { Utils } = require("../utils/Utils");
const { Model } = require("sequelize");

/**
 * base class controller to handle api end points requests
 * @author Alencar
 * @created 2024-07-16
 * @version 1.0.0
 */
class BaseEndPointController {     

    static getDatabaseModelsPath() {
        throw new Error(`abstract method ${this.name}.getDatabaseModelsPath not implemented`)
    }

    static getDirName() {
        throw new Error(`abstract method ${this.name}.getDirName not implemented`)
    }



    /**
     * handle global app variable to storage on memory array of loaded files, to improve performance on nexts requests
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @param {*} urlPath 
     * @param {*} methodName 
     * @returns 
     * @created 2024-07-19
     * @version 1.0.0
     */
    static async processOnLoadedFile(req,res,next,urlPath, methodName){
        Utils.logi(`${this.name}(${BaseEndPointController.name})`,`processOnLoadedFile(${urlPath}.${methodName})`);             
        let result = false;        
        try {
            global.loadedFiles = global.loadedFiles || {};
            let loaded = global.loadedFiles[urlPath];        
            if (loaded) {
                if (typeof loaded.processRequest == 'function') {
                    //prevent infinit loop on re-call self
                    if (loaded.name != this.name) {
                        loaded.processRequest.bind(loaded)(req,res,next);
                        result = true;
                    }
                } else {                    
                    //if is inherited from BaseTableModel or has this method 
                    if (typeof loaded.getModel == 'function') {                               
                        res.setDataSwap(await this.processMethodOnTable(req,urlPath,loaded.name,methodName,loaded));
                        res.sendResponse();
                        result = true;
                    } else {
                        //others cases                        
                        let method = Utils.getMethodName(loaded,methodName);
                        if (method) {
                            loaded[method].bind(loaded)(req,res,next);
                            result = true;
                        }               
                    }
                }
            }
        } catch (e) {
            Utils.logError(e);
            throw e;
        }
        Utils.logf(`${this.name}(${BaseEndPointController.name})`,`processOnLoadedFile(${urlPath}) ${result}`);        
        return result;
    }


    /**
     * 
     * @param {*} tableName 
     * @returns 
     * @created 2024-07-12
     * @version 1.0.0
     */
    static loadTableClassModel(tableName,urlPath) {
        Utils.logi(`${this.name}(${BaseEndPointController.name})`,`loadTableClassModel(${tableName},${urlPath})`);        
        let result = new DataSwap();        
        try {
            let tableClassModel = null;
            let resolvedPath = require.resolve(`${this.getDatabaseModelsPath()}/${tableName}`).toLowerCase();
            let ind = Object.keys(require.cache).join(',').toLowerCase().split(',').indexOf(resolvedPath);
            if (ind > -1) {
                let keyCache = Object.keys(require.cache)[ind];
                let realKey = Utils.getKey(require.cache[keyCache].exports,tableName);
                if (Utils.hasValue(realKey)) {
                    tableClassModel = require.cache[keyCache].exports[realKey];
                } else {
                    tableClassModel = require.cache[keyCache].exports;
                }
            } else {
                let tempp = require(resolvedPath);
                let realKey = Utils.getKey(tempp,tableName);
                if (Utils.hasValue(realKey)) {
                    tableClassModel = tempp[Utils.getKey(tempp,tableName)]
                } else {
                    tableClassModel = tempp;
                }
            }
            //class model not must pre-loaded, not by pass controller
            global.loadedFiles = global.loadedFiles || {};
            let arrUrlPath = urlPath.split("/");
            while(arrUrlPath.length > 0 && arrUrlPath[arrUrlPath.length-1].trim().toLowerCase() != tableName.trim().toLowerCase()) {
                arrUrlPath.pop();
            }            
            if (arrUrlPath.length) {
                global.loadedFiles[arrUrlPath.join("/")] = tableClassModel;
            }
            result.data = tableClassModel;
            result.success = true;
        } catch (e) {
            result.setException(e,true);
        }
        Utils.logf(`${this.name}(${BaseEndPointController.name})`,`loadTableClassModel(${tableName})`);        
        return result;
    }

    /**
     * 
     * @param {*} controllerClassPath 
     * @returns 
     * @created 2024-07-12
     * @version 1.0.0
     */
    static loadControllerClass(controllerClassPath,dir) {
        Utils.logi(`${this.name}(${BaseEndPointController.name})`,`loadControllerClass(${controllerClassPath})`);        
        let result = new DataSwap();        
        try {
            let controllerClass = null;
            let pathToResolve = `${dir || this.getDirName()}${controllerClassPath}`.replace(/\//g,path.sep);
            let resolvedPath = require.resolve(pathToResolve).toLowerCase(); //resolve raise exception if file not exists

            //if path is resolved then code continue, else, throw raised by require.resolve
            let ind = Object.keys(require.cache).join(',').toLowerCase().split(',').indexOf(resolvedPath);
            let controllerClassName = controllerClassPath.split('/');
            controllerClassName = Utils.hasValue(controllerClassName[controllerClassName.length-1]) ? controllerClassName[controllerClassName.length-1] : controllerClassName[controllerClassName.length-2] || controllerClassPath;
            if (ind > -1) {
                let keyCache = Object.keys(require.cache)[ind];
                let realKey = Utils.getKey(require.cache[keyCache].exports,controllerClassName);
                if (Utils.hasValue(realKey)) {
                    controllerClass = require.cache[keyCache].exports[realKey];
                } else {
                    controllerClass = require.cache[keyCache].exports;
                }
            } else {
                let tempp = require(resolvedPath);
                let realKey = Utils.getKey(tempp,controllerClassName);
                if (Utils.hasValue(realKey)) {
                    controllerClass = tempp[realKey];
                } else {
                    controllerClass = tempp;
                }
            }

            global.loadedFiles = global.loadedFiles || {};
            global.loadedFiles[controllerClassPath] = controllerClass;

            result.data = controllerClass;
            result.success = true;
        } catch (e) {
            result.setException(e);
        }
        Utils.logf(`${this.name}(${BaseEndPointController.name})`,`loadControllerClass(${controllerClassPath}) ${result.success}`);        
        return result;
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @param {*} tableName 
     * @param {*} method 
     * @param {*} tableClassModel 
     * @created 2024-07-12
     * @version 1.0.0
     */
    static async processMethodOnTable(req,urlPath,tableName,method, tableClassModel) {
        Utils.logi(`${this.name}(${BaseEndPointController.name})`,`processMethodOnTable(${req.url})`);        
        let result = new DataSwap();
        try {
            let resultLoadClassModel = null;
            if (!tableClassModel) {
                resultLoadClassModel = this.loadTableClassModel(tableName, urlPath);
                tableClassModel = resultLoadClassModel?.data;
            }
            if (tableClassModel) {
                switch((method||'get').trim().toLowerCase()) {
                    case 'create':
                    case 'put':    
                    case 'get':
                    case 'update':
                    case 'patch':
                    case 'delete':
                        result.data = await tableClassModel[`${(method||'get').trim().toLowerCase()}Data`](req.body, req);
                        break;
                    case 'saveorcreate':
                    case 'upsert':
                        result.data = await tableClassModel.saveOrCreate(req.body);                    
                        break;
                    default:
                        method = Utils.getMethodName(tableClassModel,method);
                        if (typeof tableClassModel[method] === 'function') {
                            result.data = await tableClassModel[method](req.body);
                        } else {
                            throw new Error(`resource level not expected: ${method}`);
                        }
                } 
                result.success = true;
            } else {
                throw resultLoadClassModel?.exception || new Error(resultLoadClassModel?.message || `table model not found: ${tableName}`);
            }
        } catch (e) {
            result.setException(e);
        }
        Utils.logf(`${this.name}(${BaseEndPointController.name})`,`processMethodOnTable(${req.url})`);        
        return result;
    }       


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-07-12
     * @version 1.0.0
     */
    static async processMethodOnController(req,res,next) {
        Utils.logi(`${this.name}(${BaseEndPointController.name})`,`processMethodOnController(${req.url})`);
        try {
            let urlPath = req.url;
            urlPath = Utils.getSingleUrlPath(urlPath);
            let arrUrlPath = urlPath.split("/");
            if (!Utils.hasValue(arrUrlPath[0])) {
                arrUrlPath.shift();
            }
            let currentPathIndex = arrUrlPath.indexOf(this.name.trim().toLowerCase());            
            let initialFileName = null;
            let initialMethodName = req.method;
            initialFileName = arrUrlPath[currentPathIndex+1]; 
            initialMethodName = arrUrlPath[currentPathIndex+2] || initialMethodName; 

            //check if route refer to member function to this (or inherited class of this)
            let method = null;
            if (this.name.trim().toLowerCase() == arrUrlPath[arrUrlPath.length-1]) {
                method = Utils.getMethodName(this,req.method.trim().toLowerCase());
                if (method) {
                    return this[method].bind(this)(req,res,next);
                } 
            } else if (this.name.trim().toLowerCase() == arrUrlPath[arrUrlPath.length-2]) {
                method = Utils.getMethodName(this,arrUrlPath[arrUrlPath.length-1]);
                if (method) {
                    return this[method].bind(this)(req,res,next);
                } 
            }

            let resultLoadControllerClass = null;
            let methodName = null;

            let processedOnLoadedFile = await this.processOnLoadedFile(req,res,next,urlPath,req.method);
            if (processedOnLoadedFile) return;
            let urlPathTemp = urlPath.split("/");                        
            methodName = urlPathTemp.pop() || methodName;
            urlPathTemp = urlPathTemp.join("/");
            processedOnLoadedFile = await this.processOnLoadedFile(req,res,next,urlPathTemp,methodName);
            if (processedOnLoadedFile) return;



            
            //check if url is direct file path
            if (arrUrlPath[arrUrlPath.length-1].trim().toLowerCase() != this.name.trim().toLowerCase()) {
                let baseDir = path.dirname(path.dirname(require.main.filename));
                resultLoadControllerClass = this.loadControllerClass(urlPath,baseDir); 
                methodName = req.method.trim().toLowerCase();
                if (!resultLoadControllerClass?.success) {
                    if ((resultLoadControllerClass?.exception || resultLoadControllerClass || {message:'error'}).message.toLowerCase().indexOf('no such file or directory') == -1
                        && (resultLoadControllerClass?.exception || resultLoadControllerClass || {message:'error'}).message.toLowerCase().indexOf('cannot find module') == -1
                    ) {
                        throw resultLoadControllerClass?.exception || new Error(resultLoadControllerClass || {message:'error'}).message;
                    } else {
                        let urlPathTemp = urlPath.split("/");                        
                        methodName = urlPathTemp.pop() || methodName;
                        if (urlPathTemp[urlPathTemp.length-1].trim().toLowerCase() != this.name.trim().toLocaleLowerCase()) {
                            urlPathTemp = urlPathTemp.join("/");
                            resultLoadControllerClass = this.loadControllerClass(urlPathTemp,baseDir); 
                        }
                    }
                }
            }


            if (!resultLoadControllerClass?.success) {
                if ((resultLoadControllerClass?.exception || resultLoadControllerClass || {message:'error'}).message.toLowerCase().indexOf('no such file or directory') == -1
                && (resultLoadControllerClass?.exception || resultLoadControllerClass || {message:'error'}).message.toLowerCase().indexOf('cannot find module') == -1
                ) {
                    throw resultLoadControllerClass?.exception || new Error(resultLoadControllerClass || {message:'error'}).message;
                }
                
                let previousLoadedControllerPath = '';
                let loadedControllerPath = `/${arrUrlPath.slice(0,-2).join('/')}`;  
                let loadedCurrentPathIndex = arrUrlPath.length-2;            
                let loadedMethodName = arrUrlPath[loadedCurrentPathIndex] || req.method;//req.method.trim().toLowerCase();                            
                resultLoadControllerClass = null;
                let controllerPath = `/${arrUrlPath.slice(currentPathIndex + 1).join('/')}`;     
                methodName = req.method.trim().toLowerCase();            
                do {
                    if (loadedCurrentPathIndex > -1 && loadedControllerPath && previousLoadedControllerPath != loadedControllerPath) {
                        processedOnLoadedFile = await this.processOnLoadedFile(req,res,next,loadedControllerPath,loadedMethodName);
                        loadedCurrentPathIndex--;
                        if (!processedOnLoadedFile) {
                            previousLoadedControllerPath = loadedControllerPath;
                            if (loadedCurrentPathIndex > -1 && loadedCurrentPathIndex >= currentPathIndex) {                            
                                loadedControllerPath = `/${arrUrlPath.slice(0,loadedCurrentPathIndex).join('/')}`;
                                loadedMethodName = arrUrlPath[loadedCurrentPathIndex] || req.method; 
                            } 
                        } else {
                            break; //continue trieing loading others entities, like table class model
                        }
                    }
                    if (!processedOnLoadedFile && controllerPath) {
                        resultLoadControllerClass = this.loadControllerClass(controllerPath);  
                        if (!resultLoadControllerClass?.success) {
                            if ((resultLoadControllerClass?.exception || resultLoadControllerClass || {message:'error'}).message.toLowerCase().indexOf('no such file or directory') == -1
                                && (resultLoadControllerClass?.exception || resultLoadControllerClass || {message:'error'}).message.toLowerCase().indexOf('cannot find module') == -1
                            ) {
                                throw resultLoadControllerClass?.exception || new Error(resultLoadControllerClass || {message:'error'}).message;
                            }
                            controllerPath = controllerPath.split("/");
                            methodName = controllerPath.pop();
                            if (Utils.hasValue(controllerPath) && controllerPath[controllerPath.length-1].trim().toLowerCase() != this.name.trim().toLowerCase()) {
                                controllerPath = controllerPath.join("/");    
                            } else {
                                controllerPath = null;
                            }                       
                        } else {
                            break;
                        }
                    }

                    if (!(loadedCurrentPathIndex >-1 && loadedControllerPath && previousLoadedControllerPath != loadedControllerPath) && !controllerPath) {
                        break;
                    }
                } while (!processedOnLoadedFile && !resultLoadControllerClass?.success);
                if (processedOnLoadedFile) return;
            }

            
            //localized controller referenced on route
            if (resultLoadControllerClass?.success && resultLoadControllerClass?.data) {                             
                //check if method referenced in route or restfull verb exists in localized controller
                let method = Utils.getMethodName(resultLoadControllerClass.data,methodName || req.method);
                if (method) {
                    return resultLoadControllerClass.data[method].bind(resultLoadControllerClass.data)(req,res,next);
                } else {
                    //if method not localizad, check if controller has generic method called processrequest, then call it
                    methodName = 'processrequest';
                    let method = Utils.getMethodName(resultLoadControllerClass.data, methodName);
                    if (method) {
                        return resultLoadControllerClass.data[method].bind(resultLoadControllerClass.data)(req,res,next);                        
                    }  
                }                    
            } else {
                //check if url request route refer to table class model (.../registerscontroller/tablemodelname/...)
                let resultLoadClassModel = this.loadTableClassModel(initialFileName, urlPath);
                if (resultLoadClassModel?.success) {                    
                    res.setDataSwap(await this.processMethodOnTable(req,urlPath,initialFileName,initialMethodName,resultLoadClassModel.data));
                    return res.sendResponse();                    
                } else {
                    if ((resultLoadClassModel?.exception || resultLoadClassModel || {message:'error'}).message.toLowerCase().indexOf('no such file or directory') == -1
                        && (resultLoadClassModel?.exception || resultLoadClassModel || {message:'error'}).message.toLowerCase().indexOf('cannot find module') == -1
                    ) {
                        throw resultLoadClassModel?.exception || new Error(resultLoadClassModel || {message:'error'}).message;
                    }                  
                }
            }

            throw new Error(`url not found(end): ${req.url}`);
        } catch (e) {
            Utils.logError(e);
            res.setException(e);
            res.sendResponse(517,false);
        }
        Utils.logf(`${this.name}(${BaseEndPointController.name})`,`processMethodOnController(${req.url})`);
    }   

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-07-12
     * @version 1.0.0
     */
    static processRequest(req,res,next) {
        Utils.logi(`${this.name}(${BaseEndPointController.name})`,`processRequest(${req.url})`);
        try {
            this.processMethodOnController(req,res,next);
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
        Utils.logf(`${this.name}(${BaseEndPointController.name})`,`processRequest(${req.url})`);
    }
}

module.exports = {BaseEndPointController}