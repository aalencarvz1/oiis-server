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
      IDCONFERENCETYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      company_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDWAREHOUSE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDBUSINESSUNIT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDSUPPLIER:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDCLIENT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDSELLER:{
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
      fields: ['IDCONFERENCETYPE'],
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
      fields: ['IDWAREHOUSE'],
      type: 'foreign key',
      references: { 
          table: Warehouses,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDBUSINESSUNIT'],
      type: 'foreign key',
      references: { 
          table: Business_Units,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSUPPLIER'],
      type: 'foreign key',
      references: { 
          table: Suppliers,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCLIENT'],
      type: 'foreign key',
      references: { 
          table: Clients,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSELLER'],
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
            IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
            IDTABLE1: Movements.id,
            IDREG1: reg.id,
            IDTABLE2: Business_Units.id,
            IDREG2: businessUnit.id
          }
        };
        let relationshipQueryCheckParams  = {
          where:{
            status_reg_id: Record_Status.ACTIVE,
            IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
            IDTABLE1: Business_Units.id,
            IDREG1: businessUnit.id,
            IDTABLE2: Modules.id,
            IDREG2: Modules.WMS
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
            IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
            IDTABLE1: Movements.id,
            IDREG1: reg.id,
            IDTABLE2: Warehouses.id,
            IDREG2: warehouse.id
          }
        };
        let relationshipQueryCheckParams = [{
          where:{
            status_reg_id: Record_Status.ACTIVE,
            IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
            IDTABLE1: Warehouses.id,
            IDREG1: warehouse.id,
            IDTABLE2: Modules.id,
            IDREG2: Modules.WMS
          }
        }];

        if (businessUnit) {
          relationshipQueryCheckParams.push({
            where:{
              status_reg_id: Record_Status.ACTIVE,
              IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
              IDTABLE1: Business_Units.id,
              IDREG1: businessUnit.id,
              IDTABLE2: Warehouses.id,
              IDREG2: warehouse.id
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
            IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
            IDTABLE1: Movements.id,
            IDREG1: reg.id,
            IDTABLE2: Clients.id,
            IDREG2: client.id
          }
        };
        let relationshipQueryCheckParams = [{
          where:{
            status_reg_id: Record_Status.ACTIVE,
            IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
            IDTABLE1: Clients.id,
            IDREG1: client.id,
            IDTABLE2: Modules.id,
            IDREG2: Modules.WMS
          }
        }];

        if (businessUnit) {
          relationshipQueryCheckParams.push({
            where:{
              status_reg_id: Record_Status.ACTIVE,
              IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
              IDTABLE1: Business_Units.id,
              IDREG1: businessUnit.id,
              IDTABLE2: Clients.id,
              IDREG2: client.id
            }
          })
        }

        if (warehouse) {
          relationshipQueryCheckParams.push({
            where:{
              status_reg_id: Record_Status.ACTIVE,
              IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
              IDTABLE1: Warehouses.id,
              IDREG1: warehouse.id,
              IDTABLE2: Clients.id,
              IDREG2: client.id
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