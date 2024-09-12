'use strict';

/*imports*/
const { Record_Status } = require("./Record_Status");
const { BasePeopleModel } = require("./BasePeopleModel");

/**
 * class model
 */
class Companies extends BasePeopleModel {
  static id = 3000;
  static tableName = this.name.toLowerCase();
  static model = null;

  static #defaultCompany = null;

  static fields = {
    ...(Companies.getBaseTableModelFields() || {})
  };
  
  static uniqueFields = [];

  static constraints = [...(Companies.getBaseTableModelConstraints() || []),...[
    {
      name: Companies.tableName + '_u1',
      fields: [...Companies.getBaseTableModelUniqueFields(),...Companies.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.defaultPeopleForeignsKeys || [])];
  
  static async getDefaultCompany() {
    if (Companies.#defaultCompany == null) {
      Companies.#defaultCompany = await Companies.getModel().findOne({
        where:{
          status_reg_id : Record_Status.ACTIVE
        }
      });
    }
    return Companies.#defaultCompany;
  }

};


module.exports = {Companies}