'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Contexts extends BaseTableModel {
  static id = 4;
  static model = null;
  static fields = {
    ...Contexts.getBaseTableModelFields(),...{
      NAME: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(Contexts.getBaseTableModelConstraints() || []),...[
    {
      name: Contexts.name.toLowerCase() + '_u1',
      fields: [...Contexts.getBaseTableModelUniqueFields(),...Contexts.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
   
};



module.exports = {Contexts}