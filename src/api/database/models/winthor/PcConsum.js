'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcConsum extends BaseWinthorTableModel {
  static id = 30000;
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


module.exports = {PcConsum}