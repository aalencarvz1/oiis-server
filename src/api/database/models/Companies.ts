'use strict';


import  Record_Status  from "./Record_Status.js";
import  BasePeopleModel  from "./BasePeopleModel.js";

/**
 * class model
 */
export default class Companies extends BasePeopleModel {
  static id = 3000;
  static tableName = this.name.toLowerCase();
  

  static #defaultCompany : any = null;

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
      Companies.#defaultCompany = await Companies.findOne({
        where:{
          status_reg_id : Record_Status.ACTIVE
        }
      });
    }
    return Companies.#defaultCompany;
  }

};