'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Cities  from "./Cities.js";
import  Address_Types  from "./Address_Types.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Postal_Codes extends BaseTableModel {

  //table fields
  declare postal_code: string;
  declare address_type_id: number;
  declare city_id: number;
  declare complement: string;

  
  static id = 2008;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Postal_Codes.getBaseTableModelFields(),...{           
      postal_code:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      address_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      city_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      complement:{
        type: DataTypes.STRING(2000)
      }
    }
  };
  
  static uniqueFields = [
    'postal_code',
    'address_type_id',
    'city_id'
  ];

  static constraints = [...(Postal_Codes.getBaseTableModelConstraints() || []),...[
    {
      name: Postal_Codes.tableName + '_u1',
      fields: [...Postal_Codes.getBaseTableModelUniqueFields(),...Postal_Codes.uniqueFields],
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
      result.push( {
        fields: ['address_type_id'],
        type: 'foreign key',
        references: { 
            table: Address_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['city_id'],
        type: 'foreign key',
        references: { 
            table: Cities,
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