'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseExternalDataTableModel } = require('./BaseExternalDataTableModel');
const { Legal_Natures } = require("./Legal_Natures");
const { Responsible_Person_Qualifications } = require("./Responsible_Person_Qualifications");



/**
 * class model
 */
class Businesses extends BaseExternalDataTableModel {
  static id = 60012;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    base_cnpj: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      allowNull: false,
      primaryKey:true
    },
    name:{
      type: DataTypes.STRING(4000)
    },
    legal_nature_id:{
      type: DataTypes.BIGINT.UNSIGNED,
    },
    responsible_person_qualification_id: {
      type: DataTypes.BIGINT.UNSIGNED
    },
    share_capital: {
      type: DataTypes.DECIMAL.UNSIGNED
    },
    company_size_code:{
      type: DataTypes.INTEGER(8).UNSIGNED,
    },
    responsible_federal_entity:{
      type: DataTypes.STRING(4000)
    }
  };
  
  static uniqueFields = [
    'base_cnpj'
  ];  

  static constraints = [{
    name: Businesses.tableName + '_u1',
    fields: [Businesses.uniqueFields],
    type:"unique"
  }];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['legal_nature_id'],
    type: 'foreign key',
    references: { 
        table: Legal_Natures,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'restrict'
  },{
    fields: ['responsible_person_qualification_id'],
    type: 'foreign key',
    references: { 
        table: Responsible_Person_Qualifications,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'restrict'
  }]];  
  
};


module.exports = {Businesses}

