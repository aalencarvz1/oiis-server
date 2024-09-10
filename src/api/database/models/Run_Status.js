'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Run_Status extends BaseTableModel {
  static id = 67;
  static tableName = this.name.toLowerCase();
  static model = null;

  static NOT_STARTED = 1;
  static RUNNING = 2;
  static STOPED = 3;
  static CANCELED = 4;
  static CONCLUDED = 5;

  static fields = {
    ...Run_Status.getBaseTableModelFields(),...{
      name: {
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
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Run_Status.getBaseTableModelConstraints() || []),...[
    {
      name: Run_Status.tableName + '_u1',
      fields: [...Run_Status.getBaseTableModelUniqueFields(),...Run_Status.uniqueFields],
      type:"unique"
    },{
      name: Run_Status.tableName + '_c_1',
      fields:['ISRUNNING'],
      type:"check",
      where:{
        ISRUNNING: {
          [Sequelize.Op.in]: [0,1]
        }
      }
    },{
      name: Run_Status.tableName + '_c_2',
      fields:['ISSTOPED'],
      type:"check",
      where:{
        ISSTOPED: {
          [Sequelize.Op.in]: [0,1]
        }
      }
    },{
      name: Run_Status.tableName + '_c_3',
      fields:['ISCANCELED'],
      type:"check",
      where:{
        ISCANCELED: {
          [Sequelize.Op.in]: [0,1]
        }
      }
    },{
      name: Run_Status.tableName + '_c_4',
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



module.exports = {Run_Status}