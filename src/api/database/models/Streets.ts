'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Cities  from "./Cities.js";
import  Street_Types  from "./Street_Types.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Streets extends BaseTableModel {

  //table fields
  declare street_type_id: number;
  declare city_id: number;
  declare name: string;


  static id = 2006;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Streets.getBaseTableModelFields(),...{           
      street_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue: Street_Types.STREET
      },
      city_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'street_type_id',
    'city_id',
    'name'
  ];

  static constraints = [...(Streets.getBaseTableModelConstraints() || []),...[
    {
      name: Streets.tableName + '_u1',
      fields: [...Streets.getBaseTableModelUniqueFields(),...Streets.uniqueFields],
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
      result = [];
      let newAdjustedForeignKeys : boolean = true;
      let baseFks = this.getBaseTableModelForeignsKeys();
      for(let i = 0; i < baseFks.length; i++) {
        result.push(baseFks[i]);
        if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
      }  
      result.push({
        fields: ['street_type_id'],
        type: 'foreign key',
        references: { 
            table: Street_Types,
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
    return result;
  }


  /**
   * static initializer block
   */
  static {
    this.foreignsKeys = this.getForeignKeys();
  }
     
};