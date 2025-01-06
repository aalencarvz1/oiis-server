'use strict';


import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Connections from "./Connections.js";
import Schemas from "./Schemas.js";



/**
 * class model
 */
export default class Tables extends BaseTableModel {

  //table fields
  declare data_connection_id: number;
  declare schema_id: number;
  declare name: string;
  declare description: string;



  static id = 1;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Tables.getBaseTableModelFields(),...{
      data_connection_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      schema_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'data_connection_id',
    'schema_id',
    'name'
  ];

  static constraints = [...(Tables.getBaseTableModelConstraints() || []),...[
    {
      name: Tables.tableName + '_u1',
      fields: [...Tables.getBaseTableModelUniqueFields(),...Tables.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['data_connection_id'],
      type: 'foreign key',
      references: { 
          table: Connections,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['schema_id'],
      type: 'foreign key',
      references: { 
          table: Schemas,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];  
};
