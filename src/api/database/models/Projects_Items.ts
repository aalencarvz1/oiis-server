'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Projects_Items_Types  from "./Projects_Items_Types.js";
import Project_Item_Origin_Types from "./Project_Item_Origin_Types.js";

/**
 * class model
 */
export default class Projects_Items extends BaseTableModel {

  //table fields
  declare project_item_type_id: number;
  declare project_item_origin_id: number;
  declare identifier: string;
  declare name: string;
  declare description: string;
  declare notes: string;


  static id = 15010;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static accessLevel = 2;

  static fields = {
    ...Projects_Items.getBaseTableModelFields(),...{            
      project_item_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: Projects_Items_Types.REQUIREMENTS
      },       
      project_item_origin_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: Project_Item_Origin_Types.USER
      },       
      identifier: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT
      },
      notes: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'project_item_type_id',
    'identifier',
  ];

  static constraints = [...(Projects_Items.getBaseTableModelConstraints() || []),...[{
    name: Projects_Items.tableName + '_u1',
    fields: [...Projects_Items.getBaseTableModelUniqueFields(),...Projects_Items.uniqueFields],
    type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
      fields: ['project_item_type_id'],
      type: 'foreign key',
      references: { 
          table: Projects_Items_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['project_item_origin_id'],
      type: 'foreign key',
      references: { 
          table: Project_Item_Origin_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
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