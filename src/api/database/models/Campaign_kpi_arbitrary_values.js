'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Campaign_Kpi_Value_Getters } = require("./Campaign_kpi_value_getters");

/**
 * class model
 */
class Campaign_Kpi_Arbitrary_Values extends BaseTableModel {
  static id = 16004;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Campaign_Kpi_Arbitrary_Values.getBaseTableModelFields(),...{            
      
      campaign_kpi_value_getters_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue:0
       },
      value:{
        type: DataTypes.TEXT,
      }
    

  }};

  static uniqueFields = [
   
  ];

  static constraints = [...(Campaign_Kpi_Arbitrary_Values.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpi_Arbitrary_Values.tableName + '_u1',
    fields: [...Campaign_Kpi_Arbitrary_Values.getBaseTableModelUniqueFields(),...Campaign_Kpi_Arbitrary_Values.uniqueFields],
    type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['campaign_kpi_value_getters_id'],
      type: 'foreign key',
      references: { 
          table: Campaign_Kpi_Value_Getters,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
 
};


module.exports = {Campaign_Kpi_Arbitrary_Values}