'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Logistic_Reasons extends BaseTableModel {

  //table fields
  declare name: string;
  declare mov_type_sigla: string;


  static id = 12002;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Logistic_Reasons.getBaseTableModelFields(),...{                 
      name:{
        type: DataTypes.STRING(2000),
        allowNull: false
      },
      mov_type_sigla:{
        type: DataTypes.STRING(2)
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Logistic_Reasons.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys : any[] = [];
  
};