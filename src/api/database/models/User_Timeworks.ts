'use strict';

import { DataTypes, Op } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import User_Profile_Timeworks from "./User_Profile_Timeworks.js";


/**
 * class model
 */
export default class User_Timeworks extends BaseTableModel {

  //table fields
  declare user_profile_time_work_id:number;
  declare week_day:number;
  declare start_at:string;
  declare end_at:string;
  declare observations:string;


  static id = 123;
  static tableName = this.name.toLowerCase();
  static model = null;

  
  static fields = {
    ...User_Timeworks.getBaseTableModelFields(),...{
      user_profile_time_work_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      week_day:{
        type: DataTypes.TINYINT,
        allowNull: false
      },
      start_at:{
        type: DataTypes.STRING(8),
        allowNull: false
      },
      end_at:{
        type: DataTypes.STRING(8),
        allowNull: false
      },
      observations:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [    
    'user_profile_time_work_id',
    'week_day',
    'start_at'
  ];

  static uniqueFields2 = [    
    'user_profile_time_work_id',
    'week_day',
    'end_at'
  ];

  static constraints = [...(User_Timeworks.getBaseTableModelConstraints() || []),...[
    {
      name: User_Timeworks.tableName + '_u1',
      fields: [...User_Timeworks.getBaseTableModelUniqueFields(),...User_Timeworks.uniqueFields],
      type:"unique"
    },
    {
      name: User_Timeworks.tableName + '_u2',
      fields: [...User_Timeworks.getBaseTableModelUniqueFields(),...User_Timeworks.uniqueFields2],
      type:"unique"
    },{
      name: User_Timeworks.tableName + '_c_1',
      fields:['week_day'],
      type:"check",
      where:{
        week_day: {
              [Op.in]: [0,1,2,3,4,5,6]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['user_profile_time_work_id'],
      type: 'foreign key',
      references: { 
          table: User_Profile_Timeworks,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
}