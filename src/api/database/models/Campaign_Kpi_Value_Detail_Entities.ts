'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Campaign_Kpi_Value_Details  from "./Campaign_Kpi_Value_Details.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Campaign_Kpi_Value_Detail_Entities extends BaseTableModel {

  //table fields
  declare campaign_kpi_value_detail_id:number;
  declare entity_id: number;
  declare expression: string;


  static id = 16011;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Campaign_Kpi_Value_Detail_Entities.getBaseTableModelFields(),...{                  
    campaign_kpi_value_detail_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    entity_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    expression:{
      type: DataTypes.TEXT
    }
  }};

  static uniqueFields = [
    'campaign_kpi_value_detail_id',
    'entity_id'
  ];

  static constraints = [...(Campaign_Kpi_Value_Detail_Entities.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpi_Value_Detail_Entities.tableName + '_u1',
    fields: [...Campaign_Kpi_Value_Detail_Entities.getBaseTableModelUniqueFields(),...Campaign_Kpi_Value_Detail_Entities.uniqueFields],
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
        fields: ['campaign_kpi_value_detail_id'],
        type: 'foreign key',
        references: { 
            table: Campaign_Kpi_Value_Details,
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