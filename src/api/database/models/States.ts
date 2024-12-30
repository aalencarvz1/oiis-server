'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';

import  Countries  from "./Countries.js";

/**
 * class model
 */
export default class States extends BaseTableModel {

  //table fields
  declare country_id: number;
  declare name: string;
  declare sigla: string;


  static id = 2002;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...States.getBaseTableModelFields(),...{           
      country_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      sigla:{
        type: DataTypes.STRING(10)
      }
    }
  };
  
  static uniqueFields = [
    'country_id',
    'name'
  ];

  static constraints = [...(States.getBaseTableModelConstraints() || []),...[
    {
      name: States.tableName + '_u1',
      fields: [...States.getBaseTableModelUniqueFields(),...States.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['country_id'],
      type: 'foreign key',
      references: { 
          table: Countries,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};