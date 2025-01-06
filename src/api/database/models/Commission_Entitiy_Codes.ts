'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Tables  from "./Tables.js";


/**
 * class model
 */
export default class Commission_Entitiy_Codes extends BaseTableModel {

  //table fields
  declare table_entity_id: number;
  declare record_entity_id: number;
  declare name: string;
  declare description: string;
  declare minimal_value: number;





  static id = 9050;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Commission_Entitiy_Codes.getBaseTableModelFields(),...{                 
      table_entity_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
      },
      record_entity_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description:{
        type: DataTypes.TEXT
      },
      minimal_value:{
        type: DataTypes.DECIMAL(32,10)
      }
    }
  };
  
  static uniqueFields = [
    'table_entity_id',
    'record_entity_id',
    'name'
  ];

  static constraints = [...(Commission_Entitiy_Codes.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['table_entity_id'],
    type: 'foreign key',
    references: { 
        table: Tables,
        field: 'id'
    },
    onUpdate: 'cascade'
  }]];

};