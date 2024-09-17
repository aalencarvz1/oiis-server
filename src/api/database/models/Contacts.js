'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Contact_Types } = require("./Contact_Types");

/**
 * class model
 */
class Contacts extends BaseTableModel {
  static id = 2013;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Contacts.getBaseTableModelFields(),...{           
      contact_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'contact_type_id',
    'name'
  ];

  static constraints = [...(Contacts.getBaseTableModelConstraints() || []),...[
    {
      name: Contacts.tableName + '_u1',
      fields: [...Contacts.getBaseTableModelUniqueFields(),...Contacts.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['contact_type_id'],
      type: 'foreign key',
      references: { 
          table: Contact_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Contacts}