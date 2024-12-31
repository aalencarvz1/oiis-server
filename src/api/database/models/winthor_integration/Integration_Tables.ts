'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseWinthorIntegrationTableModel  from "./BaseWinthorIntegrationTableModel.js";

/**
 * class model
 */
export default class Integration_Tables extends BaseWinthorIntegrationTableModel {

  //table fields
  declare id: number;
  declare creator_user_id: number;
  declare created_at : Date;
  declare updater_user_id: number;
  declare updated_at : Date;             
  declare schema_name: string;
  declare user_name: string;
  declare table_name: string;
  declare identifier_column: string;
  declare integrate:number;
  declare integrate_insert:number;
  declare integrate_update:number;
  declare integrate_delete:number;
  declare integrate_on_demand:number;
  declare integrate_by_time: string;


  static id = 35002;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    id: {
      type : DataTypes.BIGINT.UNSIGNED,                
      primaryKey: true,
      allowNull: false 
    },
    creator_user_id: {
      type: DataTypes.BIGINT.UNSIGNED,                
      allowNull: false,
      defaultValue:1 
    },
    created_at : {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updater_user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
    updated_at : {
        type: DataTypes.DATE
    },             
    schema_name:{
      type: DataTypes.STRING(255),
      allowNull:false
    },
    user_name:{
      type: DataTypes.STRING(255)
    },
    table_name:{
      type: DataTypes.STRING(255),
      allowNull:false
    },
    identifier_column:{
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
    },
    integrate_delete:{
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1
    },
    integrate_on_demand:{
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1
    },
    integrate_by_time:{
      type: DataTypes.STRING(2000)
    }
  };
  
  static uniqueFields = [
    'schema_name',
    'table_name'
  ];

  static constraints = [{
    name: Integration_Tables.tableName + '_u1',
    fields: Integration_Tables.uniqueFields,
    type:"unique"
  },{
    name: Integration_Tables.tableName + '_c_1',
    fields:['integrate'],
    type:"check",
    where:{
      integrate: {
            [Op.in]: [0,1]
        }
    }
  },{
    name: Integration_Tables.tableName + '_c_2',
    fields:['integrate_insert'],
    type:"check",
    where:{
      integrate_insert: {
            [Op.in]: [0,1]
        }
    }
  },{
    name: Integration_Tables.tableName + '_c_3',
    fields:['integrate_update'],
    type:"check",
    where:{
      integrate_update: {
            [Op.in]: [0,1]
        }
    }
  },{
    name: Integration_Tables.tableName + '_c_4',
    fields:['integrate_delete'],
    type:"check",
    where:{
      integrate_delete: {
            [Op.in]: [0,1]
        }
    }
  }];

  static foreignsKeys = [];
  
};
