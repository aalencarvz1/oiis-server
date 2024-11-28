'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Requirements_Types extends BaseTableModel {
  static id = 15019;
  static tableName = this.name.toLowerCase();
  static model = null;

  static FUNCTIONAL = 1;
  static NO_FUNCTIONAL = 2;

  static fields = {
    ...Requirements_Types.getBaseTableModelFields(),...{            
      parent_id: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT
      },
      anotations: {
        type: DataTypes.TEXT
      },
      is_functional: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 1
      },
    }
  };
  
  static uniqueFields = [
    Sequelize.literal(`(COALESCE(parent_id,-1))`),
    'name'
  ];

  static constraints = [...(Requirements_Types.getBaseTableModelConstraints() || []),...[{
    name: Requirements_Types.tableName + '_u1',
    fields: Requirements_Types.uniqueFields,
    type:"unique"
  },{
    name: Requirements_Types.tableName + '_c_1',
    fields:['is_functional'],
    type:"check",
    where:{
      is_functional: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['parent_id'],
      type: 'foreign key',
      references: { 
          table: Requirements_Types,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};


module.exports = {Requirements_Types}