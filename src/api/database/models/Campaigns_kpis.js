'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Campaigns } = require("./Campaigns");

/**
 * class model
 */
class Campaign_Kpis extends BaseTableModel {
  static id = 16001;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Campaign_Kpis.getBaseTableModelFields(),...{            
     campaign_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
     },
      name:{
      type: DataTypes.STRING(255),
      allowNull: false,
     },
     description:{
      type: DataTypes.TEXT
    },
     unity:{
      type: DataTypes.STRING(255),
      allowNull: false,
     },
     conditions:{
      type: DataTypes.TEXT,
      
    },
    participation_criterion:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
     manipulation_kpis:{
      type: DataTypes.TEXT,
    }
    

  }};

  static uniqueFields = [
    'name',
    'unity'
  ];

  static constraints = [...(Campaign_Kpis.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpis.tableName + '_u1',
    fields: [...Campaign_Kpis.getBaseTableModelUniqueFields(),...Campaign_Kpis.uniqueFields],
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


module.exports = {Campaign_Kpis}