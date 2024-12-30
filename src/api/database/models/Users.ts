'use strict';


import { DataTypes } from "sequelize";
import BasePeopleModel from "./BasePeopleModel.js";
import bcrypt from "bcrypt";
import Access_Profiles from "./Access_Profiles.js";
import Collaborators from "./Collaborators.js";

/**
 * class model
 */
export default class Users extends BasePeopleModel {

  //table fields
  declare people_id: number;
  declare collaborator_id: number;
  declare access_profile_id: number;
  declare email: string;
  declare password: string;
  declare last_token:string;
  declare last_timezone_offset: number;


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

  static async createData(params: any) {
    params = params || {};  
    if (params.password) {
      params.password = bcrypt.hashSync(params.password,((process as any).env.API_USER_PASSWORD_CRIPTSALT||10)-0)
    }                  
    return await BasePeopleModel.createData.bind(Users)(params);
  }  
  static putData = this.createData;

  static async updateData(params: any) {
    params = params || {};  
    if (params.password) {
      params.password = bcrypt.hashSync(params.password,((process as any).env.API_USER_PASSWORD_CRIPTSALT||10)-0)
    }                  
    return await BasePeopleModel.updateData.bind(Users)(params);
  }  
  static patchData = this.updateData;
}
