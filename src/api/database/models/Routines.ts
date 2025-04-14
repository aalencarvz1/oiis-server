'use strict';

import { DataTypes, Op } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Routine_Types from "./Routine_Types.js";
import Modules from "./Modules.js";
import Utils from "../../controllers/utils/Utils.js";



/**
 * class model
 */
export default class Routines extends BaseTableModel {

  //table fields
  declare routine_type_id: number;
  declare module_id: number;
  declare name: string;
  declare icon: string; 
  declare view_path: string; 
  declare numeric_order: number;
  declare show_in_menu: number;
  declare description: string;


  static id = 240;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Routines.getBaseTableModelFields(),...{     
      routine_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      module_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      }, 
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      }, 
      icon: {
        type: DataTypes.TEXT
      }, 
      view_path: {
        type: DataTypes.TEXT
      }, 
      numeric_order: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      show_in_menu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [ 
    'module_id',
    'name'
  ];

  static constraints = [...(Routines.getBaseTableModelConstraints() || []),...[
    {
      name: Routines.tableName + '_u1',
      fields: [...Routines.getBaseTableModelUniqueFields(),...Routines.uniqueFields],
      type:"unique"
    },{
      name: Routines.tableName + '_c_1',
      fields:['show_in_menu'],
      type:"check",
      where:{
        show_in_menu: {
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
        fields: ['routine_type_id'],
        type: 'foreign key',
        references: { 
            table: Routine_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['module_id'],
        type: 'foreign key',
        references: { 
            table: Modules,
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
