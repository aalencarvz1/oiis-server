'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";



/**
 * class model
 */
export default class Processes extends BaseTableModel {

  //table fields
  declare name: string;
  declare description: string;
  
  
  static id = 200;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Processes.getBaseTableModelFields(),...{      
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
    'name'
  ];

  static constraints = [...(Processes.getBaseTableModelConstraints() || []),...[
    {
      name: Processes.tableName + '_u1',
      fields: [...Processes.getBaseTableModelUniqueFields(),...Processes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};
