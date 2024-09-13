'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Entities_Types } = require("./Entities_Types");
const { Comparators } = require("./Comparators");


/**
 * class model
 */
class Condictions extends BaseTableModel {
  static id = 7004;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Condictions.getBaseTableModelFields(),...{           
      IDENTITYTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDENTITY:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDREGISTER:{
        type: DataTypes.BIGINT.UNSIGNED,
      },
      IDCOMPARATION:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      EXPRESSION: {
        type: DataTypes.TEXT
      },
      STARTDATE:{
        type: DataTypes.DATE
      },
      ENDDATE:{
        type: DataTypes.DATE
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDENTITYTYPE',
    'IDENTITY',
    Sequelize.literal(`(COALESCE(IDREGISTER,0))`),
    Sequelize.literal(`(COALESCE(IDCOMPARATION,0))`),
    Sequelize.literal(`(COALESCE(STARTDATE,'1900-01-01'))`)
  ];

  static constraints = [...(Condictions.getBaseTableModelConstraints() || []),...[
    {
      name: Condictions.tableName + '_u1',
      fields: [...Condictions.getBaseTableModelUniqueFields(),...Condictions.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDENTITYTYPE'],
      type: 'foreign key',
      references: { 
          table: Entities_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCOMPARATION'],
      type: 'foreign key',
      references: { 
          table: Comparators,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};

module.exports = {Condictions}
