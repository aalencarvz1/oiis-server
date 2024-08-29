'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Comparators extends BaseTableModel {
  static ID = 1005;
  static model = null;

  static EQUAL = 1;
  static DIFFERENT = 2;
  static IN = 3;
  static NOT_IN = 4;
  static LIKE = 5;
  static NOT_LIKE = 6;
  static GREATER = 7;
  static GREATER_EQUAL = 8;
  static SMALLER = 9;
  static SMALLER_EQUAL = 10;

  static fields = {
    ...Comparators.getBaseTableModelFields(),...{           
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'NAME',
  ];

  static constraints = [...(Comparators.getBaseTableModelConstraints() || []),...[
    {
      name: Comparators.name.toUpperCase() + '_U1',
      fields: [...Comparators.getBaseTableModelUniqueFields(),...Comparators.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys() || []),...[]];
  
};


module.exports = {Comparators}