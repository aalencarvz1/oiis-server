'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class StatusRun extends BaseTableModel {
  static ID = 67;
  static model = null;

  static NOT_STARTED = 1;
  static RUNNING = 2;
  static STOPED = 3;
  static CANCELED = 4;
  static CONCLUDED = 5;

  static fields = {
    ...StatusRun.getBaseTableModelFields(),...{
      NAME: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      SIGLA: {
        type: DataTypes.STRING(10)
      },
      ISRUNNING: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      ISSTOPED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      ISCANCELED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      ISCONCLUDED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(StatusRun.getBaseTableModelConstraints() || []),...[
    {
      name: StatusRun.name.toUpperCase() + '_U1',
      fields: [...StatusRun.getBaseTableModelUniqueFields(),...StatusRun.uniqueFields],
      type:"unique"
    },{
      name: StatusRun.name.toUpperCase() + '_C_1',
      fields:['ISRUNNING'],
      type:"check",
      where:{
        ISRUNNING: {
          [Sequelize.Op.in]: [0,1]
        }
      }
    },{
      name: StatusRun.name.toUpperCase() + '_C_2',
      fields:['ISSTOPED'],
      type:"check",
      where:{
        ISSTOPED: {
          [Sequelize.Op.in]: [0,1]
        }
      }
    },{
      name: StatusRun.name.toUpperCase() + '_C_3',
      fields:['ISCANCELED'],
      type:"check",
      where:{
        ISCANCELED: {
          [Sequelize.Op.in]: [0,1]
        }
      }
    },{
      name: StatusRun.name.toUpperCase() + '_C_4',
      fields:['ISCONCLUDED'],
      type:"check",
      where:{
        ISCONCLUDED: {
          [Sequelize.Op.in]: [0,1]
        }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
    
};



module.exports = {StatusRun}