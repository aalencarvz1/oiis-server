'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Processes extends BaseTableModel {
  static id = 200;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Processes.getBaseTableModelFields(),...{      
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },      
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [    
    'name'
  ];

  static constraints = [...(Processes.getBaseTableModelConstraints() || []),...[
    {
      name: Processes.tableName + '_u1',
      fields: Processes.uniqueFields,
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};


module.exports = {Processes}