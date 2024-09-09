'use strict';
/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { MovementsStatus } = require("./MovementsStatus");
const { LogisticMovTypes } = require("./LogisticMovTypes");
const { Action_Status } = require("./Action_Status");
const { ItemsMovsAmounts } = require("./ItemsMovsAmounts");
const { LogisticOrdersXMovs } = require("./LogisticOrdersXMovs");
const { LogisticReasons } = require("./LogisticReasons");
const { LogisticStatus } = require("./LogisticStatus");
const { MeasurementsUnits } = require("./MeasurementsUnits");
const { MovementsTypes } = require("./MovementsTypes");
const { Packagings } = require("./Packagings");


/**
 * class model
 */
class LogisticOrdersXItemsMovAmt extends BaseTableModel {
  static id = 12005;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...LogisticOrdersXItemsMovAmt.getBaseTableModelFields(),...{           
      IDLOGISTICORDERXMOV:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDITEMMOVAMT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDLOGISTICMOVTYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      }, 
      IDACTIONSTATUS:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:MovementsStatus.NOT_STARTED
      },
      IDTYPEMOV:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDLOGISTICSTATUS:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:MovementsStatus.NOT_STARTED
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
      MOVSTARTED_AT:{
        type: DataTypes.DATE
      },
      MOVENDED_AT:{
        type: DataTypes.DATE
      },
      EXPECTEDAMT:{
        type: DataTypes.DECIMAL(32,10)
      },
      MOVIMENTEDAMT:{
        type: DataTypes.DECIMAL(32,10)
      },
      NOTMOVIMENTEDAMT:{
        type: DataTypes.DECIMAL(32,10)
      },
      RETREATMOVIMENTEDAMT:{
        type: DataTypes.DECIMAL(32,10)
      },
      IDREASONNOTMOVIMENTEDAMT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDREASONRETREATMOVIMENTEDAMT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      OBSERVATIONSNOTMOVIMENTEDAMT:{
        type: DataTypes.TEXT
      },
      OBSERVATIONSRETREATMOVIMENTEDAMT:{
        type: DataTypes.TEXT
      },
      PHOTOSNOTMOVIMENTEDAMT:{
        type: DataTypes.TEXT
      },
      PHOTOSRETREATMOVIMENTEDAMT:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDLOGISTICORDERXMOV',
    'IDITEMMOVAMT',
    Sequelize.literal(`(COALESCE(IDLOGISTICMOVTYPE,0))`),
    'IDACTIONSTATUS',
    Sequelize.literal(`(COALESCE(IDTYPEMOV,0))`),
    Sequelize.literal(`(COALESCE(IDMEASUREMENTUNIT,0))`),
    Sequelize.literal(`(COALESCE(IDPACKAGING,0))`)
  ];

  static constraints = [...(LogisticOrdersXItemsMovAmt.getBaseTableModelConstraints() || []),...[
    {
      name: LogisticOrdersXItemsMovAmt.tableName + '_u1',
      fields: [...LogisticOrdersXItemsMovAmt.getBaseTableModelUniqueFields(),...LogisticOrdersXItemsMovAmt.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDLOGISTICORDERXMOV'],
      type: 'foreign key',
      references: { 
          table: LogisticOrdersXMovs,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['IDITEMMOVAMT'],
      type: 'foreign key',
      references: { 
          table: ItemsMovsAmounts,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['IDLOGISTICMOVTYPE'],
      type: 'foreign key',
      references: { 
          table: LogisticMovTypes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDACTIONSTATUS'],
      type: 'foreign key',
      references: { 
          table: Action_Status,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
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
      fields: ['IDMEASUREMENTUNIT'],
      type: 'foreign key',
      references: { 
          table: MeasurementsUnits,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDLOGISTICSTATUS'],
      type: 'foreign key',
      references: { 
          table: LogisticStatus,
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
      fields: ['IDREASONNOTMOVIMENTEDAMT'],
      type: 'foreign key',
      references: { 
          table: LogisticReasons,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDREASONRETREATMOVIMENTEDAMT'],
      type: 'foreign key',
      references: { 
          table: LogisticReasons,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {LogisticOrdersXItemsMovAmt}