'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';

import  Identifier_Types  from "./Identifier_Types.js";
import  Container_Types  from "./Container_Types.js";

/**
 * class model
 */
export default class Containers extends BaseTableModel {

  //table fields
  declare container_type_id: number;
  declare identifier_type_id: number;
  declare identifier: string;
  declare tara: number;
  declare allow_multiple_addresses: number;
  declare observations: string;


  static id = 8015;
  static tableName = this.name.toLowerCase();
  

  static WITHOUT_CONTEINER = 1;

  static fields = {
    ...Containers.getBaseTableModelFields(),...{           
      container_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      tara:{
        type: DataTypes.DECIMAL(32,10)
      },
      allow_multiple_addresses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      observations:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'container_type_id',
    'identifier_type_id',
    'identifier'
  ];

  static constraints = [...(Containers.getBaseTableModelConstraints() || []),...[
    {
      name: Containers.tableName + '_u1',
      fields: [...Containers.getBaseTableModelUniqueFields(),...Containers.uniqueFields],
      type:"unique"
    },{
      name: Containers.tableName + '_c_1',
      fields:['allow_multiple_addresses'],
      type:"check",
      where:{
        allow_multiple_addresses: {
              [Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['container_type_id'],
      type: 'foreign key',
      references: { 
          table: Container_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['identifier_type_id'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};