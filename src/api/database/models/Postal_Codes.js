'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Cities } = require("./Cities");
const { Address_Types } = require("./Address_Types");

/**
 * class model
 */
class Postal_Codes extends BaseTableModel {
  static id = 2008;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Postal_Codes.getBaseTableModelFields(),...{           
      POSTALCODE:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      IDADDRESSTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDCITY:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      COMPLEMENT:{
        type: DataTypes.STRING(2000)
      }
    }
  };
  
  static uniqueFields = [
    'POSTALCODE',
    'IDADDRESSTYPE',
    'IDCITY'
  ];

  static constraints = [...(Postal_Codes.getBaseTableModelConstraints() || []),...[
    {
      name: Postal_Codes.tableName + '_u1',
      fields: [...Postal_Codes.getBaseTableModelUniqueFields(),...Postal_Codes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDADDRESSTYPE'],
      type: 'foreign key',
      references: { 
          table: Address_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCITY'],
      type: 'foreign key',
      references: { 
          table: Cities,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Postal_Codes}