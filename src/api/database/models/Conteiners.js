'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { IdentifiersTypes } = require("./IdentifiersTypes");
const { ConteinersTypes } = require("./ConteinersTypes");

/**
 * class model
 */
class Conteiners extends BaseTableModel {
  static ID = 8015;
  static model = null;

  static WITHOUT_CONTEINER = 1;

  static fields = {
    ...Conteiners.getBaseTableModelFields(),...{           
      IDCONTENIERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDIDENTIFIERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDENTIFIER:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      TARA:{
        type: DataTypes.DECIMAL(32,10)
      },
      ALLOWMULTIPLESADDRESSES: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      OBSERVATIONS:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'IDCONTENIERTYPE',
    'IDIDENTIFIERTYPE',
    'IDENTIFIER'
  ];

  static constraints = [...(Conteiners.getBaseTableModelConstraints() || []),...[
    {
      name: Conteiners.name.toUpperCase() + '_U1',
      fields: [...Conteiners.getBaseTableModelUniqueFields(),...Conteiners.uniqueFields],
      type:"unique"
    },{
      name: Conteiners.name.toUpperCase() + '_C_1',
      fields:['ALLOWMULTIPLESADDRESSES'],
      type:"check",
      where:{
        ALLOWMULTIPLESADDRESSES: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDCONTENIERTYPE'],
      type: 'foreign key',
      references: { 
          table: ConteinersTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDIDENTIFIERTYPE'],
      type: 'foreign key',
      references: { 
          table: IdentifiersTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Conteiners}