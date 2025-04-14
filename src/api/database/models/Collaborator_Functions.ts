'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Collaborator_Functions extends BaseTableModel {

  //table fields
  declare name: string;
  declare is_trust: number;
  declare is_time_controlled: number;


  static id = 6001;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Collaborator_Functions.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      is_trust: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_time_controlled: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Collaborator_Functions.getBaseTableModelConstraints() || []),...[
    {
      name: Collaborator_Functions.tableName + '_u1',
      fields: [...Collaborator_Functions.getBaseTableModelUniqueFields(),...Collaborator_Functions.uniqueFields],
      type:"unique"
    },{
      name: Collaborator_Functions.tableName + '_c_1',
      fields:['is_trust'],
      type:"check",
      where:{
        is_trust: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Collaborator_Functions.tableName + '_c_2',
      fields:['is_time_controlled'],
      type:"check",
      where:{
        is_time_controlled: {
              [Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys : any[] = [];
  
};