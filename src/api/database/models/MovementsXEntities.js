'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Movements } = require("./Movements");
const { StocksEntities } = require("./StocksEntities");
const { MovementsEntitiesRelationshipsTypes } = require("./MovementsEntitiesRelationshipsTypes");

/**
 * class model
 */
class MovementsXEntities extends BaseTableModel {
  static ID = 9021;
  static model = null;
  static fields = {
    ...MovementsXEntities.getBaseTableModelFields(),...{                 
      IDMOV:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDMOVENTITYRELATIONSHIPTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDSTOCKENTITY:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
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
    'IDMOV',
    'IDMOVENTITYRELATIONSHIPTYPE',
    'IDSTOCKENTITY'
  ];

  static constraints = [...(MovementsXEntities.getBaseTableModelConstraints() || []),...[
    {
      name: MovementsXEntities.name.toUpperCase() + '_U1',
      fields: [...MovementsXEntities.getBaseTableModelUniqueFields(),...MovementsXEntities.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDMOV'],
      type: 'foreign key',
      references: { 
          table: Movements,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['IDMOVENTITYRELATIONSHIPTYPE'],
      type: 'foreign key',
      references: { 
          table: MovementsEntitiesRelationshipsTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSTOCKENTITY'],
      type: 'foreign key',
      references: { 
          table: StocksEntities,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {MovementsXEntities}