'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Identifier_Types  from "./Identifier_Types.js";
import  Suppliers  from "./Suppliers.js";

/**
 * class model
 */
export default class Lots extends BaseTableModel {

  //table fiedls
  declare supplier_id: number;
  declare identifier_type_id: number;
  declare identifier: string;
  declare production_date: Date;     
  declare expiration_date: Date;


  static id = 8014;
  static tableName = this.name.toLowerCase();
  

  static WITHOUT_LOT = 1;

  static fields = {
    ...Lots.getBaseTableModelFields(),...{           
      supplier_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier:{
        type: DataTypes.STRING(256),
        allowNull:false
      },      
      production_date:{
        type: DataTypes.DATE
      },      
      expiration_date:{
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [
    'supplier_id',
    'identifier_type_id',
    'identifier'
  ];

  static constraints = [...(Lots.getBaseTableModelConstraints() || []),...[
    {
      name: Lots.tableName + '_u1',
      fields: [...Lots.getBaseTableModelUniqueFields(),...Lots.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['supplier_id'],
      type: 'foreign key',
      references: { 
          table: Suppliers,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['identifier_type_id'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};