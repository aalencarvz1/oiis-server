'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Sql_Object_Types } = require("./Sql_Object_Types");


/**
 * class model
 */
class Sql_Objects extends BaseTableModel {
  static id = 10004;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Sql_Objects.getBaseTableModelFields(),...{            
      IDSQLOBJECTTYPE: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false
      }, 
      parent_id: {
        type: DataTypes.BIGINT.UNSIGNED
      }, 
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [ 
    'IDSQLOBJECTTYPE',
    Sequelize.literal(`(COALESCE(parent_id,0))`),
    'name'
  ];

  static constraints = [...(Sql_Objects.getBaseTableModelConstraints() || []),...[
    {
      name: Sql_Objects.tableName + '_u1',
      fields: Sql_Objects.uniqueFields,
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDSQLOBJECTTYPE'],
      type: 'foreign key',
      references: { 
          table: Sql_Object_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['parent_id'],
      type: 'foreign key',
      references: { 
          table: Sql_Objects,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};


module.exports = {Sql_Objects}