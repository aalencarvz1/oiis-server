'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { ValuesNames } = require("./ValuesNames");
const { ItemsMovsAmounts } = require("./ItemsMovsAmounts");
const { IdentifiersTypes } = require("./IdentifiersTypes");

/**
 * class model
 */
class ItemsMovsAmountsRestrictions extends BaseTableModel {
  static id = 9037;
  static model = null;
  static fields = {
    ...ItemsMovsAmountsRestrictions.getBaseTableModelFields(),...{                 
      IDITEMMOVAMT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDIDENTIFIERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDVALUENAME:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      OPERATION:{
        type: DataTypes.STRING(256)
      },
      VALUE:{
        type: DataTypes.STRING(256)
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(ItemsMovsAmountsRestrictions.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDITEMMOVAMT'],
      type: 'foreign key',
      references: { 
          table: ItemsMovsAmounts,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['IDIDENTIFIERTYPE'],
      type: 'foreign key',
      references: { 
          table: IdentifiersTypes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDVALUENAME'],
      type: 'foreign key',
      references: { 
          table: ValuesNames,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {ItemsMovsAmountsRestrictions}