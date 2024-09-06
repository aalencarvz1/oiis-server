'use strict';

/*imports*/
const { DataTypes: DataTypesSeq, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { ReportsDatasFounts } = require("./ReportsDatasFounts");
const { SqlObjectsTypes } = require("./SqlObjectsTypes");
const { DataTypes } = require("./DataTypes");


/**
 * class model
 */
class ReportsDatasFountsItems extends BaseTableModel {
  static id = 10006;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...ReportsDatasFountsItems.getBaseTableModelFields(),...{                 
      IDSUP: {
        type: DataTypesSeq.BIGINT.UNSIGNED,
      },
      IDREPORTDATAFOUNT: {
        type: DataTypesSeq.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDSQLOBJECTTYPE: {
        type: DataTypesSeq.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDSQLOBJECT: {
        type: DataTypesSeq.BIGINT.UNSIGNED
      },
      BEFORESQLTEXT:{
        type: DataTypesSeq.TEXT,
      },
      SQLTEXT:{
        type: DataTypesSeq.TEXT,
        allowNull:false,
      },
      SQLTEXTAFTERCHILDREN:{
        type: DataTypesSeq.TEXT
      },
      ORDERNUM: {
        type: DataTypesSeq.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1
      },
      SQLALIAS:{
        type: DataTypesSeq.STRING(2000)
      },
      IDDATATYPE:{
        type: DataTypesSeq.BIGINT.UNSIGNED
      },
      EXISTENCECRITERY:{
        type: DataTypesSeq.TEXT
      },
      ACCESSCRITERY:{
        type: DataTypesSeq.TEXT
      },
      UNIQUEINGROUPMENT:{
        type: DataTypesSeq.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      DATAGROUPMENT:{
        type: DataTypesSeq.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      VALUEGROUPMENT:{
        type: DataTypesSeq.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      OBSERVATIONS:{
        type: DataTypesSeq.TEXT
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(ReportsDatasFountsItems.getBaseTableModelConstraints() || []),...[{
    name: ReportsDatasFountsItems.tableName + '_c_1',
    fields:['UNIQUEINGROUPMENT'],
    type:"check",
    where:{
      UNIQUEINGROUPMENT: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: ReportsDatasFountsItems.tableName + '_c_2',
    fields:['DATAGROUPMENT'],
    type:"check",
    where:{
      DATAGROUPMENT: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: ReportsDatasFountsItems.tableName + '_c_3',
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
        table: ReportsDatasFountsItems,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },{
    fields: ['IDREPORTDATAFOUNT'],
    type: 'foreign key',
    references: { 
        table: ReportsDatasFounts,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },{
    fields: ['IDSQLOBJECTTYPE'],
    type: 'foreign key',
    references: { 
        table: SqlObjectsTypes,
        field: 'id'
    },    
    onUpdate: 'cascade'
  },{
    fields: ['IDDATATYPE'],
    type: 'foreign key',
    references: { 
        table: DataTypes,
        field: 'id'
    },    
    onUpdate: 'cascade'
  }]];

};


module.exports = {ReportsDatasFountsItems}