'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Collaborator_Functions } = require("./Collaborator_Functions");
const { Collaborator_Contracts } = require("./Collaborator_Contracts");


/**
 * class model
 */
class Collaborators_X_Functions extends BaseTableModel {
  static id = 6003;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Collaborators_X_Functions.getBaseTableModelFields(),...{           
      contrract_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      function_id:{
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
    'contrract_id',
    'function_id',
    Sequelize.literal(`(COALESCE(start_date,'1900-01-01'))`)
  ];

  static constraints = [...(Collaborators_X_Functions.getBaseTableModelConstraints() || []),...[
    {
      name: Collaborators_X_Functions.tableName + '_u1',
      fields: [...Collaborators_X_Functions.getBaseTableModelUniqueFields(),...Collaborators_X_Functions.uniqueFields],
      type:"unique"
    },{
      name: Collaborators_X_Functions.tableName + '_c_1',
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
      fields: ['contrract_id'],
      type: 'foreign key',
      references: { 
          table: Collaborator_Contracts,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['function_id'],
      type: 'foreign key',
      references: { 
          table: Collaborator_Functions,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Collaborators_X_Functions}