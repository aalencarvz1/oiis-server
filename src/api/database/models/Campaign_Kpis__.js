'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Campaigns } = require("./Campaigns__");
const { toDefaultValue } = require("sequelize/lib/utils");
const { Measurement_Units } = require("./Measurement_Units");

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
      allowNull: false,
      defaultValue:0
     },
    name:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    measurement_unit_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: Measurement_Units.KG
    },
    description:{
      type: DataTypes.TEXT
    },    
    conditions:{
      type: DataTypes.TEXT,      
    },
    is_participation_criterion:{
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue:0
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
  },{
    name: Campaign_Kpis.tableName + '_c_2',
    fields:['is_participation_criterion'],
    type:"check",
    where:{
      is_participation_criterion: {
            [Sequelize.Op.in]: [0,1]
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
  },{
    fields: ['measurement_unit_id'],
    type: 'foreign key',
    references: { 
        table: Measurement_Units,
        field: 'id'
    },
    onUpdate: 'cascade'
  }]]; 
};


module.exports = {Campaign_Kpis}