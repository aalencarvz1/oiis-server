const { BaseTableModel } = require("../../database/models/BaseTableModel");
const { Record_Status } = require("../../database/models/Record_Status");
const { Data_Origins } = require("../../database/models/Data_Origins");
const { Users } = require("../../database/models/Users");
const { Utils } = require("../utils/Utils");

/**
 * Class to handle start models (actualy using sequelize). This models require that it is initied, because
 * models is implemented as class models (according https://sequelize.org/docs/v6/core-concepts/model-basics/).
 * Init method in models not create fisical tables, these only initialize model and associations (FKs). Fisical tables
 * are created by run migrations commands (vide sequelize-cli module in https://github.com/sequelize/cli)
 * @author Alencar
 * @created 2023-08-10
 */
class ModelsController{


    /**
     * after a lot of tries, not was possible use cycle node import logic (export.done), then, this method is the solution.
     * @created 2024-08-16
     * @version 1.0.0
     */
    static adjustModelsCycleImport(){
        Utils.logi(`${this.name}`,`adjustModelsCycleImport`);
        /*if (typeof BaseTableModel.baseTableModelForeignsKeys[0].references.table == 'string')
            BaseTableModel.baseTableModelForeignsKeys[0].references.table = Record_Status;
        if (typeof BaseTableModel.baseTableModelForeignsKeys[1].references.table == 'string')
            BaseTableModel.baseTableModelForeignsKeys[1].references.table = Users;
        if (typeof BaseTableModel.baseTableModelForeignsKeys[2].references.table == 'string')
            BaseTableModel.baseTableModelForeignsKeys[2].references.table = Users;
        if (typeof BaseTableModel.baseTableModelForeignsKeys[3].references.table == 'string')
            BaseTableModel.baseTableModelForeignsKeys[3].references.table = Data_Origins;
        let cycleModels = [Record_Status,Users,Data_Origins];
        for(let k in cycleModels) {
            console.log('cycleModel',cycleModels[k]);
            if (typeof cycleModels[k].foreignsKeys[0].references.table == 'string')
                cycleModels[k].foreignsKeys[0].references.table = Record_Status;
            if (typeof cycleModels[k].foreignsKeys[1].references.table == 'string')
                cycleModels[k].foreignsKeys[1].references.table = Users;
            if (typeof cycleModels[k].foreignsKeys[2].references.table == 'string')
                cycleModels[k].foreignsKeys[2].references.table = Users;
            if (typeof cycleModels[k].foreignsKeys[3].references.table == 'string')
                cycleModels[k].foreignsKeys[3].references.table = Data_Origins;
        } */
        Utils.logf(`${this.name}`,`adjustModelsCycleImport`);
    }

    /**
     * Method to init models, need this to can use model as class, according sequelize documentation.
     * this method must have called on start server
     * @created 2023-08-10
     */
    static initModels(){    
        this.adjustModelsCycleImport();       
    }

}

module.exports = { ModelsController };
