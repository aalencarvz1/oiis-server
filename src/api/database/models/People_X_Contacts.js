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
class People_X_Contacts extends BaseTableModel {
  static id = 2015;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...People_X_Contacts.getBaseTableModelFields(),...{           
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

  static constraints = [...(People_X_Contacts.getBaseTableModelConstraints() || []),...[
    {
      name: People_X_Contacts.tableName + '_u1',
      fields: [...People_X_Contacts.getBaseTableModelUniqueFields(),...People_X_Contacts.uniqueFields],
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
          table: Contact_Types,
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


module.exports = {People_X_Contacts}