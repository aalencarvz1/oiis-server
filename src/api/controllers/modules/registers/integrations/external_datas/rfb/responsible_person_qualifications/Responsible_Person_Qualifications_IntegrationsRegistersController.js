const path = require("path");
const { Responsible_Person_Qualifications } = require("../../../../../../../database/models/external_data/Responsible_Person_Qualifications");
const { BaseRFBIntegrationsRegistersController } = require("../BaseRFBIntegrationsRegistersController");


/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-25-08
 */
class Responsible_Person_Qualifications_IntegrationsRegistersController extends BaseRFBIntegrationsRegistersController {
    
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-09-21
     * @override
     */
    static async integrate(req,res,next) {
        super.integrate(req,res,next,Responsible_Person_Qualifications,[0],[1]);
    }
}

module.exports = {Responsible_Person_Qualifications_IntegrationsRegistersController}