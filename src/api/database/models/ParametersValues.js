'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Parameters } = require("./Parameters");

/**
 * class model
 */
class ParametersValues extends BaseTableModel {
  static id = 56;
  static tableName = this.name.toLowerCase();
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
      description: {
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
      name: ParametersValues.tableName + '_u1',
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
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];

  static async get(pIdParameter) {
    let result = null;
    result = await ParametersValues.getModel().findOne({
      raw:true,
      attributes:[Sequelize.literal(`${ParametersValues.tableName}.*`)],
      where:{IDPARAMETER:pIdParameter}
    });
    if (result) {
      result = result.VALUE;
    }
    return result;
  }
};




module.exports = {ParametersValues}