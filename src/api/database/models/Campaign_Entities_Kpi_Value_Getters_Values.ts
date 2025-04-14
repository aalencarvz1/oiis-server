'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Campaign_Entities  from "./Campaign_Entities.js";
import Campaign_Kpi_Value_Getters from "./Campaign_Kpi_Value_Getters.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Campaign_Entities_Kpi_Value_Getters_Values extends BaseTableModel {


  declare campaign_entity_id: number;
  declare campaign_kpi_value_getter_id: number;
  declare value: number;
  declare calculated_at: Date;
  declare notes: string;


  //table 
  static id = 16050;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Campaign_Entities_Kpi_Value_Getters_Values.getBaseTableModelFields(),...{                  
    campaign_entity_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    campaign_kpi_value_getter_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    value:{
      type: DataTypes.DECIMAL(38,12),
      allowNull: false,
      defaultValue:0
    },
    calculated_at:{
      type: DataTypes.DATE(3),
    },
    notes:{
      type: DataTypes.TEXT
    }
  }};

  static uniqueFields = [
    'campaign_entity_id',
    'campaign_kpi_value_getter_id'
  ];

  static constraints = [...(Campaign_Entities_Kpi_Value_Getters_Values.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Entities_Kpi_Value_Getters_Values.tableName + '_u1',
    fields: [...Campaign_Entities_Kpi_Value_Getters_Values.getBaseTableModelUniqueFields(),...Campaign_Entities_Kpi_Value_Getters_Values.uniqueFields],
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
        fields: ['campaign_entity_id'],
        type: 'foreign key',
        references: { 
          table: Campaign_Entities,
          field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      result.push({
        fields: ['campaign_kpi_value_getter_id'],
        type: 'foreign key',
        references: { 
          table: Campaign_Kpi_Value_Getters,
          field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
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