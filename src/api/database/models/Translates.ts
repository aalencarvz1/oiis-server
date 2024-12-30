'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Languages from "./Languages.js";
import Texts from "./Texts.js";


/**
 * class model
 */
export default class Translates extends BaseTableModel {

  //table fields
  declare language_id:number;
  declare text_id:number;
  declare translated:string;


  static id = 250;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Translates.getBaseTableModelFields(),...{     
      language_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      text_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      translated: {
        type: DataTypes.STRING(2000),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'language_id',
    'text_id'
  ];

  static constraints = [...(Translates.getBaseTableModelConstraints() || []),...[
    {
      name: Translates.tableName + '_u1',
      fields: [...Translates.getBaseTableModelUniqueFields(),...Translates.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['language_id'],
      type: 'foreign key',
      references: { 
          table: Languages,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['text_id'],
      type: 'foreign key',
      references: { 
          table: Texts,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};
