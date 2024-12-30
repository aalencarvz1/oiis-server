'use strict';

import { DataTypes, Sequelize } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Relationship_Types from "./Relationship_Types.js";
import Tables from "./Tables.js";
import Contexts from "./Contexts.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Relationships extends BaseTableModel {

  //table fields
  declare relationship_type_id:number;
  declare table_1_id:number;
  declare record_1_column:string;      
  declare record_1_id: number;
  declare record_1_conditions:string;
  declare table_2_id:number;
  declare record_2_column:string;            
  declare record_2_id: number;
  declare record_2_conditions:string;
  declare context_id: number;
  declare value:string;
  declare numeric_order:number;
  declare start_at: Date;
  declare end_at: Date;



  static id = 1001;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Relationships.getBaseTableModelFields(),...{     
      relationship_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      table_1_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      record_1_column:{
        type: DataTypes.STRING(255)
      },      
      record_1_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      record_1_conditions:{
        type: DataTypes.TEXT
      },
      table_2_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },      
      record_2_column:{
        type: DataTypes.STRING(255)
      },            
      record_2_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      record_2_conditions:{
        type: DataTypes.TEXT
      },
      context_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      value:{
        type: DataTypes.STRING(255)
      },
      numeric_order:{
        type: DataTypes.BIGINT
      },
      start_at:{
        type: DataTypes.DATE
      },
      end_at:{
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [
    'relationship_type_id',
    'table_1_id',
    'table_2_id',
    Sequelize.literal(`(COALESCE(record_1_column,'id'))`),
    Sequelize.literal(`(COALESCE(record_2_column,'id'))`),
    Sequelize.literal(`(COALESCE(record_1_id,0))`),
    Sequelize.literal(`(COALESCE(record_2_id,0))`),
    Sequelize.literal(`(COALESCE(context_id,0))`),
    //Sequelize.literal(`(COALESCE(value,'NULL'))`),
    Sequelize.literal(`(COALESCE(numeric_order,0))`),
    Sequelize.literal(`(COALESCE(start_at,'1900-01-01'))`)
  ];

  static constraints = [...(Relationships.getBaseTableModelConstraints() || []),...[
    {
      name: Relationships.tableName + '_u1',
      fields: [...Relationships.getBaseTableModelUniqueFields(),...Relationships.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['relationship_type_id'],
      type: 'foreign key',
      references: { 
          table: Relationship_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['table_1_id'],
      type: 'foreign key',
      references: { 
          table: Tables,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['table_2_id'],
      type: 'foreign key',
      references: { 
          table: Tables,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['context_id'],
      type: 'foreign key',
      references: { 
          table: Contexts,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];

  static async createIfNotExistsAndRelationed(queryParams: any, newValues: any, queryParamsRelationshipCheck: any){
    let reg : any = await Relationships.findOne(queryParams);
    if (!reg) {
      if (Utils.typeOf(queryParamsRelationshipCheck) !== 'array') {
        queryParamsRelationshipCheck = [queryParamsRelationshipCheck];
      }
      for(let key in queryParamsRelationshipCheck) {
        let relationed = await Relationships.findOne(queryParamsRelationshipCheck[key]);
        if (!relationed) {
          throw new Error(`not has relationship with ${JSON.stringify(queryParamsRelationshipCheck[key])}`);
        }
      }       
      let options : any = {};
      if (queryParams.transaction) options.transaction = queryParams.transaction;
      let values = newValues || queryParams.where;
      reg = await Relationships.create(values,options);
    }
    return reg;
  }


  static async createIfNotExists(queryParams: any, newValues: any){
    return await BaseTableModel.createIfNotExists.bind(Relationships)(queryParams, newValues);
  }
  
};
