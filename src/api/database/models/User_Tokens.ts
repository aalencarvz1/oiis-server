'use strict';

/*imports*/
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
  static model = null;

  
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

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['user_id'],
      type: 'foreign key',
      references: { 
          table: Users,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
}
