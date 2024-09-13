'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Greatnesses extends BaseTableModel {
  static id = 79;
  static tableName = this.name.toLowerCase();
  static model = null;

  static QUANTITY = 1;
  static MASS = 2;
  static VOLUM = 3;
  static LENGTH = 4;
  
  static fields = {
    ...Greatnesses.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      sigla: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      description: {
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
    'name',
    'sigla'
  ];

  static constraints = [...(Greatnesses.getBaseTableModelConstraints() || []),...[
    {
      name: Greatnesses.tableName + '_u1',
      fields: [...Greatnesses.getBaseTableModelUniqueFields(),...Greatnesses.uniqueFields],
      type:"unique"
    },{
      name: Greatnesses.tableName + '_c_1',
      fields:['ISSCALAR'],
      type:"check",
      where:{
        ISSCALAR: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Greatnesses.tableName + '_c_2',
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