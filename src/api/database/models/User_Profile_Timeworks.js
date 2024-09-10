'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Users } = require("./Users");

/**
 * class model
 */
class User_Profile_Timeworks extends BaseTableModel {
  static id = 122;
  static tableName = this.name.toLowerCase();
  static model = null;

  
  static fields = {
    ...User_Profile_Timeworks.getBaseTableModelFields(),...{
      IDUSER: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull: false
      }
    }
  };
  
  static uniqueFields = [    
    'IDUSER',
    'name'
  ];

  static constraints = [...(User_Profile_Timeworks.getBaseTableModelConstraints() || []),...[
    {
      name: User_Profile_Timeworks.tableName + '_u1',
      fields: User_Profile_Timeworks.uniqueFields,
      type:"unique"
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


module.exports = {User_Profile_Timeworks}