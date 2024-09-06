'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { LogisticOrders } = require("./LogisticOrders");
const { MovementsStatus } = require("./MovementsStatus");
const { LogisticStatus } = require("./LogisticStatus");
const { ActionsStatus } = require("./ActionsStatus");
const { Movements } = require("./Movements");
const { LogisticReasons } = require("./LogisticReasons");


/**
 * class model
 */
class LogisticOrdersXMovs extends BaseTableModel {
  static id = 12004;
  static model = null;
  static fields = {
    ...LogisticOrdersXMovs.getBaseTableModelFields(),...{           
      IDLOGISTICORDER:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDMOV:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDACTIONSTATUS:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:MovementsStatus.NOT_STARTED
      },
      IDLOGISTICSTATUS:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:MovementsStatus.NOT_STARTED
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
      MOVSTARTED_AT:{
        type: DataTypes.DATE
      },
      MOVENDED_AT:{
        type: DataTypes.DATE
      },
    }
  };
  
  static uniqueFields = [
    'IDLOGISTICORDER',
    'IDMOV'
  ];

  static constraints = [...(LogisticOrdersXMovs.getBaseTableModelConstraints() || []),...[
    {
      name: LogisticOrdersXMovs.name.toLowerCase() + '_u1',
      fields: [...LogisticOrdersXMovs.getBaseTableModelUniqueFields(),...LogisticOrdersXMovs.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDLOGISTICORDER'],
      type: 'foreign key',
      references: { 
          table: LogisticOrders,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['IDMOV'],
      type: 'foreign key',
      references: { 
          table: Movements,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['IDACTIONSTATUS'],
      type: 'foreign key',
      references: { 
          table: ActionsStatus,
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


module.exports = {LogisticOrdersXMovs}