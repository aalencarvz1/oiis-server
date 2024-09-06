'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { BusinessesUnits } = require("./BusinessesUnits");
const { Companies } = require("./Companies");
const { Suppliers } = require("./Suppliers");
const { Warehouses } = require("./Warehouses");
const { Clients } = require("./Clients");
const { Users } = require("./Users");
const { Collaborators } = require("./Collaborators");


/**
 * class model
 */
class StocksEntities extends BaseTableModel {
  static id = 8025;
  static tableName = this.name.toLowerCase();
  static model = null;

  static WITHOUT_CONTEINER = 1;

  static fields = {
    ...StocksEntities.getBaseTableModelFields(),...{           
      IDCOMPANY:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDBUSINESSUNIT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDWAREHOUSE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDSUPPLIER:{
        type: DataTypes.BIGINT.UNSIGNED        
      },
      IDCLIENT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDUSER:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDCOLLABORATOR:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      ORDERNUM:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      PRECEDENCE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      OBSERVATIONS:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDCOMPANY',
    Sequelize.literal(`(COALESCE(IDBUSINESSUNIT,0))`),
    Sequelize.literal(`(COALESCE(IDWAREHOUSE,0))`),
    Sequelize.literal(`(COALESCE(IDSUPPLIER,0))`),
    Sequelize.literal(`(COALESCE(IDCLIENT,0))`),
    Sequelize.literal(`(COALESCE(IDUSER,0))`),
    Sequelize.literal(`(COALESCE(IDCOLLABORATOR,0))`)
  ];

  static constraints = [...(StocksEntities.getBaseTableModelConstraints() || []),...[
    {
      name: StocksEntities.tableName + '_u1',
      fields: [...StocksEntities.getBaseTableModelUniqueFields(),...StocksEntities.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
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
      fields: ['IDBUSINESSUNIT'],
      type: 'foreign key',
      references: { 
          table: BusinessesUnits,
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
      fields: ['IDUSER'],
      type: 'foreign key',
      references: { 
          table: Users,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCOLLABORATOR'],
      type: 'foreign key',
      references: { 
          table: Collaborators,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {StocksEntities}