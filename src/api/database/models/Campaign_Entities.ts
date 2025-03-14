'use strict';


import { DataTypes, Sequelize } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';

import  Campaigns  from "./Campaigns.js";

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

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['campaign_id'],
      type: 'foreign key',
      references: { 
          table: Campaigns,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];


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
 
};