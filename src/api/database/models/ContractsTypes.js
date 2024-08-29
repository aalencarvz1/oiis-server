'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class ContractsTypes extends BaseTableModel {
  static ID = 1020;
  static model = null;
  static fields = {
    ...ContractsTypes.getBaseTableModelFields(),...{           
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(ContractsTypes.getBaseTableModelConstraints() || []),...[
    {
      name: ContractsTypes.name.toUpperCase() + '_U1',
      fields: [...ContractsTypes.getBaseTableModelUniqueFields(),...ContractsTypes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};


module.exports = {ContractsTypes}