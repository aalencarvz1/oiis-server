'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Warehouse_Addresses  from "./Warehouse_Addresses.js";
import  Measurement_Units  from "./Measurement_Units.js";
import  Identifier_Types  from "./Identifier_Types.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Warehouse_Address_Dimensions extends BaseTableModel {

  //table fields
  declare warehouse_address_id: number;
  declare dimension_type_id: number;      
  declare measurement_unit_id: number;      
  declare value: number;
  declare observations: string;


  static id = 3006;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Warehouse_Address_Dimensions.getBaseTableModelFields(),...{           
      warehouse_address_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      dimension_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      measurement_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      value:{
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
    'warehouse_address_id',
    'dimension_type_id'
  ];

  static constraints = [...(Warehouse_Address_Dimensions.getBaseTableModelConstraints() || []),...[
    {
      name: Warehouse_Address_Dimensions.tableName + '_u1',
      fields: [...Warehouse_Address_Dimensions.getBaseTableModelUniqueFields(),...Warehouse_Address_Dimensions.uniqueFields],
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
        fields: ['warehouse_address_id'],
        type: 'foreign key',
        references: { 
            table: Warehouse_Addresses,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['dimension_type_id'],
        type: 'foreign key',
        references: { 
            table: Identifier_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['measurement_unit_id'],
        type: 'foreign key',
        references: { 
            table: Measurement_Units,
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