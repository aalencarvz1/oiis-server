'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { ContactsTypes } = require("./ContactsTypes");

/**
 * class model
 */
class Contacts extends BaseTableModel {
  static id = 2013;
  static model = null;
  static fields = {
    ...Contacts.getBaseTableModelFields(),...{           
      IDCONTACTTYPE:{
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
    'IDCONTACTTYPE',
    'name'
  ];

  static constraints = [...(Contacts.getBaseTableModelConstraints() || []),...[
    {
      name: Contacts.name.toLowerCase() + '_u1',
      fields: [...Contacts.getBaseTableModelUniqueFields(),...Contacts.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDCONTACTTYPE'],
      type: 'foreign key',
      references: { 
          table: ContactsTypes,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Contacts}