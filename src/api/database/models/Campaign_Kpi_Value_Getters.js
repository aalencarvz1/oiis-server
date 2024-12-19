'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const {  Campaign_Kpis } = require("./Campaign_Kpis");


/**
 * class model 
 * armazena o valor de apuracao (A) e valor de comparacao (C) do kpi
 */
class Campaign_Kpi_Value_Getters extends BaseTableModel {
  static id = 16002;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Campaign_Kpi_Value_Getters.getBaseTableModelFields(),...{            
      campaign_kpi_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultvalue:0
      },
      kpi_value_type:{
        type: DataTypes.STRING(1),
        allowNull: false,
        defaultValue: "A" //[A,C] APURACAO, COMPARACAO
      },
      is_arbitrary_value:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_period_value:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      periods_agregation_expression:{
        type: DataTypes.TEXT,
        allowNull: false
      },      
      conditions:{
        type: DataTypes.TEXT,
      }  
  }};

  static uniqueFields = [
    'campaign_kpi_id',
    'kpi_value_type'
  ];

  static constraints = [...(Campaign_Kpi_Value_Getters.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpi_Value_Getters.tableName + '_u1',
    fields: [...Campaign_Kpi_Value_Getters.getBaseTableModelUniqueFields(),...Campaign_Kpi_Value_Getters.uniqueFields],
    type:"unique"
  },{
    name: Campaign_Kpi_Value_Getters.tableName + '_c_1',
    fields:['kpi_value_type'],
    type:"check",
    where:{
      kpi_value_type: {
        [Sequelize.Op.in]: ['A','C']
      }
    }
  },{
    name: Campaign_Kpi_Value_Getters.tableName + '_c_2',
    fields:['is_arbitrary_value'],
    type:"check",
    where:{
      is_arbitrary_value: {
        [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: Campaign_Kpi_Value_Getters.tableName + '_c_3',
    fields:['is_period_value'],
    type:"check",
    where:{
      is_period_value: {
        [Sequelize.Op.in]: [0,1]
      }
    }
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['campaign_kpi_id'],
    type: 'foreign key',
    references: { 
      table: Campaign_Kpis,
      field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade',
  }]];
 
};


module.exports = {Campaign_Kpi_Value_Getters}