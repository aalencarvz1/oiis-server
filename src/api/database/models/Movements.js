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
const { ActionsStatus } = require("./ActionsStatus");
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
  static ID = 9010;
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
        defaultValue:ActionsStatus.NOT_STARTED
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
      name: Movements.name.toUpperCase() + '_U1',
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
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDIDENTIFIERTYPE'],
      type: 'foreign key',
      references: { 
          table: IdentifiersTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSTATUSMOV'],
      type: 'foreign key',
      references: { 
          table: ActionsStatus,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCONFERENCETYPE'],
      type: 'foreign key',
      references: { 
          table: ConferencesTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCOMPANY'],
      type: 'foreign key',
      references: { 
          table: Companies,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDWAREHOUSE'],
      type: 'foreign key',
      references: { 
          table: Warehouses,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDBUSINESSUNIT'],
      type: 'foreign key',
      references: { 
          table: BusinessesUnits,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSUPPLIER'],
      type: 'foreign key',
      references: { 
          table: Suppliers,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCLIENT'],
      type: 'foreign key',
      references: { 
          table: Clients,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSELLER'],
      type: 'foreign key',
      references: { 
          table: Collaborators,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDFINANCIALVALUEFORM'],
      type: 'foreign key',
      references: { 
          table: FinancialValueForms,
          field: 'ID'
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
            IDSTATUSREG: StatusRegs.ACTIVE,
            IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
            IDTABLE1: Movements.ID,
            IDREG1: reg.ID,
            IDTABLE2: BusinessesUnits.ID,
            IDREG2: businessUnit.ID
          }
        };
        let relationshipQueryCheckParams  = {
          where:{
            IDSTATUSREG: StatusRegs.ACTIVE,
            IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
            IDTABLE1: BusinessesUnits.ID,
            IDREG1: businessUnit.ID,
            IDTABLE2: Modules.ID,
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
            IDSTATUSREG: StatusRegs.ACTIVE,
            IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
            IDTABLE1: Movements.ID,
            IDREG1: reg.ID,
            IDTABLE2: Warehouses.ID,
            IDREG2: warehouse.ID
          }
        };
        let relationshipQueryCheckParams = [{
          where:{
            IDSTATUSREG: StatusRegs.ACTIVE,
            IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
            IDTABLE1: Warehouses.ID,
            IDREG1: warehouse.ID,
            IDTABLE2: Modules.ID,
            IDREG2: Modules.WMS
          }
        }];

        if (businessUnit) {
          relationshipQueryCheckParams.push({
            where:{
              IDSTATUSREG: StatusRegs.ACTIVE,
              IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
              IDTABLE1: BusinessesUnits.ID,
              IDREG1: businessUnit.ID,
              IDTABLE2: Warehouses.ID,
              IDREG2: warehouse.ID
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
            IDSTATUSREG: StatusRegs.ACTIVE,
            IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
            IDTABLE1: Movements.ID,
            IDREG1: reg.ID,
            IDTABLE2: Clients.ID,
            IDREG2: client.ID
          }
        };
        let relationshipQueryCheckParams = [{
          where:{
            IDSTATUSREG: StatusRegs.ACTIVE,
            IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
            IDTABLE1: Clients.ID,
            IDREG1: client.ID,
            IDTABLE2: Modules.ID,
            IDREG2: Modules.WMS
          }
        }];

        if (businessUnit) {
          relationshipQueryCheckParams.push({
            where:{
              IDSTATUSREG: StatusRegs.ACTIVE,
              IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
              IDTABLE1: BusinessesUnits.ID,
              IDREG1: businessUnit.ID,
              IDTABLE2: Clients.ID,
              IDREG2: client.ID
            }
          })
        }

        if (warehouse) {
          relationshipQueryCheckParams.push({
            where:{
              IDSTATUSREG: StatusRegs.ACTIVE,
              IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
              IDTABLE1: Warehouses.ID,
              IDREG1: warehouse.ID,
              IDTABLE2: Clients.ID,
              IDREG2: client.ID
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