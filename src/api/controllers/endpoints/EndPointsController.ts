import {NextFunction, Request, RequestHandler, Response, Router } from "express";
import fs from 'fs/promises';
import path from "path";
import { pathToFileURL } from "url";
import Utils from "../utils/Utils.js";
import DataSwap from "../data/DataSwap.js";
import { JsonStreamStringify } from "json-stream-stringify";

/**
 * @created 2023-08-25
 * @version 2.0.0
 */
export default class EndPointsController{
    private static router : Router = Router();
    private static namedEndpoints : string[] = [
        'login',
        'online',
        'endpoints',
        'register',
        'refresh_token',
        'recover',
        'password_change',
        'controllers',
        'modules',
        'routinescontroller',
        'registers',
        'registerscontroller',
        'winthor_integrations_registers_controller',
        'logistic',
        'logistic_orders_integration_controller',
        'logistic_orders_winthor_integration_controller',
        'midia_controller'
    ]

    /**
     * Custom midleware reponse properties
     * @param req 
     * @param res 
     * @param next 
     */
    static custom_response : RequestHandler = function(req: Request, res: Response, next: NextFunction) : void {
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
        }
      
        res.setDataSwap = function(dataSwap: DataSwap) {
          if (Utils.hasValue(dataSwap)) { 
            res.success = dataSwap?.success || false;
            res.data = dataSwap?.data;
            res.message = dataSwap?.message;
            res.exception = dataSwap?.exception;
          }
        }
      
        res.setException = function(exception: any,notShowConsole : boolean = false) {;  
          if (!notShowConsole) console.error(exception);
          res.success = false;
          res.message = exception?.message || exception;
          if (exception?.errors?.length) {
              res.message = exception?.errors[0].sqlMessage || exception?.errors[0].message || res.message;
          }
          res.exception = exception || null;        
        };
      
        res.sendResponse = function(status?: number,success?: boolean ,message?: string | null,data?:any,exception?:any) {
          if (Utils.hasValue(success)) res.success = res.success || success;
          if (Utils.hasValue(message)) res.message = res.message || message;
          if (Utils.hasValue(data)) res.data = res.data || data;            
          if (Utils.hasValue(exception)) {
              res.exception = res.exception || exception;  
              if (res.exception) {
                  if (res.exception.errors) {
                      let messages = res.exception.errors.map((el:any)=>el?.message || el.toString());
                      res.message += `: ${messages.join(",")}`;
                  }
              }
          }
          if (status) {
            res.status(status);
          } else {
            res.status(res.success ? 200 : 517);
          }
      
          res.setHeader('Content-Type', 'application/json');
      
          // Cria um stream de resposta JSON            
          res.type('json'); // Required for proper handling by test frameworks and some clients
          new JsonStreamStringify(res.getJson()).pipe(res);
        };
      
        next();
    }

    static markAsRequestHandler(func: any) : void {
        Object.defineProperty(func, "__isRequestHandler", {
            value: true,
            writable: false,
            configurable: false,
            enumerable: false, // Mantém a propriedade oculta em loops
        });
    }

    static isRequestHandler(func: any): func is RequestHandler {
        return typeof func == 'function' && !Utils.isClass(func) && func.length >= 2 && func.__isRequestHandler; // Pelo menos req e res
    }

    /**
     * 
     * @param dir 
     * @param basePath 
     */
    static loadDefaultEndPoints() {
        this.router.all('/api/online',function(req:Request,res:Response) {
            res.sendResponse(200,true);
        });
        this.router.all('/api/endpoints',EndPointsController.get_endpoints);    
    }


    /**
     * automatic load endpoins in project folder that has signature of RequestHandler function
     * @param dir 
     * @param basePath 
     */
    static async autoLoadEndPoints(dir: string, basePath = '/') {
        //console.log('scaning dir ',dir);
        const entries = await fs.readdir(dir, { withFileTypes: true });
        //console.log('entries',entries);
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);            
            if (entry.isDirectory()) {
                // Recursivamente carregar subdiretórios
                await this.autoLoadEndPoints(fullPath, path.join(basePath, entry.name));
            } else if (entry.isFile() && entry.name.endsWith('.js')) {
                // Carregar módulo dinamicamente
                //console.log('scaning file ',fullPath);
                const fileUrl = pathToFileURL(fullPath);
                const module = await import(fileUrl.href);
    
                // Mapear as funções exportadas como endpoints
                Object.entries(module).forEach(([exportName, handler]) => {
                    if (this.isRequestHandler(handler)) {
                        let routePath : string = path.join(basePath, entry.name.replace('.js', ''));
                        routePath = routePath.replaceAll(path.sep,"/").trim().toLowerCase();
                        //console.log(`Registrando endpoint(1): ${routePath} -> ${exportName}`);
                        this.router.all(routePath, (handler as any)); // Associa ao método HTTP apropriado
                    } else if (Utils.isClass(handler)) {
                        //console.log('entries of ',fullPath,Object.entries(handler));


                        //trocar por get all keys (inclusive herdadas);
                        //Object.entries(handler).forEach(([exportName2, handler2]) => {
                        let objKeys : string[] = Utils.getAllProperties(handler);
                        //console.log('objKeys',fullPath,objKeys);
                        for (let i in objKeys) {
                            if (['caller','callee','arguments'].indexOf(objKeys[i]) == -1) {
                                let handler2 : any = (handler as any)[objKeys[i]];
                                if (this.isRequestHandler(handler2)) {
                                    let routePath : string = path.join(basePath, entry.name.replace('.js', ''));
                                    routePath = routePath.replaceAll(path.sep,"/").trim().toLowerCase();
                                    let methodName : string = handler2.name||'';
                                    let routePathWithMethod =`${routePath}/${methodName}`
                                    console.log(`Registrando endpoint(2): ${routePathWithMethod}->${methodName}`);
                                    this.router.all(routePathWithMethod, handler2.bind(handler)); // Associa ao método HTTP apropriado
                                    if (['get','post','put','patch','delete'].indexOf(methodName.trim().toLowerCase()) > -1) {
                                        console.log(`Registrando endpoint(3): ${routePath} -> ${methodName}`);
                                        (this.router as any)[methodName.trim().toLowerCase()](routePath, handler2.bind(handler)); // Associa ao método HTTP apropriado
                                    }
                                } else if (typeof handler2 == 'function') {
                                    //@todo closured function
                                }
                            }
                        };
                    }
                });
            }
        }
    }

    static getRouter(){
        return this.router;
    }
    
    // Função para listar todas as rotas carregadas
    static getEndPoints(router: Router) {
        const routes: any = {};
        router.stack.forEach((layer: any) => {
            if (layer.route) {
                // Captura métodos HTTP e caminhos
                let methods : any = {};
                Object.keys(layer.route.methods).map(el=>{
                    if (el.indexOf("_") === 0) {
                        methods[el.substring(1).toLowerCase()] = el.substring(1).toUpperCase();
                    } else {
                        methods[el.toLowerCase()] = el.toUpperCase();
                    }
                });
                if (Object.keys(methods)[0] == 'all') {
                    methods = {
                        post:'POST',
                        get:'GET',
                        put:'PUT',
                        delete:'DELETE'
                    };
                }
                
                let routeArray = layer.route.path.split("/");
                let controllerName = (routeArray[routeArray.length-2] || routeArray[routeArray.length-1]).trim().toLowerCase();
                let methodName = routeArray[routeArray.length-1].trim().toLowerCase();
                //console.log('controllerName',controllerName,'methodName',methodName,layer.route.path);
                if (this.namedEndpoints.indexOf(methodName) > -1) {
                    routes[methodName] = {
                        path: layer.route.path,
                        methods
                    }
                } else {
                    if (controllerName.indexOf("controller") > -1) {
                        let routePathTemp = layer.route.path.split("/");
                        routePathTemp.pop();
                        routePathTemp = routePathTemp.join("/");
                        routes[controllerName] = {
                            path: routePathTemp,
                            methods
                        };
                        routes[layer.route.path] = {
                            path: layer.route.path,
                            methods
                        }
                    } else {
                        routes[layer.route.path] = {
                            path: layer.route.path,
                            methods
                        }
                    }
                }
            }
        });
        return routes;
    }

    static get_endpoints: RequestHandler = (req:Request, res: Response, next: NextFunction)=>{
        try {
            res.data = this.getEndPoints(this.getRouter());
            res.success = true;
            res.sendResponse(200,true);
        } catch (e:any) {
            res.setException(e); 
            res.sendResponse(517,false);           
        }
    }


   
    
}