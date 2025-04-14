'use strict';


import { DataTypes } from "sequelize";
import  Companies  from "./Companies.js";
import  BasePeopleModel  from "./BasePeopleModel.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Business_Units extends BasePeopleModel {

  //table fiedls
  declare company_id : number;


  static id = 3001;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...(Business_Units.getBaseTableModelFields() || {}),
    ...{           
      company_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Business_Units.getBaseTableModelConstraints() || []),...[
    {
      name: Business_Units.tableName + '_u1',
      fields: [...Business_Units.getBaseTableModelUniqueFields(),...Business_Units.uniqueFields],
      type:"unique"
    }
  ]];


  static foreignsKeys : any[] = [];
    

  /**
   * get the foreign keys avoiding ciclyc imports on BaseTableModel
   * @override
   * @created 2025-04-14
   * @version 1.0.0
   */
  static getForeignKeys(): any[] {
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      let newAdjustedForeignKeys : boolean = true;
      let baseFks = this.getBaseTableModelForeignsKeys();
      for(let i = 0; i < baseFks.length; i++) {
        result.push(baseFks[i]);
        if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
      }        
      result.push({
        fields: ['company_id'],
        type: 'foreign key',
        references: { 
            table: Companies,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      this.adjustedForeignKeys = newAdjustedForeignKeys;
    }
    return result;
  }


  /**
   * static initializer block
   */
  static {
    this.foreignsKeys = this.getForeignKeys();
  }
   
  
};