'use strict';


import { Sequelize, DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Collaborator_Functions  from "./Collaborator_Functions.js";
import  Collaborator_Contracts  from "./Collaborator_Contracts.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Collaborators_X_Functions extends BaseTableModel {

  //table fields
  declare contrract_id: number;
  declare function_id: number;
  declare start_date: Date;
  declare end_date: Date;     
  declare is_time_controlled: number;
  declare observations: string;



  static id = 6003;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Collaborators_X_Functions.getBaseTableModelFields(),...{           
      contrract_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      function_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      start_date:{
        type: DataTypes.DATE,
      },
      end_date:{
        type: DataTypes.DATE,
      },     
      is_time_controlled: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },      
      observations:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'contrract_id',
    'function_id',
    Sequelize.literal(`(COALESCE(start_date,'1900-01-01'))`)
  ];

  static constraints = [...(Collaborators_X_Functions.getBaseTableModelConstraints() || []),...[
    {
      name: Collaborators_X_Functions.tableName + '_u1',
      fields: [...Collaborators_X_Functions.getBaseTableModelUniqueFields(),...Collaborators_X_Functions.uniqueFields],
      type:"unique"
    },{
      name: Collaborators_X_Functions.tableName + '_c_1',
      fields:['is_time_controlled'],
      type:"check",
      where:{
        is_time_controlled: {
              [Op.in]: [0,1]
          }
      }
    }
  ]];


  static foreignsKeys : any[] = [];
    

  /**
   * get the foreign keys avoiding ciclyc imports on BaseTableModel
   * @override
   * @created 2025-04-14
   * @version 1.0.0
   */
  static getForeignKeys(): any[] {
    //Utils.logi(this.name,'getForeignKeys');
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      result = [];
      let newAdjustedForeignKeys : boolean = true;
      let baseFks = this.getBaseTableModelForeignsKeys();
      for(let i = 0; i < baseFks.length; i++) {
        result.push(baseFks[i]);
        if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
      }      
      result.push({
        fields: ['contrract_id'],
        type: 'foreign key',
        references: { 
            table: Collaborator_Contracts,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['function_id'],
        type: 'foreign key',
        references: { 
            table: Collaborator_Functions,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      this.adjustedForeignKeys = newAdjustedForeignKeys;
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }


  /**
   * static initializer block
   */
  static {
    //Utils.logi(this.name,'STATIC');
    this.foreignsKeys = this.getForeignKeys();
    //Utils.logf(this.name,'STATIC');
  }
   
  
};