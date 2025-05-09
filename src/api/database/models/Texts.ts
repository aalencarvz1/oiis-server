'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Languages from "./Languages.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Texts extends BaseTableModel {

  //table fields 
  declare language_id: number;
  declare text: string;


  static id = 249;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Texts.getBaseTableModelFields(),...{     
      language_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      text: {
        type: DataTypes.STRING(500),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'language_id',
    'text'
  ];

  static constraints = [...(Texts.getBaseTableModelConstraints() || []),...[
    {
      name: Texts.tableName + '_u1',
      fields: [...Texts.getBaseTableModelUniqueFields(),...Texts.uniqueFields],
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
        onUpdate: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

};
