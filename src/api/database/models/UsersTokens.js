'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Users } = require("./Users");

/**
 * class model
 */
class UsersTokens extends BaseTableModel {
  static id = 121;
  static tableName = this.name.toLowerCase();
  static model = null;

  
  static fields = {
    ...UsersTokens.getBaseTableModelFields(),...{
      IDUSER: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      TOKEN: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      EXPIREAT: {
        type: DataTypes.DATE
      },
      EXPIRED: {
        type: DataTypes.INTEGER(1),
        allowNull:false,
        defaultValue:0
      },
      DEVICEINFORMATION: {
        type: DataTypes.STRING(2000)
      },
      TIMEZONEOFFSET: {
        type: DataTypes.INTEGER
      }
    }
  };
  
  static uniqueFields = [    
    'IDUSER',
    'TOKEN',
    'EXPIRED'
  ];

  static constraints = [...(UsersTokens.getBaseTableModelConstraints() || []),...[
    {
      name: UsersTokens.tableName + '_u1',
      fields: UsersTokens.uniqueFields,
      type:"unique"
    },{
      name: UsersTokens.tableName + '_c_1',
      fields:['EXPIRED'],
      type:"check",
      where:{
        EXPIRED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDUSER'],
      type: 'foreign key',
      references: { 
          table: Users,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
}


module.exports = {UsersTokens}