'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import modules from "../catalogs/modules.js";




/**
 * class model
 */
export default class Modules extends BaseTableModel {

  //table fields
  declare name: string;
  declare icon: string;
  declare path: string;
  declare numeric_order: number;
  declare description: string;



  static id = 230;
  static tableName = this.name.toLowerCase();
  static model = null;

  static WMS = modules.find((el) => el.name == "WMS")?.id;
  static LOGISTIC = modules.find((el) => el.name == "LOGISTIC")?.id;

  static fields = {
    ...Modules.getBaseTableModelFields(),...{     
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      }, 
      icon: {
        type: DataTypes.TEXT
      }, 
      path: {
        type: DataTypes.STRING(2000)
      },  
      numeric_order: {
        type: DataTypes.BIGINT.UNSIGNED
      },   
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [ 
    'name'
  ];

  static constraints = [...(Modules.getBaseTableModelConstraints() || []),...[
    {
      name: Modules.tableName + '_u1',
      fields: [...Modules.getBaseTableModelUniqueFields(),...Modules.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};

