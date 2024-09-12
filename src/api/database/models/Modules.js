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
      IDSUP: {
        type: DataTypes.BIGINT.UNSIGNED
      }, 
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      }, 
      ICON: {
        type: DataTypes.TEXT
      }, 
      PATH: {
        type: DataTypes.STRING(2000)
      },  
      ORDERNUM: {
        type: DataTypes.BIGINT.UNSIGNED
      },   
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [ 
    Sequelize.literal(`(COALESCE(IDSUP,0))`),  
    'name'
  ];

  static constraints = [...(Modules.getBaseTableModelConstraints() || []),...[
    {
      name: Modules.tableName + '_u1',
      fields: Modules.uniqueFields,
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDSUP'],
      type: 'foreign key',
      references: { 
          table: Modules,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Modules}