'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { CommissionsItems } = require('./CommissionsItems');


/**
 * class model
 */
class CommissionsValues extends BaseTableModel {
  static id = 9052;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...CommissionsValues.getBaseTableModelFields(),...{                 
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

  static constraints = [...(CommissionsValues.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDCOMMISSIONITEM'],
    type: 'foreign key',
    references: { 
        table: CommissionsItems,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }]];

};


module.exports = {CommissionsValues}