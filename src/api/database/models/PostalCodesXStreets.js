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
  static ID = 2009;
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
      name: PostalCodesXStreets.name.toUpperCase() + '_U1',
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
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDNEIGHBORHOOD'],
      type: 'foreign key',
      references: { 
          table: NeighborHoods,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSTREET'],
      type: 'foreign key',
      references: { 
          table: Streets,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {PostalCodesXStreets}