'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Continents } = require("./Continents");

/**
 * class model
 */
class Countries extends BaseTableModel {
  static id = 2001;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Countries.getBaseTableModelFields(),...{           
      IDCONTINENT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      SIGLA:{
        type: DataTypes.STRING(10)
      }
    }
  };
  
  static uniqueFields = [
    'IDCONTINENT',
    'name'
  ];

  static constraints = [...(Countries.getBaseTableModelConstraints() || []),...[
    {
      name: Countries.tableName + '_u1',
      fields: [...Countries.getBaseTableModelUniqueFields(),...Countries.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDCONTINENT'],
      type: 'foreign key',
      references: { 
          table: Continents,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Countries}