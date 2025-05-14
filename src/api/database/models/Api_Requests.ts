'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Apis  from "./Apis.js";
import  Utils  from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Api_Requests extends BaseTableModel {

  //table fields
  declare api_id: number;
  declare name: string;
  declare method: string;
  declare end_point: string;            
  declare authorization: string; 
  declare request_params: string; 
  declare body_params: string; 
  declare webhook: string; 
  declare description: string;



  static id = 20001;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Api_Requests.getBaseTableModelFields(),...{            
      api_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name: {
        type: DataTypes.STRING(256)
      },
      method: {
        type: DataTypes.STRING(10),
      },
      end_point: {
        type: DataTypes.STRING(2000)
      },            
      authorization:{
        type: DataTypes.TEXT
      }, 
      request_params:{
        type: DataTypes.TEXT
      }, 
      body_params:{
        type: DataTypes.TEXT
      }, 
      webhook:{
        type: DataTypes.STRING(2000)
      }, 
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Api_Requests.getBaseTableModelConstraints() || []),...[]];
  
  static foreignsKeys : any[] = [];

  static async createData(params: any) {
    params = params || {};  
    params.queryParams = params.queryParams || params || {};
    params.queryParams.request_params = params.queryParams.request_params || {};
    if (typeof params.queryParams.request_params !== 'object') params.queryParams.request_params = JSON.parse(params.queryParams.request_params);
    params.queryParams.request_params.headers = params.queryParams.request_params.headers || {};
    params.queryParams.request_params.headers['Content-Type'] = params.queryParams.request_params.headers['Content-Type'] || 'application/json';
    params.queryParams.request_params.headers['Accept'] = params.queryParams.request_params.headers['Accept'] || 'application/json';
    //params.queryParams.request_params.headers['access-control-allow-origin'] = params.queryParams.request_params.headers['access-control-allow-origin'] || '*';
    //params.queryParams.request_params.headers['access-control-allow-headers'] = params.queryParams.request_params.headers['access-control-allow-headers'] || 'Origin, X-Requested-With, Content-Type, Accept';
    params.queryParams.request_params = JSON.stringify(params.queryParams.request_params);
    let result = await BaseTableModel.createData.bind(Api_Requests)(params,false);
    if (!Utils.hasValue(result.webhook)) {      
      let apiBodyParams = result.body_params || '{}';
      apiBodyParams = JSON.parse(apiBodyParams);
      if (Utils.hasValue(apiBodyParams.webhook)) {
        result.webhook = apiBodyParams.webhook;  
      } else {
        result.webhook = `http://${process.env.API_EXTERNAL_IP}:${process.env.API_PORT}/api/modules/webhooks/api_requests/${result.id}/responses`;
        apiBodyParams.webhook = result.webhook;
        result.body_params = JSON.stringify(apiBodyParams);
      }      
      await result.save();
      result = result.dataValues;
    }                  
    return result;
  }
  static putData = this.createData;


  
      
  
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
        fields: ['api_id'],
        type: 'foreign key',
        references: { 
            table: Apis,
            field: 'id'
        },    
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }



};