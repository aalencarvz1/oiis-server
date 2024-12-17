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
      sql_object_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false
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
    'sql_object_type_id',
    'name'
  ];

  static constraints = [...(Sql_Objects.getBaseTableModelConstraints() || []),...[
    {
      name: Sql_Objects.tableName + '_u1',
      fields: [...Sql_Objects.getBaseTableModelUniqueFields(),...Sql_Objects.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['sql_object_type_id'],
      type: 'foreign key',
      references: { 
          table: Sql_Object_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }]];
  
};


module.exports = {Sql_Objects}