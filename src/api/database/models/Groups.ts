'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Entities_Types  from "./Entities_Types.js";


/**
 * class model
 */
export default class Groups extends BaseTableModel {

  //table fields
  declare entity_type_id: number;      
  declare sigla:  string;
  declare name:  string;
  declare description: string;
  declare sql_condiction: string;
  declare observations:string;


  static id = 7006;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Groups.getBaseTableModelFields(),...{              
      entity_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      sigla: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description:{
        type: DataTypes.TEXT
      },
      sql_condiction: {
        type: DataTypes.TEXT
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'sigla'
  ];

  static constraints = [...(Groups.getBaseTableModelConstraints() || []),...[
    {
      name: Groups.tableName + '_u1',
      fields: [...Groups.getBaseTableModelUniqueFields(),...Groups.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['entity_type_id'],
      type: 'foreign key',
      references: { 
          table: Entities_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];

  
  
};
