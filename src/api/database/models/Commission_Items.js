'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Commission_Entitiy_Codes } = require("./Commission_Entitiy_Codes");


/**
 * class model
 */
class Commission_Items extends BaseTableModel {
  static id = 9051;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Commission_Items.getBaseTableModelFields(),...{           
      commission_entity_code_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'commission_entity_code_id',
    'name'
  ];

  static constraints = [...(Commission_Items.getBaseTableModelConstraints() || []),...[
    {
      name: Commission_Items.tableName + '_u1',
      fields: [...Commission_Items.getBaseTableModelUniqueFields(),...Commission_Items.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['commission_entity_code_id'],
      type: 'foreign key',
      references: { 
          table: Commission_Entitiy_Codes,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};

module.exports = {Commission_Items}
