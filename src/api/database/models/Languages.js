'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Languages extends BaseTableModel {
  static id = 248;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Languages.getBaseTableModelFields(),...{     
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [ 
    'name'
  ];

  static constraints = [...(Languages.getBaseTableModelConstraints() || []),...[
    {
      name: Languages.tableName + '_u1',
      fields: [...Languages.getBaseTableModelUniqueFields(),...Languages.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};


module.exports = {Languages}