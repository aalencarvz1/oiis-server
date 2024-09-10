'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Conteiner_Types extends BaseTableModel {
  static id = 8002;
  static tableName = this.name.toLowerCase();
  static model = null;

  static NO_CONTEINER = 1;
  static PALLET = 2;

  static fields = {
    ...Conteiner_Types.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      SIGLA: {
        type: DataTypes.STRING(10)
      },
      TARA: {
        type: DataTypes.DECIMAL(32,10)
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name',
    Sequelize.literal(`(COALESCE(SIGLA,'NULL'))`)
  ];

  static constraints = [...(Conteiner_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Conteiner_Types.tableName + '_u1',
      fields: [...Conteiner_Types.getBaseTableModelUniqueFields(),...Conteiner_Types.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
 
};



module.exports = {Conteiner_Types}