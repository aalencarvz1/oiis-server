'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Postal_Codes  from "./Postal_Codes.js";
import  Postal_Codes_Streets  from "./Postal_Codes_Streets.js";

/**
 * class model
 */
export default class Postal_Codes_Paths extends BaseTableModel {

  //table fields
  declare postal_code_id: number;
  declare postal_code_street_id: number;
  declare latitude: number;
  declare longitude: number;
  declare start_number: string;
  declare end_number: string;


  static id = 2010;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Postal_Codes_Paths.getBaseTableModelFields(),...{                 
      postal_code_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      postal_code_street_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      latitude:{
        type: DataTypes.DECIMAL(18,10)
      },
      longitude:{
        type: DataTypes.DECIMAL(18,10)
      },
      start_number:{
        type: DataTypes.STRING(256)
      },
      end_number:{
        type: DataTypes.STRING(256)
      }
    }
  };
  
  static uniqueFields = [
    'postal_code_id',
    Sequelize.literal(`(COALESCE(postal_code_street_id,0))`),
    Sequelize.literal(`(COALESCE(latitude,0))`),
    Sequelize.literal(`(COALESCE(longitude,0))`),
    Sequelize.literal(`(COALESCE(start_number,'NULL'))`),
    Sequelize.literal(`(COALESCE(end_number,'NULL'))`),
  ];

  static constraints = [...(Postal_Codes_Paths.getBaseTableModelConstraints() || []),...[
    {
      name: Postal_Codes_Paths.tableName + '_u1',
      fields: [...Postal_Codes_Paths.getBaseTableModelUniqueFields(),...Postal_Codes_Paths.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['postal_code_id'],
      type: 'foreign key',
      references: { 
          table: Postal_Codes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['postal_code_street_id'],
      type: 'foreign key',
      references: { 
          table: Postal_Codes_Streets,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};