'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { People } = require("./People");
const { AddressesTypes } = require("./AddressesTypes");
const { Addresses } = require("./Addresses");

/**
 * class model
 */
class PeopleXAddresses extends BaseTableModel {
  static ID = 2014;
  static model = null;
  static fields = {
    ...PeopleXAddresses.getBaseTableModelFields(),...{           
      IDPEOPLE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDADDRESSTYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDADDRESS:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      ORDERNUM:{
        type: DataTypes.BIGINT
      },
      OBSERVATIONS:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDPEOPLE',
    Sequelize.literal(`(COALESCE(IDADDRESSTYPE,0))`),
    'IDADDRESS'
  ];

  static constraints = [...(PeopleXAddresses.getBaseTableModelConstraints() || []),...[
    {
      name: PeopleXAddresses.name.toUpperCase() + '_U1',
      fields: [...PeopleXAddresses.getBaseTableModelUniqueFields(),...PeopleXAddresses.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDPEOPLE'],
      type: 'foreign key',
      references: { 
          table: People,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
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
      fields: ['IDADDRESS'],
      type: 'foreign key',
      references: { 
          table: Addresses,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
};


module.exports = {PeopleXAddresses}