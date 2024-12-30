'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Postal_Codes  from "./Postal_Codes.js";
import  Streets  from "./Streets.js";
import  NeighborHoods  from "./NeighborHoods.js";
import  Address_Types  from "./Address_Types.js";


/**
 * class model
 */
export default class Addresses extends BaseTableModel {

  //table fields
  declare address_type_id: number;
  declare neighborhood_id: number; 
  declare street_id:number; 
  declare postal_code_id:number; 
  declare latitude: number;
  declare longitude: number;
  declare number: number;
  declare complement: string;


  static id = 2011;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Addresses.getBaseTableModelFields(),...{                 
      address_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      neighborhood_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      street_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      postal_code_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      latitude:{
        type: DataTypes.DECIMAL(18,10)
      },
      longitude:{
        type: DataTypes.DECIMAL(18,10)
      },
      number:{
        type: DataTypes.STRING(256)
      },
      complement:{
        type: DataTypes.STRING(2000)
      }
    }
  };
  
  static uniqueFields = [
    'address_type_id',
    Sequelize.literal(`(COALESCE(neighborhood_id,0))`),
    Sequelize.literal(`(COALESCE(street_id,0))`),
    Sequelize.literal(`(COALESCE(postal_code_id,0))`),
    Sequelize.literal(`(COALESCE(latitude,0))`),
    Sequelize.literal(`(COALESCE(longitude,0))`),
    Sequelize.literal(`(COALESCE(number,'NULL'))`)
  ];

  static constraints = [...(Addresses.getBaseTableModelConstraints() || []),...[
    {
      name: Addresses.tableName + '_u1',
      fields: [...Addresses.getBaseTableModelUniqueFields(),...Addresses.uniqueFields],
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
    },
    {
      fields: ['postal_code_id'],
      type: 'foreign key',
      references: { 
          table: Postal_Codes,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};
