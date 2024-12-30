'use strict';


import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";


/**
 * class model
 */
export default class Contexts extends BaseTableModel {
  static id = 4;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Contexts.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Contexts.getBaseTableModelConstraints() || []),...[
    {
      name: Contexts.tableName + '_u1',
      fields: [...Contexts.getBaseTableModelUniqueFields(),...Contexts.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
   
};
