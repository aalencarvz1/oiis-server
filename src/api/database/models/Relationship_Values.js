'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Relationships } = require("./Relationships");
const { Contexts } = require("./Contexts");
const { Data_Types } = require("./Data_Types");
const { Identifier_Types } = require("./Identifier_Types");

/**
 * class model
 */
class Relationship_Values extends BaseTableModel {
  static id = 1003;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Relationship_Values.getBaseTableModelFields(),...{           
      IDDATARELATIONSHIP:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDCONTEXT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDDATATYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      value:{
        type: DataTypes.STRING(256)
      },
      numeric_order:{
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
    'identifier_type_id',
    'IDDATATYPE',
    Sequelize.literal(`(COALESCE(value,'NULL'))`),
    Sequelize.literal(`(COALESCE(numeric_order,0))`),
    Sequelize.literal(`(COALESCE(STARTMOMENT,'1900-01-01'))`)
  ];

  static constraints = [...(Relationship_Values.getBaseTableModelConstraints() || []),...[
    {
      name: Relationship_Values.tableName + '_u1',
      fields: [...Relationship_Values.getBaseTableModelUniqueFields(),...Relationship_Values.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['IDDATARELATIONSHIP'],
      type: 'foreign key',
      references: { 
          table: Relationships,
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
      fields: ['identifier_type_id'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
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


module.exports = {Relationship_Values}