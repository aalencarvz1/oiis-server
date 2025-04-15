'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Movements  from "./Movements.js";
import  Stock_Entities  from "./Stock_Entities.js";
import  Movement_Entity_Relationship_Types  from "./Movement_Entity_Relationship_Types.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Movements_Entities extends BaseTableModel {

  //table fields
  declare mov_id: number;
  declare movement_relationship_type_id: number;
  declare stock_entity_id: number;
  declare numeric_order: number;
  declare precedence: number;
  declare observations: string;


  static id = 9021;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Movements_Entities.getBaseTableModelFields(),...{                 
      mov_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      movement_relationship_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      stock_entity_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      numeric_order:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      precedence:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      observations:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'mov_id',
    'movement_relationship_type_id',
    'stock_entity_id'
  ];

  static constraints = [...(Movements_Entities.getBaseTableModelConstraints() || []),...[
    {
      name: Movements_Entities.tableName + '_u1',
      fields: [...Movements_Entities.getBaseTableModelUniqueFields(),...Movements_Entities.uniqueFields],
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
    //Utils.logi(this.name,'getForeignKeys');
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
        fields: ['mov_id'],
        type: 'foreign key',
        references: { 
            table: Movements,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      result.push({
        fields: ['movement_relationship_type_id'],
        type: 'foreign key',
        references: { 
            table: Movement_Entity_Relationship_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['stock_entity_id'],
        type: 'foreign key',
        references: { 
            table: Stock_Entities,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      this.adjustedForeignKeys = newAdjustedForeignKeys;
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }


  /**
   * static initializer block
   */
  static {
    //Utils.logi(this.name,'STATIC');
    this.foreignsKeys = this.getForeignKeys();
    //Utils.logf(this.name,'STATIC');
  }
     
};