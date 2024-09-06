'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class ContactsTypes extends BaseTableModel {
  static id = 2012;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...ContactsTypes.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(ContactsTypes.getBaseTableModelConstraints() || []),...[
    {
      name: ContactsTypes.tableName + '_u1',
      fields: [...ContactsTypes.getBaseTableModelUniqueFields(),...ContactsTypes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {ContactsTypes}