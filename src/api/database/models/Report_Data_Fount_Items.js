'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Report_Data_Founts } = require("./Report_Data_Founts");
const { Sql_Object_Types } = require("./Sql_Object_Types");
const { Data_Types } = require("./Data_Types");


/**
 * class model
 */
class Report_Data_Fount_Items extends BaseTableModel {
  static id = 10006;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Report_Data_Fount_Items.getBaseTableModelFields(),...{                 
      IDSUP: {
        type: DataTypes.BIGINT.UNSIGNED,
      },
      IDREPORTDATAFOUNT: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDSQLOBJECTTYPE: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDSQLOBJECT: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      BEFORESQLTEXT:{
        type: DataTypes.TEXT,
      },
      SQLTEXT:{
        type: DataTypes.TEXT,
        allowNull:false,
      },
      SQLTEXTAFTERCHILDREN:{
        type: DataTypes.TEXT
      },
      ORDERNUM: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1
      },
      SQLALIAS:{
        type: DataTypes.STRING(2000)
      },
      IDDATATYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      EXISTENCECRITERY:{
        type: DataTypes.TEXT
      },
      ACCESSCRITERY:{
        type: DataTypes.TEXT
      },
      UNIQUEINGROUPMENT:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      DATAGROUPMENT:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      VALUEGROUPMENT:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Report_Data_Fount_Items.getBaseTableModelConstraints() || []),...[{
    name: Report_Data_Fount_Items.tableName + '_c_1',
    fields:['UNIQUEINGROUPMENT'],
    type:"check",
    where:{
      UNIQUEINGROUPMENT: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Report_Data_Fount_Items.tableName + '_c_2',
    fields:['DATAGROUPMENT'],
    type:"check",
    where:{
      DATAGROUPMENT: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Report_Data_Fount_Items.tableName + '_c_3',
    fields:['VALUEGROUPMENT'],
    type:"check",
    where:{
      VALUEGROUPMENT: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDSUP'],
    type: 'foreign key',
    references: { 
        table: Report_Data_Fount_Items,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },{
    fields: ['IDREPORTDATAFOUNT'],
    type: 'foreign key',
    references: { 
        table: Report_Data_Founts,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },{
    fields: ['IDSQLOBJECTTYPE'],
    type: 'foreign key',
    references: { 
        table: Sql_Object_Types,
        field: 'id'
    },    
    onUpdate: 'cascade'
  },{
    fields: ['IDDATATYPE'],
    type: 'foreign key',
    references: { 
        table: Data_Types,
        field: 'id'
    },    
    onUpdate: 'cascade'
  }]];

};


module.exports = {Report_Data_Fount_Items}