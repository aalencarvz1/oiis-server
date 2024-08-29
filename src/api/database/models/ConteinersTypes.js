'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class ConteinersTypes extends BaseTableModel {
  static ID = 8002;
  static model = null;

  static NO_CONTEINER = 1;
  static PALLET = 2;

  static fields = {
    ...ConteinersTypes.getBaseTableModelFields(),...{
      NAME: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      SIGLA: {
        type: DataTypes.STRING(10)
      },
      TARA: {
        type: DataTypes.DECIMAL(32,10)
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'NAME',
    Sequelize.literal(`(COALESCE(SIGLA,'NULL'))`)
  ];

  static constraints = [...(ConteinersTypes.getBaseTableModelConstraints() || []),...[
    {
      name: ConteinersTypes.name.toUpperCase() + '_U1',
      fields: [...ConteinersTypes.getBaseTableModelUniqueFields(),...ConteinersTypes.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
 
};



module.exports = {ConteinersTypes}