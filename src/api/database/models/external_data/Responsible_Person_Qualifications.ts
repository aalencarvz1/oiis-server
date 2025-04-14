'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseExternalDataTableModel  from './BaseExternalDataTableModel.js';


/**
 * class model
 */
export default class Responsible_Person_Qualifications extends BaseExternalDataTableModel {

  //table fields
  declare id: number;
  declare name: string;


  static id = 60010;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
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
    name: Responsible_Person_Qualifications.tableName + '_u1',
    fields: [...Responsible_Person_Qualifications.uniqueFields],
    type:"unique"
  }];

  static foreignsKeys = [];  
  
};

