'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Processes extends BaseTableModel {
  static ID = 200;
  static model = null;
  static fields = {
    ...Processes.getBaseTableModelFields(),...{      
      NAME: {
        type: DataTypes.STRING(256),
        allowNull:false
      },      
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [    
    'NAME'
  ];

  static constraints = [...(Processes.getBaseTableModelConstraints() || []),...[
    {
      name: Processes.name.toUpperCase() + '_U1',
      fields: Processes.uniqueFields,
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};


module.exports = {Processes}