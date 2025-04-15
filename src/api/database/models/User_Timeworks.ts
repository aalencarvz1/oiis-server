'use strict';

import { DataTypes, Op } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import User_Profile_Timeworks from "./User_Profile_Timeworks.js";
import Utils from "../../controllers/utils/Utils.js";


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
  private static adjustedForeignKeys : boolean = false;
  

  
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
      result = [];
      let newAdjustedForeignKeys : boolean = true;
      let baseFks = this.getBaseTableModelForeignsKeys();
      for(let i = 0; i < baseFks.length; i++) {
        result.push(baseFks[i]);
        if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
      }        
      result.push({
        fields: ['user_profile_time_work_id'],
        type: 'foreign key',
        references: { 
            table: User_Profile_Timeworks,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      this.adjustedForeignKeys = newAdjustedForeignKeys;
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }


  /**
   * static initializer block
   */
  static {
    //Utils.logi(this.name,'STATIC');
    this.foreignsKeys = this.getForeignKeys();
    //Utils.logf(this.name,'STATIC');
  }
     
  
}