'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";



/**
 * class model
 */
export default class Gtin_Types extends BaseTableModel {

  //table fields
  declare name:  string;
  declare characters: number;
  declare description: string;


  static id = 8007;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  

  static UNDEFINED = 1;
  static GTIN8 = 8;
  static GTIN12 = 12;
  static GTIN13 = 13;
  static GTIN14 = 14;

  static fields = {
    ...Gtin_Types.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      characters: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name',
    Sequelize.literal(`(COALESCE(characters,0))`)
  ];

  static constraints = [...(Gtin_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Gtin_Types.tableName + '_u1',
      fields: [...Gtin_Types.getBaseTableModelUniqueFields(),...Gtin_Types.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys : any[] = [];
    
};