'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { EntitiesTypes } = require("./EntitiesTypes");
const { Comparators } = require("./Comparators");


/**
 * class model
 */
class Condictions extends BaseTableModel {
  static ID = 7004;
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
      OBSERVATIONS:{
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
      name: Condictions.name.toUpperCase() + '_U1',
      fields: [...Condictions.getBaseTableModelUniqueFields(),...Condictions.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDENTITYTYPE'],
      type: 'foreign key',
      references: { 
          table: EntitiesTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCOMPARATION'],
      type: 'foreign key',
      references: { 
          table: Comparators,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};

module.exports = {Condictions}
