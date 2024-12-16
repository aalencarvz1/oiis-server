const { Utils } = require("../../../utils/Utils");
const { Tables } = require("../../../../database/models/Tables");
const { RegistersController } = require("../RegistersController");
const { Groups } = require("../../../../database/models/Groups");
const { Entities_Types } = require("../../../../database/models/Entities_Types");
const { Sequelize } = require("sequelize");

/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-09-05
 */
class GroupsController extends RegistersController{


    static async processSqlCondiction(req,res) {
        try {
            let registers = await Groups.getModel().findAll();
            if (Utils.hasValue(registers)) {
                for(let i in registers) {
                if (Utils.hasValue(registers[i].entity_type_id) && Utils.hasValue(registers[i].sql_condiction)) {
                    let entity = await Entities_Types.getModel().findOne({
                    attributes:[
                        `${Entities_Types.tableName}.*`,
        
                    ],
                    include:[{
                        model:Tables.getModel(),
                        on:Sequelize.where(`${Tables.tableName}.id`,`${Entities_Types.tableName}.table_id`)
                    }],
                    where:{
                        id: registers[i].entity_type_id
                    }
                    });            
                }
                }
                res.send(200,true);
            } else {
                throw new Error("no data found");
            }
            } catch (e) {
                res.setException(e);
                res.sendResponse(517,false);
            }    
      }   
}

module.exports = {GroupsController}