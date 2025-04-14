'use strict';

import { Sequelize, DataTypes, Op } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Utils from "../../controllers/utils/Utils.js";




/**
 * class model
 */
export default class Access_Profiles extends BaseTableModel {

  //table fields
  declare name: string;
  declare description: string;
  declare allow_access_to_all_module_routines: number;



  static id = 119;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static SYSTEM = 1;
  static DEFAULT = 2;
  static ADMINISTRATIVE = 3;
  static GERENCIAL = 4;
  static SUPERVISOR = 5;
  static HUMAN_RESOURCES = 6;
  static INVOICING = 10;
  static FINANCIAL = 20;  
  static SELLER = 50;  
  static SUPLIER = 60;  

  static fields = {
    ...Access_Profiles.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT
      },
      allow_access_to_all_module_routines: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];  

  static constraints = [...(Access_Profiles.getBaseTableModelConstraints() || []),...[
    {
      name: Access_Profiles.tableName + '_u1',
      fields: [...Access_Profiles.getBaseTableModelUniqueFields(),...Access_Profiles.uniqueFields],
      type:"unique"
    },{
      name: Access_Profiles.tableName + '_c_1',
      fields:['allow_access_to_all_module_routines'],
      type:"check",
      where:{
        allow_access_to_all_module_routines: {
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
