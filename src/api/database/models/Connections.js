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
      ISDEFAULT: {
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
      fields:['ISDEFAULT'],
      type:"check",
      where:{
        ISDEFAULT: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};



module.exports = {Connections}