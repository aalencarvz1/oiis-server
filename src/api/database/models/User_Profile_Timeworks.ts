'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Users from "./Users.js";


/**
 * class model
 */
export default class User_Profile_Timeworks extends BaseTableModel {

  //table fields
  declare user_id: number;
  declare name: string;


  static id = 122;
  static tableName = this.name.toLowerCase();
  static model = null;

  
  static fields = {
    ...User_Profile_Timeworks.getBaseTableModelFields(),...{
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull: false
      }
    }
  };
  
  static uniqueFields = [    
    'user_id',
    'name'
  ];

  static constraints = [...(User_Profile_Timeworks.getBaseTableModelConstraints() || []),...[
    {
      name: User_Profile_Timeworks.tableName + '_u1',
      fields: [...User_Profile_Timeworks.getBaseTableModelUniqueFields(),...User_Profile_Timeworks.uniqueFields],
      type:"unique"
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
