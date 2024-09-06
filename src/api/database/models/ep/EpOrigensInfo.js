'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseEpTableModel } = require('./BaseEpTableModel');

/**
 * class model
 */
class EpOrigensInfo extends BaseEpTableModel {
  static id = 40002;
  static model = null;


  static fields = {      
    	COD:{
			type: DataTypes.INTEGER,
			primaryKey:true
		},
		NOME:{
			type: DataTypes.STRING(1000)
		},
		CODSTATUSREG:{
			type: DataTypes.INTEGER
		},
  };

  static foreignsKeys = []; 
};


module.exports = {EpOrigensInfo}