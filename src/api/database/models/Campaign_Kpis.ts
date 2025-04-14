'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Campaigns  from "./Campaigns.js";
import  Measurement_Units  from "./Measurement_Units.js";

/**
 * class model
 */
export default class Campaign_Kpis extends BaseTableModel {

  //table fields
  declare campaign_id:number;
  declare name: string;
  declare description: string;    
  declare conditions:string;
  declare is_visible: number;
  declare order_num: number;
  declare notes:string;



  static id = 16005;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Campaign_Kpis.getBaseTableModelFields(),...{            
    campaign_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue:0
     },
    name:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description:{
      type: DataTypes.TEXT
    },    
    conditions:{
      type: DataTypes.TEXT,      
    },
    is_visible:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:1
    },
    order_num:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:1
    },
    notes:{
      type: DataTypes.TEXT,      
    },
  }};

  static uniqueFields = [
    'campaign_id',
    'name'
  ];

  static constraints = [...(Campaign_Kpis.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpis.tableName + '_u1',
    fields: [...Campaign_Kpis.getBaseTableModelUniqueFields(),...Campaign_Kpis.uniqueFields],
    type:"unique"    
  },{
    name: Campaign_Kpis.tableName + '_c_1',
    fields:['is_visible'],
    type:"check",
    where:{
      is_visible: {
        [Op.in]: [0,1]
      }
    }
  }
]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['campaign_id'],
    type: 'foreign key',
    references: { 
        table: Campaigns,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
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