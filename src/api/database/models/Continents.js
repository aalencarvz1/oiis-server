'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Continents extends BaseTableModel {
  static id = 2000;
  static tableName = this.name.toLowerCase();
  static model = null;

  static AMERICA = 1;
  static SOUTH_AMERICA = 2;

  static fields = {
    ...Continents.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      sigla:{
        type: DataTypes.STRING(10)
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Continents.getBaseTableModelConstraints() || []),...[
    {
      name: Continents.tableName + '_u1',
      fields: [...Continents.getBaseTableModelUniqueFields(),...Continents.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys() || []),...[]];
  
};


module.exports = {Continents}