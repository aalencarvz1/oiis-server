'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Conference_Types extends BaseTableModel {

  //table fields
  declare name: string;
  declare cega: number;
  declare semicega: number;
  declare normal: number;
  declare description: string;



  static id = 9004;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static NORMAL = 1;
  static CEGA = 2;
  static SEMICEGA = 3;
  static XML_WITH_LOT = 4;
  static XML_WITHOUT_LOT = 5;

  static fields = {
    ...Conference_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      cega: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      semicega: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      normal: {
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

  static constraints = [...(Conference_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Conference_Types.tableName + '_u1',
      fields: [...Conference_Types.getBaseTableModelUniqueFields(),...Conference_Types.uniqueFields],
      type:"unique"
    },{
      name: Conference_Types.tableName + '_c_1',
      fields:['cega'],
      type:"check",
      where:{
        cega: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Conference_Types.tableName + '_c_2',
      fields:['semicega'],
      type:"check",
      where:{
        semicega: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Conference_Types.tableName + '_c_3',
      fields:['normal'],
      type:"check",
      where:{
        normal: {
              [Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys : any[] = [];
  
};