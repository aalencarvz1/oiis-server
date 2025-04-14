'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Logistic_Mov_Types extends BaseTableModel {

  //table fields
  declare name: number;
  declare is_input:  number;
  declare is_output:  number;
  declare description: string;


  static id = 12000;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static DELIVERY = 1;
  static COLLECT = 2;
  static RETREAT = 3;

  static fields = {
    ...Logistic_Mov_Types.getBaseTableModelFields(),...{           
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
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Logistic_Mov_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Logistic_Mov_Types.tableName + '_u1',
      fields: [...Logistic_Mov_Types.getBaseTableModelUniqueFields(),...Logistic_Mov_Types.uniqueFields],
      type:"unique"
    },{
      name: Logistic_Mov_Types.tableName + '_c_1',
      fields:['is_input'],
      type:"check",
      where:{
        is_input: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Logistic_Mov_Types.tableName + '_c_2',
      fields:['is_output'],
      type:"check",
      where:{
        is_output: {
              [Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys : any[] = [];
  
};