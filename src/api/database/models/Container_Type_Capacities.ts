'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';

import  Measurement_Units  from "./Measurement_Units.js";
import  Identifier_Types  from "./Identifier_Types.js";
import  Container_Types  from "./Container_Types.js";

/**
 * class model
 */
export default class Container_Type_Capacities extends BaseTableModel {

  //table fields
  declare container_type_id: number;
  declare capacity_type_id: number;      
  declare measurement_unit_id: number;      
  declare capacity: number;
  declare observations: string;



  static id = 8004;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Container_Type_Capacities.getBaseTableModelFields(),...{           
      container_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      capacity_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      measurement_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      capacity:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      observations:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'container_type_id',
    'capacity_type_id'
  ];

  static constraints = [...(Container_Type_Capacities.getBaseTableModelConstraints() || []),...[
    {
      name: Container_Type_Capacities.tableName + '_u1',
      fields: [...Container_Type_Capacities.getBaseTableModelUniqueFields(),...Container_Type_Capacities.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['container_type_id'],
      type: 'foreign key',
      references: { 
          table: Container_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['capacity_type_id'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['measurement_unit_id'],
      type: 'foreign key',
      references: { 
          table: Measurement_Units,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};