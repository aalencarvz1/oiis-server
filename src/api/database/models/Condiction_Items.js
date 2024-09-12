'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Condictions } = require("./Condictions");


/**
 * class model
 */
class Condiction_Items extends BaseTableModel {
  static id = 7005;
  static tableName = this.name.toLowerCase();
  static model = null;

    static fields = {
    ...Condiction_Items.getBaseTableModelFields(),...{           
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

  static constraints = [...(Condiction_Items.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDCONDICTION'],
      type: 'foreign key',
      references: { 
          table: Condictions,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};

module.exports = {Condiction_Items}
