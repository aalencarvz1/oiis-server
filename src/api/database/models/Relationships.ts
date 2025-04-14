'use strict';

import { DataTypes, Op, Sequelize } from "sequelize";
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
  declare description?: string;
  declare integer_value_1?: number;
  declare integer_value_2?: number;
  declare integer_value_3?: number;
  declare bigint_value_1?: number;
  declare bigint_value_2?: number;
  declare bigint_value_3?: number;
  declare decimal_value_1?: number;
  declare decimal_value_2?: number;
  declare decimal_value_3?: number;
  declare string_value_1?: string;
  declare string_value_2?: string;
  declare string_value_3?: string;
  declare text_value_1?: string;
  declare text_value_2?: string;
  declare text_value_3?: string;
  declare boolean_value_1?: number;
  declare boolean_value_2?: number;
  declare boolean_value_3?: number;
  declare date_value_1?: Date;
  declare date_value_2?: Date;
  declare date_value_3?: Date;
  declare notes?: string;



  static id = 1001;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
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
      },
      description: {
        type: DataTypes.TEXT
      }, 
      integer_value_1: {
        type: DataTypes.INTEGER
      },
      integer_value_2: {
        type: DataTypes.INTEGER
      },
      integer_value_3: {
        type: DataTypes.INTEGER
      },
      bigint_value_1: {
        type: DataTypes.INTEGER
      },
      bigint_value_2: {
        type: DataTypes.INTEGER
      },
      bigint_value_3: {
        type: DataTypes.INTEGER
      },
      decimal_value_1: {
        type: DataTypes.DECIMAL(38,12)
      },
      decimal_value_2: {
        type: DataTypes.DECIMAL(38,12)
      },
      decimal_value_3: {
        type: DataTypes.DECIMAL(38,12)
      },
      string_value_1: {
        type: DataTypes.STRING(4000)
      },
      string_value_2: {
        type: DataTypes.STRING(4000)
      },
      string_value_3: {
        type: DataTypes.STRING(4000)
      },      
      text_value_1: {
        type: DataTypes.TEXT
      },
      text_value_2: {
        type: DataTypes.TEXT
      },
      text_value_3: {
        type: DataTypes.TEXT
      },      
      boolean_value_1: {
        type: DataTypes.INTEGER
      },
      boolean_value_2: {
        type: DataTypes.INTEGER
      },
      boolean_value_3: {
        type: DataTypes.INTEGER
      },
      date_value_1: {
        type: DataTypes.DATE
      },
      date_value_2: {
        type: DataTypes.DATE
      },
      date_value_3: {
        type: DataTypes.DATE
      },
      notes: {
        type: DataTypes.TEXT
      }, 
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
    },{
          name: Relationships.tableName + '_c_1',
          fields:['boolean_value_1'],
          type:"check",
          where:{
            boolean_value_1: {
                  [Op.in]: [0,1]
              }
          }
        },{
          name: Relationships.tableName + '_c_2',
          fields:['boolean_value_2'],
          type:"check",
          where:{
            boolean_value_2: {
                  [Op.in]: [0,1]
              }
          }
        },{
          name: Relationships.tableName + '_c_3',
          fields:['boolean_value_3'],
          type:"check",
          where:{
            boolean_value_3: {
                  [Op.in]: [0,1]
              }
          }
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


  static foreignsKeys : any[] = [];
    

  /**
   * get the foreign keys avoiding ciclyc imports on BaseTableModel
   * @override
   * @created 2025-04-14
   * @version 1.0.0
   */
  static getForeignKeys(): any[] {
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      let newAdjustedForeignKeys : boolean = true;
      let baseFks = this.getBaseTableModelForeignsKeys();
      for(let i = 0; i < baseFks.length; i++) {
        result.push(baseFks[i]);
        if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
      }        
      this.adjustedForeignKeys = newAdjustedForeignKeys;
    }
    return result;
  }


  /**
   * static initializer block
   */
  static {
    this.foreignsKeys = this.getForeignKeys();
  }
     
  
};
