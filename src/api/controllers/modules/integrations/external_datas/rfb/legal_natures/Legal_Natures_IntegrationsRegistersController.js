const path = require("path");
const { Legal_Natures } = require("../../../../../../../database/models/external_data/Legal_Natures");
const { BaseRFBIntegrationsRegistersController } = require("../BaseRFBIntegrationsRegistersController");


/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-25-08
 */
class Legal_Natures_IntegrationsRegistersController extends BaseRFBIntegrationsRegistersController {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-09-21
     * @override
     */
    static async integrate(req,res,next) {
        super.integrate(req,res,next,Legal_Natures,[0],[1]);
    }
}

module.exports = {Legal_Natures_IntegrationsRegistersController}