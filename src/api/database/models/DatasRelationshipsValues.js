'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { DatasRelationships } = require("./DatasRelationships");
const { Contexts } = require("./Contexts");
const { Data_Types } = require("./Data_Types");
const { IdentifiersTypes } = require("./IdentifiersTypes");

/**
 * class model
 */
class DatasRelationshipsValues extends BaseTableModel {
  static id = 1003;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...DatasRelationshipsValues.getBaseTableModelFields(),...{           
      IDDATARELATIONSHIP:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDCONTEXT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDIDENTIFIERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDDATATYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      VALUE:{
        type: DataTypes.STRING(256)
      },
      ORDERNUM:{
        type: DataTypes.BIGINT
      },
      STARTMOMENT:{
        type: DataTypes.DATE
      },
      ENDMOMENT:{
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [
    'IDDATARELATIONSHIP',
    Sequelize.literal(`(COALESCE(IDCONTEXT,0))`),
    'IDIDENTIFIERTYPE',
    'IDDATATYPE',
    Sequelize.literal(`(COALESCE(VALUE,'NULL'))`),
    Sequelize.literal(`(COALESCE(ORDERNUM,0))`),
    Sequelize.literal(`(COALESCE(STARTMOMENT,'1900-01-01'))`)
  ];

  static constraints = [...(DatasRelationshipsValues.getBaseTableModelConstraints() || []),...[
    {
      name: DatasRelationshipsValues.tableName + '_u1',
      fields: [...DatasRelationshipsValues.getBaseTableModelUniqueFields(),...DatasRelationshipsValues.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['IDDATARELATIONSHIP'],
      type: 'foreign key',
      references: { 
          table: DatasRelationships,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDCONTEXT'],
      type: 'foreign key',
      references: { 
          table: Contexts,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDIDENTIFIERTYPE'],
      type: 'foreign key',
      references: { 
          table: IdentifiersTypes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDDATATYPE'],
      type: 'foreign key',
      references: { 
          table: Data_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }

  ]];
  
};


module.exports = {DatasRelationshipsValues}