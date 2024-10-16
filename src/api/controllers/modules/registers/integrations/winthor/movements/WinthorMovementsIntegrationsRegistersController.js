const { DataSwap } = require("../../../../../data/DataSwap");
const { RegistersController } = require("../../../RegistersController");

/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2024-10-11
 */
class WinthorMovementsIntegrationsRegistersController extends RegistersController {
    
    static async integrateWinthorMovement(movType, idAtOrigin, integrateItems) {
        result = new DataSwap();
        try {
            
            result.success = true;
        } catch (e) {
            result.setException(e);
        }
        return result;
    }
    
}

module.exports = {WinthorMovementsIntegrationsRegistersController}