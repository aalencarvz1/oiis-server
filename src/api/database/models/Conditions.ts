'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Entities_Types  from "./Entities_Types.js";
import  Comparators  from "./Comparators.js";


/**
 * class model
 */
export default class Conditions extends BaseTableModel {

  //table fields
  declare entity_type_id: number;
  declare entity_id: number;
  declare record_id: number;
  declare comparation_id: number;
  declare expression: string;
  declare start_date: Date
  declare end_date: Date
  declare observations: string;




  static id = 7004;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Conditions.getBaseTableModelFields(),...{           
      entity_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      entity_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      record_id:{
        type: DataTypes.BIGINT.UNSIGNED,
      },
      comparation_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      expression: {
        type: DataTypes.TEXT
      },
      start_date:{
        type: DataTypes.DATE
      },
      end_date:{
        type: DataTypes.DATE
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'entity_type_id',
    'entity_id',
    Sequelize.literal(`(COALESCE(record_id,0))`),
    Sequelize.literal(`(COALESCE(comparation_id,0))`),
    Sequelize.literal(`(COALESCE(start_date,'1900-01-01'))`)
  ];

  static constraints = [...(Conditions.getBaseTableModelConstraints() || []),...[
    {
      name: Conditions.tableName + '_u1',
      fields: [...Conditions.getBaseTableModelUniqueFields(),...Conditions.uniqueFields],
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
    },
    {
      fields: ['comparation_id'],
      type: 'foreign key',
      references: { 
          table: Comparators,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};
