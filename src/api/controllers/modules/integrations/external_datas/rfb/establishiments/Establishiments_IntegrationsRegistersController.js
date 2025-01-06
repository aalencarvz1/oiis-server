const path = require("path");
const { Establishments } = require("../../../../../../../database/models/external_data/Establishments");
const { BaseRFBIntegrationsRegistersController } = require("../BaseRFBIntegrationsRegistersController");
const { Utils } = require("../../../../../../utils/Utils");


/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-25-08
 */
class Establishiments_IntegrationsRegistersController extends BaseRFBIntegrationsRegistersController {    

    static toPhoneNumber(v) {
        let result = null;
        try {
            if (Utils.hasValue(v)) {
                v = v.toString().replace(/[^0-9]/,'');
                if (Utils.hasValue(v)) {
                    v = Utils.toNumber(v);
                    if (isNaN(v)) {
                        v = null;
                    }
                    result = v;
                }
            }
        } catch (e) {
            Utils.loge(e);
        }
        return result;
    }    

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-09-21
     * @override
     */
    static async integrate(req,res,next) {
        super.integrate(req,res,next,
            Establishments,[0,1,2,3,5,7,9,11,18,21,22,23,24,25,26],
            [4,8,12,13,14,15,16,17,19,20,27,28],
            [6,10,29],
            "YYYYMMDD",
            {
                18:{
                    toNumber:Establishiments_IntegrationsRegistersController.toPhoneNumber                    
                },
                21:{
                    toNumber:Establishiments_IntegrationsRegistersController.toPhoneNumber                    
                },
                22:{
                    toNumber:Establishiments_IntegrationsRegistersController.toPhoneNumber                    
                },
                23:{
                    toNumber:Establishiments_IntegrationsRegistersController.toPhoneNumber                    
                },
                24:{
                    toNumber:Establishiments_IntegrationsRegistersController.toPhoneNumber                    
                },
                25:{
                    toNumber:Establishiments_IntegrationsRegistersController.toPhoneNumber                    
                },
                26:{
                    toNumber:Establishiments_IntegrationsRegistersController.toPhoneNumber                    
                }
            }
        );
    }
}

module.exports = {Establishiments_IntegrationsRegistersController}