const { Sequelize } = require("sequelize");
const { Maps_Api_Responses } = require("../../../database/models/Maps_Api_Responses");
const {Client} = require("@googlemaps/google-maps-services-js");
const { Utils } = require("../../utils/Utils");
const { BaseEndPointController } = require("../../endpoints/BaseEndPointController");

/**
 * Class controller to handle wms module
 * @author Alencar
 * @created 2023-29-08
 */
class MapsApiController extends BaseEndPointController {

    static #client = null;

    static async get(req,res,next) {
        try {            
            let bodyParams = req.body || req.query ;
            if (bodyParams.library == 'geocoding') {
                let apiParams = bodyParams.entity;
                if (typeof apiParams != 'string') {
                    apiParams = JSON.stringify(apiParams);
                }
                let apiRes = await Maps_Api_Responses.getModel().findOne({
                    raw:true,
                    where:{
                        entity: bodyParams.entity || 'PEOPLE',
                        entity_id: bodyParams.entity_id,
                        library: bodyParams.library || 'geocoding',
                        entity: apiParams,
                        [Sequelize.Op.and]:[{
                            [Sequelize.Op.or]:[{
                                response_status_code:200
                            },{
                                response_status:'OK'
                            }]
                        },{
                            [Sequelize.Op.or]:[{
                                response_expire_at:{                        
                                    [Sequelize.Op.is]:null
                                }
                            },{
                                response_expire_at:{                        
                                    [Sequelize.Op.lt]:new Date()
                                }
                            }]
                        }]
                    }
                });
                if (!apiRes) {
                    if (!this.#client) {                    
                        this.#client = new Client({});
                    }
                    if (typeof apiParams == 'string') {
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
                        await Maps_Api_Responses.getModel().create({
                            entity:bodyParams.entity || 'PEOPLE',
                            entity_id:bodyParams.entity_id,
                            library:bodyParams.library || 'geocoding',
                            entity: apiParams,
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
    
}

module.exports = {MapsApiController}