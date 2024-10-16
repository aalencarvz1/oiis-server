'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseExternalDataTableModel } = require('./BaseExternalDataTableModel');
const { Businesses } = require("./Businesses");
const { Reasons } = require("./Reasons");
const { Countries } = require("./Countries");
const { Cnaes } = require("./Cnaes");
const { Cities } = require("./Cities");


/**
 * class model
 */
class Establishments extends BaseExternalDataTableModel {
  static id = 60013;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    base_cnpj: {
      type: DataTypes.INTEGER(8).UNSIGNED,
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


module.exports = {Establishments}

