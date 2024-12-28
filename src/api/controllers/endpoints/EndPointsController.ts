
import { NextFunction, Request, Response } from "express";
import BaseEndPointController from "./BaseEndPointController.js";
import Utils from "../utils/Utils.js";

/**
 * @created 2023-08-25
 * @version 2.0.0
 */
export default class EndPointsController extends BaseEndPointController{


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
     * 
     * @override
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-07-12     
     * @version 1.1.0     
     */
    static processRequest(req: Request,res: Response,next: NextFunction) : void {
        Utils.logi(`${this.name}`,`processRequest(${req.url})`);
        try {
            globalThis.loadedFiles = globalThis.loadedFiles || {};
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
                    //super.processRequest(req,res,next);                    
            }            
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
        Utils.logf(`${this.name}`,`processRequest(${req.url})`);
    }
}