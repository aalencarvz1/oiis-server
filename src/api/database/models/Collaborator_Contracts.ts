'use strict';


import { Sequelize, DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Collaborators  from "./Collaborators.js";
import  Contract_Types  from "./Contract_Types.js";


/**
 * class model
 */
export default class Collaborator_Contracts extends BaseTableModel {

  //table fields
  declare collaborator_id: number;
  declare contract_type_id: number;
  declare start_date: Date;
  declare end_date: Date;     
  declare is_time_controlled: number;
  declare observations: string;



  static id = 6002;
  static tableName = this.name.toLowerCase();
  
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
        type: DataTypes.INTEGER,
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
              [Op.in]: [0,1]
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