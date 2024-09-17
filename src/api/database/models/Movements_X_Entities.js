'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Movements } = require("./Movements");
const { Stock_Entities } = require("./Stock_Entities");
const { Movement_Entity_Relationship_Types } = require("./Movement_Entity_Relationship_Types");

/**
 * class model
 */
class Movements_X_Entities extends BaseTableModel {
  static id = 9021;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Movements_X_Entities.getBaseTableModelFields(),...{                 
      mov_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDMOVENTITYRELATIONSHIPTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      stock_entity_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      numeric_order:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      precedence:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      observations:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'mov_id',
    'IDMOVENTITYRELATIONSHIPTYPE',
    'stock_entity_id'
  ];

  static constraints = [...(Movements_X_Entities.getBaseTableModelConstraints() || []),...[
    {
      name: Movements_X_Entities.tableName + '_u1',
      fields: [...Movements_X_Entities.getBaseTableModelUniqueFields(),...Movements_X_Entities.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['mov_id'],
      type: 'foreign key',
      references: { 
          table: Movements,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['IDMOVENTITYRELATIONSHIPTYPE'],
      type: 'foreign key',
      references: { 
          table: Movement_Entity_Relationship_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['stock_entity_id'],
      type: 'foreign key',
      references: { 
          table: Stock_Entities,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Movements_X_Entities}