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
      cega: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      semicega: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      normal: {
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
      fields:['cega'],
      type:"check",
      where:{
        cega: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Conference_Types.tableName + '_c_2',
      fields:['semicega'],
      type:"check",
      where:{
        semicega: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Conference_Types.tableName + '_c_3',
      fields:['normal'],
      type:"check",
      where:{
        normal: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Conference_Types}