'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Requirements_Types  from "./Requirements_Types.js";
import  Projects_Items  from "./Projects_Items.js";
import  Utils  from "../../controllers/utils/Utils.js";



/**
 * class model
 */
export default class Requirements extends BaseTableModel {

  //table fields
  declare project_item_id: number;
  declare requirement_type_id: number;


  static id = 15020;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Requirements.getBaseTableModelFields(),...{            
      project_item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },    
      requirement_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue: Requirements_Types.FUNCTIONAL
      }
    }
  };
  
  static uniqueFields = [
    'project_item_id'
  ];

  static constraints = [...(Requirements.getBaseTableModelConstraints() || []),...[
    {
      name: Requirements.tableName + '_u1',
      fields: [...Requirements.getBaseTableModelUniqueFields(),...Requirements.uniqueFields],
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
        fields: ['project_item_id'],
        type: 'foreign key',
        references: { 
            table: Projects_Items,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      result.push({
        fields: ['requirement_type_id'],
        type: 'foreign key',
        references: { 
            table: Requirements_Types,
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