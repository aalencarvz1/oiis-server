'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { People } = require("./People");
const { Address_Types } = require("./Address_Types");
const { Addresses } = require("./Addresses");

/**
 * class model
 */
class People_X_Addresses extends BaseTableModel {
  static id = 2014;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...People_X_Addresses.getBaseTableModelFields(),...{           
      people_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      address_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDADDRESS:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      numeric_order:{
        type: DataTypes.BIGINT
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'people_id',
    Sequelize.literal(`(COALESCE(address_type_id,0))`),
    'IDADDRESS'
  ];

  static constraints = [...(People_X_Addresses.getBaseTableModelConstraints() || []),...[
    {
      name: People_X_Addresses.tableName + '_u1',
      fields: [...People_X_Addresses.getBaseTableModelUniqueFields(),...People_X_Addresses.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['people_id'],
      type: 'foreign key',
      references: { 
          table: People,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
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
      fields: ['IDADDRESS'],
      type: 'foreign key',
      references: { 
          table: Addresses,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
};


module.exports = {People_X_Addresses}