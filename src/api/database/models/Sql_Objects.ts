'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Sql_Object_Types  from "./Sql_Object_Types.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Sql_Objects extends BaseTableModel {
   
  //table fields
  declare sql_object_type_id: number;
  declare name: string;
  declare description: string;


  static id = 10004;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Sql_Objects.getBaseTableModelFields(),...{            
      sql_object_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false
      }, 
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [ 
    'sql_object_type_id',
    'name'
  ];

  static constraints = [...(Sql_Objects.getBaseTableModelConstraints() || []),...[
    {
      name: Sql_Objects.tableName + '_u1',
      fields: [...Sql_Objects.getBaseTableModelUniqueFields(),...Sql_Objects.uniqueFields],
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
        fields: ['sql_object_type_id'],
        type: 'foreign key',
        references: { 
            table: Sql_Object_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

};