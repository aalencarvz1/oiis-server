'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";





/**
 * class model
 */
export default class Entities_Types extends BaseTableModel {

  //table fields 
  declare name:  string;
  declare table_id: string;
  declare identifier_column:  string;      
  declare name_column:  string;      
  declare columns:  string;      
  declare where_clause:  string;
  declare order_by:  string;
  declare query:  string;
  declare description: string;



  static id = 5;
  static tableName = this.name.toLowerCase();
  

  static DATABASE = 1;
  static CONNECTION = 2;
  static USER = 3;
  static SCHEMA = 4;
  static TABLE = 5;
  static QUERY = 10;

  static fields = {
    ...Entities_Types.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      table_id: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      identifier_column: {
        type: DataTypes.STRING(256),
        allowNull: false
      },      
      name_column: {
        type: DataTypes.STRING(256),
        allowNull: false
      },      
      columns: {
        type: DataTypes.TEXT
      },      
      where_clause: {
        type: DataTypes.TEXT
      },
      order_by: {
        type: DataTypes.TEXT
      },
      query: {
        type: DataTypes.TEXT
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Entities_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Entities_Types.tableName + '_U1',
      fields: [...Entities_Types.getBaseTableModelUniqueFields(),...Entities_Types.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['table_id'],
      type: 'foreign key',
      references: { 
          table: 'Tables',
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
   
};
