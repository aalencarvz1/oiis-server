'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseWinthorIntegrationTableModel  from "./BaseWinthorIntegrationTableModel.js";
import  Integration_Tables  from "./Integration_Tables.js";

/**
 * class model
 */
export default class Integration_Columns extends BaseWinthorIntegrationTableModel {

  //table fields
  declare creator_user_id: number;
  declare created_at : Date;
  declare updater_user_id: number;
  declare updated_at : Date;  
  declare integration_table_id: number;
  declare column_name: string;      
  declare integrate: number;
  declare integrate_insert: number;
  declare integrate_update: number;


  static id = 35003;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
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
    column_name:{
      type: DataTypes.STRING(255),
      allowNull:false
    },      
    integrate:{
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1
    },
    integrate_insert:{
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1
    },
    integrate_update:{
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1
    }           
  };
  
  static uniqueFields = [
    'integration_table_id',
    'column_name'
  ];

  static constraints = [{
    name: Integration_Columns.tableName + '_u1',
    fields: Integration_Columns.uniqueFields,
    type:"unique"
  },{
    name: Integration_Columns.tableName + '_c_1',
    fields:['integrate'],
    type:"check",
    where:{
      integrate: {
            [Op.in]: [0,1]
        }
    }
  },{
    name: Integration_Columns.tableName + '_c_2',
    fields:['integrate_insert'],
    type:"check",
    where:{
      integrate_insert: {
            [Op.in]: [0,1]
        }
    }
  },{
    name: Integration_Columns.tableName + '_c_3',
    fields:['integrate_update'],
    type:"check",
    where:{
      integrate_update: {
            [Op.in]: [0,1]
        }
    }
  }];

  static foreignsKeys = [{
    fields: ['integration_table_id'],
    type: 'foreign key',
    references: { 
        table: Integration_Tables,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }];
  
  
};
