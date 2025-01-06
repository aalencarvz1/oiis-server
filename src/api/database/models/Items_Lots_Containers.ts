'use strict';

import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Lots  from "./Lots.js";
import  Items  from "./Items.js";
import  Containers  from "./Containers.js";


/**
 * class model
 */
export default class Items_Lots_Containers extends BaseTableModel {

  //table fields
  declare item_id: number;
  declare lot_id: number;
  declare container_id: number;
  declare observations: string;



  static id = 8020;
  static tableName = this.name.toLowerCase();
  

  static WITHOUT_CONTEINER = 1;

  static fields = {
    ...Items_Lots_Containers.getBaseTableModelFields(),...{           
      item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      lot_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      container_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'item_id',
    'lot_id',
    'container_id'
  ];

  static constraints = [...(Items_Lots_Containers.getBaseTableModelConstraints() || []),...[
    {
      name: Items_Lots_Containers.tableName + '_u1',
      fields: [...Items_Lots_Containers.getBaseTableModelUniqueFields(),...Items_Lots_Containers.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['item_id'],
      type: 'foreign key',
      references: { 
          table: Items,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['lot_id'],
      type: 'foreign key',
      references: { 
          table: Lots,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['container_id'],
      type: 'foreign key',
      references: { 
          table: Containers,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  

  

};