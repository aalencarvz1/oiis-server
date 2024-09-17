'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { User_Profile_Timeworks } = require("./User_Profile_Timeworks");

/**
 * class model
 */
class User_Timeworks extends BaseTableModel {
  static id = 123;
  static tableName = this.name.toLowerCase();
  static model = null;

  
  static fields = {
    ...User_Timeworks.getBaseTableModelFields(),...{
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
      observations:{
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

  static constraints = [...(User_Timeworks.getBaseTableModelConstraints() || []),...[
    {
      name: User_Timeworks.tableName + '_u1',
      fields: User_Timeworks.uniqueFields,
      type:"unique"
    },
    {
      name: User_Timeworks.tableName + '_u2',
      fields: User_Timeworks.uniqueFields2,
      type:"unique"
    },{
      name: User_Timeworks.tableName + '_c_1',
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
          table: User_Profile_Timeworks,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
}


module.exports = {User_Timeworks}