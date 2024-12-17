'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Connections } = require("./Connections");



/**
 * class model
 */
class Schemas extends BaseTableModel {
  static id = 3;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Schemas.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      default_connection_id: {
        type: DataTypes.BIGINT.UNSIGNED,
      },
      is_default: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Schemas.getBaseTableModelConstraints() || []),...[
    {
      name: Schemas.tableName + '_u1',
      fields: [...Schemas.getBaseTableModelUniqueFields(),...Schemas.uniqueFields],
      type:"unique"
    },{
      name: Schemas.tableName + '_c_1',
      fields:['is_default'],
      type:"check",
      where:{
        is_default: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['default_connection_id'],
    type: 'foreign key',
    references: { 
        table: Connections,
        field: 'id'
    },
    onUpdate: 'cascade'
  }]]
    
};



module.exports = {Schemas}