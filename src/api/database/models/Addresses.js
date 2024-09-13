'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Postal_Codes } = require("./Postal_Codes");
const { Streets } = require("./Streets");
const { NeighborHoods } = require("./NeighborHoods");
const { Address_Types } = require("./Address_Types");


/**
 * class model
 */
class Addresses extends BaseTableModel {
  static id = 2011;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Addresses.getBaseTableModelFields(),...{                 
      address_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      neighborhood_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      street_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      postal_code_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      latitude:{
        type: DataTypes.DECIMAL(18,10)
      },
      longitude:{
        type: DataTypes.DECIMAL(18,10)
      },
      number:{
        type: DataTypes.STRING(256)
      },
      complement:{
        type: DataTypes.STRING(2000)
      }
    }
  };
  
  static uniqueFields = [
    'address_type_id',
    Sequelize.literal(`(COALESCE(neighborhood_id,0))`),
    Sequelize.literal(`(COALESCE(street_id,0))`),
    Sequelize.literal(`(COALESCE(postal_code_id,0))`),
    Sequelize.literal(`(COALESCE(latitude,0))`),
    Sequelize.literal(`(COALESCE(longitude,0))`),
    Sequelize.literal(`(COALESCE(number,'NULL'))`)
  ];

  static constraints = [...(Addresses.getBaseTableModelConstraints() || []),...[
    {
      name: Addresses.tableName + '_u1',
      fields: [...Addresses.getBaseTableModelUniqueFields(),...Addresses.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['address_type_id'],
      type: 'foreign key',
      references: { 
          table: Address_Types,
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
    },
    {
      fields: ['postal_code_id'],
      type: 'foreign key',
      references: { 
          table: Postal_Codes,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Addresses}
