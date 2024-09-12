'use strict';
require('dotenv').config({ path: __dirname + "/../../../../.env" });
const { Task_Status } = require('../models/Task_Status');
const configDB  = require("../../database/config/config");
const DBConnectionManager = require('../DBConnectionManager');
const { QueryTypes } = require('sequelize');
const { Utils } = require('../../controllers/utils/Utils');
const { Tables } = require('../models/Tables');
const { Modules } = require('../models/Modules');
const { Routines } = require('../models/Routines');
const { Connections } = require('../models/Connections');

/** @type {import('sequelize-cli').Migration} */


let oldTables = {  
  allTables : {
    allColumns: (old) => old.toLowerCase(),
    columns:{
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
  },
  tables:{
    tableName:"DATATABLES"
  },
  connections:{
    tableName:"DATACONNECTIONS"
  },
  schemas:{
    tableName:"DATASCHEMAS"
  },
  entities_types:{
    tableName:"ENTITIESTYPES"
  },
  data_types:{
    tableName:"DATATYPES"
  },  
  action_status:{
    tableName:"ACTIONSSTATUS"
  },
  parameter_values:{
    tableName:"PARAMETERSVALUES"
  },
  data_origins:{
    tableName:"ORIGINSDATAS"
  },
  record_status:{
    tableName:"STATUSREGS"
  },
  sync_status:{
    tableName:"STATUSSYNC"
  },
  run_status:{
    tableName:"STATUSRUN"
  },
  identifier_types:{
    tableName:"IDENTIFIERSTYPES"
  },  
  value_names:{
    tableName:"VALUESNAMES"
  },
  measurement_units:{
    tableName:"MEASUREMENTSUNITS"
  },  
  access_profiles:{
    tableName:"ACCESSESPROFILES"
  },  
  user_tokens:{
    tableName:"USERSTOKENS"
  },  
  user_profile_timeworks:{
    tableName:"USERSPROFILESTIMESWORK"
  },  
  user_timeworks:{
    tableName:"USERSTIMESWORK"
  },    
  routine_types:{
    tableName:"ROUTINESTYPES"
  }, 
  routine_contents:{
    tableName:"ROUTINESCONTENT"
  },    
  relationship_types:{
    tableName:"DATARELATIONSHIPTYPES"
  },    
  relationship_values:{
    tableName:"DATASRELATIONSHIPSVALUES"
  },    
  relationships:{
    tableName:"DATASRELATIONSHIPS"
  },    
  contract_types:{
    tableName:"CONTRACTSTYPES"
  },    
  currencies:{
    tableName:"CURRENCIESTYPES"
  },    
  form_types:{
    tableName:"FORMSTYPES"
  },    
  financial_value_forms:{
    tableName:"FINANCIALVALUEFORMS"
  },    
  financial_value_localization_types:{
    tableName:"FINANCIALVALUELOCALIZATIONSTYPES"
  },     
  financial_value_mov_types:{
    tableName:"FINANCIALVALUEMOVTYPES"
  },      
  street_types:{
    tableName:"STREETTYPES"
  },        
  address_types:{
    tableName:"ADDRESSESTYPES"
  },
  postal_codes:{
    tableName:"POSTALCODES"
  },
  postal_codes_x_streets:{
    tableName:"POSTALCODESXSTREETS"
  },
  postal_codes_x_paths:{
    tableName:"POSTALCODESXPATHS"
  },
  contact_types:{
    tableName:"CONTACTSTYPES"
  },
  people_x_addresses:{
    tableName:"PEOPLEXADDRESSES"
  },
  people_x_contacts:{
    tableName:"PEOPLEXCONTACTS"
  },
  business_units:{
    tableName:"BUSINESSESUNITS"
  },
  warehouse_address_types:{
    tableName: "WAREHOUSESADDRESSESTYPES"
  },
  warehouse_addresses:{
    tableName:"WAREHOUSESADDRESSES"
  },  
  warehouse_address_coordinates:{
    tableName:"WAREHOUSESADDRESSESCOORDINATES"
  },  
  warehouse_address_dimensions:{
    tableName:"WAREHOUSESADDRESSESDIMENSIONS"
  },  
  warehouse_address_capacities:{
    tableName:"WAREHOUSESADDRESSESCAPACITIES"
  },    
  collaborator_functions:{
    tableName:"COLLABORATORSFUNCTIONS"
  },    
  collaborator_contracts:{
    tableName:"COLLABORATORSCONTRACTS"
  },      
  collaborators_x_functions:{
    tableName:"COLLABORATORSXFUNCTIONS"
  },      
  power_types:{
    tableName:"POWERSTYPES"
  },        
  condiction_items:{
    tableName:"CONDICTIONSITEMS"
  },      
  conteiner_types:{
    tableName:"CONTEINERSTYPES"
  },      
  conteiner_type_dimensions:{
    tableName:"CONTEINERSTYPESDIMENSIONS"
  },      
  conteiner_type_capacities:{
    tableName:"CONTEINERSTYPESCAPACITIES"
  },          
  gtin_types:{
    tableName:"GTINSTYPES"
  },      
  item_status:{
    tableName:"ITEMSSTATUS"
  },
  items_x_lots_x_conteiners:{
    tableName:"ITEMSXLOTSXCONTEINERS"
  },
  stock_entity_relationship_types:{
    tableName:"STOCKSENTITIESRELATIONSHIPSTYPES"
  },
  stock_entities:{
    tableName:"STOCKSENTITIES"
  },
  item_stock_units:{
    tableName:"ITEMSSTOCKSUNITS"
  },  
  item_stocks:{
    tableName:"ITEMSSTOCKS"
  },       
  item_x_meas_x_pack_x_identif:{
    tableName:"ITEMSXMEAXPACKXIDENTIF"
  },    
  movement_types:{
    tableName:"MOVEMENTSTYPES"
  },    
  movement_status:{
    tableName:"MOVEMENTSSTATUS"
  },
  conference_types:{
    tableName:"CONFERENCESTYPES"
  },  
  movs_x_items_stocks:{
    tableName:"MOVSXITEMSSTOCKS"
  },    
  movement_groups:{
    tableName:"GROUPSMOVEMENTS"
  },      
  movements_x_groups:{
    tableName:"GROUPEDSMOVEMENTS"
  },      
  movement_entity_relationship_types:{
    tableName:"MOVEMENTSENTITIESRELATIONSHIPSTYPES"
  },  
  movements_x_entities:{
    tableName:"MOVEMENTSXENTITIES"
  },  
  item_mov_amount_restrictions:{
    tableName:"ITEMSMOVSAMOUNTSRESTRICTIONS"
  },  
  item_mov_amounts:{
    tableName:"ITEMSMOVSAMOUNTS"
  },   
  item_mov_units:{
    tableName:"ITEMSMOVSUNITS"
  },     
  item_mov_xml_import_id_conversions:{
    tableName:"ITEMSMOVSXMLIMPORTIDSCONVERSIONS"
  },     
  commission_entitiy_codes:{
    tableName:"COMMISSIONSENTITIESCODES"
  },
  commission_items:{
    tableName:"COMMISSIONSITEMS"
  },  
  commission_values:{
    tableName:"COMMISSIONSVALUES"
  },  
  sql_object_types:{
    tableName:"SQLOBJECTSTYPES"
  },      
  sql_processes:{
    tableName:"SQLPROCESSES"
  },    
  report_visions:{
    tableName:"REPORTSVISIONS"
  },   
  sql_objects:{
    tableName:"SQLOBJECTS"
  },      
  report_data_fount_items:{
    tableName:"REPORTSDATASFOUNTSITEMS"
  },
  report_data_founts:{
    tableName:"REPORTSDATASFOUNTS"
  },
  logistic_mov_types:{
    tableName:"LOGISTICMOVTYPES"
  },
  logistic_status:{
    tableName:"LOGISTICSTATUS"
  },  
  logistic_reasons:{
    tableName:"LOGISTICREASONS"
  },    
  logistic_orders:{
    tableName:"LOGISTICORDERS"
  },   
  logistic_orders_x_movs:{
    tableName:"LOGISTICORDERSXMOVS"
  },    
  logistic_orders_x_movs_x_receipt_values:{
    tableName:"LOGISTICORDERSXMOVSXRECEIPTVALUES"
  },    
  logistic_orders_x_items_mov_amt:{
    tableName:"LOGISTICORDERSXITEMSMOVAMT"
  },    
  logistic_orders_x_dest_values:{
    tableName:"LOGISTICORDERSXDESTVALUES"
  }, 
  logistic_logs:{
    tableName:"LOGISTICLOGS"
  },    
  tasks_x_status_x_users:{
    tableName:"TASKSXSTATUSXUSERS"
  },    
  tasks_x_status_x_users_logs:{
    tableName:"TASKSXSTATUSXUSERSLOGS"
  },    
  task_status:{
    tableName:"TASKSSTATUS"
  },
  api_requests:{
    tableName:"APISREQUESTS"
  },
  api_request_calls:{
    tableName:"APISREQUESTSCALLS"
  },
  api_responses:{
    tableName:"APISRESPONSES"
  },  
  maps_api_responses:{
    tableName:"APISMAPSRESPONSES"
  },
  meas_x_meas_origins:{
    tableName:"MEASXMEASORIGINS"
  },
  packs_x_packs_origins:{
    tableName:"PACKSXPACKSORIGINS"
  },
  error_logs:{
    tableName:"ERRORSLOGS"
  },
  migration_tables:{
    tableName:"MIGRATIONSTABLES"
  },  
  migration_columns:{
    tableName:"MIGRATIONSCOLUMNS"
  },
  migration_control:{
    tableName:"MIGRATIONSCONTROL"
  }        
  
}

module.exports = {

  /**
   * Migrate all data of all tables if exists old connection and exists old database
   * @param {*} queryInterface 
   * @param {*} Sequelize 
   */
  async up (queryInterface, Sequelize) {        

    async function migrateDataOldTable(pOldConnection,pOlddSchemaName,pNewTableName) {
      try {
        let oldTableName = pNewTableName;
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
          {raw:true,queryType: QueryTypes.SELECT}        
        );
        if (regs && regs.length) {
          //Utils.log('FL','regs',regs.length);
          let describeNew = await queryInterface.describeTable(pNewTableName);
          let fields = Object.keys(describeNew).join(',').toLowerCase().split(',');
          let newRegs = regs[0];
          if (newRegs && newRegs.length) {
            Utils.log('FL','newRegs',newRegs.length);
            let allOldColumns = {};
            if (Utils.hasValue(oldTables.allTables.columns)) {              
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
            if (pNewTableName === 'users') Utils.log('newregs users inserting',newRegs);
            for(let index in newRegs) {

              if (Utils.hasValue(oldTables.allTables.allColumns)) {
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
          Utils.log('FL',`ignoring data migration table ${oldTableName}, schema ${pOlddSchemaName} not exists`);
        } else {
          Utils.log('FL',e);
        }
      }
    }
    
    let oldConnection = DBConnectionManager.getOldDBConnection();
    if (oldConnection) {
      let tables = await Tables.getModel().findAll({
        raw:true,
        where:{
          IDDATACONNECTION: configDB[`${process.env.NODE_ENV||'development'}`].id,//only tables of this coonnections can be data migrated 
          id:{

            //configure here ids of tables that whant excluded of this migration
            [Sequelize.Op.notIn] : [
              Connections.id,
              Tables.id,
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
          await migrateDataOldTable(oldConnection,oldConfig.database.toLowerCase(),tables[key].name.toLowerCase());  
        }
      }
    }     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(Task_Status.tableName, null, {});
  }
};
