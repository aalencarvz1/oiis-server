'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class ConferencesTypes extends BaseTableModel {
  static ID = 9004;
  static model = null;

  static NORMAL = 1;
  static CEGA = 2;
  static SEMICEGA = 3;
  static XML_WITH_LOT = 4;
  static XML_WITHOUT_LOT = 5;

  static fields = {
    ...ConferencesTypes.getBaseTableModelFields(),...{           
      NAME:{
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
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(ConferencesTypes.getBaseTableModelConstraints() || []),...[
    {
      name: ConferencesTypes.name.toUpperCase() + '_U1',
      fields: [...ConferencesTypes.getBaseTableModelUniqueFields(),...ConferencesTypes.uniqueFields],
      type:"unique"
    },{
      name: ConferencesTypes.name.toUpperCase() + '_C_1',
      fields:['CEGA'],
      type:"check",
      where:{
        CEGA: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: ConferencesTypes.name.toUpperCase() + '_C_2',
      fields:['SEMICEGA'],
      type:"check",
      where:{
        SEMICEGA: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: ConferencesTypes.name.toUpperCase() + '_C_3',
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


module.exports = {ConferencesTypes}