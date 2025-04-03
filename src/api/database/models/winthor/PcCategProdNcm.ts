'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcCategProdNcm extends BaseWinthorTableModel {

  //table fields
  declare ID: string;
  declare PARENT_ID?: string;
  declare NAME: string;

  static id = 30225;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
    ID: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false		
    },
    PARENT_ID: {
      type: DataTypes.STRING(22),
      defaultValue: null 	
    },
    NAME: {
      type: DataTypes.STRING(255),
      allowNull: false		
    },
  };

  static foreignsKeys = [{
    fields: ['PARENT_ID'],
    type: 'foreign key',
    references: { 
      table: PcCategProdNcm,
      field: 'ID'
    }
  }];
};