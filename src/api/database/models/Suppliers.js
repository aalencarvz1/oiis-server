'use strict';

/*imports*/
const { BasePeopleModel } = require("./BasePeopleModel");

/**
 * class model
 */
class Suppliers extends BasePeopleModel {
  static ID = 5000;
  static model = null;

  static fields = {
    ...(Suppliers.getBaseTableModelFields() || {})
  };
  
  static uniqueFields = [];

  static constraints = [...(Suppliers.getBaseTableModelConstraints() || []),...[
    {
      name: Suppliers.name.toUpperCase() + '_U1',
      fields: [...Suppliers.getBaseTableModelUniqueFields(),...Suppliers.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.defaultPeopleForeignsKeys || [])];
  
};


module.exports = {Suppliers}