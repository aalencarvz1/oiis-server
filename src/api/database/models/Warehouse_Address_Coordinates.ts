'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Warehouse_Addresses  from "./Warehouse_Addresses.js";
import  Warehouse_Address_Types  from "./Warehouse_Address_Types.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Warehouse_Address_Coordinates extends BaseTableModel {

  //table fields
  declare warehouse_address_id: number;
  declare coordinate_type_id: number;      
  declare value: string;


  static id = 3005;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Warehouse_Address_Coordinates.getBaseTableModelFields(),...{           
      warehouse_address_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      coordinate_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      value:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'warehouse_address_id',
    'coordinate_type_id'
  ];

  static constraints = [...(Warehouse_Address_Coordinates.getBaseTableModelConstraints() || []),...[
    {
      name: Warehouse_Address_Coordinates.tableName + '_u1',
      fields: [...Warehouse_Address_Coordinates.getBaseTableModelUniqueFields(),...Warehouse_Address_Coordinates.uniqueFields],
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
      result = super.getForeignKeys();
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
        fields: ['coordinate_type_id'],
        type: 'foreign key',
        references: { 
            table: Warehouse_Address_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

};