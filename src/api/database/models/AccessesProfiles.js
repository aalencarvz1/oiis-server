'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class AccessesProfiles extends BaseTableModel {
  static id = 119;
  static model = null;

  static SYSTEM = 1;
  static DEFAULT = 2;
  static ADMINISTRATIVE = 3;
  static GERENCIAL = 4;
  static SUPERVISOR = 5;
  static INVOICING = 10;
  static FINANCIAL = 20;  
  static SELLER = 50;  
  static SUPLIER = 60;  

  static fields = {
    ...AccessesProfiles.getBaseTableModelFields(),...{           
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
      ALLOWACESSALLROUTINESOFMODULE: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];  

  static constraints = [...(AccessesProfiles.getBaseTableModelConstraints() || []),...[
    {
      name: AccessesProfiles.name.toLowerCase() + '_u1',
      fields: [...AccessesProfiles.getBaseTableModelUniqueFields(),...AccessesProfiles.uniqueFields],
      type:"unique"
    },{
      name: AccessesProfiles.name.toLowerCase() + '_c_1',
      fields:['ALLOWACESSALLROUTINESOFMODULE'],
      type:"check",
      where:{
        ALLOWACESSALLROUTINESOFMODULE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];  
  
};


module.exports = {AccessesProfiles}

