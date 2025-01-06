'use strict';


import { DataTypes } from "sequelize";
import  BaseExternalDataTableModel  from './BaseExternalDataTableModel.js';


/**
 * class model
 */
export default class Cnaes extends BaseExternalDataTableModel {

  //table fields
  declare id: number;
  declare name: string;


  static id = 60009;
  static tableName = this.name.toLowerCase();
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
    name: Cnaes.tableName + '_u1',
    fields: [...Cnaes.uniqueFields],
    type:"unique"
  }];

  static foreignsKeys = [];  
  
};

