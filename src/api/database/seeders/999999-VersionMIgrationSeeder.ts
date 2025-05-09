'use strict';
import  Task_Status  from '../models/Task_Status.js';
import  { Op, QueryInterface, QueryTypes } from 'sequelize';
import  Utils  from '../../controllers/utils/Utils.js';
import  Tables  from '../models/Tables.js';
import  Modules  from '../models/Modules.js';
import  Routines  from '../models/Routines.js';
import  Connections  from '../models/Connections.js';
import config from '../config/config.js';
import DBConnectionManager from '../DBConnectionManager.js';

/** @type {import('sequelize-cli').Migration} */

/*configures old objects names from old database mappeds to new objects names in new database. all options are optionally
ex:
{
  allTables:(oldColumn)=>transforma_all_old_columns_to(oldColumn)
  old_table_name:{
    tableName: new_table_name,
    columns: {
      old_column_name: new_column_name
    }
  }
}
*/
let oldTables : any = {    
  'campaign_kpis':{
    'columns':{
      'order_num':'numeric_order'
    }
  },
  'campaign_kpi_result_values':{
    'columns':{
      'order_num':'numeric_order'
    }
  }
}

export default {

  /**
   * Migrate all data of all tables if exists old connection and exists old database
   * @param {*} queryInterface 
   * @param {*} Sequelize 
   */
  async up(queryInterface: QueryInterface, Sequelize: any) {        

    async function migrateDataOldTable(pOldConnection: any,pOlddSchemaName: string,pNewTableName: string) {
      let oldTableName = pNewTableName;
      try {
        let keyOldTable = Utils.getKey(oldTables,oldTableName);
        let oldTable = null;
        if (Utils.hasValue(keyOldTable)) {
          oldTable = oldTables[keyOldTable];
          oldTableName = oldTable.tableName || oldTableName;
        }

        let regs = await pOldConnection.query(`
          select 
            t.* 
          from 
            ${pOlddSchemaName}.${oldTableName} t
          order by 1`,
          {raw:true,type: QueryTypes.SELECT}        
        );
        if (regs && regs.length) {
          //Utils.log('FL','regs',regs.length);
          let describeNew = await queryInterface.describeTable(pNewTableName);
          let fields = Object.keys(describeNew).join(',').toLowerCase().split(',');
          let newRegs = regs;
          if (newRegs && newRegs.length) {
            Utils.log('FL','newRegs',newRegs.length);
            let allOldColumns : any = {};
            if (Utils.hasValue(oldTables.allTables?.columns)) {              
              let correctOldColumnKey = null;
              for(let oldColumn in oldTables.allTables.columns) {                
                correctOldColumnKey = Utils.getKey(newRegs[0],oldColumn);                
                if (Utils.hasValue(correctOldColumnKey)) {                    
                  if (typeof oldTables.allTables?.allColumns == 'function') {
                    allOldColumns[oldTables.allTables.allColumns(correctOldColumnKey)] = oldTables.allTables.columns[oldColumn];                      
                  } else {
                    allOldColumns[correctOldColumnKey] = oldTables.allTables.columns[oldColumn];                      
                  }                                                 
                }                  
              }                            
            }
            Utils.log('FL','KEYS OLD',oldTableName,allOldColumns);

            if (Utils.hasValue(oldTable)) {
              let correctOldColumnKey = null;
              for(let oldColumn in oldTable.columns) {
                correctOldColumnKey = Utils.getKey(newRegs[0],oldColumn);
                if (Utils.hasValue(correctOldColumnKey)) {
                  if (typeof oldTables.allTables?.allColumns == 'function') {
                    allOldColumns[oldTables.allTables.allColumns(correctOldColumnKey)] = oldTable.columns[oldColumn];
                  } else {
                    allOldColumns[correctOldColumnKey] = oldTable.columns[oldColumn];
                  }
                }
              }
            }
            Utils.log('FL','KEYS OLD',oldTableName,allOldColumns);            
            for(let index in newRegs) {

              if (Utils.hasValue(oldTables.allTables?.allColumns)) {
                if (typeof oldTables.allTables.allColumns == 'function') {
                  for(let oldColumn in newRegs[index]) {
                    let newCol = oldTables.allTables.allColumns(oldColumn);
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
            await queryInterface.bulkInsert(pNewTableName,newRegs,{
              ignoreDuplicates:true
            });


            let qty : any = await DBConnectionManager.getDefaultDBConnection()?.query(`
              select 
                count(1) as qty
              from 
                \`${pNewTableName}\``,
              {raw:true,type: QueryTypes.SELECT}
            );
            if ((qty[0]?.qty ||0) < newRegs.length) {
              Utils.log(`newregs ${pNewTableName} inserting`,newRegs);
              throw new Error(`${(qty[0]?.qty ||0)} register(s) migrated from old table ${oldTableName} to ${pNewTableName} of ${newRegs.length}`);
            } else {
              Utils.log(`${(qty[0]?.qty ||0)} register(s) migrated from old table ${oldTableName} to ${pNewTableName} of ${newRegs.length}`);
            }

          } else {
            Utils.log('FL','no news regs');  
          }
        } else {
          Utils.log('FL','no regs');
        }
      } catch (e: any) {
        if (e.message.trim().toLowerCase().indexOf('unknown database ') === 0) {
          Utils.log('FL',`ignoring data migration table ${oldTableName}, schema ${pOlddSchemaName} not exists`);
        } else {
          Utils.log('FL',e);
        }
      }
    }
    
    let oldConnection = DBConnectionManager.getOldDBConnection();
    if (oldConnection) {


      let query = `
        select
          *
        from
          ${Tables.tableName}
        where
          data_connection_id = ${(config as any)[`${process.env.NODE_ENV||'development'}`].id}
          and id not in (
            ${Connections.id},
            ${Tables.id},
            ${Modules.id},
            ${Routines.id}
          )
        order by
          id 
      `
      let tables : any = await queryInterface.sequelize.query(
        query,
        {
          type: QueryTypes.SELECT,
        }
      );

      if (Utils.hasValue(tables)) {
        let oldConfig = (config as any)[`${process.env.NODE_ENV||'development'}_old`] || {};
        for(let key in tables) {
          await migrateDataOldTable(oldConnection,oldConfig.database.toLowerCase(),tables[key].name.toLowerCase());  
        }
      }
    }     
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
     await queryInterface.bulkDelete(Task_Status.tableName, {});
  }
};
