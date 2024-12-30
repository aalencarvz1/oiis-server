'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Run_Status  from "./Run_Status.js";
import  Api_Requests  from "./Api_Requests.js";


/**
 * class model
 */
export default class Api_Request_Calls extends BaseTableModel {

  //table fields
  declare api_request_id: number;
  declare run_status_id: number;
  declare on_receive_response: string;


  static id = 20002;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Api_Request_Calls.getBaseTableModelFields(),...{            
      api_request_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      run_status_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue: Run_Status.NOT_STARTED
      },
      on_receive_response:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Api_Request_Calls.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['api_request_id'],
    type: 'foreign key',
    references: { 
        table: Api_Requests,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },{
    fields: ['run_status_id'],
    type: 'foreign key',
    references: { 
        table: Run_Status,
        field: 'id'
    },    
    onUpdate: 'cascade'
  }]];
  
};