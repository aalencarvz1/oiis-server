'use strict';

import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';

/**
 * class model
 */
export default class Contract_Types extends BaseTableModel {

  //table fields
  declare name : string;


  static id = 1020;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Contract_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Contract_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Contract_Types.tableName + '_u1',
      fields: [...Contract_Types.getBaseTableModelUniqueFields(),...Contract_Types.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};