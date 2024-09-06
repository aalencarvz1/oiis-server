'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { People } = require("./People");
const { ContactsTypes } = require("./ContactsTypes");
const { Contacts } = require("./Contacts");

/**
 * class model
 */
class PeopleXContacts extends BaseTableModel {
  static id = 2015;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...PeopleXContacts.getBaseTableModelFields(),...{           
      IDPEOPLE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDCONTACTTYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDCONTACT:{
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
    Sequelize.literal(`(COALESCE(IDCONTACTTYPE,0))`),
    'IDCONTACT'
  ];

  static constraints = [...(PeopleXContacts.getBaseTableModelConstraints() || []),...[
    {
      name: PeopleXContacts.tableName + '_u1',
      fields: [...PeopleXContacts.getBaseTableModelUniqueFields(),...PeopleXContacts.uniqueFields],
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
      fields: ['IDCONTACTTYPE'],
      type: 'foreign key',
      references: { 
          table: ContactsTypes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCONTACT'],
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


module.exports = {PeopleXContacts}