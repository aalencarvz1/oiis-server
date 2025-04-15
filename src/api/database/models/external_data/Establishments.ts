'use strict';


import { DataTypes } from "sequelize";
import  BaseExternalDataTableModel  from './BaseExternalDataTableModel.js';
import  Businesses  from "./Businesses.js";
import  Reasons  from "./Reasons.js";
import  Countries  from "./Countries.js";
import  Cnaes  from "./Cnaes.js";
import  Cities  from "./Cities.js";


/**
 * class model
 */
export default class Establishments extends BaseExternalDataTableModel {

  //table fields
  declare base_cnpj: number;
  declare order_cnpj: number;
  declare vd_cnpj: number;
  declare matriz_filial: number;
  declare fantasy: string;
  declare register_status_code: number;
  declare register_status_date: Date;
  declare register_status_reason_id: number;
  declare international_city_name: string;
  declare country_id: number;
  declare activity_init_date: Date;
  declare primary_cnae_id: number;
  declare secondary_cnae_id: string;
  declare address_type: string;
  declare address: string;
  declare address_number: string;
  declare complement: string;
  declare neighborhood: string;
  declare postal_code: number;
  declare uf: string;
  declare city_id: number;
  declare phone_area_code_1: number;
  declare phone_1: number;
  declare phone_area_code_2: number;
  declare phone_2: number;
  declare fax_area_code: number;
  declare fax: number;
  declare email: string;
  declare special_status: string;
  declare special_status_date: Date;


  static id = 60013;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  static model = null;

  static fields = {
    base_cnpj: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey:true
    },
    order_cnpj: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      primaryKey:true
    },
    vd_cnpj: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      primaryKey:true
    },
    matriz_filial: {
      type: DataTypes.TINYINT.UNSIGNED
    },
    fantasy:{
      type: DataTypes.STRING(4000)
    },
    register_status_code:{
      type: DataTypes.TINYINT.UNSIGNED,
    },
    register_status_date:{
      type: DataTypes.DATE
    },
    register_status_reason_id:{
      type: DataTypes.INTEGER.UNSIGNED
    },
    international_city_name:{
      type: DataTypes.STRING(1000)
    },
    country_id:{
      type: DataTypes.INTEGER.UNSIGNED
    },
    activity_init_date:{
      type: DataTypes.DATE
    },
    primary_cnae_id:{
      type: DataTypes.INTEGER.UNSIGNED
    },
    secondary_cnae_id:{
      type: DataTypes.STRING(4000),
    },
    address_type:{
      type: DataTypes.STRING(1000)
    },
    address:{
      type: DataTypes.STRING(4000)
    },
    address_number:{
      type: DataTypes.STRING(4000)
    },
    complement:{
      type: DataTypes.STRING(4000)
    },
    neighborhood:{
      type: DataTypes.STRING(4000)
    },
    postal_code:{
      type: DataTypes.INTEGER.UNSIGNED
    },
    uf:{
      type: DataTypes.STRING(4000)
    },
    city_id:{
      type: DataTypes.INTEGER.UNSIGNED
    },
    phone_area_code_1:{
      type: DataTypes.INTEGER.UNSIGNED
    },
    phone_1:{
      type: DataTypes.INTEGER.UNSIGNED
    },
    phone_area_code_2:{
      type: DataTypes.INTEGER.UNSIGNED
    },
    phone_2:{
      type: DataTypes.INTEGER.UNSIGNED
    },
    fax_area_code:{
      type: DataTypes.INTEGER.UNSIGNED
    },
    fax:{
      type: DataTypes.INTEGER.UNSIGNED
    },
    email:{
      type: DataTypes.STRING(50)
    },
    special_status:{
      type: DataTypes.STRING(50)
    },
    special_status_date:{
      type: DataTypes.DATE
    }
  };
  
  static uniqueFields = [
    'base_cnpj',
    'order_cnpj',
    'vd_cnpj'
  ];  

  static constraints = [{
    name: Establishments.tableName + '_u1',
    fields: [...Establishments.getBaseTableModelUniqueFields(),...Establishments.uniqueFields],
    type:"unique"
  }];

  static foreignsKeys = [{
    fields: ['base_cnpj'],
    type: 'foreign key',
    references: { 
        table: Businesses,
        field: 'base_cnpj'
    },    
    onUpdate: 'cascade',
    onDelete: 'restrict'
  },{
    fields: ['register_status_reason_id'],
    type: 'foreign key',
    references: { 
        table: Reasons,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'restrict'
  },{
    fields: ['country_id'],
    type: 'foreign key',
    references: { 
        table: Countries,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'restrict'
  },{
    fields: ['primary_cnae_id'],
    type: 'foreign key',
    references: { 
        table: Cnaes,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'restrict'
  },{
    fields: ['secondary_cnae_id'],
    type: 'foreign key',
    references: { 
        table: Cnaes,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'restrict'
  },{
    fields: ['city_id'],
    type: 'foreign key',
    references: { 
        table: Cities,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'restrict'
  }];    
};

