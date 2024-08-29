'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Languages } = require("./Languages");
const { Texts } = require("./Texts");

/**
 * class model
 */
class Translates extends BaseTableModel {
  static ID = 250;
  static model = null;
  static fields = {
    ...Translates.getBaseTableModelFields(),...{     
      IDLANGUAGE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDTEXT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      TRANSLATED: {
        type: DataTypes.STRING(2000),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'IDLANGUAGE',
    'IDTEXT'
  ];

  static constraints = [...(Translates.getBaseTableModelConstraints() || []),...[
    {
      name: Translates.name.toUpperCase() + '_U1',
      fields: [...Translates.getBaseTableModelUniqueFields(),...Translates.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['IDLANGUAGE'],
      type: 'foreign key',
      references: { 
          table: Languages,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['IDTEXT'],
      type: 'foreign key',
      references: { 
          table: Texts,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};


module.exports = {Translates}