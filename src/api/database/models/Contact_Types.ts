'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Contact_Types extends BaseTableModel {

  //table fields
  declare name : string;
  

  static id = 2012;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Contact_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Contact_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Contact_Types.tableName + '_u1',
      fields: [...Contact_Types.getBaseTableModelUniqueFields(),...Contact_Types.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys : any[] = [];
  
};