'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class AddressesTypes extends BaseTableModel {
  static id = 2007;
  static model = null;

  static RESIDENTIAL = 1;
  static BUSINESS = 2;

  static fields = {
    ...AddressesTypes.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(AddressesTypes.getBaseTableModelConstraints() || []),...[
    {
      name: AddressesTypes.name.toLowerCase() + '_u1',
      fields: [...AddressesTypes.getBaseTableModelUniqueFields(),...AddressesTypes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  

};


module.exports = {AddressesTypes}