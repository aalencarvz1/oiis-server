'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  States  from "./States.js";

/**
 * class model
 */
export default class Cities extends BaseTableModel {

  //table fields
  declare state_id: number;
  declare name: string;
  declare sigla: string;
  declare population: number;
  declare latitude: number;
  declare longitude: number;



  static id = 2003;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Cities.getBaseTableModelFields(),...{           
      state_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      sigla:{
        type: DataTypes.STRING(10)
      },
      population:{
        type: DataTypes.INTEGER
      },
      latitude:{
        type: DataTypes.DECIMAL(18,10)
      },
      longitude:{
        type: DataTypes.DECIMAL(18,10)
      }
    }
  };
  
  static uniqueFields = [
    'state_id',
    'name'
  ];

  static constraints = [...(Cities.getBaseTableModelConstraints() || []),...[
    {
      name: Cities.tableName + '_u1',
      fields: [...Cities.getBaseTableModelUniqueFields(),...Cities.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['state_id'],
      type: 'foreign key',
      references: { 
          table: States,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};