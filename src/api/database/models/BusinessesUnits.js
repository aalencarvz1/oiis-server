'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { Companies } = require("./Companies");
const { BasePeopleModel } = require("./BasePeopleModel");

/**
 * class model
 */
class BusinessesUnits extends BasePeopleModel {
  static id = 3001;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...(BusinessesUnits.getBaseTableModelFields() || {}),
    ...{           
      IDCOMPANY:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(BusinessesUnits.getBaseTableModelConstraints() || []),...[
    {
      name: BusinessesUnits.tableName + '_u1',
      fields: [...BusinessesUnits.getBaseTableModelUniqueFields(),...BusinessesUnits.uniqueFields],
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


module.exports = {BusinessesUnits}