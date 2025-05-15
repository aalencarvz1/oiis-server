'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Customized_Commissions extends BaseTableModel {

  //table fields
  declare name: number;
  declare description?: string;
  declare start_at: Date;
  declare end_at: Date;
  declare conditions?: string;
  declare calculated_at?: Date;
  declare notes?: string;

  static id = 16100;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Customized_Commissions.getBaseTableModelFields(),...{                 
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description:{
        type: DataTypes.TEXT
      },
      start_at:{
        type: DataTypes.DATE,
        allowNull:false
      },
      end_at:{
        type: DataTypes.DATE,
        allowNull:false
      },
      conditions:{
        type: DataTypes.TEXT
      },
      calculated_at:{
        type: DataTypes.DATE
      },
      notes:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'name',
    'start_at',
    'end_at'
  ];

  static constraints = [...(Customized_Commissions.getBaseTableModelConstraints() || []),...[{
    name: Customized_Commissions.tableName + '_u1',
    fields: [...Customized_Commissions.getBaseTableModelUniqueFields(),...Customized_Commissions.uniqueFields],
    type:"unique"
  }]];


  static foreignsKeys : any[] = [];
    

};