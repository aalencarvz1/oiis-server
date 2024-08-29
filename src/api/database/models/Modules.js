'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const modulesJson = require("../catalogs/modules.json");


/**
 * class model
 */
class Modules extends BaseTableModel {
  static ID = 230;
  static model = null;

  static WMS = modulesJson.find((el) => el.NAME == "WMS")?.ID;
  static LOGISTIC = modulesJson.find((el) => el.NAME == "LOGISTIC")?.ID;

  static fields = {
    ...Modules.getBaseTableModelFields(),...{     
      IDSUP: {
        type: DataTypes.BIGINT.UNSIGNED
      }, 
      NAME: {
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
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [ 
    Sequelize.literal(`(COALESCE(IDSUP,0))`),  
    'NAME'
  ];

  static constraints = [...(Modules.getBaseTableModelConstraints() || []),...[
    {
      name: Modules.name.toUpperCase() + '_U1',
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
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Modules}