'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Campaign_Kpi_Value_Getters  from "./Campaign_Kpi_Value_Getters.js";
import  Entities_Types  from "./Entities_Types.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Campaign_Kpi_Value_Details extends BaseTableModel {

  //table fields
  declare campaign_kpi_value_getters_id: number;
  declare entity_type_id: number;
  declare is_never_selled: number;
  declare notes: string;



  static id = 16008;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Campaign_Kpi_Value_Details.getBaseTableModelFields(),...{                  
    campaign_kpi_value_getters_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    entity_type_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    is_never_selled:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },
    notes:{
      type: DataTypes.TEXT
    }
  }};

  static uniqueFields = [
    'campaign_kpi_value_getters_id',
    'entity_type_id'
  ];

  static constraints = [...(Campaign_Kpi_Value_Details.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpi_Value_Details.tableName + '_u1',
    fields: [...Campaign_Kpi_Value_Details.getBaseTableModelUniqueFields(),...Campaign_Kpi_Value_Details.uniqueFields],
    type:"unique"
  }
  ,{
    name: Campaign_Kpi_Value_Details.tableName + '_c_2',
    fields:['is_never_selled'],
    type:"check",
    where:{
      is_never_selled: {
        [Op.in]: [0,1]
      }
    }
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
        fields: ['campaign_kpi_value_getters_id'],
        type: 'foreign key',
        references: { 
            table: Campaign_Kpi_Value_Getters,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      result.push({
        fields: ['entity_type_id'],
        type: 'foreign key',
        references: { 
            table: Entities_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
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