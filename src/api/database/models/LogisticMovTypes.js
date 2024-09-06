'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class LogisticMovTypes extends BaseTableModel {
  static id = 12000;
  static tableName = this.name.toLowerCase();
  static model = null;

  static DELIVERY = 1;
  static COLLECT = 2;
  static RETREAT = 3;

  static fields = {
    ...LogisticMovTypes.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      ISINPUT: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISOUTPUT: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(LogisticMovTypes.getBaseTableModelConstraints() || []),...[
    {
      name: LogisticMovTypes.tableName + '_u1',
      fields: [...LogisticMovTypes.getBaseTableModelUniqueFields(),...LogisticMovTypes.uniqueFields],
      type:"unique"
    },{
      name: LogisticMovTypes.tableName + '_c_1',
      fields:['ISINPUT'],
      type:"check",
      where:{
        ISINPUT: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: LogisticMovTypes.tableName + '_c_2',
      fields:['ISOUTPUT'],
      type:"check",
      where:{
        ISOUTPUT: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {LogisticMovTypes}