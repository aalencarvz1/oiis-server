'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class GtinsTypes extends BaseTableModel {
  static id = 8007;
  static model = null;

  static UNDEFINED = 1;
  static GTIN8 = 8;
  static GTIN12 = 12;
  static GTIN13 = 13;
  static GTIN14 = 14;

  static fields = {
    ...GtinsTypes.getBaseTableModelFields(),...{
      NAME: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      CHARACTERS: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'NAME',
    Sequelize.literal(`(COALESCE(CHARACTERS,0))`)
  ];

  static constraints = [...(GtinsTypes.getBaseTableModelConstraints() || []),...[
    {
      name: GtinsTypes.name.toLowerCase() + '_u1',
      fields: [...GtinsTypes.getBaseTableModelUniqueFields(),...GtinsTypes.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};



module.exports = {GtinsTypes}