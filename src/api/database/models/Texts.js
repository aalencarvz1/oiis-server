'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Languages } = require("./Languages");

/**
 * class model
 */
class Texts extends BaseTableModel {
  static id = 249;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Texts.getBaseTableModelFields(),...{     
      IDLANGUAGE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      TEXT: {
        type: DataTypes.STRING(2000),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['IDLANGUAGE'],
      type: 'foreign key',
      references: { 
          table: Languages,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Texts}