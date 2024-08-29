'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Cities } = require("./Cities");
const { StreetTypes } = require("./StreetTypes");

/**
 * class model
 */
class Streets extends BaseTableModel {
  static ID = 2006;
  static model = null;
  static fields = {
    ...Streets.getBaseTableModelFields(),...{           
      IDSTREETTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue: StreetTypes.STREET
      },
      IDCITY:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'IDSTREETTYPE',
    'IDCITY',
    'NAME'
  ];

  static constraints = [...(Streets.getBaseTableModelConstraints() || []),...[
    {
      name: Streets.name.toUpperCase() + '_U1',
      fields: [...Streets.getBaseTableModelUniqueFields(),...Streets.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDSTREETTYPE'],
      type: 'foreign key',
      references: { 
          table: StreetTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCITY'],
      type: 'foreign key',
      references: { 
          table: Cities,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Streets}