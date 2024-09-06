'use strict';

/*imports*/
const { StatusRegs } = require("./StatusRegs");
const { BasePeopleModel } = require("./BasePeopleModel");

/**
 * class model
 */
class Companies extends BasePeopleModel {
  static id = 3000;
  static model = null;

  static #defaultCompany = null;

  static fields = {
    ...(Companies.getBaseTableModelFields() || {})
  };
  
  static uniqueFields = [];

  static constraints = [...(Companies.getBaseTableModelConstraints() || []),...[
    {
      name: Companies.name.toLowerCase() + '_u1',
      fields: [...Companies.getBaseTableModelUniqueFields(),...Companies.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.defaultPeopleForeignsKeys || [])];
  
  static async getDefaultCompany() {
    if (Companies.#defaultCompany == null) {
      Companies.#defaultCompany = await Companies.getModel().findOne({
        where:{
          status_reg_id : StatusRegs.ACTIVE
        }
      });
    }
    return Companies.#defaultCompany;
  }

};


module.exports = {Companies}