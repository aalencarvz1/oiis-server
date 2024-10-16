'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Parameters } = require("./Parameters");

/**
 * class model
 */
class Parameter_Values extends BaseTableModel {
  static id = 56;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Parameter_Values.getBaseTableModelFields(),...{
      parameter_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false,
      },
      value: {
        type: DataTypes.STRING(256)
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'parameter_id',
    Sequelize.literal(`(COALESCE(value,'NULL'))`)
  ];

  static constraints = [...(Parameter_Values.getBaseTableModelConstraints() || []),...[
    {
      name: Parameter_Values.tableName + '_u1',
      fields: [...Parameter_Values.getBaseTableModelUniqueFields(),...Parameter_Values.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['parameter_id'],
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
    result = await Parameter_Values.getModel().findOne({
      raw:true,
      attributes:[Sequelize.literal(`${Parameter_Values.tableName}.*`)],
      where:{parameter_id:pIdParameter}
    });
    if (result) {
      result = result.value;
    }
    return result;
  }
};




module.exports = {Parameter_Values}