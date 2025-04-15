'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Comparators extends BaseTableModel {

  //table fields
  declare name : string;

  

  static id = 1005;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  

  static EQUAL = 1;
  static DIFFERENT = 2;
  static IN = 3;
  static NOT_IN = 4;
  static LIKE = 5;
  static NOT_LIKE = 6;
  static GREATER = 7;
  static GREATER_EQUAL = 8;
  static SMALLER = 9;
  static SMALLER_EQUAL = 10;

  static fields = {
    ...Comparators.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name',
  ];

  static constraints = [...(Comparators.getBaseTableModelConstraints() || []),...[
    {
      name: Comparators.tableName + '_u1',
      fields: [...Comparators.getBaseTableModelUniqueFields(),...Comparators.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys : any[] = [];
    
};