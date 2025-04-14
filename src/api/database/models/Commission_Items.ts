'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Commission_Entitiy_Codes  from "./Commission_Entitiy_Codes.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Commission_Items extends BaseTableModel {

  //table fields
  declare commission_entity_code_id: number;
  declare name: string;
  declare description: string;



  static id = 9051;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Commission_Items.getBaseTableModelFields(),...{           
      commission_entity_code_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'commission_entity_code_id',
    'name'
  ];

  static constraints = [...(Commission_Items.getBaseTableModelConstraints() || []),...[
    {
      name: Commission_Items.tableName + '_u1',
      fields: [...Commission_Items.getBaseTableModelUniqueFields(),...Commission_Items.uniqueFields],
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
        fields: ['commission_entity_code_id'],
        type: 'foreign key',
        references: { 
            table: Commission_Entitiy_Codes,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
