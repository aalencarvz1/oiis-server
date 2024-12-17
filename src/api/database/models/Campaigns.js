'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Entities_Types } = require("./Entities_Types");

/**
 * class model
 */
class Campaigns extends BaseTableModel {
  static id = 16000;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Campaigns.getBaseTableModelFields(),...{            
     name:{
      type: DataTypes.STRING(255),
      allowNull: false,
     },
     description:{
      type: DataTypes.TEXT
    },
     init_date:{
      type: DataTypes.DATE,
      allowNull: false,
     },
     end_date:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    entity_type_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    conditions:{
      type: DataTypes.TEXT,
      
    }

  }};

  static uniqueFields = [
    'name',
    'init_date',
    'end_date'
  ];

  static constraints = [...(Campaigns.getBaseTableModelConstraints() || []),...[{
    name: Campaigns.tableName + '_u1',
    fields: [...Campaigns.getBaseTableModelUniqueFields(),...Campaigns.uniqueFields],
    type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['entity_type_id'],
      type: 'foreign key',
      references: { 
          table: Entities_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
 
};


module.exports = {Campaigns}