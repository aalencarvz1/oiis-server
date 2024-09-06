'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Objectives extends BaseTableModel {
  static id = 9060;
  static model = null;
  static fields = {
    ...Objectives.getBaseTableModelFields(),...{                 
      IDSUP:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false,
      },
      DESCRIPTION:{
        type: DataTypes.TEXT
      },
      STARTDATE:{
        type: DataTypes.DATE,
        allowNull:false,
      },
      ENDDATE:{
        type: DataTypes.DATE,
        allowNull:false,
      },
      CONDICTIONS:{
        type: DataTypes.JSON
      },
      GETOBJECTIVEFROMTYPE:{
        type: DataTypes.STRING
      },
      GETOBJECTIVEFROMORIGIN:{
        type: DataTypes.STRING
      },
      GETOBJECTIVEFROM:{
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

  static constraints = [...(Objectives.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDSUP'],
    type: 'foreign key',
    references: { 
        table: Objectives,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }]];

};


module.exports = {Objectives}