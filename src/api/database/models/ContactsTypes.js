'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class ContactsTypes extends BaseTableModel {
  static ID = 2012;
  static model = null;
  static fields = {
    ...ContactsTypes.getBaseTableModelFields(),...{           
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(ContactsTypes.getBaseTableModelConstraints() || []),...[
    {
      name: ContactsTypes.name.toUpperCase() + '_U1',
      fields: [...ContactsTypes.getBaseTableModelUniqueFields(),...ContactsTypes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {ContactsTypes}