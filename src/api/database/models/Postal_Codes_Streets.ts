'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Streets  from "./Streets.js";
import  NeighborHoods  from "./NeighborHoods.js";
import  Postal_Codes  from "./Postal_Codes.js";

/**
 * class model
 */
export default class Postal_Codes_Streets extends BaseTableModel {

  //table fields
  declare postal_code_id: number;
  declare neighborhood_id: number;
  declare street_id: number;
  declare observations: string;


  static id = 2009;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Postal_Codes_Streets.getBaseTableModelFields(),...{                 
      postal_code_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      neighborhood_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      street_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'postal_code_id',
    'neighborhood_id',
    'street_id'
  ];

  static constraints = [...(Postal_Codes_Streets.getBaseTableModelConstraints() || []),...[
    {
      name: Postal_Codes_Streets.tableName + '_u1',
      fields: [...Postal_Codes_Streets.getBaseTableModelUniqueFields(),...Postal_Codes_Streets.uniqueFields],
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
      fields: ['neighborhood_id'],
      type: 'foreign key',
      references: { 
          table: NeighborHoods,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['street_id'],
      type: 'foreign key',
      references: { 
          table: Streets,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};