'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Utils from "../../controllers/utils/Utils.js";



/**
 * class model
 */
export default class Logs extends BaseTableModel {

  //table fields
  declare id: number;
  declare process_name: string;
  declare values_names: string;


  static tableName = this.name.toLowerCase();


  private static adjustedForeignKeys : boolean = false;
    
  static fields = {
    id: {
      type : DataTypes.BIGINT.UNSIGNED,                
      autoIncrement : true,
      primaryKey: true,               
      allowNull: false 
    },
    process_name: {
      type: DataTypes.STRING(256)
    },    
    values_names: {
      type: DataTypes.STRING(2000)
    }
  };
  static constraints = [];

  /**
   * get the foreign keys avoiding ciclyc imports on BaseTableModel
   * @override
   * @created 2025-04-14
   * @version 1.0.0
   */
  static getForeignKeys(): any[] {
      //Utils.logi(this.name,'getForeignKeys');
      return [];
  }  
};
