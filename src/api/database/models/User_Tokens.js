'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Users } = require("./Users");

/**
 * class model
 */
class User_Tokens extends BaseTableModel {
  static id = 121;
  static tableName = this.name.toLowerCase();
  static model = null;

  
  static fields = {
    ...User_Tokens.getBaseTableModelFields(),...{
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      token: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      expired_at: {
        type: DataTypes.DATE
      },
      expired: {
        type: DataTypes.INTEGER(1),
        allowNull:false,
        defaultValue:0
      },
      device_information: {
        type: DataTypes.STRING(2000)
      },
      timezone_offset: {
        type: DataTypes.INTEGER
      }
    }
  };
  
  static uniqueFields = [    
    'user_id',
    'token',
    'expired'
  ];

  static constraints = [...(User_Tokens.getBaseTableModelConstraints() || []),...[
    {
      name: User_Tokens.tableName + '_u1',
      fields: [...User_Tokens.getBaseTableModelUniqueFields(),...User_Tokens.uniqueFields],
      type:"unique"
    },{
      name: User_Tokens.tableName + '_c_1',
      fields:['expired'],
      type:"check",
      where:{
        expired: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['user_id'],
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


module.exports = {User_Tokens}