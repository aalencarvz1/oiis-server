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
    tableName:"DATATABLES",
    columns:{
      IDDATACONNECTION:"data_connection_id",
      IDSCHEMA:"schema_id"
    }
  },
  connections:{
    tableName:"DATACONNECTIONS",
    columns:{
      ISDEFAULT:"is_default",
    }
  },
  errors:{
    columns:{
      OBJECTTYPE:"object_type",
      OBJECTNAME:"object_name"
    }
  },
  schemas:{
    tableName:"DATASCHEMAS",
    columns:{
      ISDEFAULT:"is_default",
    }
  },
  entities_types:{
    tableName:"ENTITIESTYPES"
  },
  data_types:{
    tableName:"DATATYPES",
    columns:{
      ISBOOLEAN:"is_bool",
      ISTEXT:"is_text",
      ISNUMBER:"is_number",
      ISARRAY:"is_array",
      ISOBJECT:"is_object",
      ISDECIMAL:"is_decimal",
      ISDATE:"is_date",
      ISTIME:"is_time",
      ISOTHER:"is_other",
    }
  },  
  action_status:{
    tableName:"ACTIONSSTATUS",
    columns:{
      ISSTARTED: "is_started",
      ISRUNNING: "is_running",
      ISSTOPED: "is_stopped",
      ISCANCELED: "is_canceled",
      ISCONCLUDED: "is_concluded"
    }
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
    tableName:"STATUSRUN",
    columns:{
      ISRUNNING:"is_running",
      ISSTOPED:"is_stopped",
      ISCANCELED:"is_canceled",
      ISCONCLUDED:"is_canceled",
    }
  },
  identifier_types:{
    tableName:"IDENTIFIERSTYPES",
    columns:{
      PROCESSTOVALIDATE:"process_to_validate"
    }
  },  
  value_names:{
    tableName:"VALUESNAMES"
  },
  measurement_units:{
    tableName:"MEASUREMENTSUNITS",
    columns:{
      ISSCALAR:"is_scalar",
      ISVETORIAL:"is_vetorial",
    }
  },  
  access_profiles:{
    tableName:"ACCESSESPROFILES",
    columns:{
      ALLOWACESSALLROUTINESOFMODULE:'allow_access_to_all_module_routines'
    }
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
  modules:{
    columns:{
      IDSUP:"parent_id",
      ORDERNUM:"numeric_order"
    }
  },  
  routine_types:{
    tableName:"ROUTINESTYPES"
  },   
  routines:{
    columns:{
      IDSUP:"parent_id",
      ORDERNUM:"numeric_order"
    }
  },
  routine_contents:{
    tableName:"ROUTINESCONTENT"
  },    
  relationship_types:{
    tableName:"DATARELATIONSHIPTYPES"
  },    
  relationship_values:{
    tableName:"DATASRELATIONSHIPSVALUES",
    columns:{
      IDIDENTIFIERTYPE:"identifier_type_id",
      ORDERNUM:"numeric_order"
    }
  },    
  relationships:{
    tableName:"DATASRELATIONSHIPS",
    columns:{
      ORDERNUM:"numeric_order"
    }
  },    
  contract_types:{
    tableName:"CONTRACTSTYPES"
  },    
  currencies:{
    tableName:"CURRENCIESTYPES",
    columns:{
      ISPHYSICAL: "is_physical"
    }
  },    
  form_types:{
    tableName:"FORMSTYPES"
  },    
  financial_value_forms:{
    tableName:"FINANCIALVALUEFORMS",
    columns:{
      IDSUP:"parent_id",
      ISPHYSICAL:"is_physical",
      ISCARD:"is_card",
      ISELETRONIC:"is_eletronic",
      ISCHECK:"is_check",
      ISDEPOSIT:"is_deposit",
      ISBOLET:"is_bolet"
    }
  },    
  financial_value_localization_types:{
    tableName:"FINANCIALVALUELOCALIZATIONSTYPES",
    columns:{
      IDSUP:"parent_id",
      ISPHYSICAL:"is_physical",
      ISELETRONIC:"is_eletronic"
    }
  },     
  financial_value_mov_types:{
    tableName:"FINANCIALVALUEMOVTYPES",
    columns:{
      IDSUP:"parent_id",
      ISPHYSICAL:"is_physical",
      ISELETRONIC:"is_eletronic"
    }
  },    
  cities:{
    columns:{
      IDSTATE:"state_id"
    }
  }, 
  street_types:{
    tableName:"STREETTYPES"
  },    
  streets:{
    columns:{
      IDSTREETTYPE:"street_type_id"
    }
  },   
  address_types:{
    tableName:"ADDRESSESTYPES"
  },
  postal_codes:{
    tableName:"POSTALCODES",
    columns:{
      IDADDRESSTYPE:"address_type_id"
    }
  },
  postal_codes_x_streets:{
    tableName:"POSTALCODESXSTREETS",
    columns:{
      IDPOSTALCODE:"postal_code_id",
      IDNEIGHBORHOOD:"neighborhood_id",
      IDSTREET:"street_id"
    }
  },
  postal_codes_x_paths:{
    tableName:"POSTALCODESXPATHS",
    columns:{
      IDPOSTALCODE:"postal_code_id",
      IDPOSTALCODEXSTREET:"postal_code_x_street_id",
      STARTNUMBER:"start_number",
      ENDNUMBER:"end_number"
    }
  },
  contact_types:{
    tableName:"CONTACTSTYPES"
  },
  contacts:{
    columns:{
      IDCONTACTTYPE:"contact_type_id"
    }
  },
  addresses:{
    columns:{
      IDADDRESSTYPE:"address_type_id",
      IDNEIGHBORHOOD:"neighborhood_id",
      IDSTREET:"street_id",
      IDPOSTALCODE:"postal_code_id",
    }
  },
  people:{
    columns:{
      IDIDENTIFIERDOCTYPE:"identifier_doc_type_id",
      IDENTIFIERDOC:"identifier_doc",
      BIRTHDATE:"birth_date"
    }
  },
  people_x_addresses:{
    tableName:"PEOPLEXADDRESSES",
    columns:{
      IDPEOPLE:"people_id",
      IDADDRESSTYPE:"address_type_id",
      ORDERNUM:"numeric_order"
    }
  },
  people_x_contacts:{
    tableName:"PEOPLEXCONTACTS",
    columns:{
      IDPEOPLE:"people_id",
      IDCONTACTTYPE:"contact_type_id",
      ORDERNUM:"numeric_order"
    }
  },
  companies:{
    columns:{
      IDPEOPLE:"people_id"
    }
  },
  business_units:{
    tableName:"BUSINESSESUNITS",
    columns:{
      IDPEOPLE:"people_id",
      IDCOMPANY:"company_id"
    }
  },
  greatnesses:{
    columns:{
      ISSCALAR:"is_scalar",
      ISVETORIAL:"is_vetorial"
    }
  },
  warehouses:{
    columns:{
      IDPEOPLE:"people_id",
      IDCOMPANY: "company_id"
    }
  },
  warehouse_address_types:{
    tableName: "WAREHOUSESADDRESSESTYPES"
  },
  warehouse_addresses:{
    tableName:"WAREHOUSESADDRESSES",
    columns:{
      IDIDENTIFIERTYPE:"identifier_type_id",
      ISDISPONIBLE:"is_disponible"
    }
  },  
  warehouse_address_coordinates:{
    tableName:"WAREHOUSESADDRESSESCOORDINATES",
    columns:{
      IDWAREHOUSEADDRESS:"warehouse_address_id"
    }
  },  
  warehouse_address_dimensions:{
    tableName:"WAREHOUSESADDRESSESDIMENSIONS",
    columns:{
      IDWAREHOUSEADDRESS:"warehouse_address_id",
      IDDIMENSIONTYPE:"dimension_type_id",
      IDMEASUREMENTUNIT:"measurement_unit_id"
    }
  },  
  warehouse_address_capacities:{
    tableName:"WAREHOUSESADDRESSESCAPACITIES",
    columns:{
      IDWAREHOUSEADDRESS:"warehouse_address_id",
      IDCAPACITYTYPE:"capacity_type_id",
      IDMEASUREMENTUNIT:"measurement_unit_id"
    }
  },    
  suppliers:{
    columns:{
      IDPEOPLE:"people_id"
    }
  },
  collaborators:{
    columns:{
      IDPEOPLE:"people_id"
    }
  },
  collaborator_functions:{
    tableName:"COLLABORATORSFUNCTIONS",
    columns:{
      ISTRUST:"is_trust",
      ISTIMECONTROLLED:"is_time_controlled"
    }
  },    
  collaborator_contracts:{
    tableName:"COLLABORATORSCONTRACTS",
    columns:{
      IDCOLLABORATOR:"collaborator_id",
      IDCONTRACTTYPE:"contract_type_id",
      STARTDATE:"start_date",
      ENDDATE:"end_date",
      ISTIMECONTROLLED:"is_time_controlled"
    }
  },      
  collaborators_x_functions:{
    tableName:"COLLABORATORSXFUNCTIONS",
    columns:{
      IDCONTRACT:"contrract_id",
      IDFUNCTION:"function_id",
      STARTDATE:"start_date",
      ENDDATE:"end_date",
      ISTIMECONTROLLED:"is_time_controlled"
    }
  },      
  clients:{
    columns:{
      IDPEOPLE:"people_id"
    }
  },
  users:{
    columns:{
      IDPEOPLE:"people_id",
      IDCOLLABORATOR:"collaborator_id",
    }
  },
  power_types:{
    tableName:"POWERSTYPES"
  },
  permissions:{
    columns:{
      STARTDATE:"start_date",
      ENDDATE:"end_date"
    }
  },
  condictions:{
    columns:{
      IDENTITYTYPE:"entity_type_id",
      IDENTITY:"entity_id",
      IDREGISTER:"record_id",
      IDCOMPARATION:"comparation_id",
      STARTDATE:"start_date",
      ENDDATE:"end_date"
    }
  },
  condiction_items:{
    tableName:"CONDICTIONSITEMS",
    columns:{
      IDCONDICTION:"condiction_id"
    }
  },      
  container_types:{
    tableName:"CONTEINERSTYPES"
  },      
  container_type_dimensions:{
    tableName:"CONTEINERSTYPESDIMENSIONS",
    columns:{
      IDCONTEINERTYPE:"container_type_id",
      IDDIMENSIONTYPE:"dimension_type_id",
      IDMEASUREMENTUNIT:"measurement_unit_id"
    }
  },      
  container_type_capacities:{
    tableName:"CONTEINERSTYPESCAPACITIES",
    columns:{
      IDCONTEINERTYPE:"container_type_id",
      IDCAPACITYTYPE:"capacity_type_id",
      IDMEASUREMENTUNIT:"measurement_unit_id"
    }
  },   
  containers:{
    tableName:"CONTEINERS",
    columns:{
      IDCONTENIERTYPE:"container_type_id",
      IDIDENTIFIERTYPE:"identifier_type_id",
      ALLOWMULTIPLESADDRESSES:"allow_multiple_addresses"
    }
  },      
  continents:{
    columns:{
      IDSUP:"parent_id"
    }
  },
  countries:{
    columns:{
      IDCONTINENT:"continent_id"
    }
  },
  gtin_types:{
    tableName:"GTINSTYPES"
  },      
  item_status:{
    tableName:"ITEMSSTATUS",
    columns:{
      ISDISPONIBLE:"is_disponible",
      ISDAMAGED:"is_damaged",
    }
  },
  items:{
    columns:{
      IDIDENTIFIERTYPE:"identifier_type_id",  
      IDNCM:"ncm_id",
      DEFAULTEXPIRATIONTIME:"default_expiration_time"
    }
  },
  lots:{
    columns:{
      EXPIRATIONDATE:"expiration_date"
    }
  },
  items_x_lots_x_containers:{
    tableName:"ITEMSXLOTSXCONTEINERS",
    columns:{
      IDITEM:"item_id",
      IDLOT:"lot_id",
      IDCONTEINER:"container_id"
    }
  },
  stock_entity_relationship_types:{
    tableName:"STOCKSENTITIESRELATIONSHIPSTYPES"
  },
  stock_entities:{
    tableName:"STOCKSENTITIES",
    columns:{
      IDCOMPANY: "company_id",
      IDCOLLABORATOR: "collaborator_id",
      ORDERNUM: "numeric_order",
    }
  },
  item_stock_units:{
    tableName:"ITEMSSTOCKSUNITS",
    columns:{
      IDITEMSTOCK:"stock_item_id",
      IDIDENTIFIERTYPE:"identifier_type_id",
      IDSTATUSITEMUNIT:"item_unit_status_id",
      IDMEASUREMENTUNIT:"measurement_unit_id",
      IDPACKAGING:"packaging_id",
      UNITWEIGHT:"unit_weight",
      PACKAGEWEIGHT:"package_weight",
      UNITVOLUME:"unit_volume",
      PACKAGEVOLUME:"package_volume",
      IDVARIABLEMEAUN:"variable_unit_measure_id",
      VARIABLEAMOUNT:"variable_amount"
    }
  },  
  item_stocks:{
    tableName:"ITEMSSTOCKS",
    columns:{
      IDITEMXLOTXCONTEINER:"item_lot_container_id",
      IDSTOCKRELATIONSHIPTYPE:"stock_relationship_type_id",
      IDSTOCKENTITY:"stock_entity_id",
      IDWAREHOUSEADDRESS:"warehouse_address_id",
      IDSTATUSITEMSTOCK:"item_stock_status_id",
      IDMEASUREMENTUNIT:"measurement_unit_id",
      IDPACKAGING:"packaging_id",
      UNITWEIGHT:"unit_weight",
      PACKAGEWEIGHT:"package_weight",
      UNITVOLUME:"unit_volume",
      PACKAGEVOLUME:"package_volume",
      ORDERNUM:"numeric_order"
    }
  },       
  item_x_meas_x_pack_x_identif:{
    tableName:"ITEMSXMEAXPACKXIDENTIF",
    columns:{
      IDITEM:"item_id",
      IDPACKAGING:"packaging_id",
      IDMEASUREMENTUNIT:"measurement_unit_id",
      UNITWEIGHT:"unit_weight",
      PACKAGEWEIGHT:"package_weight",
      UNITVOLUME:"unit_volume",
      PACKAGEVOLUME:"package_volume",
      IDIDENTIFIERTYPE:"identifier_type_id",
      IDITEMSTOCK:"stock_item_id",
      IDSTOCKENTITY:"stock_entity_id",
      ORDERNUM:"numeric_order"
    }
  },    
  movement_types:{
    tableName:"MOVEMENTSTYPES",
    columns:{
      ISINPUT: "is_input",
      ISOUTPUT: "is_output"
    }
  },    
  movement_status:{
    tableName:"MOVEMENTSSTATUS",
    columns:{
      ISSTARTED: "is_started",
      ISRUNNING: "is_running",
      ISSTOPED: "is_stopped",
      ISCANCELED: "is_canceled",
      ISCONCLUDED: "is_concluded"
    }
  },
  conference_types:{
    tableName:"CONFERENCESTYPES"
  }, 
  movements:{
    columns:{
      IDTYPEMOV:"type_mov_id",
      IDIDENTIFIERTYPE:"identifier_type_id",
      IDSTATUSMOV:"status_mov_id",
      IDCOMPANY:"company_id",
      IDFINANCIALVALUEFORM:"financial_value_form_id",      
      MOVSTARTED_AT:"mov_started_at",
      MOVENDED_AT:"mov_ended_at"
    }
  },
  movs_x_items_stocks:{
    tableName:"MOVSXITEMSSTOCKS",
    columns:{
      IDMOV:"mov_id",
      IDTYPEMOV:"type_mov_id",
      IDITEMSTOCK:"stock_item_id",
      IDSTATUSMOV:"status_mov_id",
      MOVSTARTED_AT:"mov_started_at",
      MOVENDED_AT:"mov_ended_at",
      ORDERNUM:"numeric_order"
    }
  },    
  movement_groups:{
    tableName:"GROUPSMOVEMENTS",
    columns:{
      IDIDENTIFIERTYPE:"identifier_type_id"
    }
  },      
  movements_x_groups:{
    tableName:"GROUPEDSMOVEMENTS",
    columns:{
      IDMOV:"mov_id",
      ORDERNUM:"numeric_order"
    }
  },      
  movement_entity_relationship_types:{
    tableName:"MOVEMENTSENTITIESRELATIONSHIPSTYPES",
    columns:{
      ISINPUT:"is_input",
      ISOUTPUT:"is_output"
    }
  },  
  movements_x_entities:{
    tableName:"MOVEMENTSXENTITIES",
    columns:{
      IDMOV:"mov_id",
      IDSTOCKENTITY:"stock_entity_id",
      ORDERNUM:"numeric_order"
    }
  },  
  item_mov_amount_restrictions:{
    tableName:"ITEMSMOVSAMOUNTSRESTRICTIONS",
    columns:{
      IDITEMMOVAMT: "item_mov_amt_id",
      IDIDENTIFIERTYPE: "identifier_type_id",
      IDVALUENAME: "value_name_id"
    }
  },  
  item_mov_amounts:{
    tableName:"ITEMSMOVSAMOUNTS",
    columns:{
      IDMOVXITEMSTOCK: "mov_x_item_stock_id",
      IDTYPEMOV: "type_mov_id",
      IDMEASUREMENTUNIT:"measurement_unit_id",
      IDPACKAGING: "packaging_id",
      UNITWEIGHT: "unit_weight",
      PACKAGEWEIGHT: "package_weight",
      UNITVOLUME: "unit_volume",
      PACKAGEVOLUME: "package_volume",
      UNITVALUE: "unit_value",
      IDSTATUSMOV: "status_mov_id",
      MOVSTARTED_AT: "mov_started_at",
      MOVENDED_AT: "mov_ended_at",
      EXPECTEDAMT: "expected_amt",
      MOVIMENTEDAMT: "moved_amt"
    }
  },   
  item_mov_units:{
    tableName:"ITEMSMOVSUNITS",
    columns:{
      IDITEMMOVAMT: "item_mov_amt_id",
      IDIDENTIFIERTYPE: "identifier_type_id",
      IDMEASUREMENTUNIT:"measurement_unit_id",
      IDPACKAGING: "packaging_id",
      UNITWEIGHT: "unit_weight",
      PACKAGEWEIGHT: "package_weight",
      UNITVOLUME: "unit_volume",
      PACKAGEVOLUME: "package_volume",
      IDSTATUSMOV: "status_mov_id",
      MOVSTARTED_AT: "mov_started_at",
      MOVENDED_AT: "mov_ended_at",
      EXPECTEDAMT: "expected_amt",
      MOVIMENTEDAMT: "moved_amt",
      IDVARIABLEMEAUN:"variable_unit_measure_id",
      VARIABLEEXPECTEDAMT:"variable_expected_amt",
      VARIABLEMOVIMENTEDAMT:"variable_moved_amt",
    }
  },     
  item_mov_xml_import_id_conversions:{
    tableName:"ITEMSMOVSXMLIMPORTIDSCONVERSIONS",
    columns:{
      IDOWNERCLIENT: "owner_client_id",
      DOCEMITENT: "emitent_doc",
      IDITEMORIGIN: "origin_item_id",
      FIELDXMLAMOUNT:"xml_quantity_field_name",
      IDITEM:"item_id",
      IDPACKAGING: "packaging_id",
      IDMEASUREMENTUNIT:"measurement_unit_id"
    }
  },     
  commission_entitiy_codes:{
    tableName:"COMMISSIONSENTITIESCODES",
    columns:{
      IDTABLEENTITY: "table_entity_id",
      IDREGISTERENTITY: "record_entity_id",
      MINIMALVALUE: "minimal_value"
    }
  },
  commission_items:{
    tableName:"COMMISSIONSITEMS",
    columns:{
      IDCOMMISSIONENTITYCODE: "commission_entity_code_id"
    }
  },  
  commission_values:{
    tableName:"COMMISSIONSVALUES",
    columns:{
      IDCOMMISSIONITEM: "commission_item_id"
    }
  },  
  objectives:{
    columns:{
      IDSUP: "parent_id",
      STARTDATE: "start_date",
      ENDDATE: "end_date"
    }
  },
  sql_object_types:{
    tableName:"SQLOBJECTSTYPES",
    columns:{
      IDSUP: "parent_id"
    }
  },      
  sql_processes:{
    tableName:"SQLPROCESSES"
  },    
  report_visions:{
    tableName:"REPORTSVISIONS"
  },   
  sql_objects:{
    tableName:"SQLOBJECTS",
    columns:{
      IDSUP: "parent_id"
    }
  },      
  report_data_fount_items:{
    tableName:"REPORTSDATASFOUNTSITEMS",
    columns:{
      IDSUP:"parent_id",
      ORDERNUM:"numeric_order",
    }
  },
  report_data_founts:{
    tableName:"REPORTSDATASFOUNTS",
    columns:{
      STARTDATE:"start_date",
      ENDDATE:"end_date"
    }
  },
  logistic_mov_types:{
    tableName:"LOGISTICMOVTYPES",
    columns:{
      ISINPUT:"is_input",
      ISOUTPUT:"is_output",
    }
  },
  logistic_status:{
    tableName:"LOGISTICSTATUS",
    column:{
      ISTODELIVERY:"is_to_delivery",
      ISDELIVERING:"is_delivering",
      ISDELIVERED:"id_delivered",
      ISPARTIALRETURNED:"is_partial_returned",
      ISTOTALRETURNED:"is_total_returned"
    }
  },  
  logistic_reasons:{
    tableName:"LOGISTICREASONS",
    columns:{
      SIGLAMOVTYPE:"mov_type_sigla"
    }
  },    
  logistic_orders:{
    tableName:"LOGISTICORDERS",
    columns:{
      IDLOGISTICMOVTYPE:"logistic_mov_type_id",
      IDIDENTIFIERTYPE:"identifier_type_id",
      IDACTIONSTATUS:"action_status_id",
      IDLOGISTICSTATUS:"logistic_status_id",
      IDREASONNOTMOVIMENTEDAMT:"unmoved_reason_id",
      IDREASONRETREATMOVIMENTEDAMT:"collected_reason_id",
      OBSERVATIONSNOTMOVIMENTEDAMT:"unmoved_qty_notes",
      OBSERVATIONSRETREATMOVIMENTEDAMT:"collected_qty_notes",
      MOVSTARTED_AT:"mov_started_at",
      MOVENDED_AT:"mov_ended_at"
    }
  },   
  logistic_orders_x_movs:{
    tableName:"LOGISTICORDERSXMOVS",
    columns:{
      IDLOGISTICORDER:"logistic_order_id",
      IDMOV:"mov_id",
      IDACTIONSTATUS:"action_status_id",
      IDLOGISTICSTATUS:"logistic_status_id",
      IDREASONNOTMOVIMENTEDAMT:"unmoved_reason_id",
      IDREASONRETREATMOVIMENTEDAMT:"collected_reason_id",
      OBSERVATIONSNOTMOVIMENTEDAMT:"unmoved_qty_notes",
      OBSERVATIONSRETREATMOVIMENTEDAMT:"collected_qty_notes",
      MOVSTARTED_AT:"mov_started_at",
      MOVENDED_AT:"mov_ended_at",
    }
  },    
  logistic_orders_x_movs_x_receipt_values:{
    tableName:"LOGISTICORDERSXMOVSXRECEIPTVALUES",
    columns:{
      IDLOGORDRECIPTREF:"logistic_order_movement_receipt_value_ref_id",
      IDLOGISTICORDER:"logistic_order_id",
      IDLOGISTICORDERXMOV:"mov_logistic_order_id",
      IDFINANCIALVALUEFORM:"financial_value_form_id",
      IDLOGMOVXITEMMOVAMT:"logistic_mov_item_mov_id",
      IDCURRENCYTYPEEXPECTED:"expected_currency_id",
      EXPIRATIONDATE:"expiration_date",
      EXPECTEDVALUE:"expected_value",
      OBSERVATIONSEXPECTED:"expected_value_notes",
      IDCURRENCYTYPERECEIVED:"received_currency_id",
      RECEIVEDVALUE:"received_value",
      OBSERVATIONSRECEIVED:"received_notes",
      ORDERNUM:"numeric_order"
    }
  },    
  logistic_orders_x_items_mov_amt:{
    tableName:"LOGISTICORDERSXITEMSMOVAMT",
    columns:{
      IDLOGISTICORDERXMOV:"mov_logistic_order_id",
      IDITEMMOVAMT:"item_mov_amt_id",
      IDLOGISTICMOVTYPE:"logistic_mov_type_id",
      IDACTIONSTATUS:"action_status_id",
      IDTYPEMOV:"type_mov_id",
      IDLOGISTICSTATUS:"logistic_status_id",
      IDMEASUREMENTUNIT:"measurement_unit_id",
      IDPACKAGING:"packaging_id",
      UNITWEIGHT:"unit_weight",
      PACKAGEWEIGHT:"package_weight",
      UNITVOLUME:"unit_volume",
      PACKAGEVOLUME:"package_volume",
      MOVSTARTED_AT:"mov_started_at",
      MOVENDED_AT:"mov_ended_at",
      EXPECTEDAMT:"expected_amt",
      MOVIMENTEDAMT:"moved_amt",
      NOTMOVIMENTEDAMT:"unmoved_qty",
      RETREATMOVIMENTEDAMT:"collected_qty",
      IDREASONNOTMOVIMENTEDAMT:"unmoved_reason_id",
      IDREASONRETREATMOVIMENTEDAMT:"collected_reason_id",
      OBSERVATIONSNOTMOVIMENTEDAMT:"unmoved_qty_notes",
      OBSERVATIONSRETREATMOVIMENTEDAMT:"collected_qty_notes",
      PHOTOSNOTMOVIMENTEDAMT:"unmoved_photos",
      PHOTOSRETREATMOVIMENTEDAMT:"collected_photos",

    }
  },    
  logistic_orders_x_dest_values:{
    tableName:"LOGISTICORDERSXDESTVALUES",
    columns:{
      IDLOGISTICORDER:"logistic_order_id",
      IDLOGORDFINANCIALVALUEFORM:"logistic_order_financial_value_form_id",
      IDCURRENCYTYPE:"currenty_type_id",
      IDFINANCIALVALUEMOVTYPEDEST:"financial_value_mov_type_dest",
      DESTINATEDVALUE:"destinated_value",
      ORDERNUM:"numeric_order",
    }
  }, 
  logistic_logs:{
    tableName:"LOGISTICLOGS",
    columns:{
      IDTABLEREF:"table_ref_id",
      IDREGISTERREF:"record_ref_id",
      JSONOBJECT:"json_object",
      COLUMNNAME:"column_name",
      OLDVALUE:"old_value",
      NEWVALUE:"new_value",

    }
  },  
  tasks:{
    columns:{
      IDSUP: "parent_id"
    }
  }, 
  tasks_x_status_x_users:{
    tableName:"TASKSXSTATUSXUSERS"
  },    
  tasks_x_status_x_users_logs:{
    tableName:"TASKSXSTATUSXUSERSLOGS"
  },    
  task_status:{
    tableName:"TASKSSTATUS",
    columns:{
      ISRUNNING: "is_running",
      ISSTOPED: "is_stopped",
      ISCANCELED: "is_canceled",
      ISCONCLUDED: "is_concluded"
    }
  },
  apis:{
    columns:{
      DEFAULTMETHOD:"default_method",
      DEFAULTENDPOINT:"default_end_point",
      DEFAULTAUTHORIZATION:"default_authorization",
      DEFAULTREQUESTPARAMS:"default_request_params",
      DEFAULTREQUESTBODYPARAMS:"default_request_body_params",
      DEFAULTWEBHOOK:"default_webhook"
    }
  },
  api_requests:{
    tableName:"APISREQUESTS",
    columns:{
      IDAPI:"api_id",
      ENDPOINT:"end_point",
      REQUESTPARAMS:"request_params",
      BODYPARAMS:"body_params"
    }
  },
  api_request_calls:{
    tableName:"APISREQUESTSCALLS",
    columns:{
      IDAPIREQUESTCALL:"api_request_id",
      IDSTATUSRUN:"run_status_id",
      ONRECEIVEWEBHOOKRESPONSE:"on_receive_response"
    }
  },
  api_responses:{
    tableName:"APISRESPONSES",
    columns:{
      IDAPIREQUESTCALL:"api_request_call_id",
      RESPONSESTATUSCODE:"response_status_code"
    }
  },  
  maps_api_responses:{
    tableName:"APISMAPSRESPONSES",
    columns:{
      RESPONSESTATUSCODE:"response_status_code",
      RESPONSESTATUS:"response_status",
      RESPONSEEXPIREAT:"response_expire_at",
    }
  },
  meas_x_meas_origins:{
    tableName:"MEASXMEASORIGINS",
    columns:{
      IDMEASUREMENTUNIT: "measurement_unit_id"
    }
  },
  packs_x_packs_origins:{
    tableName:"PACKSXPACKSORIGINS",columns:{
      IDPACKAGING: "packaging_id"
    }
  },
  midias:{
    columns:{
      IDTABLEREF:"table_ref_id",
      IDREGISTERREF:"record_ref_id",
      ORDERNUM:"numeric_order",
    }
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


            let qty = await DBConnectionManager.getDefaultDBConnection().query(`
              select 
                count(1) as qty
              from 
                \`${pNewTableName}\``,
              {raw:true,queryType: QueryTypes.SELECT}
            );
            qty = qty[0] || [];
            if ((qty[0]?.qty ||0) < newRegs.length) {
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
          data_connection_id: configDB[`${process.env.NODE_ENV||'development'}`].id,//only tables of this coonnections can be data migrated 
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
