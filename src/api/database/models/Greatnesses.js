'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Greatnesses extends BaseTableModel {
  static ID = 79;
  static model = null;

  static QUANTITY = 1;
  static MASS = 2;
  static VOLUM = 3;
  static LENGTH = 4;
  
  static fields = {
    ...Greatnesses.getBaseTableModelFields(),...{
      NAME: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      SIGLA: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
      ISSCALAR: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      ISVETORIAL: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
    }
  };
  
  static uniqueFields = [
    'NAME',
    'SIGLA'
  ];

  static constraints = [...(Greatnesses.getBaseTableModelConstraints() || []),...[
    {
      name: Greatnesses.name.toUpperCase() + '_U1',
      fields: [...Greatnesses.getBaseTableModelUniqueFields(),...Greatnesses.uniqueFields],
      type:"unique"
    },{
      name: Greatnesses.name.toUpperCase() + '_C_1',
      fields:['ISSCALAR'],
      type:"check",
      where:{
        ISSCALAR: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Greatnesses.name.toUpperCase() + '_C_2',
      fields:['ISVETORIAL'],
      type:"check",
      where:{
        ISVETORIAL: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
    
};



module.exports = {Greatnesses}