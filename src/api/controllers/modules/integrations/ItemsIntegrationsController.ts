import { NextFunction, Request, Response } from "express";
import BaseRegistersIntegrationsController from "./BaseRegistersIntegrationsController.js";
import PcProdutController from "./winthor/registers/PcProdutController.js";
import Gtin_Produtos from "../../../database/models/sjd/Gtin_Produtos.js";



export default class ItemsIntegrationsController extends BaseRegistersIntegrationsController {


    /**
     * @requesthandler
     * @override
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    PcProdutController.get(req,res,next);
                    break; 
                default:
                    throw new Error(`origin not expected: ${origin}`);
            }
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    /**
     * @requesthandler
     * @override
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async send_readed_gtin_informations(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                case "consult":
                case "consulta":
                    for(let k in req.body.data) {
                        let result = await Gtin_Produtos.saveOrCreate({
                            where:{
                                CODPROD:req.body.data[k].server_id
                            },
                            values:{
                                UPDATED_GTIN_MASTER:req.body.data[k].updated_gtin_master,
                                UPDATED_GTIN_UN:req.body.data[k].updated_gtin_un
                            }
                        });
                        if (!result?.success) {
                            result?.throw();
                        }
                    }
                    res.sendResponse(200,true);
                    break; 
                default:
                    throw new Error(`origin not expected: ${origin}`);
            }
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }
    
    
    static {
        this.configureDefaultRequestHandlers([
            this.send_readed_gtin_informations
        ]);
    }
}