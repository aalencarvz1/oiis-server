'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';

import  Continents  from "./Continents.js";
import Utils from "../../controllers/utils/Utils.js";

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
  static adjustedForeignKeys : boolean = false;
  
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
        fields: ['continent_id'],
        type: 'foreign key',
        references: { 
            table: Continents,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }
};