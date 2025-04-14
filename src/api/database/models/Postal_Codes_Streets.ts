'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Streets  from "./Streets.js";
import  NeighborHoods  from "./NeighborHoods.js";
import  Postal_Codes  from "./Postal_Codes.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Postal_Codes_Streets extends BaseTableModel {

  //table fields
  declare postal_code_id: number;
  declare neighborhood_id: number;
  declare street_id: number;
  declare observations: string;


  static id = 2009;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Postal_Codes_Streets.getBaseTableModelFields(),...{                 
      postal_code_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      neighborhood_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      street_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'postal_code_id',
    'neighborhood_id',
    'street_id'
  ];

  static constraints = [...(Postal_Codes_Streets.getBaseTableModelConstraints() || []),...[
    {
      name: Postal_Codes_Streets.tableName + '_u1',
      fields: [...Postal_Codes_Streets.getBaseTableModelUniqueFields(),...Postal_Codes_Streets.uniqueFields],
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
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      let newAdjustedForeignKeys : boolean = true;
      let baseFks = this.getBaseTableModelForeignsKeys();
      for(let i = 0; i < baseFks.length; i++) {
        result.push(baseFks[i]);
        if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
      }       
      result.push({
        fields: ['postal_code_id'],
        type: 'foreign key',
        references: { 
            table: Postal_Codes,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['neighborhood_id'],
        type: 'foreign key',
        references: { 
            table: NeighborHoods,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['street_id'],
        type: 'foreign key',
        references: { 
            table: Streets,
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