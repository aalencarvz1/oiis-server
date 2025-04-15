'use strict';


import { DataTypes, Sequelize } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';

import  Campaigns  from "./Campaigns.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Campaign_Entities extends BaseTableModel {

  //table fields
  declare campaign_id:number;
  declare entity_id:number;
  declare alias: string;
  declare init_date: Date;
  declare end_date: Date;
  declare conditions: string;
  declare notes:string;


  static id = 16001;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Campaign_Entities.getBaseTableModelFields(),...{                  
    campaign_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    entity_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    alias:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    init_date:{
      type: DataTypes.DATE
    },
    end_date:{
      type: DataTypes.DATE
    }, 
    conditions:{
      type: DataTypes.TEXT,
    }, 
    notes:{
      type: DataTypes.TEXT
    }
  }};

  static uniqueFields = [
    'campaign_id',
    'entity_id',
    'alias'
  ];

  static constraints = [...(Campaign_Entities.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Entities.tableName + '_u1',
    fields: [...Campaign_Entities.getBaseTableModelUniqueFields(),...Campaign_Entities.uniqueFields],
    type:"unique"
  }]];

  static foreignsKeys : any[] = [];


  /**
   * @override
   */
  static getTableModelHooks = () => {
    return {
        beforeCreate : (record: any, options: any) => {
            record.dataValues.created_at = Sequelize.literal('current_timestamp');//new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');                
            record.dataValues.alias = record.dataValues.alias || record.dataValues.entity_id;
        },
        beforeUpdate : (record: any, options: any) => {
            record.dataValues.updated_at = Sequelize.literal('current_timestamp');//new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');        
            record.dataValues.alias = record.dataValues.alias || record.dataValues.entity_id;
        }
    };
  }
      

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
      result = super.getForeignKeys();    
      result.push({
        fields: ['campaign_id'],
        type: 'foreign key',
        references: { 
            table: Campaigns,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

};