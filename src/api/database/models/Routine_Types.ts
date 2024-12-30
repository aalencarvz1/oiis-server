'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";



/**
 * class model
 */
export default class Routine_Types extends BaseTableModel {

  //table fields
  declare name: string;
  declare description: string;



  static id = 210;
  static tableName = this.name.toLowerCase();
  static model = null;

  static SYSTEM = 1;
  static REGISTER = 2;
  static REPORT = 3;

  static fields = {
    ...Routine_Types.getBaseTableModelFields(),...{      
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },      
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [    
    'name'
  ];

  static constraints = [...(Routine_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Routine_Types.tableName + '_u1',
      fields: [...Routine_Types.getBaseTableModelUniqueFields(),...Routine_Types.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};
