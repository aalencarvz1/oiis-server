'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Commission_Items } = require('./Commission_Items');


/**
 * class model
 */
class Commission_Values extends BaseTableModel {
  static id = 9052;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Commission_Values.getBaseTableModelFields(),...{                 
      commission_item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false,
      },
      description:{
        type: DataTypes.TEXT
      },
      percent:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'commission_item_id',
    'name'
  ];

  static constraints = [...(Commission_Values.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['commission_item_id'],
    type: 'foreign key',
    references: { 
        table: Commission_Items,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }]];

};


module.exports = {Commission_Values}