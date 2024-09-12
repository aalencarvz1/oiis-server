'use strict';

/*imports*/
const {  DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Identifier_Types } = require("./Identifier_Types");

/**
 * class model
 */
class Movement_Groups extends BaseTableModel {
  static id = 9011;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Movement_Groups.getBaseTableModelFields(),...{           
      IDIDENTIFIERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDENTIFIER:{
        type: DataTypes.STRING(256)
      }
    }
  };
  
  static uniqueFields = [
    Sequelize.literal(`(COALESCE(IDIDENTIFIERTYPE,0))`),
    Sequelize.literal(`(COALESCE(IDENTIFIER,'NULL'))`)
  ];

  static constraints = [...(Movement_Groups.getBaseTableModelConstraints() || []),...[
    {
      name: Movement_Groups.tableName + '_u1',
      fields: [...Movement_Groups.getBaseTableModelUniqueFields(),...Movement_Groups.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDIDENTIFIERTYPE'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Movement_Groups}