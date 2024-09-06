'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { MeasurementsUnits } = require("./MeasurementsUnits");
const { Packagings } = require("./Packagings");
const { MovementsStatus } = require("./MovementsStatus");
const { ItemsMovsAmounts } = require("./ItemsMovsAmounts");
const { IdentifiersTypes } = require("./IdentifiersTypes");

/**
 * class model
 */
class ItemsMovsUnits extends BaseTableModel {
  static id = 9036;
  static model = null;
  static fields = {
    ...ItemsMovsUnits.getBaseTableModelFields(),...{                 
      IDITEMMOVAMT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDIDENTIFIERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDENTIFIER:{
        type: DataTypes.STRING(256)
      },
      IDMEASUREMENTUNIT:{
        type: DataTypes.BIGINT.UNSIGNED
      },      
      IDPACKAGING:{
        type: DataTypes.BIGINT.UNSIGNED
      },  
      UNITWEIGHT:{
        type: DataTypes.DECIMAL(32,10)
      },      
      PACKAGEWEIGHT:{
        type: DataTypes.DECIMAL(32,10)
      },  
      UNITVOLUME:{
        type: DataTypes.DECIMAL(32,10)
      },      
      PACKAGEVOLUME:{
        type: DataTypes.DECIMAL(32,10)
      },              
      IDSTATUSMOV:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:MovementsStatus.NOT_STARTED
      },      
      MOVSTARTED_AT:{
        type: DataTypes.DATE
      },
      MOVENDED_AT:{
        type: DataTypes.DATE
      },
      EXPECTEDAMT:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      MOVIMENTEDAMT:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      IDVARIABLEMEAUN:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      VARIABLEEXPECTEDAMT:{
        type: DataTypes.DECIMAL(32,10)
      },
      VARIABLEMOVIMENTEDAMT:{
        type: DataTypes.DECIMAL(32,10)
      },
      OBSERVATIONS:{
        type:DataTypes.TEXT
      }      
    }
  };
  
  static uniqueFields = [
    'IDITEMMOVAMT',
    Sequelize.literal(`(COALESCE(IDENTIFIER,'NULL'))`)
  ];

  static constraints = [...(ItemsMovsUnits.getBaseTableModelConstraints() || []),...[
    {
      name: ItemsMovsUnits.name.toLowerCase() + '_u1',
      fields: [...ItemsMovsUnits.getBaseTableModelUniqueFields(),...ItemsMovsUnits.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDITEMMOVAMT'],
      type: 'foreign key',
      references: { 
          table: ItemsMovsAmounts,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
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
      fields: ['IDMEASUREMENTUNIT'],
      type: 'foreign key',
      references: { 
          table: MeasurementsUnits,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDPACKAGING'],
      type: 'foreign key',
      references: { 
          table: Packagings,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSTATUSMOV'],
      type: 'foreign key',
      references: { 
          table: MovementsStatus,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDVARIABLEMEAUN'],
      type: 'foreign key',
      references: { 
          table: MeasurementsUnits,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {ItemsMovsUnits}