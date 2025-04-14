'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Movement_Types extends BaseTableModel {

  //table fields
  declare name: string;
  declare is_input: number;
  declare is_output: number;
  declare is_conference: number;
  declare is_internal: number;
  declare description: string;


  static id = 9000;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static INPUT = 1;
  static OUTPUT = 2;
  static CONFERENCE =3;
  static INTERNAL = 4;

  static fields = {
    ...Movement_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
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
      is_conference: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_internal: {
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

  static constraints = [...(Movement_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Movement_Types.tableName + '_u1',
      fields: [...Movement_Types.getBaseTableModelUniqueFields(),...Movement_Types.uniqueFields],
      type:"unique"
    },{
      name: Movement_Types.tableName + '_c_1',
      fields:['is_input'],
      type:"check",
      where:{
        is_input: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Movement_Types.tableName + '_c_2',
      fields:['is_output'],
      type:"check",
      where:{
        is_output: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Movement_Types.tableName + '_c_3',
      fields:['is_conference'],
      type:"check",
      where:{
        is_conference: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Movement_Types.tableName + '_c_4',
      fields:['is_internal'],
      type:"check",
      where:{
        is_internal: {
              [Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys : any[] = [];
  
};