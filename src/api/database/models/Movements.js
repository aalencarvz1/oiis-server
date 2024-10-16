'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Conference_Types } = require("./Conference_Types");
const { Identifier_Types } = require("./Identifier_Types");
const { Movement_Types } = require("./Movement_Types");
const { Record_Status } = require("./Record_Status");
const { Relationship_Types } = require("./Relationship_Types");
const { Modules } = require("./Modules");
const { Relationships } = require("./Relationships");
const { Action_Status } = require("./Action_Status");
const { Business_Units } = require("./Business_Units");
const { Clients } = require("./Clients");
const { Warehouses } = require("./Warehouses");
const { Companies } = require("./Companies");
const { Suppliers } = require("./Suppliers");
const { Collaborators } = require("./Collaborators");
const { Financial_Value_Forms } = require("./Financial_Value_Forms");


/**
 * class model
 */
class Movements extends BaseTableModel {
  static id = 9010;
  static tableName = this.name.toLowerCase();
  static model = null;
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

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['type_mov_id'],
      type: 'foreign key',
      references: { 
          table: Movement_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['identifier_type_id'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['status_mov_id'],
      type: 'foreign key',
      references: { 
          table: Action_Status,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['conference_type_id'],
      type: 'foreign key',
      references: { 
          table: Conference_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['company_id'],
      type: 'foreign key',
      references: { 
          table: Companies,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['warehouse_id'],
      type: 'foreign key',
      references: { 
          table: Warehouses,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['business_unit_id'],
      type: 'foreign key',
      references: { 
          table: Business_Units,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['supplier_id'],
      type: 'foreign key',
      references: { 
          table: Suppliers,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['client_id'],
      type: 'foreign key',
      references: { 
          table: Clients,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['seller_id'],
      type: 'foreign key',
      references: { 
          table: Collaborators,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['financial_value_form_id'],
      type: 'foreign key',
      references: { 
          table: Financial_Value_Forms,
          field: 'id'
      },
      onUpdate: 'cascade'
    }    
  ]];
  
  static async createIfNotExists(queryParams, newValues, businessUnit, warehouse, client){
    let reg = await BaseTableModel.createIfNotExists.bind(Movements)(queryParams,newValues);
    if (reg) {
      if (businessUnit) {
        let relationshipQueryParams  = {
          where:{
            status_reg_id: Record_Status.ACTIVE,
            relationship_type_id: Relationship_Types.RELATIONSHIP,
            table_1_id: Movements.id,
            record_1_id: reg.id,
            table_2_id: Business_Units.id,
            record_2_id: businessUnit.id
          }
        };
        let relationshipQueryCheckParams  = {
          where:{
            status_reg_id: Record_Status.ACTIVE,
            relationship_type_id: Relationship_Types.RELATIONSHIP,
            table_1_id: Business_Units.id,
            record_1_id: businessUnit.id,
            table_2_id: Modules.id,
            record_2_id: Modules.WMS
          }
        };
        if (queryParams.transaction) {
          relationshipQueryParams.transaction = queryParams.transaction;
          relationshipQueryCheckParams.transaction = queryParams.transaction;
        }
        let relationship = await Relationships.createIfNotExistsAndRelationed(relationshipQueryParams,null,relationshipQueryCheckParams);
        if (!relationship) throw new Error("relationship not created");
      }

      if (warehouse) {
        let relationshipQueryParams  = {
          where:{
            status_reg_id: Record_Status.ACTIVE,
            relationship_type_id: Relationship_Types.RELATIONSHIP,
            table_1_id: Movements.id,
            record_1_id: reg.id,
            table_2_id: Warehouses.id,
            record_2_id: warehouse.id
          }
        };
        let relationshipQueryCheckParams = [{
          where:{
            status_reg_id: Record_Status.ACTIVE,
            relationship_type_id: Relationship_Types.RELATIONSHIP,
            table_1_id: Warehouses.id,
            record_1_id: warehouse.id,
            table_2_id: Modules.id,
            record_2_id: Modules.WMS
          }
        }];

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
          relationshipQueryCheckParams.forEach((el )=>el.transaction = queryParams.transaction);
        }
        let relationship = await Relationships.createIfNotExistsAndRelationed(relationshipQueryParams,null,relationshipQueryCheckParams);
        if (!relationship) throw new Error("relationship not created");
      }


      if (client) {
        let relationshipQueryParams  = {
          where:{
            status_reg_id: Record_Status.ACTIVE,
            relationship_type_id: Relationship_Types.RELATIONSHIP,
            table_1_id: Movements.id,
            record_1_id: reg.id,
            table_2_id: Clients.id,
            record_2_id: client.id
          }
        };
        let relationshipQueryCheckParams = [{
          where:{
            status_reg_id: Record_Status.ACTIVE,
            relationship_type_id: Relationship_Types.RELATIONSHIP,
            table_1_id: Clients.id,
            record_1_id: client.id,
            table_2_id: Modules.id,
            record_2_id: Modules.WMS
          }
        }];

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
            relationshipQueryCheckParams.forEach((el ) =>el.transaction = queryParams.transaction);
        }
        let relationship = await Relationships.createIfNotExistsAndRelationed(relationshipQueryParams,null,relationshipQueryCheckParams);
        if (!relationship) throw new Error("relationship not created");
      }
    } else {
      throw new Error("register not created");
    }
    return reg;
  } 


};


module.exports = {Movements}