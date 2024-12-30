'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Movements  from "./Movements.js";
import  Stock_Entities  from "./Stock_Entities.js";
import  Movement_Entity_Relationship_Types  from "./Movement_Entity_Relationship_Types.js";

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

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['mov_id'],
      type: 'foreign key',
      references: { 
          table: Movements,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['movement_relationship_type_id'],
      type: 'foreign key',
      references: { 
          table: Movement_Entity_Relationship_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['stock_entity_id'],
      type: 'foreign key',
      references: { 
          table: Stock_Entities,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};