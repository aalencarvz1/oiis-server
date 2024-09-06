'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Users } = require("./Users");

/**
 * class model
 */
class UsersProfilesTimesWork extends BaseTableModel {
  static id = 122;
  static model = null;

  
  static fields = {
    ...UsersProfilesTimesWork.getBaseTableModelFields(),...{
      IDUSER: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      NAME:{
        type: DataTypes.STRING(256),
        allowNull: false
      }
    }
  };
  
  static uniqueFields = [    
    'IDUSER',
    'NAME'
  ];

  static constraints = [...(UsersProfilesTimesWork.getBaseTableModelConstraints() || []),...[
    {
      name: UsersProfilesTimesWork.name.toLowerCase() + '_u1',
      fields: UsersProfilesTimesWork.uniqueFields,
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


module.exports = {UsersProfilesTimesWork}