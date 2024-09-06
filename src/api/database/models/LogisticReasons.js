'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class LogisticReasons extends BaseTableModel {
  static id = 12002;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...LogisticReasons.getBaseTableModelFields(),...{                 
      name:{
        type: DataTypes.STRING(2000),
        allowNull: false
      },
      SIGLAMOVTYPE:{
        type: DataTypes.STRING(2)
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(LogisticReasons.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {LogisticReasons}