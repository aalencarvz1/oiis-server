import { NextFunction, Request, Response } from "express";
import Maps_Api_Responses from "../../../database/models/Maps_Api_Responses.js";
import BaseRegistersController from "./BaseRegistersController.js";
import { Op } from "sequelize";
import { Client } from "@googlemaps/google-maps-services-js";


export default class Maps_Api_ResponsesController extends BaseRegistersController {

    static #client : any = null;


    static getTableClassModel() : any {
        return Maps_Api_Responses;
    }

    static async get(req: Request,res: Response,next: NextFunction): Promise<void> {
        try {            
            let bodyParams = req.body || req.query ;
            if (bodyParams.library === 'geocoding') {
                let apiParams = bodyParams.parameters;
                if (typeof apiParams != 'string') {
                    apiParams = JSON.stringify(apiParams);
                }
                let apiRes : any = await Maps_Api_Responses.findOne({
                    raw:true,
                    where:{
                        entity: bodyParams.entity || 'PEOPLE',
                        entity_id: bodyParams.entity_id,
                        library: bodyParams.library || 'geocoding',
                        request_params: apiParams,
                        [Op.and]:[{
                            [Op.or]:[{
                                response_status_code:200
                            },{
                                response_status:'OK'
                            }]
                        },{
                            [Op.or]:[{
                                response_expire_at:{                        
                                    [Op.is]:null
                                }
                            },{
                                response_expire_at:{                        
                                    [Op.lt]:new Date()
                                }
                            }]
                        }]
                    }
                });
                if (!apiRes) {
                    if (!this.#client) {                    
                        this.#client = new Client({});
                    }
                    if (typeof apiParams === 'string') {
                        apiParams = JSON.parse(apiParams);
                    }
                    apiParams.key = process.env.GOOGLE_MAPS_API_KEY;
                    apiRes = await this.#client.geocode({
                        params:apiParams
                    });
                    if (apiRes.status == 200 || apiRes.statusText =='OK') {
                        res.data = await apiRes.data.results;
                        res.data = JSON.stringify(res.data);
                        apiParams.key = undefined;
                        delete apiParams.key;
                        apiParams = JSON.stringify(apiParams);
                        await Maps_Api_Responses.create({
                            entity:bodyParams.entity || 'PEOPLE',
                            entity_id:bodyParams.entity_id,
                            library:bodyParams.library || 'geocoding',
                            request_params: apiParams,
                            response_status_code:apiRes.status,
                            response_status:apiRes.statusText,
                            response:res.data
                        });
                        res.success = true;
                    } else {
                        res.message = apiRes.response.data.error_message;
                        res.success = false;
                    }                
                } else {
                    res.data = apiRes.response;
                    res.success = true;
                }
            } else {
                throw new Error(`not expected library: ${bodyParams.library}`);
            }
            res.sendResponse(res.success ? 200 : 517,res.success);
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
