'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";



/**
 * class model
 */
export default class Form_Types extends BaseTableModel {

  //table fields
  declare name : string;
  declare path : string;


  static id = 1031;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Form_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      path:{
        type: DataTypes.STRING(2000)
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Form_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Form_Types.tableName + '_u1',
      fields: [...Form_Types.getBaseTableModelUniqueFields(),...Form_Types.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys : any[] = [];
  
};