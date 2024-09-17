'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Identifier_Types } = require("./Identifier_Types");
const { Container_Types } = require("./Container_Types");

/**
 * class model
 */
class Containers extends BaseTableModel {
  static id = 8015;
  static tableName = this.name.toLowerCase();
  static model = null;

  static WITHOUT_CONTEINER = 1;

  static fields = {
    ...Containers.getBaseTableModelFields(),...{           
      container_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      tara:{
        type: DataTypes.DECIMAL(32,10)
      },
      allow_multiple_addresses: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      observations:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'container_type_id',
    'identifier_type_id',
    'identifier'
  ];

  static constraints = [...(Containers.getBaseTableModelConstraints() || []),...[
    {
      name: Containers.tableName + '_u1',
      fields: [...Containers.getBaseTableModelUniqueFields(),...Containers.uniqueFields],
      type:"unique"
    },{
      name: Containers.tableName + '_c_1',
      fields:['allow_multiple_addresses'],
      type:"check",
      where:{
        allow_multiple_addresses: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['container_type_id'],
      type: 'foreign key',
      references: { 
          table: Container_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['identifier_type_id'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Containers}