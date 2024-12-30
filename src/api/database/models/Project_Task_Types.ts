'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Project_Task_Types extends BaseTableModel {

  //table fields
  declare name: string;
  declare description: string;
  declare notes: string;


  static id = 15050;
  static tableName = this.name.toLowerCase();
  

  static TASK = 1;
  static DOCUMENTATION = 2;
  static PLANNING = 3;
  static EXECUTION = 4;
  static DEVELOPMENT = 5;
  static IMPROVEMENT = 6;
  static CORRECTION = 7;

  static fields = {
    ...Project_Task_Types.getBaseTableModelFields(),...{            
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT
      },
      notes: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Project_Task_Types.getBaseTableModelConstraints() || []),...[{
    name: Project_Task_Types.tableName + '_u1',
    fields: [...Project_Task_Types.getBaseTableModelUniqueFields(),...Project_Task_Types.uniqueFields],
    type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};