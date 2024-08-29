const { Sequelize } = require("sequelize");
const { ApisMapsResponses } = require("../../../database/models/ApisMapsResponses");
const {Client} = require("@googlemaps/google-maps-services-js");
const { Utils } = require("../../utils/Utils");
const { BaseEndPointController } = require("../../endpoints/BaseEndPointController");

/**
 * Class controller to handle wms module
 * @author Alencar
 * @created 2023-29-08
 */
class ApisMapsController extends BaseEndPointController {

    static #client = null;

    static async get(req,res,next) {
        try {            
            let bodyParams = req.body || req.query ;
            Utils.log(bodyParams);
            if (bodyParams.LIBRARY == 'geocoding') {
                let apiParams = bodyParams.PARAMETERS;
                if (typeof apiParams != 'string') {
                    apiParams = JSON.stringify(apiParams);
                }
                let apiRes = await ApisMapsResponses.getModel().findOne({
                    raw:true,
                    where:{
                        ENTITY: bodyParams.ENTITY || 'PEOPLE',
                        IDENTITY: bodyParams.IDENTITY,
                        LIBRARY: bodyParams.LIBRARY || 'geocoding',
                        PARAMETERS: apiParams,
                        [Sequelize.Op.and]:[{
                            [Sequelize.Op.or]:[{
                                RESPONSESTATUSCODE:200
                            },{
                                RESPONSESTATUS:'OK'
                            }]
                        },{
                            [Sequelize.Op.or]:[{
                                RESPONSEEXPIREAT:{                        
                                    [Sequelize.Op.is]:null
                                }
                            },{
                                RESPONSEEXPIREAT:{                        
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
                        await ApisMapsResponses.getModel().create({
                            ENTITY:bodyParams.ENTITY || 'PEOPLE',
                            IDENTITY:bodyParams.IDENTITY,
                            LIBRARY:bodyParams.LIBRARY || 'geocoding',
                            PARAMETERS: apiParams,
                            RESPONSESTATUSCODE:apiRes.status,
                            RESPONSESTATUS:apiRes.statusText,
                            RESPONSE:res.data
                        });
                        res.success = true;
                    } else {
                        res.message = apiRes.response.data.error_message;
                        res.success = false;
                    }                
                } else {
                    res.data = apiRes.RESPONSE;
                    res.success = true;
                }
            } else {
                throw new Error(`not expected library: ${bodyParams.LIBRARY}`);
            }
            res.sendResponse(res.success ? 200 : 517,res.success);
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }
    
}

module.exports = {ApisMapsController}