'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Parameters } = require("./Parameters");

/**
 * class model
 */
class ParametersValues extends BaseTableModel {
  static ID = 56;
  static model = null;

  static fields = {
    ...ParametersValues.getBaseTableModelFields(),...{
      IDPARAMETER: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false,
      },
      VALUE: {
        type: DataTypes.STRING(256)
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDPARAMETER',
    Sequelize.literal(`(COALESCE(VALUE,'NULL'))`)
  ];

  static constraints = [...(ParametersValues.getBaseTableModelConstraints() || []),...[
    {
      name: ParametersValues.name.toUpperCase() + '_U1',
      fields: [...ParametersValues.getBaseTableModelUniqueFields(),...ParametersValues.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDPARAMETER'],
      type: 'foreign key',
      references: { 
          table: Parameters,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];

  static async get(pIdParameter) {
    let result = null;
    result = await ParametersValues.getModel().findOne({
      raw:true,
      attributes:[Sequelize.literal(`${ParametersValues.name.toUpperCase()}.*`)],
      where:{IDPARAMETER:pIdParameter}
    });
    if (result) {
      result = result.VALUE;
    }
    return result;
  }
};




module.exports = {ParametersValues}