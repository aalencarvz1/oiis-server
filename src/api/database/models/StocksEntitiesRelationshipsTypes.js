'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class StocksEntitiesRelationshipsTypes extends BaseTableModel {
  static id = 8026;
  static model = null;
  static OWNER = 1;
  static fields = {
    ...StocksEntitiesRelationshipsTypes.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      ISORIGIN: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISOWNER: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      ISRESERVED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISTARGET: {
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
    'name'
  ];

  static constraints = [...(StocksEntitiesRelationshipsTypes.getBaseTableModelConstraints() || []),...[
    {
      name: StocksEntitiesRelationshipsTypes.name.toLowerCase() + '_u1',
      fields: [...StocksEntitiesRelationshipsTypes.getBaseTableModelUniqueFields(),...StocksEntitiesRelationshipsTypes.uniqueFields],
      type:"unique"
    },{
      name: StocksEntitiesRelationshipsTypes.name.toLowerCase() + '_c_1',
      fields:['ISORIGIN'],
      type:"check",
      where:{
        ISORIGIN: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: StocksEntitiesRelationshipsTypes.name.toLowerCase() + '_c_2',
      fields:['ISOWNER'],
      type:"check",
      where:{
        ISOWNER: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: StocksEntitiesRelationshipsTypes.name.toLowerCase() + '_c_3',
      fields:['ISRESERVED'],
      type:"check",
      where:{
        ISRESERVED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: StocksEntitiesRelationshipsTypes.name.toLowerCase() + '_c_4',
      fields:['ISTARGET'],
      type:"check",
      where:{
        ISTARGET: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {StocksEntitiesRelationshipsTypes}