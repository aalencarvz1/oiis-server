'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";



/**
 * class model
 */
export default class Container_Types extends BaseTableModel {

  //table fields
  declare name: string;
  declare sigla: string;
  declare tara: number;
  declare description: string;


  static id = 8002;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static NO_CONTEINER = 1;
  static PALLET = 2;

  static fields = {
    ...Container_Types.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      sigla: {
        type: DataTypes.STRING(10)
      },
      tara: {
        type: DataTypes.DECIMAL(32,10)
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name',
    Sequelize.literal(`(COALESCE(sigla,'NULL'))`)
  ];

  static constraints = [...(Container_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Container_Types.tableName + '_u1',
      fields: [...Container_Types.getBaseTableModelUniqueFields(),...Container_Types.uniqueFields],
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