'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Maps_Api_Responses extends BaseTableModel {

  //table fields
  declare entity: string;
  declare entity_id: string;
  declare library: string;  
  declare response_status_code: number;
  declare response_status: string; 
  declare response: string;
  declare response_expire_at: Date;


  static id = 20010;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Maps_Api_Responses.getBaseTableModelFields(),...{            
      entity: {
        type: DataTypes.STRING(255)
      },
      entity_id: {
        type: DataTypes.STRING(255)
      },
      library: {
        type: DataTypes.STRING(255)
      },
      response_status_code: {
        type: DataTypes.INTEGER.UNSIGNED
      }, 
      response_status: {
        type: DataTypes.STRING(255)
      }, 
      response: {
        type: DataTypes.TEXT
      },
      response_expire_at: {
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Maps_Api_Responses.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};