'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

/**
 * class model
 */
class StreetTypes extends BaseTableModel {
  static id = 2005;
  static model = null;

  static STREET = 1;
  static AVENUE = 2;

  static fields = {
    ...StreetTypes.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(StreetTypes.getBaseTableModelConstraints() || []),...[
    {
      name: StreetTypes.name.toLowerCase() + '_u1',
      fields: [...StreetTypes.getBaseTableModelUniqueFields(),...StreetTypes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {StreetTypes}