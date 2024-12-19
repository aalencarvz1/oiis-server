'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Campaign_Kpi_Value_Getters } = require("./Campaign_kpi_value_getters");

/**
 * class model
 */
class Campaign_Kpi_Value_Detail extends BaseTableModel {
  static id = 16005;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Campaign_Kpi_Value_Detail.getBaseTableModelFields(),...{            
      
      campaign_kpi_value_getters_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue:0
       },
      entity_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      is_no_seller:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
       expression:{
        type: DataTypes.TEXT,
      }
    

  }};

  static uniqueFields = [
    
  ];

  static constraints = [...(Campaign_Kpi_Value_Detail.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpi_Value_Detail.tableName + '_u1',
    fields: [...Campaign_Kpi_Value_Detail.getBaseTableModelUniqueFields(),...Campaign_Kpi_Value_Detail.uniqueFields],
    type:"unique"
  }
  ,{
    name: Campaign_Kpi_Value_Detail.tableName + '_c_2',
    fields:['is_no_seller'],
    type:"check",
    where:{
      is_no_seller: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  }
]];

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


module.exports = {Campaign_Kpi_Value_Detail}