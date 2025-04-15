'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Entities_Types  from "./Entities_Types.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Groups extends BaseTableModel {

  //table fields
  declare entity_type_id: number;      
  declare sigla:  string;
  declare name:  string;
  declare description: string;
  declare sql_condiction: string;
  declare observations:string;


  static id = 7006;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Groups.getBaseTableModelFields(),...{              
      entity_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      sigla: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description:{
        type: DataTypes.TEXT
      },
      sql_condiction: {
        type: DataTypes.TEXT
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'sigla'
  ];

  static constraints = [...(Groups.getBaseTableModelConstraints() || []),...[
    {
      name: Groups.tableName + '_u1',
      fields: [...Groups.getBaseTableModelUniqueFields(),...Groups.uniqueFields],
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
        fields: ['entity_type_id'],
        type: 'foreign key',
        references: { 
            table: Entities_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

};
