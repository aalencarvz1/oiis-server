'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Packagings  from "./Packagings.js";
import  Suppliers  from "./Suppliers.js";


/**
 * class model
 */
export default class Packs_X_Packs_Origins extends BaseTableModel {

  //table fields
  declare supplier_id: number;
  declare origin_packaging: string;
  declare packaging_id: number;


  static id = 30800;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Packs_X_Packs_Origins.getBaseTableModelFields(),...{                 
      /*data_origin_id:{
        type: DataTypes.BIGINT.UNSIGNED
      }, already exists*/
      supplier_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      origin_packaging:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      packaging_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    Sequelize.literal(`(COALESCE(supplier_id,0))`),  
    'origin_packaging'
  ];

  static constraints = [...(Packs_X_Packs_Origins.getBaseTableModelConstraints() || []),...[
    {
      name: Packs_X_Packs_Origins.tableName + '_u1',
      fields: [...Packs_X_Packs_Origins.getBaseTableModelUniqueFields(),...Packs_X_Packs_Origins.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    /*{
      fields: ['data_origin_id'],
      type: 'foreign key',
      references: { 
          table: Data_Origins,
          field: 'id'
      },
      onUpdate: 'cascade'
    },*/
    {
      fields: ['supplier_id'],
      type: 'foreign key',
      references: { 
          table: Suppliers,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['packaging_id'],
      type: 'foreign key',
      references: { 
          table: Packagings,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};