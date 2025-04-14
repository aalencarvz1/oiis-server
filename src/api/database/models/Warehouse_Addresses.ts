'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Identifier_Types  from "./Identifier_Types.js";
import  Warehouse_Address_Types  from "./Warehouse_Address_Types.js";
import  Warehouses  from "./Warehouses.js";
import  Form_Types  from "./Form_Types.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Warehouse_Addresses extends BaseTableModel {

  //table fields
  declare warehouse_id: number;
  declare warehouse_address_type_id: number;
  declare identifier_type_id: number;
  declare identifier: string;
  declare form_type_id: number;
  declare is_storable: number;
  declare is_passable: number;
  declare is_disponible: number;
  declare observations: string;


  static id = 3004;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Warehouse_Addresses.getBaseTableModelFields(),...{           
      warehouse_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      warehouse_address_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      form_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      is_storable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      is_passable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_disponible: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      observations:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'warehouse_id',
    'identifier'
  ];

  static constraints = [...(Warehouse_Addresses.getBaseTableModelConstraints() || []),...[
    {
      name: Warehouse_Addresses.tableName + '_u1',
      fields: [...Warehouse_Addresses.getBaseTableModelUniqueFields(),...Warehouse_Addresses.uniqueFields],
      type:"unique"
    },{
      name: Warehouse_Addresses.tableName + '_c_1',
      fields:['is_storable'],
      type:"check",
      where:{
        is_storable: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Warehouse_Addresses.tableName + '_c_2',
      fields:['is_passable'],
      type:"check",
      where:{
        is_passable: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Warehouse_Addresses.tableName + '_c_3',
      fields:['is_disponible'],
      type:"check",
      where:{
        is_disponible: {
              [Op.in]: [0,1]
          }
      }
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
      result.push({
        fields: ['warehouse_id'],
        type: 'foreign key',
        references: { 
            table: Warehouses,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['warehouse_address_type_id'],
        type: 'foreign key',
        references: { 
            table: Warehouse_Address_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['identifier_type_id'],
        type: 'foreign key',
        references: { 
            table: Identifier_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['form_type_id'],
        type: 'foreign key',
        references: { 
            table: Form_Types,
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