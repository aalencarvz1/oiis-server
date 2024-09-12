'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

/**
 * class model
 */
class Data_Origins extends BaseTableModel {
  static id = 60;
  static tableName = this.name.toLowerCase();
  static model = null;

  static DEFAULT_ORIGINDATA = 1;
  static WINTHOR = 2;
  static AURORA = 3;  
  static EP = 4;
  static CONSULTA = 5;
  static APP_COLLECTOR = 1001;
  static APP_DELIVERY = 1002;

  static fields = {
    ...Data_Origins.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Data_Origins.getBaseTableModelConstraints() || []),...[
    {
      name: Data_Origins.tableName + '_u1',
      fields: [...Data_Origins.getBaseTableModelUniqueFields(),...Data_Origins.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
   
};


module.exports = { Data_Origins };
