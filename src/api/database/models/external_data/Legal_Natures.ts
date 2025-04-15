'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseExternalDataTableModel  from './BaseExternalDataTableModel.js';
import Utils from "../../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Legal_Natures extends BaseExternalDataTableModel {

  //table fields
  declare id: number;
  declare name: string;

  
  static id = 60011;
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
    name: Legal_Natures.tableName + '_u1',
    fields: [...Legal_Natures.uniqueFields],
    type:"unique"
  }];

  static foreignsKeys : any[] = [];
    
};

