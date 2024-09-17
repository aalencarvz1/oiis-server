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
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      identifier:{
        type: DataTypes.STRING(256)
      }
    }
  };
  
  static uniqueFields = [
    Sequelize.literal(`(COALESCE(identifier_type_id,0))`),
    Sequelize.literal(`(COALESCE(identifier,'NULL'))`)
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
      fields: ['identifier_type_id'],
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