'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Collaborators } = require("./Collaborators");
const { Contract_Types } = require("./Contract_Types");


/**
 * class model
 */
class Collaborator_Contracts extends BaseTableModel {
  static id = 6002;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Collaborator_Contracts.getBaseTableModelFields(),...{           
      collaborator_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      contract_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      start_date:{
        type: DataTypes.DATE,
      },
      end_date:{
        type: DataTypes.DATE,
      },     
      is_time_controlled: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },      
      observations:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'collaborator_id',
    'contract_type_id',
    Sequelize.literal(`(COALESCE(start_date,'1900-01-01'))`)
  ];

  static constraints = [...(Collaborator_Contracts.getBaseTableModelConstraints() || []),...[
    {
      name: Collaborator_Contracts.tableName + '_u1',
      fields: [...Collaborator_Contracts.getBaseTableModelUniqueFields(),...Collaborator_Contracts.uniqueFields],
      type:"unique"
    },{
      name: Collaborator_Contracts.tableName + '_c_1',
      fields:['is_time_controlled'],
      type:"check",
      where:{
        is_time_controlled: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['collaborator_id'],
      type: 'foreign key',
      references: { 
          table: Collaborators,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['contract_type_id'],
      type: 'foreign key',
      references: { 
          table: Contract_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Collaborator_Contracts}