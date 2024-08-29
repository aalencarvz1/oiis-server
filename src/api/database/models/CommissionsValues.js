'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { CommissionsItems } = require('./CommissionsItems');


/**
 * class model
 */
class CommissionsValues extends BaseTableModel {
  static ID = 9052;
  static model = null;
  static fields = {
    ...CommissionsValues.getBaseTableModelFields(),...{                 
      IDCOMMISSIONITEM:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
      },
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false,
      },
      DESCRIPTION:{
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
    'NAME'
  ];

  static constraints = [...(CommissionsValues.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDCOMMISSIONITEM'],
    type: 'foreign key',
    references: { 
        table: CommissionsItems,
        field: 'ID'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }]];

};


module.exports = {CommissionsValues}