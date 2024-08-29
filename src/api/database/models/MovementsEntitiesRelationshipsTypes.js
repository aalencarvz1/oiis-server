'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class MovementsEntitiesRelationshipsTypes extends BaseTableModel {
  static ID = 9020;
  static model = null;

  static ORIGIN_INPUT = 1;
  static TARGET_INPUT = 2;
  static ORIGIN_OUTPUT = 3;
  static TARGET_OUTPUT = 4;

  static fields = {
    ...MovementsEntitiesRelationshipsTypes.getBaseTableModelFields(),...{           
      NAME:{
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
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(MovementsEntitiesRelationshipsTypes.getBaseTableModelConstraints() || []),...[
    {
      name: MovementsEntitiesRelationshipsTypes.name.toUpperCase() + '_U1',
      fields: [...MovementsEntitiesRelationshipsTypes.getBaseTableModelUniqueFields(),...MovementsEntitiesRelationshipsTypes.uniqueFields],
      type:"unique"
    },{
      name: MovementsEntitiesRelationshipsTypes.name.toUpperCase() + '_C_1',
      fields:['ISORIGIN'],
      type:"check",
      where:{
        ISORIGIN: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: MovementsEntitiesRelationshipsTypes.name.toUpperCase() + '_C_2',
      fields:['ISTARGET'],
      type:"check",
      where:{
        ISTARGET: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: MovementsEntitiesRelationshipsTypes.name.toUpperCase() + '_C_3',
      fields:['ISINPUT'],
      type:"check",
      where:{
        ISINPUT: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: MovementsEntitiesRelationshipsTypes.name.toUpperCase() + '_C_4',
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


module.exports = {MovementsEntitiesRelationshipsTypes}