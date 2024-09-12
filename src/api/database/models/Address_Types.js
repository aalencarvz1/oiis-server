'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Address_Types extends BaseTableModel {
  static id = 2007;
  static tableName = this.name.toLowerCase();
  static model = null;

  static RESIDENTIAL = 1;
  static BUSINESS = 2;

  static fields = {
    ...Address_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Address_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Address_Types.tableName + '_u1',
      fields: [...Address_Types.getBaseTableModelUniqueFields(),...Address_Types.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  

};


module.exports = {Address_Types}