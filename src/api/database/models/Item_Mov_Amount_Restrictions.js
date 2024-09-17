'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Value_Names } = require("./Value_Names");
const { Item_Mov_Amounts } = require("./Item_Mov_Amounts");
const { Identifier_Types } = require("./Identifier_Types");

/**
 * class model
 */
class Item_Mov_Amount_Restrictions extends BaseTableModel {
  static id = 9037;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Item_Mov_Amount_Restrictions.getBaseTableModelFields(),...{                 
      item_mov_amt_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      value_name_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      operation:{
        type: DataTypes.STRING(256)
      },
      value:{
        type: DataTypes.STRING(256)
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Item_Mov_Amount_Restrictions.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['item_mov_amt_id'],
      type: 'foreign key',
      references: { 
          table: Item_Mov_Amounts,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['identifier_type_id'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['value_name_id'],
      type: 'foreign key',
      references: { 
          table: Value_Names,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Item_Mov_Amount_Restrictions}