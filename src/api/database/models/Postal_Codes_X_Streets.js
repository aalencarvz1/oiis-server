'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Streets } = require("./Streets");
const { NeighborHoods } = require("./NeighborHoods");
const { Postal_Codes } = require("./Postal_Codes");

/**
 * class model
 */
class Postal_Codes_X_Streets extends BaseTableModel {
  static id = 2009;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Postal_Codes_X_Streets.getBaseTableModelFields(),...{                 
      IDPOSTALCODE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDNEIGHBORHOOD:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDSTREET:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      OBSERVATIONS:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDPOSTALCODE',
    'IDNEIGHBORHOOD',
    'IDSTREET'
  ];

  static constraints = [...(Postal_Codes_X_Streets.getBaseTableModelConstraints() || []),...[
    {
      name: Postal_Codes_X_Streets.tableName + '_u1',
      fields: [...Postal_Codes_X_Streets.getBaseTableModelUniqueFields(),...Postal_Codes_X_Streets.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDPOSTALCODE'],
      type: 'foreign key',
      references: { 
          table: Postal_Codes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDNEIGHBORHOOD'],
      type: 'foreign key',
      references: { 
          table: NeighborHoods,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSTREET'],
      type: 'foreign key',
      references: { 
          table: Streets,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Postal_Codes_X_Streets}