const path = require("path");
const { BaseEndPointController } = require("../../endpoints/BaseEndPointController");

/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-25-08
 */
class RegistersController extends BaseEndPointController {     


    /**
     * @implements BaseEndPointController.getDirName
     * @returns 
     * @created 2024-07-17
     * @version 1.0.0
     * @todo override this in inherited registers controllers if directory returned is another
     */
    static getDatabaseModelsPath(){
        let baseDir = path.dirname(require.main.filename);
        return `${baseDir}${path.sep}database${path.sep}models`;
    }

    /**
     * @implements BaseEndPointController.getDirName
     * @returns 
     * @created 2024-07-17
     * @version 1.0.0
     * @todo override this in inherited registers controllers if directory returned is another
     */
    static getDirName(){
        //let baseDir = path.dirname(require.main.filename);
        return __dirname;//path.dirname(baseDir);
    }
}

module.exports = {RegistersController}