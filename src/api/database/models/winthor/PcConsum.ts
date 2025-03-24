'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcConsum extends BaseWinthorTableModel {

  //table fields
  declare TX: number;
  declare PROXNUMLANC: number;
  declare PROXNUMTRANS: number;


  static id = 30001;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {            
      TX:{
        type: DataTypes.BIGINT,
        primaryKey:true,
        allowNull:false,        
      },
      PROXNUMLANC: {
        type: DataTypes.BIGINT
      },
      PROXNUMTRANS: {
        type: DataTypes.BIGINT
      }
  };
 
};