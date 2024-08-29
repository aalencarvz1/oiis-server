'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Languages extends BaseTableModel {
  static ID = 248;
  static model = null;
  static fields = {
    ...Languages.getBaseTableModelFields(),...{     
      NAME: {
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [ 
    'NAME'
  ];

  static constraints = [...(Languages.getBaseTableModelConstraints() || []),...[
    {
      name: Languages.name.toUpperCase() + '_U1',
      fields: Languages.uniqueFields,
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};


module.exports = {Languages}