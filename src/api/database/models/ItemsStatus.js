'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class ItemsStatus extends BaseTableModel {
  static ID = 8009;
  static model = null;

  static NORMAL = 1;
  static DAMAGED = 2;
  
  static fields = {
    ...ItemsStatus.getBaseTableModelFields(),...{
      NAME: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      SIGLA: {
        type: DataTypes.STRING(10)
      },
      ISDISPONIBLE: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 1
      },
      ISDAMAGED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'NAME',
    Sequelize.literal(`(COALESCE(SIGLA,'NULL'))`)
  ];

  static constraints = [...(ItemsStatus.getBaseTableModelConstraints() || []),...[
    {
      name: ItemsStatus.name.toUpperCase() + '_U1',
      fields: [...ItemsStatus.getBaseTableModelUniqueFields(),...ItemsStatus.uniqueFields],
      type:"unique"
    },{
      name: ItemsStatus.name.toUpperCase() + '_C_1',
      fields:['ISDISPONIBLE'],
      type:"check",
      where:{
        ISDISPONIBLE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: ItemsStatus.name.toUpperCase() + '_C_2',
      fields:['ISDAMAGED'],
      type:"check",
      where:{
        ISDAMAGED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
   
};



module.exports = {ItemsStatus}