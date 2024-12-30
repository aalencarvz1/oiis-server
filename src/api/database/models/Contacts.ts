'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';

import  Contact_Types  from "./Contact_Types.js";

/**
 * class model
 */
export default class Contacts extends BaseTableModel {

  //table fields
  declare contact_type_id: number;
  declare name: string;


  static id = 2013;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Contacts.getBaseTableModelFields(),...{           
      contact_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'contact_type_id',
    'name'
  ];

  static constraints = [...(Contacts.getBaseTableModelConstraints() || []),...[
    {
      name: Contacts.tableName + '_u1',
      fields: [...Contacts.getBaseTableModelUniqueFields(),...Contacts.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['contact_type_id'],
      type: 'foreign key',
      references: { 
          table: Contact_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};