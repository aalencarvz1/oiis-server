'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Identifier_Types  from "./Identifier_Types.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Movement_Groups extends BaseTableModel {

  //table fields
  declare identifier_type_id: number;
  declare identifier: string;

  static id = 9011;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Movement_Groups.getBaseTableModelFields(),...{           
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      identifier:{
        type: DataTypes.STRING(256)
      }
    }
  };
  
  static uniqueFields = [
    Sequelize.literal(`(COALESCE(identifier_type_id,0))`),
    Sequelize.literal(`(COALESCE(identifier,'NULL'))`)
  ];

  static constraints = [...(Movement_Groups.getBaseTableModelConstraints() || []),...[
    {
      name: Movement_Groups.tableName + '_u1',
      fields: [...Movement_Groups.getBaseTableModelUniqueFields(),...Movement_Groups.uniqueFields],
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
        fields: ['identifier_type_id'],
        type: 'foreign key',
        references: { 
            table: Identifier_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

};