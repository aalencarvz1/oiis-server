'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';

import  Continents  from "./Continents.js";

/**
 * class model
 */
export default class Countries extends BaseTableModel {

  //table fields
  declare continent_id: number;
  declare name: string;
  declare sigla: string;



  static id = 2001;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Countries.getBaseTableModelFields(),...{           
      continent_id:{
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
    'continent_id',
    'name'
  ];

  static constraints = [...(Countries.getBaseTableModelConstraints() || []),...[
    {
      name: Countries.tableName + '_u1',
      fields: [...Countries.getBaseTableModelUniqueFields(),...Countries.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['continent_id'],
      type: 'foreign key',
      references: { 
          table: Continents,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};