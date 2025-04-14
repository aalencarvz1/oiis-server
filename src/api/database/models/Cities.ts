'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  States  from "./States.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Cities extends BaseTableModel {

  //table fields
  declare state_id: number;
  declare name: string;
  declare sigla: string;
  declare population: number;
  declare latitude: number;
  declare longitude: number;



  static id = 2003;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Cities.getBaseTableModelFields(),...{           
      state_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      sigla:{
        type: DataTypes.STRING(10)
      },
      population:{
        type: DataTypes.INTEGER
      },
      latitude:{
        type: DataTypes.DECIMAL(18,10)
      },
      longitude:{
        type: DataTypes.DECIMAL(18,10)
      }
    }
  };
  
  static uniqueFields = [
    'state_id',
    'name'
  ];

  static constraints = [...(Cities.getBaseTableModelConstraints() || []),...[
    {
      name: Cities.tableName + '_u1',
      fields: [...Cities.getBaseTableModelUniqueFields(),...Cities.uniqueFields],
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
        fields: ['state_id'],
        type: 'foreign key',
        references: { 
            table: States,
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