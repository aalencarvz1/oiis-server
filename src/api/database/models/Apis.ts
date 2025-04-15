'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Apis extends BaseTableModel {

  //table fields
  declare name: string;
  declare default_method: string;
  declare default_end_point: string;            
  declare default_authorization:string; 
  declare default_request_params:string; 
  declare default_request_body_params:string; 
  declare default_webhook:string; 
  declare description: string;


  static id = 20000;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Apis.getBaseTableModelFields(),...{            
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      default_method: {
        type: DataTypes.STRING(10),
      },
      default_end_point: {
        type: DataTypes.STRING(2000)
      },            
      default_authorization:{
        type: DataTypes.STRING(2000)
      }, 
      default_request_params:{
        type: DataTypes.TEXT
      }, 
      default_request_body_params:{
        type: DataTypes.TEXT
      }, 
      default_webhook:{
        type: DataTypes.STRING(2000)
      }, 
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [     
    'name'
  ];

  static constraints = [...(Apis.getBaseTableModelConstraints() || []),...[
    {
      name: Apis.tableName + '_u1',
      fields: [...Apis.getBaseTableModelUniqueFields(),...Apis.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys : any[] = [];
        
};