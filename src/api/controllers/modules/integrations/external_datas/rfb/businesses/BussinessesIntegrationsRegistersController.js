const path = require("path");
const { Businesses } = require("../../../../../../../database/models/external_data/Businesses");
const { BaseRFBIntegrationsRegistersController } = require("../BaseRFBIntegrationsRegistersController");


/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-25-08
 */
class BussinessesIntegrationsRegistersController extends BaseRFBIntegrationsRegistersController {    
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-09-21
     * @override
     */
    static async integrate(req,res,next) {
        super.integrate(req,res,next,Businesses,[0,2,3,4,5],[1,6]);
    }
}

module.exports = {BussinessesIntegrationsRegistersController}