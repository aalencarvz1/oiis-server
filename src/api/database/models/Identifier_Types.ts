'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";


/**
 * class model
 */
export default class Identifier_Types extends BaseTableModel {

  //table fiels
  declare name: string;
  declare description: string;
  declare process_to_validate: string;


  static id = 70;
  static tableName = this.name.toLowerCase();
  static model = null;

  static IDENTIFIER = 1;
  static CODE = 2;
  static CNPJ = 3;
  static CPF = 4;
  static CHAVENFE = 5;
  static GTIN = 10;
  static GTINTYPE = 11;
  static PACKAGING = 8001;
  static SUPPLIER = 5000; 
  static VALUE = 20;
  static WINTHORCODE = 30;
  static WINTHORCODEFAB = 31;
  
  static fields = {
    ...Identifier_Types.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      process_to_validate: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Identifier_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Identifier_Types.tableName + '_u1',
      fields: [...Identifier_Types.getBaseTableModelUniqueFields(),...Identifier_Types.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};
