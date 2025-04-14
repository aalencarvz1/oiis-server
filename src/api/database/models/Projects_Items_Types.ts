'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Projects_Items_Types extends BaseTableModel {

  //table fields
  declare name: string;
  declare description: string;
  declare notes: string;


  static id = 15001;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  
  static PROJECTS = 1;
  static PROJECT = 2;
  static PLANNINGS = 20;
  static PLANNING = 21;
  static MANAGEMENTS = 30;
  static MANAGEMENT = 31;

  //planning children
  static INICIATIVES = 210;
  static INICIATIVE = 211;
  static EPICS = 2110;
  static EPIC = 2111;
  static FEATURES = 21110;
  static FEATURE = 21111;
  static REQUIREMENTS = 200000;
  static REQUIREMENT = 200001;

  //management children
  static AGILE_METHODOLOGIES = 310;
  static AGILE_METHODOLOGY = 311;
  static SCRUMS = 3110;
  static SCRUM = 3111;
  static BACKLOGS = 31110;
  static BACKLOG = 31111;
  static SPRINTS = 31112;
  static SPRINT = 31113;
  static TASKS = 40000;
  static TASK = 40001;

  static fields = {
    ...Projects_Items_Types.getBaseTableModelFields(),...{            
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT
      },
      notes: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Projects_Items_Types.getBaseTableModelConstraints() || []),...[{
    name: Projects_Items_Types.tableName + '_u1',
    fields: [...Projects_Items_Types.getBaseTableModelUniqueFields(),...Projects_Items_Types.uniqueFields],
    type:"unique"
  }]];

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