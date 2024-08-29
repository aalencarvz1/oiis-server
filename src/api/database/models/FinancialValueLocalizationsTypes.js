'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class FinancialValueLocalizationsTypes extends BaseTableModel {
  static ID = 1033;
  static model = null;

  static UNKNOWN = 1; //DESCONHECIDO
  static ACCOUNT = 2;
  static POUCH = 3; // MALOTE


  static fields = {
    ...FinancialValueLocalizationsTypes.getBaseTableModelFields(),...{
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

  static constraints = [...(FinancialValueLocalizationsTypes.getBaseTableModelConstraints() || []),...[
    {
      name: FinancialValueLocalizationsTypes.name.toUpperCase() + '_U1',
      fields: [...FinancialValueLocalizationsTypes.getBaseTableModelUniqueFields(),...FinancialValueLocalizationsTypes.uniqueFields],
      type:"unique"
    },{
      name: FinancialValueLocalizationsTypes.name.toUpperCase() + '_C_1',
      fields:['ISPHYSICAL'],
      type:"check",
      where:{
        ISPHYSICAL: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: FinancialValueLocalizationsTypes.name.toUpperCase() + '_C_3',
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
        table: FinancialValueLocalizationsTypes,
        field: 'ID'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }]];
  
};


module.exports = {FinancialValueLocalizationsTypes}