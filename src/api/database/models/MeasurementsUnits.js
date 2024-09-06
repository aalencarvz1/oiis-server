'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Greatnesses } = require("./Greatnesses");

/**
 * class model
 */
class MeasurementsUnits extends BaseTableModel {
  static id = 80;
  static model = null;

  static UN = 1;
  static KG = 2;
  static L = 3;
  static PC = 5; //PIECE
  static PKG = 10; //PACKAGE
  static BOX = 11; 
  static BCK = 12; //BUCKET (BALDE)
  static CAN = 13; //LATA 
  static BAG = 14; //SACA

  //translates to pt-br
  static PCT = 10; //PACKAGE
  static CX = 11; 
  static BD = 12; //BUCKET (BALDE)
  static LT = 13; //LATA 
  static SC = 14; //SACA
  
  
  static fields = {
    ...MeasurementsUnits.getBaseTableModelFields(),...{
      IDGREATNESS: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
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

  static constraints = [...(MeasurementsUnits.getBaseTableModelConstraints() || []),...[
    {
      name: MeasurementsUnits.name.toLowerCase() + '_u1',
      fields: [...MeasurementsUnits.getBaseTableModelUniqueFields(),...MeasurementsUnits.uniqueFields],
      type:"unique"
    },{
      name: MeasurementsUnits.name.toLowerCase() + '_c_1',
      fields:['ISSCALAR'],
      type:"check",
      where:{
        ISSCALAR: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: MeasurementsUnits.name.toLowerCase() + '_c_2',
      fields:['ISVETORIAL'],
      type:"check",
      where:{
        ISVETORIAL: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDGREATNESS'],
      type: 'foreign key',
      references: { 
          table: Greatnesses,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
   
};



module.exports = {MeasurementsUnits}