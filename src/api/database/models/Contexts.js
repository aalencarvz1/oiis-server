'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Contexts extends BaseTableModel {
  static id = 4;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Contexts.getBaseTableModelFields(),...{
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

  static constraints = [...(Contexts.getBaseTableModelConstraints() || []),...[
    {
      name: Contexts.tableName + '_u1',
      fields: [...Contexts.getBaseTableModelUniqueFields(),...Contexts.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
   
};



module.exports = {Contexts}