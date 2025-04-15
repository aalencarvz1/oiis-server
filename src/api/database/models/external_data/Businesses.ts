'use strict';


import { DataTypes } from "sequelize";
import  BaseExternalDataTableModel  from './BaseExternalDataTableModel.js';
import  Legal_Natures  from "./Legal_Natures.js";
import  Responsible_Person_Qualifications  from "./Responsible_Person_Qualifications.js";
import Utils from "../../../controllers/utils/Utils.js";



/**
 * class model
 */
export default class Businesses extends BaseExternalDataTableModel {

  //table fields
  declare base_cnpj: number;
  declare name: string;
  declare legal_nature_id: number;
  declare responsible_person_qualification_id: number;
  declare share_capital: number;
  declare company_size_code: number;
  declare responsible_federal_entity: string;


  static id = 60012;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;

  static fields = {
    base_cnpj: {
      type: DataTypes.INTEGER.UNSIGNED,
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
      type: DataTypes.INTEGER.UNSIGNED,
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

  static foreignsKeys : any[] = [];
    
  static getForeignKeys(): any[] {
    //Utils.logi(this.name,'getForeignKeys');
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      result = super.getForeignKeys();     
      result.push({
        fields: ['legal_nature_id'],
        type: 'foreign key',
        references: { 
            table: Legal_Natures,
            field: 'id'
        },    
        onUpdate: 'cascade',
        onDelete: 'restrict'
      });
      result.push({
        fields: ['responsible_person_qualification_id'],
        type: 'foreign key',
        references: { 
            table: Responsible_Person_Qualifications,
            field: 'id'
        },    
        onUpdate: 'cascade',
        onDelete: 'restrict'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

};

