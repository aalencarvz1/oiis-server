'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { Companies } = require("./Companies");
const { BasePeopleModel } = require("./BasePeopleModel");

/**
 * class model
 */
class Business_Units extends BasePeopleModel {
  static id = 3001;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...(Business_Units.getBaseTableModelFields() || {}),
    ...{           
      IDCOMPANY:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Business_Units.getBaseTableModelConstraints() || []),...[
    {
      name: Business_Units.tableName + '_u1',
      fields: [...Business_Units.getBaseTableModelUniqueFields(),...Business_Units.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.defaultPeopleForeignsKeys || []),...[
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


module.exports = {Business_Units}