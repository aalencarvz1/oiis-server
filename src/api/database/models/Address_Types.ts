'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Address_Types extends BaseTableModel {

  //table fields
  declare name : string;


  static id = 2007;
  static tableName = this.name.toLowerCase();
  

  static RESIDENTIAL = 1;
  static BUSINESS = 2;

  static fields = {
    ...Address_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Address_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Address_Types.tableName + '_u1',
      fields: [...Address_Types.getBaseTableModelUniqueFields(),...Address_Types.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  

};