const { DatabaseUtils } = require("../../../../../database/DatabaseUtils");
const { RegistersController } = require("../../../RegistersController");
const { PcDepto } = require("../../../../../../database/models/winthor/PcDepto");

/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-09-05
 */
class DepartmentsIntegrationController extends RegistersController {


    static async get(req,res,next) {
        try {
            let origin = req.body.origin || "";
            let queryParams = await DatabaseUtils.prepareQueryParams(req.body.queryParams || {});
            queryParams.raw = true;
            switch((origin.name || origin).trim().toLowerCase()) {
                case "winthor":                                                
                    res.data = await PcDepto.getModel().findAll(queryParams);
                    res.sendResponse(200,true);
                    break; 
                default:
                    throw new Error(`origin not expected: ${(origin.name || origin)}`);
            }
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

}

module.exports = {DepartmentsIntegrationController}