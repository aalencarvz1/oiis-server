'use strict';


import Utils from "../../controllers/utils/Utils.js";
import  BasePeopleModel  from "./BasePeopleModel.js";

/**
 * class model
 */
export default class Suppliers extends BasePeopleModel {
  static id = 5000;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  

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


  static foreignsKeys : any[] = [];
    

};