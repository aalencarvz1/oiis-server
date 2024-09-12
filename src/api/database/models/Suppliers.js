'use strict';

/*imports*/
const { BasePeopleModel } = require("./BasePeopleModel");

/**
 * class model
 */
class Suppliers extends BasePeopleModel {
  static id = 5000;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...(Suppliers.getBaseTableModelFields() || {})
  };
  
  static uniqueFields = [];

  static constraints = [...(Suppliers.getBaseTableModelConstraints() || []),...[
    {
      name: Suppliers.tableName + '_u1',
      fields: [...Suppliers.getBaseTableModelUniqueFields(),...Suppliers.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.defaultPeopleForeignsKeys || [])];
  
};


module.exports = {Suppliers}