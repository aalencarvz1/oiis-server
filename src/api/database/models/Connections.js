'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Connections extends BaseTableModel {
  static id = 2;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Connections.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      default_env_identifier: {
        type: DataTypes.STRING(4000)
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

  static constraints = [...(Connections.getBaseTableModelConstraints() || []),...[
    {
      name: Connections.tableName + '_u1',
      fields: [...Connections.getBaseTableModelUniqueFields(),...Connections.uniqueFields],
      type:"unique"
    },{
      name: Connections.tableName + '_c_1',
      fields:['is_default'],
      type:"check",
      where:{
        is_default: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};



module.exports = {Connections}