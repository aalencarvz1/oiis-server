'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Business_Units } = require("./Business_Units");
const { Companies } = require("./Companies");
const { Suppliers } = require("./Suppliers");
const { Warehouses } = require("./Warehouses");
const { Clients } = require("./Clients");
const { Users } = require("./Users");
const { Collaborators } = require("./Collaborators");


/**
 * class model
 */
class Stock_Entities extends BaseTableModel {
  static id = 8025;
  static tableName = this.name.toLowerCase();
  static model = null;

  static WITHOUT_CONTEINER = 1;

  static fields = {
    ...Stock_Entities.getBaseTableModelFields(),...{           
      company_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      business_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      warehouse_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      supplier_id:{
        type: DataTypes.BIGINT.UNSIGNED        
      },
      client_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      user_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      collaborator_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      numeric_order:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      precedence:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      observations:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'company_id',
    Sequelize.literal(`(COALESCE(business_unit_id,0))`),
    Sequelize.literal(`(COALESCE(warehouse_id,0))`),
    Sequelize.literal(`(COALESCE(supplier_id,0))`),
    Sequelize.literal(`(COALESCE(client_id,0))`),
    Sequelize.literal(`(COALESCE(user_id,0))`),
    Sequelize.literal(`(COALESCE(collaborator_id,0))`)
  ];

  static constraints = [...(Stock_Entities.getBaseTableModelConstraints() || []),...[
    {
      name: Stock_Entities.tableName + '_u1',
      fields: [...Stock_Entities.getBaseTableModelUniqueFields(),...Stock_Entities.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
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
      fields: ['business_unit_id'],
      type: 'foreign key',
      references: { 
          table: Business_Units,
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
      fields: ['user_id'],
      type: 'foreign key',
      references: { 
          table: Users,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['collaborator_id'],
      type: 'foreign key',
      references: { 
          table: Collaborators,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Stock_Entities}