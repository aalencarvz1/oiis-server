'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class ItemsStatus extends BaseTableModel {
  static id = 8009;
  static model = null;

  static NORMAL = 1;
  static DAMAGED = 2;
  
  static fields = {
    ...ItemsStatus.getBaseTableModelFields(),...{
      name: {
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
    'name',
    Sequelize.literal(`(COALESCE(SIGLA,'NULL'))`)
  ];

  static constraints = [...(ItemsStatus.getBaseTableModelConstraints() || []),...[
    {
      name: ItemsStatus.name.toLowerCase() + '_u1',
      fields: [...ItemsStatus.getBaseTableModelUniqueFields(),...ItemsStatus.uniqueFields],
      type:"unique"
    },{
      name: ItemsStatus.name.toLowerCase() + '_c_1',
      fields:['ISDISPONIBLE'],
      type:"check",
      where:{
        ISDISPONIBLE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: ItemsStatus.name.toLowerCase() + '_c_2',
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