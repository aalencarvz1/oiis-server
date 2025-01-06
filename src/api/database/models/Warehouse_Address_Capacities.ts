'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Warehouse_Addresses  from "./Warehouse_Addresses.js";
import  Measurement_Units  from "./Measurement_Units.js";
import  Identifier_Types  from "./Identifier_Types.js";

/**
 * class model
 */
export default class Warehouse_Address_Capacities extends BaseTableModel {

  //table fields
  declare warehouse_address_id: number;
  declare capacity_type_id: number;      
  declare measurement_unit_id: number;      
  declare capacity: number;
  declare observations: string;


  static id = 3007;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Warehouse_Address_Capacities.getBaseTableModelFields(),...{           
      warehouse_address_id:{
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
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'warehouse_address_id',
    'capacity_type_id'
  ];

  static constraints = [...(Warehouse_Address_Capacities.getBaseTableModelConstraints() || []),...[
    {
      name: Warehouse_Address_Capacities.tableName + '_u1',
      fields: [...Warehouse_Address_Capacities.getBaseTableModelUniqueFields(),...Warehouse_Address_Capacities.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['warehouse_address_id'],
      type: 'foreign key',
      references: { 
          table: Warehouse_Addresses,
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