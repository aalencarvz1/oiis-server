'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Entities_Types } = require("./Entities_Types");
const { Comparators } = require("./Comparators");
const { Groups } = require("./Groups");


/**
 * class model
 */
class Groups_Items extends BaseTableModel {
  static id = 7007;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Groups_Items.getBaseTableModelFields(),...{              
      group_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      is_manual_included: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'group_id',
    'item_id'
  ];

  static constraints = [...(Groups_Items.getBaseTableModelConstraints() || []),...[
    {
      name: Groups_Items.tableName + '_u1',
      fields: [...Groups_Items.getBaseTableModelUniqueFields(),...Groups_Items.uniqueFields],
      type:"unique"
    },{
      name: Groups_Items.tableName + '_c_1',
      fields:['is_manual_included'],
      type:"check",
      where:{
        is_manual_included: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['group_id'],
      type: 'foreign key',
      references: { 
          table: Groups,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};

module.exports = {Groups_Items}
