'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Movement_Types extends BaseTableModel {
  static id = 9000;
  static tableName = this.name.toLowerCase();
  static model = null;

  static INPUT = 1;
  static OUTPUT = 2;
  static CONFERENCE =3;
  static INTERNAL = 4;

  static fields = {
    ...Movement_Types.getBaseTableModelFields(),...{           
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
      ISCONFERENCE: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISINTERNAL: {
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

  static constraints = [...(Movement_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Movement_Types.tableName + '_u1',
      fields: [...Movement_Types.getBaseTableModelUniqueFields(),...Movement_Types.uniqueFields],
      type:"unique"
    },{
      name: Movement_Types.tableName + '_c_1',
      fields:['ISINPUT'],
      type:"check",
      where:{
        ISINPUT: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Movement_Types.tableName + '_c_2',
      fields:['ISOUTPUT'],
      type:"check",
      where:{
        ISOUTPUT: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Movement_Types.tableName + '_c_3',
      fields:['ISCONFERENCE'],
      type:"check",
      where:{
        ISCONFERENCE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Movement_Types.tableName + '_c_4',
      fields:['ISINTERNAL'],
      type:"check",
      where:{
        ISINTERNAL: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Movement_Types}