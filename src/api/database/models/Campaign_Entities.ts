'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';

import  Campaigns  from "./Campaigns.js";

/**
 * class model
 */
export default class Campaign_Entities extends BaseTableModel {

  //table fields
  declare campaign_id:number;
  declare entity_id:number;
  declare notes:string;


  static id = 16006;
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
    notes:{
      type: DataTypes.TEXT
    }
  }};

  static uniqueFields = [
    'campaign_id',
    'entity_id'
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
 
};