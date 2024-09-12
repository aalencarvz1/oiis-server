'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Logistic_Reasons extends BaseTableModel {
  static id = 12002;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Logistic_Reasons.getBaseTableModelFields(),...{                 
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

  static constraints = [...(Logistic_Reasons.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Logistic_Reasons}