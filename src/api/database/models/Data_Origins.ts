'use strict';


import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";



/**
 * class model
 */
export default class Data_Origins extends BaseTableModel {

  //table fields 
  declare name: string;
  declare description: string;


  static id = 60;
  static tableName = this.name.toLowerCase();
  

  static DEFAULT_ORIGINDATA = 1;
  static WINTHOR = 2;
  static AURORA = 3;  
  static EP = 4;
  static CONSULTA = 5;
  static APP_COLLECTOR = 1001;
  static APP_DELIVERY = 1002;

  static fields = {
    ...Data_Origins.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Data_Origins.getBaseTableModelConstraints() || []),...[
    {
      name: Data_Origins.tableName + '_u1',
      fields: [...Data_Origins.getBaseTableModelUniqueFields(),...Data_Origins.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
   
};
