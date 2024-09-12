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
      STARTDATE:{
        type: DataTypes.DATE
      },
      ENDDATE:{
        type: DataTypes.DATE
      },
      CONDICTIONS:{
        type: DataTypes.JSON
      },
      GETEXPECTEDDATAFROMTYPE:{
        type: DataTypes.STRING
      },
      GETEXPECTEDDATAFROMORIGIN:{
        type: DataTypes.STRING
      },
      GETEXPECTEDDATAFROM:{
        type: DataTypes.TEXT
      },
      GETVALUEFROMTYPE:{
        type: DataTypes.STRING
      },
      GETVALUEFROMORIGIN:{
        type: DataTypes.STRING
      },
      GETVALUEFROM:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Report_Data_Founts.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];

};


module.exports = {Report_Data_Founts}