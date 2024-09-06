'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class GtinsTypes extends BaseTableModel {
  static id = 8007;
  static tableName = this.name.toLowerCase();
  static model = null;

  static UNDEFINED = 1;
  static GTIN8 = 8;
  static GTIN12 = 12;
  static GTIN13 = 13;
  static GTIN14 = 14;

  static fields = {
    ...GtinsTypes.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      CHARACTERS: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name',
    Sequelize.literal(`(COALESCE(CHARACTERS,0))`)
  ];

  static constraints = [...(GtinsTypes.getBaseTableModelConstraints() || []),...[
    {
      name: GtinsTypes.tableName + '_u1',
      fields: [...GtinsTypes.getBaseTableModelUniqueFields(),...GtinsTypes.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};



module.exports = {GtinsTypes}