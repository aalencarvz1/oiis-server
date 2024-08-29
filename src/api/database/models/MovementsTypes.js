'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class MovementsTypes extends BaseTableModel {
  static ID = 9000;
  static model = null;

  static INPUT = 1;
  static OUTPUT = 2;
  static CONFERENCE =3;
  static INTERNAL = 4;

  static fields = {
    ...MovementsTypes.getBaseTableModelFields(),...{           
      NAME:{
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
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(MovementsTypes.getBaseTableModelConstraints() || []),...[
    {
      name: MovementsTypes.name.toUpperCase() + '_U1',
      fields: [...MovementsTypes.getBaseTableModelUniqueFields(),...MovementsTypes.uniqueFields],
      type:"unique"
    },{
      name: MovementsTypes.name.toUpperCase() + '_C_1',
      fields:['ISINPUT'],
      type:"check",
      where:{
        ISINPUT: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: MovementsTypes.name.toUpperCase() + '_C_2',
      fields:['ISOUTPUT'],
      type:"check",
      where:{
        ISOUTPUT: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: MovementsTypes.name.toUpperCase() + '_C_3',
      fields:['ISCONFERENCE'],
      type:"check",
      where:{
        ISCONFERENCE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: MovementsTypes.name.toUpperCase() + '_C_4',
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


module.exports = {MovementsTypes}