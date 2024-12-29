
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
     * Customize reponse properties
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
      
        res.sendResponse = function(status: number = 517,success: boolean = false,message: string | null = null,data:any = null,exception:any = null) {
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
          if (status) res.status(status);
      
          res.setHeader('Content-Type', 'application/json');
      
          // Cria um stream de resposta JSON            
          res.type('json'); // Required for proper handling by test frameworks and some clients
          new JsonStreamStringify(res.getJson()).pipe(res);
        };
      
        next();
    }

    static isRequestHandler(func: any): func is RequestHandler {
        return typeof func === 'function' && func.length >= 2; // Pelo menos req e res
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
        //console.log('loading controllers from ',dir);
        const entries = await fs.readdir(dir, { withFileTypes: true });
    
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            //console.log('fullPath',fullPath);
    
            if (entry.isDirectory()) {
                // Recursivamente carregar subdiretórios
                await this.autoLoadEndPoints(fullPath, path.join(basePath, entry.name));
            } else if (entry.isFile() && entry.name.endsWith('.js')) {
                // Carregar módulo dinamicamente
                const fileUrl = pathToFileURL(fullPath);
                const module = await import(fileUrl.href);
    
                // Mapear as funções exportadas como endpoints
                Object.entries(module).forEach(([exportName, handler]) => {
                    //console.log('handler',typeof handler, typeof handler == 'function' ? handler.name : '');
                    if (this.isRequestHandler(handler)) {
                        let routePath = path.join(basePath, entry.name.replace('.js', ''));
                        routePath = routePath.replaceAll(path.sep,"/").trim().toLowerCase();
                        console.log(`Registrando endpoint: ${routePath} -> ${exportName}`);
                        this.router.all(routePath, (handler as any)); // Associa ao método HTTP apropriado
                    } else if (typeof handler == 'function') {
                        Object.entries(handler).forEach(([exportName2, handler2]) => {
                            //console.log('handler',typeof handler2, typeof handler2 == 'function' ? handler2.name : '');
                            if (this.isRequestHandler(handler2)) {
                                let routePath = path.join(basePath, entry.name.replace('.js', ''));
                                routePath = path.join(routePath,handler2.name)
                                routePath = routePath.replaceAll(path.sep,"/").trim().toLowerCase();
                                console.log(`Registrando endpoint: ${routePath} -> ${exportName2}`);
                                this.router.all(routePath, (handler2 as any)); // Associa ao método HTTP apropriado
                            } else if (typeof handler2 == 'function') {
                                
                            }
                        });
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
                    methods[el.substring(1).toLowerCase()] = [el.substring(1).toUpperCase()];
                });
                if (Object.keys(methods)[0] == 'all') {
                    methods = {
                        post:['POST'],
                        get:['GET'],
                        put:['PUT'],
                        delete:['DELETE']
                    };
                }
                
                let routeArray = layer.route.path.split("/");
                let controllerName = (routeArray[routeArray.length-2] || routeArray[routeArray.length-1]).trim().toLowerCase();
                let methodName = routeArray[routeArray.length-1].trim().toLowerCase();
                console.log('controllerName',controllerName,'methodName',methodName,layer.route.path);
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