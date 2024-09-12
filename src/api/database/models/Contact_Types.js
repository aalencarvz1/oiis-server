'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Contact_Types extends BaseTableModel {
  static id = 2012;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Contact_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Contact_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Contact_Types.tableName + '_u1',
      fields: [...Contact_Types.getBaseTableModelUniqueFields(),...Contact_Types.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Contact_Types}