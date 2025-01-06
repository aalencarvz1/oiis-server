'use strict';

import  Data_Origins  from '../models/Data_Origins.js';
import  Record_Status  from '../models/Record_Status.js';
import  Users  from '../models/Users.js';
import  Identifier_Types  from '../models/Identifier_Types.js';
import  Containers  from '../models/Containers.js';
import  Container_Types  from '../models/Container_Types.js';
import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {    
    await queryInterface.bulkInsert(Containers.tableName,[{
      id: Containers.WITHOUT_CONTEINER,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      container_type_id: Container_Types.NO_CONTEINER,
      identifier_type_id : Identifier_Types.IDENTIFIER,
      identifier: Containers.WITHOUT_CONTEINER
    }],{
      ignoreDuplicates:true
    });  
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
     await queryInterface.bulkDelete(Containers.tableName, {});
  }
};
