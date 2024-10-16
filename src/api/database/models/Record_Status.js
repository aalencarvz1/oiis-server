'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

/**
 * class model
 */
class Record_Status extends BaseTableModel {
  static id = 65;
  static tableName = this.name.toLowerCase();
  static model = null;

  static ACTIVE = 1;
  static INACTIVE = 2;

  static fields = {
    ...Record_Status.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      is_active: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Record_Status.getBaseTableModelConstraints() || []),...[
    {
      name: Record_Status.tableName + '_u1',
      fields: [...Record_Status.getBaseTableModelUniqueFields(),...Record_Status.uniqueFields],
      type:"unique"
    },{
      name: Record_Status.tableName + '_c_1',
      fields:['is_active'],
      type:"check",
      where:{
        is_active: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};

module.exports = { Record_Status };
