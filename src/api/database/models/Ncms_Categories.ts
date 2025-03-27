'use strict';

import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from "./BaseTableModel.js";
import Ncms from "./Ncms.js";


/**
 * class model
 */
export default class Ncms_Categories extends BaseTableModel {

  //table fields
  declare chapter: number;
  declare ncm: number;      
  declare exception: number;
  declare description: string;


  static id = 8011;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Ncms_Categories.getBaseTableModelFields(),...{
      ncm_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name:{
        type: DataTypes.STRING(255),
        allowNull:false
      },
      description:{
        type: DataTypes.TEXT
      },
      notes:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'ncm_id',
    'name'
  ]

  static constraints = [...(Ncms_Categories.getBaseTableModelConstraints() || []),...[{
      name: Ncms_Categories.tableName + '_u1',
      fields: [...Ncms_Categories.getBaseTableModelUniqueFields(),...Ncms_Categories.uniqueFields],
      type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['ncm_id'],
    type: 'foreign key',
    references: { 
        table: Ncms,
        field: 'id'
    },
    onUpdate: 'cascade'
  }]];
  
};