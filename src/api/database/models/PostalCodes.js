'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Cities } = require("./Cities");
const { AddressesTypes } = require("./AddressesTypes");

/**
 * class model
 */
class PostalCodes extends BaseTableModel {
  static ID = 2008;
  static model = null;
  static fields = {
    ...PostalCodes.getBaseTableModelFields(),...{           
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

  static constraints = [...(PostalCodes.getBaseTableModelConstraints() || []),...[
    {
      name: PostalCodes.name.toUpperCase() + '_U1',
      fields: [...PostalCodes.getBaseTableModelUniqueFields(),...PostalCodes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDADDRESSTYPE'],
      type: 'foreign key',
      references: { 
          table: AddressesTypes,
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


module.exports = {PostalCodes}