'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';

import  Continents  from "./Continents.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Countries extends BaseTableModel {

  //table fields
  declare continent_id: number;
  declare name: string;
  declare sigla: string;



  static id = 2001;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Countries.getBaseTableModelFields(),...{           
      continent_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      sigla:{
        type: DataTypes.STRING(10)
      }
    }
  };
  
  static uniqueFields = [
    'continent_id',
    'name'
  ];

  static constraints = [...(Countries.getBaseTableModelConstraints() || []),...[
    {
      name: Countries.tableName + '_u1',
      fields: [...Countries.getBaseTableModelUniqueFields(),...Countries.uniqueFields],
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
      result = [];
      let newAdjustedForeignKeys : boolean = true;
      let baseFks = this.getBaseTableModelForeignsKeys();
      for(let i = 0; i < baseFks.length; i++) {
        result.push(baseFks[i]);
        if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
      }        
      result.push({
        fields: ['continent_id'],
        type: 'foreign key',
        references: { 
            table: Continents,
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