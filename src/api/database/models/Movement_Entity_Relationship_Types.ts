'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Movement_Entity_Relationship_Types extends BaseTableModel {

  //table fields
  declare name: string;
  declare is_origin:  number;
  declare is_target:  number;
  declare is_input:  number;
  declare is_output:  number;
  declare description: string;


  static id = 9020;
  static tableName = this.name.toLowerCase();
  

  static ORIGIN_INPUT = 1;
  static TARGET_INPUT = 2;
  static ORIGIN_OUTPUT = 3;
  static TARGET_OUTPUT = 4;

  static fields = {
    ...Movement_Entity_Relationship_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      is_origin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_target: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_input: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_output: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Movement_Entity_Relationship_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Movement_Entity_Relationship_Types.tableName + '_u1',
      fields: [...Movement_Entity_Relationship_Types.getBaseTableModelUniqueFields(),...Movement_Entity_Relationship_Types.uniqueFields],
      type:"unique"
    },{
      name: Movement_Entity_Relationship_Types.tableName + '_c_1',
      fields:['is_origin'],
      type:"check",
      where:{
        is_origin: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Movement_Entity_Relationship_Types.tableName + '_c_2',
      fields:['is_target'],
      type:"check",
      where:{
        is_target: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Movement_Entity_Relationship_Types.tableName + '_c_3',
      fields:['is_input'],
      type:"check",
      where:{
        is_input: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Movement_Entity_Relationship_Types.tableName + '_c_4',
      fields:['is_output'],
      type:"check",
      where:{
        is_output: {
              [Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};