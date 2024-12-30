'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Cities  from "./Cities.js";
import  Street_Types  from "./Street_Types.js";

/**
 * class model
 */
export default class Streets extends BaseTableModel {

  //table fields
  declare street_type_id: number;
  declare city_id: number;
  declare name: string;


  static id = 2006;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Streets.getBaseTableModelFields(),...{           
      street_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue: Street_Types.STREET
      },
      city_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'street_type_id',
    'city_id',
    'name'
  ];

  static constraints = [...(Streets.getBaseTableModelConstraints() || []),...[
    {
      name: Streets.tableName + '_u1',
      fields: [...Streets.getBaseTableModelUniqueFields(),...Streets.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['street_type_id'],
      type: 'foreign key',
      references: { 
          table: Street_Types,
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