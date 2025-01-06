'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";


/**
 * class model
 */
export default class Relationship_Types extends BaseTableModel {

  //table fields
  declare name: string;
  declare description: string;


  static id = 1000;
  static tableName = this.name.toLowerCase();
  

  static RELATIONSHIP = 1;
  static IDENTIFIER = 2;  
  static SUBORDINATED = 10;
  static WINTHOR_ID = 11;
  static EP_ID = 12;

  static fields = {
    ...Relationship_Types.getBaseTableModelFields(),...{     
      name:{
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

  static constraints = [...(Relationship_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Relationship_Types.tableName + '_u1',
      fields: [...Relationship_Types.getBaseTableModelUniqueFields(),...Relationship_Types.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};
