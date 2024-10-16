'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { People } = require("./People");
const { Contact_Types } = require("./Contact_Types");
const { Contacts } = require("./Contacts");

/**
 * class model
 */
class People_Contacts extends BaseTableModel {
  static id = 2015;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...People_Contacts.getBaseTableModelFields(),...{           
      people_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      contact_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      contact_id:{
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
    Sequelize.literal(`(COALESCE(contact_type_id,0))`),
    'contact_id'
  ];

  static constraints = [...(People_Contacts.getBaseTableModelConstraints() || []),...[
    {
      name: People_Contacts.tableName + '_u1',
      fields: [...People_Contacts.getBaseTableModelUniqueFields(),...People_Contacts.uniqueFields],
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
      fields: ['contact_type_id'],
      type: 'foreign key',
      references: { 
          table: Contact_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['contact_id'],
      type: 'foreign key',
      references: { 
          table: Contacts,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};


module.exports = {People_Contacts}