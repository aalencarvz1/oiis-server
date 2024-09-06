'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { ConferencesTypes } = require("./ConferencesTypes");
const { IdentifiersTypes } = require("./IdentifiersTypes");
const { MovementsTypes } = require("./MovementsTypes");
const { StatusRegs } = require("./StatusRegs");
const { DataRelationshipTypes } = require("./DataRelationshipTypes");
const { Modules } = require("./Modules");
const { DatasRelationships } = require("./DatasRelationships");
const { ActionStatus } = require("./ActionStatus");
const { BusinessesUnits } = require("./BusinessesUnits");
const { Clients } = require("./Clients");
const { Warehouses } = require("./Warehouses");
const { Companies } = require("./Companies");
const { Suppliers } = require("./Suppliers");
const { Collaborators } = require("./Collaborators");
const { FinancialValueForms } = require("./FinancialValueForms");


/**
 * class model
 */
class Movements extends BaseTableModel {
  static id = 9010;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Movements.getBaseTableModelFields(),...{           
      IDTYPEMOV:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDIDENTIFIERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDENTIFIER:{
        type: DataTypes.STRING(256)
      },
      IDSTATUSMOV:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:ActionStatus.NOT_STARTED
      },
      IDCONFERENCETYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDCOMPANY:{
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
      IDFINANCIALVALUEFORM:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      MOVSTARTED_AT:{
        type: DataTypes.DATE
      },
      MOVENDED_AT:{
        type: DataTypes.DATE
      },
    }
  };
  
  static uniqueFields = [
    'IDTYPEMOV',
    Sequelize.literal(`(COALESCE(IDIDENTIFIERTYPE,0))`),  
    Sequelize.literal(`(COALESCE(IDENTIFIER,'NULL'))`)
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
      fields: ['IDTYPEMOV'],
      type: 'foreign key',
      references: { 
          table: MovementsTypes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDIDENTIFIERTYPE'],
      type: 'foreign key',
      references: { 
          table: IdentifiersTypes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSTATUSMOV'],
      type: 'foreign key',
      references: { 
          table: ActionStatus,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCONFERENCETYPE'],
      type: 'foreign key',
      references: { 
          table: ConferencesTypes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCOMPANY'],
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
          table: BusinessesUnits,
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
      fields: ['IDFINANCIALVALUEFORM'],
      type: 'foreign key',
      references: { 
          table: FinancialValueForms,
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
            status_reg_id: StatusRegs.ACTIVE,
            IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
            IDTABLE1: Movements.id,
            IDREG1: reg.id,
            IDTABLE2: BusinessesUnits.id,
            IDREG2: businessUnit.id
          }
        };
        let relationshipQueryCheckParams  = {
          where:{
            status_reg_id: StatusRegs.ACTIVE,
            IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
            IDTABLE1: BusinessesUnits.id,
            IDREG1: businessUnit.id,
            IDTABLE2: Modules.id,
            IDREG2: Modules.WMS
          }
        };
        if (queryParams.transaction) {
          relationshipQueryParams.transaction = queryParams.transaction;
          relationshipQueryCheckParams.transaction = queryParams.transaction;
        }
        let relationship = await DatasRelationships.createIfNotExistsAndRelationed(relationshipQueryParams,null,relationshipQueryCheckParams);
        if (!relationship) throw new Error("relationship not created");
      }

      if (warehouse) {
        let relationshipQueryParams  = {
          where:{
            status_reg_id: StatusRegs.ACTIVE,
            IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
            IDTABLE1: Movements.id,
            IDREG1: reg.id,
            IDTABLE2: Warehouses.id,
            IDREG2: warehouse.id
          }
        };
        let relationshipQueryCheckParams = [{
          where:{
            status_reg_id: StatusRegs.ACTIVE,
            IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
            IDTABLE1: Warehouses.id,
            IDREG1: warehouse.id,
            IDTABLE2: Modules.id,
            IDREG2: Modules.WMS
          }
        }];

        if (businessUnit) {
          relationshipQueryCheckParams.push({
            where:{
              status_reg_id: StatusRegs.ACTIVE,
              IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
              IDTABLE1: BusinessesUnits.id,
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
        let relationship = await DatasRelationships.createIfNotExistsAndRelationed(relationshipQueryParams,null,relationshipQueryCheckParams);
        if (!relationship) throw new Error("relationship not created");
      }


      if (client) {
        let relationshipQueryParams  = {
          where:{
            status_reg_id: StatusRegs.ACTIVE,
            IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
            IDTABLE1: Movements.id,
            IDREG1: reg.id,
            IDTABLE2: Clients.id,
            IDREG2: client.id
          }
        };
        let relationshipQueryCheckParams = [{
          where:{
            status_reg_id: StatusRegs.ACTIVE,
            IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
            IDTABLE1: Clients.id,
            IDREG1: client.id,
            IDTABLE2: Modules.id,
            IDREG2: Modules.WMS
          }
        }];

        if (businessUnit) {
          relationshipQueryCheckParams.push({
            where:{
              status_reg_id: StatusRegs.ACTIVE,
              IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
              IDTABLE1: BusinessesUnits.id,
              IDREG1: businessUnit.id,
              IDTABLE2: Clients.id,
              IDREG2: client.id
            }
          })
        }

        if (warehouse) {
          relationshipQueryCheckParams.push({
            where:{
              status_reg_id: StatusRegs.ACTIVE,
              IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
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
        let relationship = await DatasRelationships.createIfNotExistsAndRelationed(relationshipQueryParams,null,relationshipQueryCheckParams);
        if (!relationship) throw new Error("relationship not created");
      }
    } else {
      throw new Error("register not created");
    }
    return reg;
  } 


};


module.exports = {Movements}