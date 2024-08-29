'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class FinancialValueMovTypes extends BaseTableModel {
  static ID = 1034;
  static model = null;

  static TRANSFERENCE = 1; 
  static DEPOSIT = 2;
  static POUCH = 3; // MALOTE


  static fields = {
    ...FinancialValueMovTypes.getBaseTableModelFields(),...{
      IDSUP:{
        type : DataTypes.BIGINT.UNSIGNED,                
      },
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      ISPHYSICAL: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISELETRONIC: {
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
    'NAME'
  ];

  static constraints = [...(FinancialValueMovTypes.getBaseTableModelConstraints() || []),...[
    {
      name: FinancialValueMovTypes.name.toUpperCase() + '_U1',
      fields: [...FinancialValueMovTypes.getBaseTableModelUniqueFields(),...FinancialValueMovTypes.uniqueFields],
      type:"unique"
    },{
      name: FinancialValueMovTypes.name.toUpperCase() + '_C_1',
      fields:['ISPHYSICAL'],
      type:"check",
      where:{
        ISPHYSICAL: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: FinancialValueMovTypes.name.toUpperCase() + '_C_3',
      fields:['ISELETRONIC'],
      type:"check",
      where:{
        ISELETRONIC: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDSUP'],
    type: 'foreign key',
    references: { 
        table: FinancialValueMovTypes,
        field: 'ID'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }]];


  static getIdByIntegrationId(idOnOrigin) {
    let result = FinancialValueMovTypes.DEPOSIT;
    switch(idOnOrigin.trim().toUpperCase()) {
      case 'DEPÓSITO':
      case 'DEPOSITO':
      case 'DEP':
      case 'DEPOSIT':
          result = FinancialValueMovTypes.DEPOSIT;
          break;
      case 'TRANSFERÊNCIA':
      case 'TRANSFERENCIA':
      case 'TRANSFERENCE':
      case 'TRANSF':
          result = FinancialValueMovTypes.TRANSFERENCE;
          break;
      case 'MALOTE':
      case 'MALOT':
      case 'POUCH':
          result = FinancialValueMovTypes.POUCH;
          break;
      default:
          result = FinancialValueMovTypes.DEPOSIT;
          break;
    }
    return result;
  }
  
};


module.exports = {FinancialValueMovTypes}