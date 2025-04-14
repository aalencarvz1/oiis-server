'use strict';


import Utils from "../../controllers/utils/Utils.js";
import BaseTableModel from "./BaseTableModel.js";
import Users from "./Users.js";
import { DataTypes, Op } from "sequelize";





/**
 * class model
 */
export default class User_Tokens extends BaseTableModel {

    //table fields
    declare user_id: number;
    declare token: string;
    declare expired_at: Date;
    declare expired: number;
    declare device_information: string;
    declare timezone_offset: number;


  static id = 121;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  
  static fields = {
    ...User_Tokens.getBaseTableModelFields(),...{
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      token: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      expired_at: {
        type: DataTypes.DATE
      },
      expired: {
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
      },
      device_information: {
        type: DataTypes.STRING(2000)
      },
      timezone_offset: {
        type: DataTypes.INTEGER
      }
    }
  };
  
  static uniqueFields = [    
    'user_id',
    'token',
    'expired'
  ];

  static constraints = [...(User_Tokens.getBaseTableModelConstraints() || []),...[
    {
      name: User_Tokens.tableName + '_u1',
      fields: [...User_Tokens.getBaseTableModelUniqueFields(),...User_Tokens.uniqueFields],
      type:"unique"
    },{
      name: User_Tokens.tableName + '_c_1',
      fields:['expired'],
      type:"check",
      where:{
        expired: {
              [Op.in]: [0,1]
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
        fields: ['user_id'],
        type: 'foreign key',
        references: { 
            table: Users,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      this.adjustedForeignKeys = newAdjustedForeignKeys;
    }
    return result;
  }


  /**
   * static initializer block
   */
  static {
    this.foreignsKeys = this.getForeignKeys();
  }
     
}
