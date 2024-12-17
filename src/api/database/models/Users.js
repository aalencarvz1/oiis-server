'use strict';

/*imports*/
const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const { Collaborators } = require("./Collaborators");
const { Access_Profiles } = require("./Access_Profiles");
const { BasePeopleModel } = require("./BasePeopleModel");


/**
 * class model
 */
class Users extends BasePeopleModel {
  static id = 120;
  static tableName = this.name.toLowerCase();
  static model = null;

  static SYSTEM = 1;

  static fields = {
    ...(Users.getBaseTableModelFields() || {}),
    ...{ 
      people_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },          
      collaborator_id: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      access_profile_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false,
        defaultValue : Access_Profiles.DEFAULT
      },
      email: {
        type: DataTypes.STRING(512),
        allowNull:false
      },
      password: {
        type: DataTypes.STRING(1000),
        allowNull:false
      },
      last_token:{
        type: DataTypes.STRING(1000)
      },
      last_timezone_offset: {
        type: DataTypes.INTEGER
      }
    }
  };
  
  static uniqueFields = [    
    'email'
  ];

  static constraints = [...(Users.getBaseTableModelConstraints() || []),...[
    {
      name: Users.tableName + '_u1',
      fields: [...Users.getBaseTableModelUniqueFields(),...Users.uniqueFields],
      type:"unique"
    }
  ]];  

  static foreignsKeys = [...(this.defaultPeopleForeignsKeys||[]),...[    
    {
      fields: ['collaborator_id'],
      type: 'foreign key',
      references: { 
          table: Collaborators,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['access_profile_id'],
      type: 'foreign key',
      references: { 
          table: Access_Profiles,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
    
  ]];

  static async createData(params) {
    params = params || {};  
    if (params.password) {
      params.password = bcrypt.hashSync(params.password,(process.env.API_USER_PASSWORD_CRIPTSALT||10)-0)
    }                  
    return await BasePeopleModel.createData.bind(Users)(params);
  }  
  static putData = this.createData;

  static async updateData(params) {
    params = params || {};  
    if (params.password) {
      params.password = bcrypt.hashSync(params.password,(process.env.API_USER_PASSWORD_CRIPTSALT||10)-0)
    }                  
    return await BasePeopleModel.updateData.bind(Users)(params);
  }  
  static patchData = this.updateData;
}


module.exports = { Users };
