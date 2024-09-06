'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Streets } = require("./Streets");
const { NeighborHoods } = require("./NeighborHoods");
const { PostalCodes } = require("./PostalCodes");

/**
 * class model
 */
class PostalCodesXStreets extends BaseTableModel {
  static id = 2009;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...PostalCodesXStreets.getBaseTableModelFields(),...{                 
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

  static constraints = [...(PostalCodesXStreets.getBaseTableModelConstraints() || []),...[
    {
      name: PostalCodesXStreets.tableName + '_u1',
      fields: [...PostalCodesXStreets.getBaseTableModelUniqueFields(),...PostalCodesXStreets.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDPOSTALCODE'],
      type: 'foreign key',
      references: { 
          table: PostalCodes,
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


module.exports = {PostalCodesXStreets}