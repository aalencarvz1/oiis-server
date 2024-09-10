'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Identifier_Types } = require("./Identifier_Types");
const { Conteiner_Types } = require("./Conteiner_Types");

/**
 * class model
 */
class Conteiners extends BaseTableModel {
  static id = 8015;
  static tableName = this.name.toLowerCase();
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
      name: Conteiners.tableName + '_u1',
      fields: [...Conteiners.getBaseTableModelUniqueFields(),...Conteiners.uniqueFields],
      type:"unique"
    },{
      name: Conteiners.tableName + '_c_1',
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
          table: Conteiner_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDIDENTIFIERTYPE'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Conteiners}