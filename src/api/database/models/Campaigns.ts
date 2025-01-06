'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Entities_Types  from "./Entities_Types.js";

/**
 * class model
 */
export default class Campaigns extends BaseTableModel {

  //table fields
  declare name: string;
  declare description: string;
  declare init_date: Date;
  declare end_date: Date;
  declare entity_type_id: number;
  declare conditions: string;



  static id = 16000;
  static tableName = this.name.toLowerCase();
  

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