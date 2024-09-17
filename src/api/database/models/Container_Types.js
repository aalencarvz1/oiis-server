'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Container_Types extends BaseTableModel {
  static id = 8002;
  static tableName = this.name.toLowerCase();
  static model = null;

  static NO_CONTEINER = 1;
  static PALLET = 2;

  static fields = {
    ...Container_Types.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      sigla: {
        type: DataTypes.STRING(10)
      },
      tara: {
        type: DataTypes.DECIMAL(32,10)
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name',
    Sequelize.literal(`(COALESCE(sigla,'NULL'))`)
  ];

  static constraints = [...(Container_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Container_Types.tableName + '_u1',
      fields: [...Container_Types.getBaseTableModelUniqueFields(),...Container_Types.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
 
};



module.exports = {Container_Types}