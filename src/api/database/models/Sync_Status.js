'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Sync_Status extends BaseTableModel {
  static id = 66;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Sync_Status.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      synchronized: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Sync_Status.getBaseTableModelConstraints() || []),...[
    {
      name: Sync_Status.tableName + '_u1',
      fields: [...Sync_Status.getBaseTableModelUniqueFields(),...Sync_Status.uniqueFields],
      type:"unique"
    },{
      name: Sync_Status.tableName + '_c_1',
      fields:['synchronized'],
      type:"check",
      where:{
        synchronized: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
    
};



module.exports = {Sync_Status}