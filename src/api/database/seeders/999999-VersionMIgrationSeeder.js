'use strict';
require('dotenv').config({ path: __dirname + "/../../../../.env" });
const { TasksStatus } = require('../models/TasksStatus');
const configDB  = require("../../database/config/config");
const DBConnectionManager = require('../DBConnectionManager');
const { QueryTypes } = require('sequelize');
const { Utils } = require('../../controllers/utils/Utils');
const { DataTables } = require('../models/DataTables');
const { Modules } = require('../models/Modules');
const { Routines } = require('../models/Routines');
const { DataConnections } = require('../models/DataConnections');

/** @type {import('sequelize-cli').Migration} */

module.exports = {

  /**
   * Migrate all data of all tables if exists old connection and exists old database
   * @param {*} queryInterface 
   * @param {*} Sequelize 
   */
  async up (queryInterface, Sequelize) {        

    async function migrateDataOldTable(pOldConnection,pOlddSchemaName,pOldTableName,pNewTableName) {
      try {
        let regs = await pOldConnection.query(`
          select 
            t.* 
          from 
            ${pOlddSchemaName}.${pOldTableName} t
          order by 1`,
          {raw:true,queryType: QueryTypes.SELECT}        
        );
        if (regs && regs.length) {
          Utils.log('FL','regs',regs.length);
          let describeNew = await queryInterface.describeTable(pNewTableName);
          let fields = Object.keys(describeNew).join(',').toUpperCase().split(',');
          let newRegs = regs[0];
          if (newRegs && newRegs.length) {
            Utils.log('FL','newRegs',newRegs.length);
            for(let key in newRegs) {
              Utils.deleteNotExistsProperty(newRegs[key],fields);
            }         
            if (pNewTableName === 'USERS') Utils.log('newregs users inserting',newRegs);
            await queryInterface.bulkInsert(pNewTableName,newRegs,{
              ignoreDuplicates:true,
              updateOnDuplicate:null
            });
          } else {
            Utils.log('FL','no news regs');  
          }
        } else {
          Utils.log('FL','no regs');
        }
      } catch (e) {
        if (e.message.trim().toLowerCase().indexOf('unknown database ') === 0) {
          Utils.log('FL',`ignoring data migration table ${pOldTableName}, schema ${pOlddSchemaName} not exists`);
        } else {
          Utils.log('FL',e);
        }
      }
    }
    
    let oldConnection = DBConnectionManager.getOldDBConnection();
    if (oldConnection) {
      let tables = await DataTables.getModel().findAll({
        raw:true,
        where:{
          IDDATACONNECTION: configDB[`${process.env.NODE_ENV||'development'}`].ID,//only tables of this coonnections can be data migrated 
          ID:{

            //configure here ids of tables that whant excluded of this migration
            [Sequelize.Op.notIn] : [
              DataConnections.ID,
              DataTables.ID,
              Modules.ID,
              Routines.ID
            ]
          }          
        },
        order:[['ID']]
      });
      if (tables && tables.length) {
        let oldConfig = configDB[`${process.env.NODE_ENV||'development'}_old`] || {};
        for(let key in tables) {
          await migrateDataOldTable(oldConnection,oldConfig.database.toUpperCase(),tables[key].NAME.toUpperCase(),tables[key].NAME.toUpperCase());  
        }
      }
    }     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(TasksStatus.name.toUpperCase(), null, {});
  }
};
