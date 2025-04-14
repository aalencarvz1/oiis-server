'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  People  from "./People.js";
import  Address_Types  from "./Address_Types.js";
import  Addresses  from "./Addresses.js";

/**
 * class model
 */
export default class People_Addresses extends BaseTableModel {

  //table fields
  declare people_id: number;
  declare address_type_id: number;
  declare address_id: number;
  declare numeric_order: number;
  declare observations: string;


  static id = 2014;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...People_Addresses.getBaseTableModelFields(),...{           
      people_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      address_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      address_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      numeric_order:{
        type: DataTypes.BIGINT
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'people_id',
    Sequelize.literal(`(COALESCE(address_type_id,0))`),
    'address_id'
  ];

  static constraints = [...(People_Addresses.getBaseTableModelConstraints() || []),...[
    {
      name: People_Addresses.tableName + '_u1',
      fields: [...People_Addresses.getBaseTableModelUniqueFields(),...People_Addresses.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['people_id'],
      type: 'foreign key',
      references: { 
          table: People,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['address_type_id'],
      type: 'foreign key',
      references: { 
          table: Address_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['address_id'],
      type: 'foreign key',
      references: { 
          table: Addresses,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
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