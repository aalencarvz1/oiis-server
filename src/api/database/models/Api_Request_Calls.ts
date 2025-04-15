'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Run_Status  from "./Run_Status.js";
import  Api_Requests  from "./Api_Requests.js";
import Utils from "../../controllers/utils/Utils.js";


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
  static adjustedForeignKeys : boolean = false;
  

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

  static foreignsKeys : any[] = [];
      
  
  /**
   * get the foreign keys avoiding ciclyc imports on BaseTableModel
   * @override
   * @created 2025-04-14
   * @version 1.0.0
   */
  static getForeignKeys(): any[] {
    //Utils.logi(this.name,'getForeignKeys');
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      result = super.getForeignKeys();       
      result.push({
        fields: ['api_request_id'],
        type: 'foreign key',
        references: { 
            table: Api_Requests,
            field: 'id'
        },    
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      result.push({
        fields: ['run_status_id'],
        type: 'foreign key',
        references: { 
            table: Run_Status,
            field: 'id'
        },    
        onUpdate: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }



  
};