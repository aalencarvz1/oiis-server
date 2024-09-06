'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class ContractsTypes extends BaseTableModel {
  static id = 1020;
  static model = null;
  static fields = {
    ...ContractsTypes.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(ContractsTypes.getBaseTableModelConstraints() || []),...[
    {
      name: ContractsTypes.name.toLowerCase() + '_u1',
      fields: [...ContractsTypes.getBaseTableModelUniqueFields(),...ContractsTypes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};


module.exports = {ContractsTypes}