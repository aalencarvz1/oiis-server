'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Conference_Types  from "./Conference_Types.js";
import  Identifier_Types  from "./Identifier_Types.js";
import  Movement_Types  from "./Movement_Types.js";
import  Record_Status  from "./Record_Status.js";
import  Relationship_Types  from "./Relationship_Types.js";
import  Modules  from "./Modules.js";
import  Relationships  from "./Relationships.js";
import  Action_Status  from "./Action_Status.js";
import  Business_Units  from "./Business_Units.js";
import  Clients  from "./Clients.js";
import  Warehouses  from "./Warehouses.js";
import  Companies  from "./Companies.js";
import  Suppliers  from "./Suppliers.js";
import  Collaborators  from "./Collaborators.js";
import  Financial_Value_Forms  from "./Financial_Value_Forms.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Movements extends BaseTableModel {

  //table fields
  declare type_mov_id: number;
  declare identifier_type_id: number;
  declare identifier: string;
  declare status_mov_id: number;
  declare conference_type_id: number;
  declare company_id: number;
  declare warehouse_id: number;
  declare business_unit_id: number;
  declare supplier_id: number;
  declare client_id: number;
  declare seller_id: number;
  declare financial_value_form_id: number;
  declare mov_started_at: Date;
  declare mov_ended_at: Date;



  static id = 9010;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Movements.getBaseTableModelFields(),...{           
      type_mov_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      identifier:{
        type: DataTypes.STRING(256)
      },
      status_mov_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Action_Status.NOT_STARTED
      },
      conference_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      company_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      warehouse_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      business_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      supplier_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      client_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      seller_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      financial_value_form_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      mov_started_at:{
        type: DataTypes.DATE
      },
      mov_ended_at:{
        type: DataTypes.DATE
      },
    }
  };
  
  static uniqueFields = [
    'type_mov_id',
    Sequelize.literal(`(COALESCE(identifier_type_id,0))`),  
    Sequelize.literal(`(COALESCE(identifier,'NULL'))`)
  ];

  static constraints = [...(Movements.getBaseTableModelConstraints() || []),...[
    {
      name: Movements.tableName + '_u1',
      fields: [...Movements.getBaseTableModelUniqueFields(),...Movements.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys : any[] = [];
  
  static async createIfNotExists(queryParams: any, newValues: any, businessUnit?: any, warehouse?: any, client?: any){
    let reg = await BaseTableModel.createIfNotExists.bind(Movements)(queryParams,newValues);
    if (reg) {
      if (businessUnit) {
        let relationshipQueryParams : any = {
          where:{
            status_reg_id: Record_Status.ACTIVE,
            relationship_type_id: Relationship_Types.RELATIONSHIP,
            table_1_id: Movements.id,
            record_1_id: reg.id,
            table_2_id: Business_Units.id,
            record_2_id: businessUnit.id
          }
        };
        /*
        @deprecated 2025-05-12
        let relationshipQueryCheckParams : any = {
          where:{
            status_reg_id: Record_Status.ACTIVE,
            relationship_type_id: Relationship_Types.RELATIONSHIP,
            table_1_id: Business_Units.id,
            record_1_id: businessUnit.id,
            table_2_id: Modules.id,
            record_2_id: Modules.WMS
          }
        };*/
        if (queryParams.transaction) {
          relationshipQueryParams.transaction = queryParams.transaction;
          //relationshipQueryCheckParams.transaction = queryParams.transaction;
        }
        let relationship = await Relationships.createIfNotExistsAndRelationed(relationshipQueryParams,null,null);
        if (!relationship) throw new Error("relationship not created");
      }

      if (warehouse) {
        let relationshipQueryParams : any = {
          where:{
            status_reg_id: Record_Status.ACTIVE,
            relationship_type_id: Relationship_Types.RELATIONSHIP,
            table_1_id: Movements.id,
            record_1_id: reg.id,
            table_2_id: Warehouses.id,
            record_2_id: warehouse.id
          }
        };
        let relationshipQueryCheckParams = [/*
          @deprecated 2025-05-12
          {
          where:{
            status_reg_id: Record_Status.ACTIVE,
            relationship_type_id: Relationship_Types.RELATIONSHIP,
            table_1_id: Warehouses.id,
            record_1_id: warehouse.id,
            table_2_id: Modules.id,
            record_2_id: Modules.WMS
          }
        }*/];

        if (businessUnit) {
          relationshipQueryCheckParams.push({
            where:{
              status_reg_id: Record_Status.ACTIVE,
              relationship_type_id: Relationship_Types.RELATIONSHIP,
              table_1_id: Business_Units.id,
              record_1_id: businessUnit.id,
              table_2_id: Warehouses.id,
              record_2_id: warehouse.id
            }
          })
        }

        if (queryParams.transaction) {
          relationshipQueryParams.transaction = queryParams.transaction;
          relationshipQueryCheckParams.forEach((el : any)=>el.transaction = queryParams.transaction);
        }
        let relationship = await Relationships.createIfNotExistsAndRelationed(relationshipQueryParams,null,relationshipQueryCheckParams);
        if (!relationship) throw new Error("relationship not created");
      }


      if (client) {
        let relationshipQueryParams : any = {
          where:{
            status_reg_id: Record_Status.ACTIVE,
            relationship_type_id: Relationship_Types.RELATIONSHIP,
            table_1_id: Movements.id,
            record_1_id: reg.id,
            table_2_id: Clients.id,
            record_2_id: client.id
          }
        };
        let relationshipQueryCheckParams = [/*
          @deprecated 2025-05-12
          {
          where:{
            status_reg_id: Record_Status.ACTIVE,
            relationship_type_id: Relationship_Types.RELATIONSHIP,
            table_1_id: Clients.id,
            record_1_id: client.id,
            table_2_id: Modules.id,
            record_2_id: Modules.WMS
          }
        }*/];

        if (businessUnit) {
          relationshipQueryCheckParams.push({
            where:{
              status_reg_id: Record_Status.ACTIVE,
              relationship_type_id: Relationship_Types.RELATIONSHIP,
              table_1_id: Business_Units.id,
              record_1_id: businessUnit.id,
              table_2_id: Clients.id,
              record_2_id: client.id
            }
          })
        }

        if (warehouse) {
          relationshipQueryCheckParams.push({
            where:{
              status_reg_id: Record_Status.ACTIVE,
              relationship_type_id: Relationship_Types.RELATIONSHIP,
              table_1_id: Warehouses.id,
              record_1_id: warehouse.id,
              table_2_id: Clients.id,
              record_2_id: client.id
            }
          })
        }

        if (queryParams.transaction) {
            relationshipQueryParams.transaction = queryParams.transaction;
            relationshipQueryCheckParams.forEach((el : any ) =>el.transaction = queryParams.transaction);
        }
        let relationship = await Relationships.createIfNotExistsAndRelationed(relationshipQueryParams,null,relationshipQueryCheckParams);
        if (!relationship) throw new Error("relationship not created");
      }
    } else {
      throw new Error("register not created");
    }
    return reg;
  } 


  
    

  /**
   * get the foreign keys avoiding ciclyc imports on BaseTableModel
   * @override
   * @created 2025-04-14
   * @version 1.0.0
   */
  static getForeignKeys(): any[] {
    //Utils.logi(this.name,'getForeignKeys');
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      result = super.getForeignKeys();
      result.push({
        fields: ['type_mov_id'],
        type: 'foreign key',
        references: { 
            table: Movement_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['identifier_type_id'],
        type: 'foreign key',
        references: { 
            table: Identifier_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['status_mov_id'],
        type: 'foreign key',
        references: { 
            table: Action_Status,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['conference_type_id'],
        type: 'foreign key',
        references: { 
            table: Conference_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['company_id'],
        type: 'foreign key',
        references: { 
            table: Companies,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['warehouse_id'],
        type: 'foreign key',
        references: { 
            table: Warehouses,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['business_unit_id'],
        type: 'foreign key',
        references: { 
            table: Business_Units,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['supplier_id'],
        type: 'foreign key',
        references: { 
            table: Suppliers,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['client_id'],
        type: 'foreign key',
        references: { 
            table: Clients,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['seller_id'],
        type: 'foreign key',
        references: { 
            table: Collaborators,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['financial_value_form_id'],
        type: 'foreign key',
        references: { 
            table: Financial_Value_Forms,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

};