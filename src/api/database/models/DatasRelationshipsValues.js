'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { DatasRelationships } = require("./DatasRelationships");
const { Contexts } = require("./Contexts");
const { DataTypes : DataTypesModel } = require("./DataTypes");
const { IdentifiersTypes } = require("./IdentifiersTypes");

/**
 * class model
 */
class DatasRelationshipsValues extends BaseTableModel {
  static ID = 1003;
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
      name: DatasRelationshipsValues.name.toUpperCase() + '_U1',
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
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDCONTEXT'],
      type: 'foreign key',
      references: { 
          table: Contexts,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDIDENTIFIERTYPE'],
      type: 'foreign key',
      references: { 
          table: IdentifiersTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDDATATYPE'],
      type: 'foreign key',
      references: { 
          table: DataTypesModel,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }

  ]];
  
};


module.exports = {DatasRelationshipsValues}