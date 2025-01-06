const path = require("path");
const { Countries } = require("../../../../../../../database/models/external_data/Countries");
const { BaseRFBIntegrationsRegistersController } = require("../BaseRFBIntegrationsRegistersController");


/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-25-08
 */
class Countries_IntegrationsRegistersController extends BaseRFBIntegrationsRegistersController {    
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-09-21
     * @override
     */
    static async integrate(req,res,next) {
        super.integrate(req,res,next,Countries,[0],[1]);
    }
}

module.exports = {Countries_IntegrationsRegistersController}