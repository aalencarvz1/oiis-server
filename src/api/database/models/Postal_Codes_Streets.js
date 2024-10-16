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
class Postal_Codes_Streets extends BaseTableModel {
  static id = 2009;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Postal_Codes_Streets.getBaseTableModelFields(),...{                 
      postal_code_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      neighborhood_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      street_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'postal_code_id',
    'neighborhood_id',
    'street_id'
  ];

  static constraints = [...(Postal_Codes_Streets.getBaseTableModelConstraints() || []),...[
    {
      name: Postal_Codes_Streets.tableName + '_u1',
      fields: [...Postal_Codes_Streets.getBaseTableModelUniqueFields(),...Postal_Codes_Streets.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['postal_code_id'],
      type: 'foreign key',
      references: { 
          table: Postal_Codes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['neighborhood_id'],
      type: 'foreign key',
      references: { 
          table: NeighborHoods,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['street_id'],
      type: 'foreign key',
      references: { 
          table: Streets,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Postal_Codes_Streets}