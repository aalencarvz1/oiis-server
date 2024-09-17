'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Movement_Entity_Relationship_Types extends BaseTableModel {
  static id = 9020;
  static tableName = this.name.toLowerCase();
  static model = null;

  static ORIGIN_INPUT = 1;
  static TARGET_INPUT = 2;
  static ORIGIN_OUTPUT = 3;
  static TARGET_OUTPUT = 4;

  static fields = {
    ...Movement_Entity_Relationship_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      ISORIGIN: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISTARGET: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_input: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_output: {
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

  static constraints = [...(Movement_Entity_Relationship_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Movement_Entity_Relationship_Types.tableName + '_u1',
      fields: [...Movement_Entity_Relationship_Types.getBaseTableModelUniqueFields(),...Movement_Entity_Relationship_Types.uniqueFields],
      type:"unique"
    },{
      name: Movement_Entity_Relationship_Types.tableName + '_c_1',
      fields:['ISORIGIN'],
      type:"check",
      where:{
        ISORIGIN: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Movement_Entity_Relationship_Types.tableName + '_c_2',
      fields:['ISTARGET'],
      type:"check",
      where:{
        ISTARGET: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Movement_Entity_Relationship_Types.tableName + '_c_3',
      fields:['is_input'],
      type:"check",
      where:{
        is_input: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Movement_Entity_Relationship_Types.tableName + '_c_4',
      fields:['is_output'],
      type:"check",
      where:{
        is_output: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Movement_Entity_Relationship_Types}