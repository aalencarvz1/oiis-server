'use strict';

import { DataTypes } from "sequelize";
import  BasePeopleModel  from "./BasePeopleModel.js";
import  Companies  from "./Companies.js";
/**
 * class model
 */
export default class Warehouses extends BasePeopleModel {

  //table fields
  declare company_id : number;


  static id = 3002;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...(Warehouses.getBaseTableModelFields() || {}),
    ...{           
      company_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Warehouses.getBaseTableModelConstraints() || []),...[
    {
      name: Warehouses.tableName + '_u1',
      fields: [...Warehouses.getBaseTableModelUniqueFields(),...Warehouses.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.defaultPeopleForeignsKeys||[] || []),...[
    {
      fields: ['company_id'],
      type: 'foreign key',
      references: { 
          table: Companies,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};