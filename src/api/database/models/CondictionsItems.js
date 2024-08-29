'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Condictions } = require("./Condictions");


/**
 * class model
 */
class CondictionsItems extends BaseTableModel {
  static ID = 7005;
  static model = null;

    static fields = {
    ...CondictionsItems.getBaseTableModelFields(),...{           
      IDCONDICTION:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      VALUE:{
        type: DataTypes.TEXT
      },
      EXPRESSION: {
        type: DataTypes.TEXT
      }      
    }
  };

  static constraints = [...(CondictionsItems.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDCONDICTION'],
      type: 'foreign key',
      references: { 
          table: Condictions,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};

module.exports = {CondictionsItems}
