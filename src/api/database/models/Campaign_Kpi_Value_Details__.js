'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Campaign_Kpi_Value_Getters } = require("./Campaign_Kpi_Value_Getters");
const { Entities_Types } = require("./Entities_Types");

/**
 * class model
 */
class Campaign_Kpi_Value_Details extends BaseTableModel {
  static id = 16005;
  static tableName = this.name.toLowerCase();
  static model = null;

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
      type: DataTypes.INTEGER(1),
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
        [Sequelize.Op.in]: [0,1]
      }
    }
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['campaign_kpi_value_getters_id'],
    type: 'foreign key',
    references: { 
        table: Campaign_Kpi_Value_Getters,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },{
    fields: ['entity_type_id'],
    type: 'foreign key',
    references: { 
        table: Entities_Types,
        field: 'id'
    },
    onUpdate: 'cascade'
  }]];
 
};


module.exports = {Campaign_Kpi_Value_Details}