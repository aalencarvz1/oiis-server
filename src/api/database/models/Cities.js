'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


const { States } = require("./States");

/**
 * class model
 */
class Cities extends BaseTableModel {
  static id = 2003;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Cities.getBaseTableModelFields(),...{           
      IDSTATE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      SIGLA:{
        type: DataTypes.STRING(10)
      },
      POPULATION:{
        type: DataTypes.INTEGER
      },
      LATITUDE:{
        type: DataTypes.DECIMAL(18,10)
      },
      LONGITUDE:{
        type: DataTypes.DECIMAL(18,10)
      }
    }
  };
  
  static uniqueFields = [
    'IDSTATE',
    'name'
  ];

  static constraints = [...(Cities.getBaseTableModelConstraints() || []),...[
    {
      name: Cities.tableName + '_u1',
      fields: [...Cities.getBaseTableModelUniqueFields(),...Cities.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDSTATE'],
      type: 'foreign key',
      references: { 
          table: States,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Cities}