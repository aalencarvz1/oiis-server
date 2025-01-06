'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Identifier_Types  from "./Identifier_Types.js";

/**
 * class model
 */
export default class Movement_Groups extends BaseTableModel {

  //table fields
  declare identifier_type_id: number;
  declare identifier: string;

  static id = 9011;
  static tableName = this.name.toLowerCase();
  
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