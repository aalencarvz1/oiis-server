'use strict';

import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Lots  from "./Lots.js";
import  Items  from "./Items.js";
import  Containers  from "./Containers.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Items_Lots_Containers extends BaseTableModel {

  //table fields
  declare item_id: number;
  declare lot_id: number;
  declare container_id: number;
  declare observations: string;



  static id = 8020;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static WITHOUT_CONTEINER = 1;

  static fields = {
    ...Items_Lots_Containers.getBaseTableModelFields(),...{           
      item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      lot_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      container_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'item_id',
    'lot_id',
    'container_id'
  ];

  static constraints = [...(Items_Lots_Containers.getBaseTableModelConstraints() || []),...[
    {
      name: Items_Lots_Containers.tableName + '_u1',
      fields: [...Items_Lots_Containers.getBaseTableModelUniqueFields(),...Items_Lots_Containers.uniqueFields],
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
        fields: ['item_id'],
        type: 'foreign key',
        references: { 
            table: Items,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['lot_id'],
        type: 'foreign key',
        references: { 
            table: Lots,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['container_id'],
        type: 'foreign key',
        references: { 
            table: Containers,
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