'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class AddressTypes extends BaseTableModel {
  static id = 2007;
  static tableName = "address_types";
  static model = null;

  static RESIDENTIAL = 1;
  static BUSINESS = 2;

  static fields = {
    ...AddressTypes.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(AddressTypes.getBaseTableModelConstraints() || []),...[
    {
      name: AddressTypes.tableName + '_u1',
      fields: [...AddressTypes.getBaseTableModelUniqueFields(),...AddressTypes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  

};


module.exports = {AddressTypes}