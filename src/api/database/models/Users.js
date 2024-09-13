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
      IDCOLLABORATOR: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDACCESSPROFILE: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false,
        defaultValue : Access_Profiles.DEFAULT
      },
      EMAIL: {
        type: DataTypes.STRING(512),
        allowNull:false
      },
      PASSWORD: {
        type: DataTypes.STRING(1000),
        allowNull:false
      },
      LASTTOKEN:{
        type: DataTypes.STRING(1000)
      },
      LASTTIMEZONEOFFSET: {
        type: DataTypes.INTEGER
      }
    }
  };
  
  static uniqueFields = [    
    'EMAIL'
  ];

  static constraints = [...(Users.getBaseTableModelConstraints() || []),...[
    {
      name: Users.tableName + '_u1',
      fields: Users.uniqueFields,
      type:"unique"
    }
  ]];  

  static foreignsKeys = [...(this.defaultPeopleForeignsKeys||[]),...[    
    {
      fields: ['IDCOLLABORATOR'],
      type: 'foreign key',
      references: { 
          table: Collaborators,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDACCESSPROFILE'],
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
    if (params.PASSWORD) {
      params.PASSWORD = bcrypt.hashSync(params.PASSWORD,(process.env.API_USER_PASSWORD_CRIPTSALT||10)-0)
    }                  
    return await BasePeopleModel.createData.bind(Users)(params);
  }  
  static putData = this.createData;
}


module.exports = { Users };
