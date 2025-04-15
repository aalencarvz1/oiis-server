'use strict';

import { DataTypes, Op } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import modules from "../catalogs/modules.js";
import Utils from "../../controllers/utils/Utils.js";




/**
 * class model
 */
export default class Modules extends BaseTableModel {

  //table fields
  declare name: string;
  declare icon: string;
  declare path: string;
  declare numeric_order: number;
  declare description: string;
  declare show_in_menu: number;



  static id = 230;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static WMS = modules.find((el) => el.name == "WMS")?.id;
  static LOGISTIC = modules.find((el) => el.name == "LOGISTIC")?.id;

  static fields = {
    ...Modules.getBaseTableModelFields(),...{     
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      }, 
      icon: {
        type: DataTypes.TEXT
      }, 
      path: {
        type: DataTypes.STRING(2000)
      },  
      numeric_order: {
        type: DataTypes.BIGINT.UNSIGNED
      },   
      description: {
        type: DataTypes.TEXT
      },
      show_in_menu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
    }
  };
  
  static uniqueFields = [ 
    'name'
  ];

  static constraints = [...(Modules.getBaseTableModelConstraints() || []),...[
    {
      name: Modules.tableName + '_u1',
      fields: [...Modules.getBaseTableModelUniqueFields(),...Modules.uniqueFields],
      type:"unique"
    },{
      name: Modules.tableName + '_c_1',
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

