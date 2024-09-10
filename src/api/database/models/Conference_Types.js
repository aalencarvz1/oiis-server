'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Conference_Types extends BaseTableModel {
  static id = 9004;
  static tableName = this.name.toLowerCase();
  static model = null;

  static NORMAL = 1;
  static CEGA = 2;
  static SEMICEGA = 3;
  static XML_WITH_LOT = 4;
  static XML_WITHOUT_LOT = 5;

  static fields = {
    ...Conference_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      CEGA: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      SEMICEGA: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      NORMAL: {
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

  static constraints = [...(Conference_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Conference_Types.tableName + '_u1',
      fields: [...Conference_Types.getBaseTableModelUniqueFields(),...Conference_Types.uniqueFields],
      type:"unique"
    },{
      name: Conference_Types.tableName + '_c_1',
      fields:['CEGA'],
      type:"check",
      where:{
        CEGA: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Conference_Types.tableName + '_c_2',
      fields:['SEMICEGA'],
      type:"check",
      where:{
        SEMICEGA: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Conference_Types.tableName + '_c_3',
      fields:['NORMAL'],
      type:"check",
      where:{
        NORMAL: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Conference_Types}