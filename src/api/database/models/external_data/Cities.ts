'use strict';


import { DataTypes } from "sequelize";
import  BaseExternalDataTableModel  from './BaseExternalDataTableModel.js';
import Utils from "../../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Cities extends BaseExternalDataTableModel {

  //table fields
  declare id: number;
  declare name: string;


  static id = 60007;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;

  static fields = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey:true
    },
    name:{
      type: DataTypes.STRING(4000),
      allowNull:false
    }
  };
  
  static uniqueFields = [
    'id'
  ];  

  static constraints = [{
    name: Cities.tableName + '_u1',
    fields: [...Cities.uniqueFields],
    type:"unique"
  }];

  static foreignsKeys : any[] = [];
  

};

