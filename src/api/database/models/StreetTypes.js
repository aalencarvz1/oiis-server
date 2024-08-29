'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

/**
 * class model
 */
class StreetTypes extends BaseTableModel {
  static ID = 2005;
  static model = null;

  static STREET = 1;
  static AVENUE = 2;

  static fields = {
    ...StreetTypes.getBaseTableModelFields(),...{           
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(StreetTypes.getBaseTableModelConstraints() || []),...[
    {
      name: StreetTypes.name.toUpperCase() + '_U1',
      fields: [...StreetTypes.getBaseTableModelUniqueFields(),...StreetTypes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {StreetTypes}