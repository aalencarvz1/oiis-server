'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Languages from "./Languages.js";
import Texts from "./Texts.js";
import Utils from "../../controllers/utils/Utils.js";


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
  static adjustedForeignKeys : boolean = false;
  
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

  

  static foreignsKeys : any[] = [];
    

  /**
   * get the foreign keys avoiding ciclyc imports on BaseTableModel
   * @override
   * @created 2025-04-14
   * @version 1.0.0
   */
  static getForeignKeys(): any[] {
    //Utils.logi(this.name,'getForeignKeys');
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      result = super.getForeignKeys();
      result.push({
        fields: ['language_id'],
        type: 'foreign key',
        references: { 
            table: Languages,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      result.push({
        fields: ['text_id'],
        type: 'foreign key',
        references: { 
            table: Texts,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

};
