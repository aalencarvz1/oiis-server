'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Cities  from "./Cities.js";
import  Address_Types  from "./Address_Types.js";

/**
 * class model
 */
export default class Postal_Codes extends BaseTableModel {

  //table fields
  declare postal_code: string;
  declare address_type_id: number;
  declare city_id: number;
  declare complement: string;

  
  static id = 2008;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Postal_Codes.getBaseTableModelFields(),...{           
      postal_code:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      address_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      city_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      complement:{
        type: DataTypes.STRING(2000)
      }
    }
  };
  
  static uniqueFields = [
    'postal_code',
    'address_type_id',
    'city_id'
  ];

  static constraints = [...(Postal_Codes.getBaseTableModelConstraints() || []),...[
    {
      name: Postal_Codes.tableName + '_u1',
      fields: [...Postal_Codes.getBaseTableModelUniqueFields(),...Postal_Codes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['address_type_id'],
      type: 'foreign key',
      references: { 
          table: Address_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['city_id'],
      type: 'foreign key',
      references: { 
          table: Cities,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};