'use strict';

const { DataTypes } = require("sequelize");
/*imports*/
const { BasePeopleModel } = require("./BasePeopleModel");
const { Companies } = require("./Companies");
/**
 * class model
 */
class Warehouses extends BasePeopleModel {
  static id = 3002;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...(Warehouses.getBaseTableModelFields() || {}),
    ...{           
      IDCOMPANY:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Warehouses.getBaseTableModelConstraints() || []),...[
    {
      name: Warehouses.tableName + '_u1',
      fields: [...Warehouses.getBaseTableModelUniqueFields(),...Warehouses.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.defaultPeopleForeignsKeys||[] || []),...[
    {
      fields: ['IDCOMPANY'],
      type: 'foreign key',
      references: { 
          table: Companies,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Warehouses}