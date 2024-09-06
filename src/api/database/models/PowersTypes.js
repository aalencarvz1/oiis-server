'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class PowersTypes extends BaseTableModel {
  static id = 7002;
  static model = null;

  static SYSTEM = 1;
  static ACCESS = 2;

  static fields = {
    ...PowersTypes.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(PowersTypes.getBaseTableModelConstraints() || []),...[
    {
      name: PowersTypes.name.toLowerCase() + '_u1',
      fields: [...PowersTypes.getBaseTableModelUniqueFields(),...PowersTypes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {PowersTypes}