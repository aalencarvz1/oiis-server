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

  static constraints = [...(People_X_Addresses.getBaseTableModelConstraints() || []),...[
    {
      name: People_X_Addresses.tableName + '_u1',
      fields: [...People_X_Addresses.getBaseTableModelUniqueFields(),...People_X_Addresses.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDPEOPLE'],
      type: 'foreign key',
      references: { 
          table: People,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['IDADDRESSTYPE'],
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