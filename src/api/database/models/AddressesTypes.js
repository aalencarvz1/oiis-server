'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class AddressesTypes extends BaseTableModel {
  static ID = 2007;
  static model = null;

  static RESIDENTIAL = 1;
  static BUSINESS = 2;

  static fields = {
    ...AddressesTypes.getBaseTableModelFields(),...{           
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(AddressesTypes.getBaseTableModelConstraints() || []),...[
    {
      name: AddressesTypes.name.toUpperCase() + '_U1',
      fields: [...AddressesTypes.getBaseTableModelUniqueFields(),...AddressesTypes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  

};


module.exports = {AddressesTypes}