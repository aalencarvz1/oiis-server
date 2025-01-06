'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Financial_Value_Forms extends BaseTableModel {

  //table fields
  declare name: string;
  declare is_physical: number;
  declare is_card: number;
  declare is_eletronic: number;
  declare is_check: number;
  declare is_deposit: number;
  declare is_bolet: number;
  declare description: string;


  static id = 1032;
  static tableName = this.name.toLowerCase();
  

  static NONE = 1;
  static MONEY = 2;
  static BOLET = 3;
  static CHECK = 4;
  static PIX = 5;
  static CARD = 6;
  static DEPOSIT = 7;


  static fields = {
    ...Financial_Value_Forms.getBaseTableModelFields(),...{
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      is_physical: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_card: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_eletronic: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_check: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_deposit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_bolet: {
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

  static constraints = [...(Financial_Value_Forms.getBaseTableModelConstraints() || []),...[
    {
      name: Financial_Value_Forms.tableName + '_u1',
      fields: [...Financial_Value_Forms.getBaseTableModelUniqueFields(),...Financial_Value_Forms.uniqueFields],
      type:"unique"
    },{
      name: Financial_Value_Forms.tableName + '_c_1',
      fields:['is_physical'],
      type:"check",
      where:{
        is_physical: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Financial_Value_Forms.tableName + '_c_2',
      fields:['is_card'],
      type:"check",
      where:{
        is_card: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Financial_Value_Forms.tableName + '_c_3',
      fields:['is_eletronic'],
      type:"check",
      where:{
        is_eletronic: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Financial_Value_Forms.tableName + '_c_4',
      fields:['is_check'],
      type:"check",
      where:{
        is_check: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Financial_Value_Forms.tableName + '_c_5',
      fields:['is_deposit'],
      type:"check",
      where:{
        is_deposit: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Financial_Value_Forms.tableName + '_c_6',
      fields:['is_bolet'],
      type:"check",
      where:{
        is_bolet: {
              [Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];

  static getIdByIntegrationId(idOnOrigin: string) {
    let result = Financial_Value_Forms.MONEY;
    switch(idOnOrigin.trim().toLowerCase()) {
      case 'D':
      case 'DH':
          result = Financial_Value_Forms.MONEY;
          break;
      case 'CH':
      case 'CHP':
      case 'CHV':
          result = Financial_Value_Forms.CHECK;
          break;
      case '237':
      case '104':
      case '1399':
      case '2399':
      case '748':
          result = Financial_Value_Forms.BOLET;
          break;
      case 'CCEO':
      case 'CCO3':
      case 'CCVM':
      case 'CCV3':
      case 'CDEO':
      case 'CDO3':
      case 'CDVM':
      case 'CDV3':
          result = Financial_Value_Forms.CARD;
          break;
      case 'DEP':
          result = Financial_Value_Forms.DEPOSIT;
          break;
      /*case 'BNF':
      case 'BNFT':*/
      default:
          result = Financial_Value_Forms.NONE;
          break;
    }
    return result;
  }
  
};