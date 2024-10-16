const path = require("path");
const { Cnaes } = require("../../../../../../../database/models/external_data/Cnaes");
const { BaseRFBIntegrationsRegistersController } = require("../BaseRFBIntegrationsRegistersController");


/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-25-08
 */
class Cnaes_IntegrationsRegistersController extends BaseRFBIntegrationsRegistersController {    
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-09-21
     * @override
     */
    static async integrate(req,res,next) {
        super.integrate(req,res,next,Cnaes,[0],[1]);
    }
}

module.exports = {Cnaes_IntegrationsRegistersController}