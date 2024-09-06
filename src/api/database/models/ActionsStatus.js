'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class ActionsStatus extends BaseTableModel {
  static id = 51;
  static model = null;

  static NOT_STARTED = 1;
  static RUNNING = 2;
  static STOPED = 3;
  static CANCELED = 4;
  static CONCLUDED = 5;

  static fields = {
    ...ActionsStatus.getBaseTableModelFields(),...{           
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      ISSTARTED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISRUNNING: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISSTOPED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISCANCELED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISCONCLUDED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(ActionsStatus.getBaseTableModelConstraints() || []),...[
    {
      name: ActionsStatus.name.toLowerCase() + '_u1',
      fields: [...ActionsStatus.getBaseTableModelUniqueFields(),...ActionsStatus.uniqueFields],
      type:"unique"
    },{
      name: ActionsStatus.name.toLowerCase() + '_c_1',
      fields:['ISSTARTED'],
      type:"check",
      where:{
        ISSTARTED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: ActionsStatus.name.toLowerCase() + '_c_2',
      fields:['ISRUNNING'],
      type:"check",
      where:{
        ISRUNNING: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: ActionsStatus.name.toLowerCase() + '_c_3',
      fields:['ISSTOPED'],
      type:"check",
      where:{
        ISSTOPED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: ActionsStatus.name.toLowerCase() + '_c_4',
      fields:['ISCANCELED'],
      type:"check",
      where:{
        ISCANCELED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: ActionsStatus.name.toLowerCase() + '_c_5',
      fields:['ISCONCLUDED'],
      type:"check",
      where:{
        ISCONCLUDED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {ActionsStatus}
