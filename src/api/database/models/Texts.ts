'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Languages from "./Languages.js";


/**
 * class model
 */
export default class Texts extends BaseTableModel {

  //table fields 
  declare language_id: number;
  declare text: string;


  static id = 249;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Texts.getBaseTableModelFields(),...{     
      language_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      text: {
        type: DataTypes.STRING(2000),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['language_id'],
      type: 'foreign key',
      references: { 
          table: Languages,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};
