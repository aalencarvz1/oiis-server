'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Item_Status extends BaseTableModel {
  static id = 8009;
  static tableName = this.name.toLowerCase();
  static model = null;

  static NORMAL = 1;
  static DAMAGED = 2;
  
  static fields = {
    ...Item_Status.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      sigla: {
        type: DataTypes.STRING(10)
      },
      is_disponible: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 1
      },
      is_damaged: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'name',
    Sequelize.literal(`(COALESCE(sigla,'NULL'))`)
  ];

  static constraints = [...(Item_Status.getBaseTableModelConstraints() || []),...[
    {
      name: Item_Status.tableName + '_u1',
      fields: [...Item_Status.getBaseTableModelUniqueFields(),...Item_Status.uniqueFields],
      type:"unique"
    },{
      name: Item_Status.tableName + '_c_1',
      fields:['is_disponible'],
      type:"check",
      where:{
        is_disponible: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Item_Status.tableName + '_c_2',
      fields:['is_damaged'],
      type:"check",
      where:{
        is_damaged: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
   
};



module.exports = {Item_Status}