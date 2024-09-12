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
      IDCOMMISSIONITEM:{
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
      PERCENT:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'IDCOMMISSIONITEM',
    'name'
  ];

  static constraints = [...(Commission_Values.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDCOMMISSIONITEM'],
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