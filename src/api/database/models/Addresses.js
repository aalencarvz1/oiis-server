'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { PostalCodes } = require("./PostalCodes");
const { Streets } = require("./Streets");
const { NeighborHoods } = require("./NeighborHoods");
const { AddressesTypes } = require("./AddressesTypes");


/**
 * class model
 */
class Addresses extends BaseTableModel {
  static ID = 2011;
  static model = null;
  static fields = {
    ...Addresses.getBaseTableModelFields(),...{                 
      IDADDRESSTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDNEIGHBORHOOD:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDSTREET:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDPOSTALCODE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      LATITUDE:{
        type: DataTypes.DECIMAL(18,10)
      },
      LONGITUDE:{
        type: DataTypes.DECIMAL(18,10)
      },
      NUMBER:{
        type: DataTypes.STRING(256)
      },
      COMPLEMENT:{
        type: DataTypes.STRING(2000)
      }
    }
  };
  
  static uniqueFields = [
    'IDADDRESSTYPE',
    Sequelize.literal(`(COALESCE(IDNEIGHBORHOOD,0))`),
    Sequelize.literal(`(COALESCE(IDSTREET,0))`),
    Sequelize.literal(`(COALESCE(IDPOSTALCODE,0))`),
    Sequelize.literal(`(COALESCE(LATITUDE,0))`),
    Sequelize.literal(`(COALESCE(LONGITUDE,0))`),
    Sequelize.literal(`(COALESCE(NUMBER,'NULL'))`)
  ];

  static constraints = [...(Addresses.getBaseTableModelConstraints() || []),...[
    {
      name: Addresses.name.toUpperCase() + '_U1',
      fields: [...Addresses.getBaseTableModelUniqueFields(),...Addresses.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDADDRESSTYPE'],
      type: 'foreign key',
      references: { 
          table: AddressesTypes,
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
    },
    {
      fields: ['IDPOSTALCODE'],
      type: 'foreign key',
      references: { 
          table: PostalCodes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Addresses}
