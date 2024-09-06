'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class FinancialValueForms extends BaseTableModel {
  static id = 1032;
  static model = null;

  static NONE = 1;
  static MONEY = 2;
  static BOLET = 3;
  static CHECK = 4;
  static PIX = 5;
  static CARD = 6;
  static DEPOSIT = 7;


  static fields = {
    ...FinancialValueForms.getBaseTableModelFields(),...{
      IDSUP:{
        type : DataTypes.BIGINT.UNSIGNED,                
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      ISPHYSICAL: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISCARD: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISELETRONIC: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISCHECK: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISDEPOSIT: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISBOLET: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    Sequelize.literal(`(COALESCE(IDSUP,0))`),
    'name'
  ];

  static constraints = [...(FinancialValueForms.getBaseTableModelConstraints() || []),...[
    {
      name: FinancialValueForms.name.toLowerCase() + '_u1',
      fields: [...FinancialValueForms.getBaseTableModelUniqueFields(),...FinancialValueForms.uniqueFields],
      type:"unique"
    },{
      name: FinancialValueForms.name.toLowerCase() + '_c_1',
      fields:['ISPHYSICAL'],
      type:"check",
      where:{
        ISPHYSICAL: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: FinancialValueForms.name.toLowerCase() + '_c_2',
      fields:['ISCARD'],
      type:"check",
      where:{
        ISCARD: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: FinancialValueForms.name.toLowerCase() + '_c_3',
      fields:['ISELETRONIC'],
      type:"check",
      where:{
        ISELETRONIC: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: FinancialValueForms.name.toLowerCase() + '_c_4',
      fields:['ISCHECK'],
      type:"check",
      where:{
        ISCHECK: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: FinancialValueForms.name.toLowerCase() + '_c_5',
      fields:['ISDEPOSIT'],
      type:"check",
      where:{
        ISDEPOSIT: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: FinancialValueForms.name.toLowerCase() + '_c_6',
      fields:['ISBOLET'],
      type:"check",
      where:{
        ISBOLET: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDSUP'],
    type: 'foreign key',
    references: { 
        table: FinancialValueForms,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }]];

  static getIdByIntegrationId(idOnOrigin) {
    let result = FinancialValueForms.MONEY;
    switch(idOnOrigin.trim().toLowerCase()) {
      case 'D':
      case 'DH':
          result = FinancialValueForms.MONEY;
          break;
      case 'CH':
      case 'CHP':
      case 'CHV':
          result = FinancialValueForms.CHECK;
          break;
      case '237':
      case '104':
      case '1399':
      case '2399':
      case '748':
          result = FinancialValueForms.BOLET;
          break;
      case 'CCEO':
      case 'CCO3':
      case 'CCVM':
      case 'CCV3':
      case 'CDEO':
      case 'CDO3':
      case 'CDVM':
      case 'CDV3':
          result = FinancialValueForms.CARD;
          break;
      case 'DEP':
          result = FinancialValueForms.DEPOSIT;
          break;
      /*case 'BNF':
      case 'BNFT':*/
      default:
          result = FinancialValueForms.NONE;
          break;
    }
    return result;
  }
  
};


module.exports = {FinancialValueForms}