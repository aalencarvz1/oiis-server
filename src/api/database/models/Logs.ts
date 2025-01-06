'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";



/**
 * class model
 */
export default class Logs extends BaseTableModel {

  //table fields
  declare id: number;
  declare process_name: string;
  declare values_names: string;


  static tableName = this.name.toLowerCase();
    
  static fields = {
    id: {
      type : DataTypes.BIGINT.UNSIGNED,                
      autoIncrement : true,
      primaryKey: true,               
      allowNull: false 
    },
    process_name: {
      type: DataTypes.STRING(256),
      allowNull: true
    },    
    values_names: {
      type: DataTypes.STRING(2000),
      allowNull: true
    }
  };
  static constraints = [];

};
