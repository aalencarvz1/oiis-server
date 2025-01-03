'use strict';

import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from "./BaseTableModel.js";


/**
 * class model
 */
export default class Ncms extends BaseTableModel {

  //table fields
  declare chapter: number;
  declare ncm: number;      
  declare exception: number;
  declare description: string;


  static id = 8008;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Ncms.getBaseTableModelFields(),...{           
      chapter:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      ncm:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      exception:{
        type: DataTypes.BIGINT.UNSIGNED
      },      
      description:{
        type: DataTypes.TEXT,
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'ncm',
    Sequelize.literal('(coalesce(exception,-1))')
  ]

  static constraints = [...(Ncms.getBaseTableModelConstraints() || []),...[{
      name: Ncms.tableName + '_u1',
      fields: [...Ncms.getBaseTableModelUniqueFields(),...Ncms.uniqueFields],
      type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};