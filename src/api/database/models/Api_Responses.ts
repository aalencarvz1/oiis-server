'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Api_Request_Calls  from "./Api_Request_Calls.js";


/**
 * class model
 */
export default class Api_Responses extends BaseTableModel {

  //table fields
  declare api_request_call_id: number;
  declare response_status_code: number;
  declare response: string;



  static id = 20005;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Api_Responses.getBaseTableModelFields(),...{            
      api_request_call_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      response_status_code: {
        type: DataTypes.INTEGER.UNSIGNED
      }, 
      response: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Api_Responses.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['api_request_call_id'],
    type: 'foreign key',
    references: { 
        table: Api_Request_Calls,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }]];
  
};