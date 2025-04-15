'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Users from "./Users.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class User_Profile_Timeworks extends BaseTableModel {

  //table fields
  declare user_id: number;
  declare name: string;


  static id = 122;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  

  
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
      result = super.getForeignKeys();   
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
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }
  
}
