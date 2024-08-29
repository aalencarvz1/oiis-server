'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class ReportsDatasFounts extends BaseTableModel {
  static ID = 10005;
  static model = null;
  static fields = {
    ...ReportsDatasFounts.getBaseTableModelFields(),...{                 
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false,
      },
      DESCRIPTION:{
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

  static constraints = [...(ReportsDatasFounts.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];

};


module.exports = {ReportsDatasFounts}