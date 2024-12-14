'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Objectives extends BaseTableModel {
  static id = 9060;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Objectives.getBaseTableModelFields(),...{                 
      name:{
        type: DataTypes.STRING(256),
        allowNull:false,
      },
      description:{
        type: DataTypes.TEXT
      },
      start_date:{
        type: DataTypes.DATE,
        allowNull:false,
      },
      end_date:{
        type: DataTypes.DATE,
        allowNull:false,
      },
      conditions:{
        type: DataTypes.JSON
      },
      type_get_objective_from:{
        type: DataTypes.STRING
      },
      origin_get_objective_from:{
        type: DataTypes.STRING
      },
      get_objective_from:{
        type: DataTypes.TEXT
      },
      type_get_value_from:{
        type: DataTypes.STRING
      },
      origin_get_value_from:{
        type: DataTypes.STRING
      },
      get_value_from:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Objectives.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];

};


module.exports = {Objectives}