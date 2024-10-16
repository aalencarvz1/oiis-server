'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Conditions } = require("./Conditions");


/**
 * class model
 */
class Condition_Items extends BaseTableModel {
  static id = 7005;
  static tableName = this.name.toLowerCase();
  static model = null;

    static fields = {
    ...Condition_Items.getBaseTableModelFields(),...{           
      condition_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      value:{
        type: DataTypes.TEXT
      },
      expression: {
        type: DataTypes.TEXT
      }      
    }
  };

  static constraints = [...(Condition_Items.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['condition_id'],
      type: 'foreign key',
      references: { 
          table: Conditions,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};

module.exports = {Condition_Items}
