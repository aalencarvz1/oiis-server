'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorIntegrationTableModel  from "./BaseWinthorIntegrationTableModel.js";
import  Integration_Tables  from "./Integration_Tables.js";
import Utils from "../../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Integration_Control extends BaseWinthorIntegrationTableModel {

  //table fields
  declare creator_user_id: number;
  declare created_at : Date;
  declare updater_user_id: number;
  declare updated_at : Date;                
  declare integration_table_id: number;
  declare register_id: string;      
  declare operation: string;      
  declare values_to_integrate: any;
  declare integrated_at: Date;




  static id = 35005;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;
  static fields = {
    creator_user_id: {
      type: DataTypes.BIGINT,                
      allowNull: false,
      defaultValue:1 
    },
    created_at : {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updater_user_id: {
        type: DataTypes.BIGINT,
    },
    updated_at : {
        type: DataTypes.DATE
    },                
    integration_table_id:{
      type: DataTypes.BIGINT,
      allowNull:false
    },
    register_id:{
      type: DataTypes.STRING(2000),
      allowNull:false
    },      
    operation:{
      type: DataTypes.STRING(100),
      allowNull:false,
      defaultValue:'UPDATE'
    },      
    values_to_integrate:{
      type: DataTypes.JSON
    },
    integrated_at:{
      type: DataTypes.DATE
    }
  };
  
  static uniqueFields = [
    'integration_table_id',
    'register_id',
    'operation',
    'integrated_at'
  ];

  static constraints = [{
    name: Integration_Control.tableName + '_u1',
    fields: Integration_Control.uniqueFields,
    type:"unique"
  }];


  static foreignsKeys : any[] = [];

  /**
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
        fields: ['integration_table_id'],
        type: 'foreign key',
        references: { 
            table: Integration_Tables,
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
