'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";


/**
 * class model
 */
export default class Languages extends BaseTableModel {

  //table fields
  declare name: string;
  

  static id = 248;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Languages.getBaseTableModelFields(),...{     
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [ 
    'name'
  ];

  static constraints = [...(Languages.getBaseTableModelConstraints() || []),...[
    {
      name: Languages.tableName + '_u1',
      fields: [...Languages.getBaseTableModelUniqueFields(),...Languages.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};
