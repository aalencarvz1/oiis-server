'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Gtin_Types extends BaseTableModel {
  static id = 8007;
  static tableName = this.name.toLowerCase();
  static model = null;

  static UNDEFINED = 1;
  static GTIN8 = 8;
  static GTIN12 = 12;
  static GTIN13 = 13;
  static GTIN14 = 14;

  static fields = {
    ...Gtin_Types.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      characters: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name',
    Sequelize.literal(`(COALESCE(characters,0))`)
  ];

  static constraints = [...(Gtin_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Gtin_Types.tableName + '_u1',
      fields: [...Gtin_Types.getBaseTableModelUniqueFields(),...Gtin_Types.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};



module.exports = {Gtin_Types}