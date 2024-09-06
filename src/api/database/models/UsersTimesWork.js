'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { UsersProfilesTimesWork } = require("./UsersProfilesTimesWork");

/**
 * class model
 */
class UsersTimesWork extends BaseTableModel {
  static id = 123;
  static model = null;

  
  static fields = {
    ...UsersTimesWork.getBaseTableModelFields(),...{
      IDUSERPROFILETIMEWORK: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      WEEKDAY:{
        type: DataTypes.TINYINT,
        allowNull: false
      },
      STARTAT:{
        type: DataTypes.STRING(8),
        allowNull: false
      },
      ENDAT:{
        type: DataTypes.STRING(8),
        allowNull: false
      },
      OBSERVATIONS:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [    
    'IDUSERPROFILETIMEWORK',
    'WEEKDAY',
    'STARTAT'
  ];

  static uniqueFields2 = [    
    'IDUSERPROFILETIMEWORK',
    'WEEKDAY',
    'ENDAT'
  ];

  static constraints = [...(UsersTimesWork.getBaseTableModelConstraints() || []),...[
    {
      name: UsersTimesWork.name.toLowerCase() + '_u1',
      fields: UsersTimesWork.uniqueFields,
      type:"unique"
    },
    {
      name: UsersTimesWork.name.toLowerCase() + '_u2',
      fields: UsersTimesWork.uniqueFields2,
      type:"unique"
    },{
      name: UsersTimesWork.name.toLowerCase() + '_c_1',
      fields:['WEEKDAY'],
      type:"check",
      where:{
        WEEKDAY: {
              [Sequelize.Op.in]: [0,1,2,3,4,5,6]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDUSERPROFILETIMEWORK'],
      type: 'foreign key',
      references: { 
          table: UsersProfilesTimesWork,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
}


module.exports = {UsersTimesWork}