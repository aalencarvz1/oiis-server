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


let oldColumns = {
  ALLCOLUMNS: (old) => old.toLowerCase(),
  ALLTABLES : {
    IDSTATUSREG: 'status_reg_id',
    IDUSERCREATE: 'creator_user_id',
    CREATEDAT: 'created_at',
    IDUSERUPDATE: 'updater_user_id',
    UPDATEDAT: 'updated_at',
    IDORIGINDATA: 'data_origin_id',
    IDONORIGINDATA: 'id_at_origin',
    DELETEDAT: 'deleted_at',
    ISSYSTEMREG: 'is_sys_rec'
  }
}

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
          //Utils.log('FL','regs',regs.length);
          let describeNew = await queryInterface.describeTable(pNewTableName);
          let fields = Object.keys(describeNew).join(',').toLowerCase().split(',');
          let newRegs = regs[0];
          if (newRegs && newRegs.length) {
            Utils.log('FL','newRegs',newRegs.length);
            let keyAllColumnsOld = Utils.getKey(oldColumns,'ALLCOLUMNS');
            let keyAllTablesOld = Utils.getKey(oldColumns,'ALLTABLES');
            let keyTableOld = Utils.getKey(oldColumns,pOldTableName);
            let allOldColumns = {};

            if (Utils.hasValue(keyAllTablesOld)) {
              let correctOldColumnKey = null;
              for(let oldColumn in oldColumns[keyAllTablesOld]) {                
                correctOldColumnKey = Utils.getKey(newRegs[0],oldColumn);
                if (Utils.hasValue(correctOldColumnKey)) {
                  if (Utils.hasValue(keyAllColumnsOld)) {
                    if (typeof oldColumns[keyAllColumnsOld] == 'function') {
                      allOldColumns[oldColumns[keyAllColumnsOld](correctOldColumnKey)] = oldColumns[keyAllTablesOld][oldColumn];
                    } else {
                      throw new Error('do implement');
                    } 
                  } else {
                    allOldColumns[correctOldColumnKey] = oldColumns[keyAllTablesOld][oldColumn];
                  }
                }
              }              
            }
            Utils.log('FL','KEYS OLD',pOldTableName,allOldColumns);

            if (Utils.hasValue(keyTableOld)) {
              let correctOldColumnKey = null;
              for(let oldColumn in oldColumns[keyTableOld]) {
                correctOldColumnKey = Utils.getKey(newRegs[0],oldColumn);
                if (Utils.hasValue(correctOldColumnKey)) {
                  if (Utils.hasValue(keyAllColumnsOld)) {
                    if (typeof oldColumns[keyAllColumnsOld] == 'function') {
                      allOldColumns[oldColumns[keyAllColumnsOld](correctOldColumnKey)] = oldColumns[keyTableOld][oldColumn];
                    } else {
                      throw new Error('do implement');
                    }
                  } else {
                    allOldColumns[correctOldColumnKey] = oldColumns[keyTableOld][oldColumn];
                  }
                }
              }
            }
            Utils.log('FL','KEYS OLD',pOldTableName,allOldColumns);
            if (pNewTableName === 'users') Utils.log('newregs users inserting',newRegs);
            for(let index in newRegs) {

              if (Utils.hasValue(keyAllColumnsOld)) {
                if (typeof oldColumns[keyAllColumnsOld] == 'function') {
                  for(let oldColumn in newRegs[index]) {
                    let newCol = oldColumns[keyAllColumnsOld](oldColumn);
                    if (newCol != oldColumn) {
                      newRegs[index][newCol] = newRegs[index][oldColumn];
                      delete newRegs[index][oldColumn];
                    }
                  }
                } else {
                  throw new Error('do implement');
                }
              }

              if(Utils.hasValue(allOldColumns)) {
                for(let oldColumn in allOldColumns) {
                  if (Utils.hasValue(newRegs[index][oldColumn])) {
                    newRegs[index][allOldColumns[oldColumn]] = newRegs[index][oldColumn];
                    delete newRegs[index][oldColumn];
                  } else if (Utils.hasValue(Utils.getKey(newRegs[index],oldColumn))) {
                    delete newRegs[index][oldColumn];
                  }
                }
              }
              if (pNewTableName === 'users') Utils.log('newregs users inserting',newRegs[index]);
              Utils.deleteNotExistsProperty(newRegs[index],fields);
              if (pNewTableName === 'users') Utils.log('newregs users inserting',newRegs[index]);
            }         
            if (pNewTableName === 'users') Utils.log('newregs users inserting',newRegs);
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
          IDDATACONNECTION: configDB[`${process.env.NODE_ENV||'development'}`].id,//only tables of this coonnections can be data migrated 
          id:{

            //configure here ids of tables that whant excluded of this migration
            [Sequelize.Op.notIn] : [
              DataConnections.id,
              DataTables.id,
              Modules.id,
              Routines.id
            ]
          }          
        },
        order:[['id']]
      });
      if (tables && tables.length) {
        let oldConfig = configDB[`${process.env.NODE_ENV||'development'}_old`] || {};
        for(let key in tables) {
          await migrateDataOldTable(oldConnection,oldConfig.database.toLowerCase(),tables[key].name.toLowerCase(),tables[key].name.toLowerCase());  
        }
      }
    }     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(TasksStatus.name.toLowerCase(), null, {});
  }
};
