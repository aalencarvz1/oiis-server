'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Routines from "./Routines.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Routine_Contents extends BaseTableModel {

  //table fields 
  declare routine_id: number;
  declare name: string;
  declare content: string;
  declare view_server_path: string;
  declare view_client_path: string;



  static id = 241;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Routine_Contents.getBaseTableModelFields(),...{     
      routine_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      }, 
      content: {
        type: DataTypes.TEXT
      },
      view_server_path: {
        type: DataTypes.TEXT
      },
      view_client_path: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [ 
    'routine_id',
    'name'
  ];

  static constraints = [...(Routine_Contents.getBaseTableModelConstraints() || []),...[
    {
      name: Routine_Contents.tableName + '_u1',
      fields: [...Routine_Contents.getBaseTableModelUniqueFields(),...Routine_Contents.uniqueFields],
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
        fields: ['routine_id'],
        type: 'foreign key',
        references: { 
            table: Routines,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
