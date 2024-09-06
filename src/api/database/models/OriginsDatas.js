'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

/**
 * class model
 */
class OriginsDatas extends BaseTableModel {
  static id = 60;
  static model = null;

  static DEFAULT_ORIGINDATA = 1;
  static WINTHOR = 2;
  static AURORA = 3;  
  static EP = 4;
  static CONSULTA = 5;
  static APP_COLLECTOR = 1001;
  static APP_DELIVERY = 1002;

  static fields = {
    ...OriginsDatas.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(OriginsDatas.getBaseTableModelConstraints() || []),...[
    {
      name: OriginsDatas.name.toLowerCase() + '_u1',
      fields: [...OriginsDatas.getBaseTableModelUniqueFields(),...OriginsDatas.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
   
};


module.exports = { OriginsDatas };
