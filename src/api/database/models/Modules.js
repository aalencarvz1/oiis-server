'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const modulesJson = require("../catalogs/modules.json");


/**
 * class model
 */
class Modules extends BaseTableModel {
  static id = 230;
  static tableName = this.name.toLowerCase();
  static model = null;

  static WMS = modulesJson.find((el) => el.name == "WMS")?.id;
  static LOGISTIC = modulesJson.find((el) => el.name == "LOGISTIC")?.id;

  static fields = {
    ...Modules.getBaseTableModelFields(),...{     
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      }, 
      icon: {
        type: DataTypes.TEXT
      }, 
      path: {
        type: DataTypes.STRING(2000)
      },  
      numeric_order: {
        type: DataTypes.BIGINT.UNSIGNED
      },   
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [ 
    'name'
  ];

  static constraints = [...(Modules.getBaseTableModelConstraints() || []),...[
    {
      name: Modules.tableName + '_u1',
      fields: [...Modules.getBaseTableModelUniqueFields(),...Modules.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Modules}