const path = require("path");
const { Utils } = require("../utils/Utils");
const fs = require("fs");
const { BaseEndPointController } = require("./BaseEndPointController");
const { JsonStreamStringify } = require('json-stream-stringify');




/**
 * @created 2023-08-25
 * @version 2.0.0
 */
class EndPointsController extends BaseEndPointController{
    
    static #unsecureEndPoints = {
        defaultHeaders:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        online:{
            logged:false,
            path:'/api/online',
            methods:{
                get:['GET']
            }
        },
        endpoints:{
            logged:false,
            path:'/api/endpoints',
            methods:{
                get:['GET'],
                post:['POST']
            }
        },
        login:{
            logged:false,
            path:'/api/controllers/auth/authcontroller/login',
            methods:{
                post:['POST']
            }
        },
        register:{
            logged:false,
            path:'/api/controllers/auth/authcontroller/register',
            methods:{
                post:['POST']
            }
        },
        refreshtoken:{
            logged:false,
            path:'/api/controllers/auth/authcontroller/refreshtoken',
            methods:{
                post:['POST']
            }
        },
        recover:{
            logged:false,
            path:'/api/controllers/auth/authcontroller/recover',
            methods:{
                post:['POST']
            }
        },
        passwordchange:{
            logged:false,
            path:'/api/controllers/auth/authcontroller/passwordchange',
            methods:{
                post:['POST']
            }
        }
    }

    static #allEndPoints = {
        ...this.#unsecureEndPoints,
        controllers:{
            logged:true,
            path:'/api/controllers'
        },
        modules:{
            logged:true,
            path:'/api/controllers/modules'
        },
        routinescontroller:{
            logged:true,
            path:'/api/controllers/modules/routines/routinescontroller',
            methods:{
                get:['GET']
            }
        },
        registers:{
            logged:true,
            path:'/api/controllers/modules/registers'
        },
        registerscontroller:{
            logged:true,
            path:'/api/controllers/modules/registers/registerscontroller',
            methods:{
                get:['GET']
            }
        },
        winthor_integrations_registers_controller:{
            logged:true,
            path:'/api/controllers/modules/registers/integrations/winthor/WinthorIntegrationsRegistersController',
            methods:{
                get:['POST']
            }
        },
        logistic:{
            logged:true,
            path:'/api/controllers/modules/logistic',
            methods:{
                get:['GET']
            }
        },
        logistic_orders_integration_controller:{
            logged:true,
            path:'/api/controllers/modules/logistic/logistic_orders/integrations/logistic_orders_integration_controller',
            methods:{
                get:['GET'],
                post:['POST']
            }            
        },
        logistic_orders_winthor_integration_controller:{
            logged:true,
            path:'/api/controllers/modules/logistic/logistic_orders/integrations/winthor/logistic_orders_winthor_integration_controller',
            methods:{
                get:['GET'],
                post:['POST']
            }
        },
        midia_controller:{
            logged:true,
            path:'/api/controllers/modules/registers/midias/midia_controller',
            methods:{
                get:['GET'],
                post:['POST']
            }
        }
    }

    /**
     * Middleware that add customized fields and functions in req and res to use in this app 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static #reqresMiddleware(req,res,next) {

        res.success = false;
        res.data = null;
        res.message = null;
        res.exception = null;                    
            
        res.getJson = function(){
            return {
                success: this.success,
                data : this.data,
                message : this.message,
                exception : this.exception
            }
        }.bind(res);

        res.setDataSwap = function(dataSwap) {
            if (dataSwap) {                
                res.success = dataSwap?.success || false;
                res.data = dataSwap?.data;
                res.message = dataSwap?.message;
                res.exception = dataSwap?.exception;
            }
        }.bind(res);

        res.setException = function(ex,notShowConsole) {
            if (!notShowConsole) Utils.log(ex);
            this.success = false;
            this.message = ex.message || ex;
            if (ex.errors?.length) {
                this.message = ex.errors[0].sqlMessage || ex.errors[0].message || this.message;
            }
            this.exception = ex;        
        }.bind(res);
    
        /**
         * Use this method to send response to client, independent if is redirect, view (render html) or json or message
         * this method choice if request is api (/api) or normal (! /api)
         * if is api, force return as json, else return conform configured in this req.res object
         */
        res.sendResponse = function(status,success,message,data,exception) {
            if (Utils.hasValue(success)) this.success = this.success || success;
            if (Utils.hasValue(message)) this.message = this.message || message;
            if (Utils.hasValue(data)) this.data = this.data || data;            
            if (Utils.hasValue(exception)) {
                this.exception = this.exception || exception;  
                if (this.exception) {
                    if (this.exception.errors) {
                        let messages = this.exception.errors.map(el=>el.message || el.toString());
                        this.message += `: ${messages.join(",")}`;
                    }
                }
            }
            if (status) this.status(status);

            console.log("antes");
            this.setHeader('Content-Type', 'application/json');

            // Cria um stream de resposta JSON            
            this.type('json'); // Required for proper handling by test frameworks and some clients
            new JsonStreamStringify(this.getJson()).pipe(this);

            console.log("depois");
            //this.send(this.getJson());
        }.bind(res);

        req.getClientIp = function() {
            return this.headers['x-forwarded-for']?.split(',').shift() || this.socket?.remoteAddress;
        }.bind(req);

        next();
    }

    static getReqResMiddleware() {
        return this.#reqresMiddleware;
    }

    /**
     * @implements BaseEndPointController.getDirName
     * @returns 
     * @created 2024-07-17
     * @version 1.0.0
     */
    static getDirName(){
        let baseDir = path.dirname(require.main.filename);
        return path.dirname(baseDir);
    }


    /**
     * 
     * @override
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-07-12     
     * @version 1.1.0     
     */
    static processRequest(req,res,next) {
        Utils.logi(`${this.name}`,`processRequest(${req.url})`);
        try {
            global.loadedFiles = global.loadedFiles || {};
            //Utils.log('FL',this.name,'processing', req.url/*,Object.keys(global.loadedFiles),Object.keys(global.loadedFiles).map(el=>global.loadedFiles[el].name)*/);
            let urlPath = req.url;
            urlPath = Utils.getSingleUrlPath(urlPath);
            switch(urlPath) {
                case '/api/online': 
                    res.sendResponse(200,true);
                    break;
                case '/api/endpoints': 
                    res.data = req.user?.id ? this.#allEndPoints : this.#unsecureEndPoints;
                    res.sendResponse(200,true);
                    break;
                default:
                    super.processRequest(req,res,next);                    
            }            
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
        Utils.logf(`${this.name}`,`processRequest(${req.url})`);
    }


}

module.exports = {EndPointsController}