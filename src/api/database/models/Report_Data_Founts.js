'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Report_Data_Founts extends BaseTableModel {
  static id = 10005;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Report_Data_Founts.getBaseTableModelFields(),...{                 
      name:{
        type: DataTypes.STRING(256),
        allowNull:false,
      },
      description:{
        type: DataTypes.TEXT
      },
      start_date:{
        type: DataTypes.DATE
      },
      end_date:{
        type: DataTypes.DATE
      },
      conditions:{
        type: DataTypes.JSON
      },
      type_get_expected_data_from:{
        type: DataTypes.STRING
      },
      origin_get_expected_data_from:{
        type: DataTypes.STRING
      },
      get_expected_data_from:{
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

  static constraints = [...(Report_Data_Founts.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];

};


module.exports = {Report_Data_Founts}