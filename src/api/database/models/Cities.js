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
      state_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      sigla:{
        type: DataTypes.STRING(10)
      },
      population:{
        type: DataTypes.INTEGER
      },
      latitude:{
        type: DataTypes.DECIMAL(18,10)
      },
      longitude:{
        type: DataTypes.DECIMAL(18,10)
      }
    }
  };
  
  static uniqueFields = [
    'state_id',
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
      fields: ['state_id'],
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