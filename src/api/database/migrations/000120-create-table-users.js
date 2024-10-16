'use strict';

/*imports*/
require('dotenv').config({ path: __dirname + "/../../../../.env" });
const bcrypt = require("bcrypt");
const { Users } = require('../models/Users');
const { Tables } = require('../models/Tables');
const { Data_Origins } = require('../models/Data_Origins');
const { Record_Status } = require('../models/Record_Status');
const { People } = require('../models/People');
const { Collaborators } = require('../models/Collaborators');
const { Connections } = require('../models/Connections');
const { Schemas } = require('../models/Schemas');
const { Contexts } = require('../models/Contexts');
const { Entities_Types } = require('../models/Entities_Types');
const { Data_Types } = require('../models/Data_Types');
const { Parameters } = require('../models/Parameters');
const { Parameter_Values } = require('../models/Parameter_Values');
const { Sync_Status } = require('../models/Sync_Status');
const { Identifier_Types } = require('../models/Identifier_Types');
const { Greatnesses } = require('../models/Greatnesses');
const { Measurement_Units } = require('../models/Measurement_Units');
const { Access_Profiles } = require('../models/Access_Profiles');
const { AuthController } = require('../../controllers/auth/AuthController');
const { Run_Status } = require('../models/Run_Status');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Users.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});           
    
    await queryInterface.bulkInsert(Users.tableName,[{      
      id:Users.SYSTEM,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,      
      people_id : People.SYSTEM,
      access_profile_id : Access_Profiles.SYSTEM,
      email:process.env.SYSTEM_EMAIL || 'system@system',
      password: bcrypt.hashSync(process.env.SYSTEM_EMAIL_PASSWORD ||'system',(process.env.API_USER_PASSWORD_CRIPTSALT||10)-0)
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });     

    await Tables.migrateForeignKeyContraint(queryInterface,Users);  
    await Connections.migrateForeignKeyContraint(queryInterface,Users);  
    await Schemas.migrateForeignKeyContraint(queryInterface,Users);  
    await Contexts.migrateForeignKeyContraint(queryInterface,Users);  
    await Entities_Types.migrateForeignKeyContraint(queryInterface,Users);      
    await Data_Types.migrateForeignKeyContraint(queryInterface,Users);  
    await Parameters.migrateForeignKeyContraint(queryInterface,Users);  
    await Parameter_Values.migrateForeignKeyContraint(queryInterface,Users);  
    await Data_Origins.migrateForeignKeyContraint(queryInterface,Users);  
    await Record_Status.migrateForeignKeyContraint(queryInterface,Users);  
    await Sync_Status.migrateForeignKeyContraint(queryInterface,Users);  
    await Run_Status.migrateForeignKeyContraint(queryInterface,Users);  
    await Identifier_Types.migrateForeignKeyContraint(queryInterface,Users);  
    await Greatnesses.migrateForeignKeyContraint(queryInterface,Users);  
    await Measurement_Units.migrateForeignKeyContraint(queryInterface,Users);  
    await People.migrateForeignKeyContraint(queryInterface,Users);  
    await Collaborators.migrateForeignKeyContraint(queryInterface,Users);  
    await Access_Profiles.migrateForeignKeyContraint(queryInterface,Users);  
    await Users.migrateForeignKeyContraint(queryInterface);  
        
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Users.tableName);
  }
};