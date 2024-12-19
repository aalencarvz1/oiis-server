'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Campaigns } = require("./Campaigns");

/**
 * class model
 */
class Campaign_Entities extends BaseTableModel {
  static id = 16006;
  static tableName = this.name.toLowerCase();
  static model = null;

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


module.exports = {Campaign_Entities}