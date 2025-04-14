'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Stock_Entity_Relationship_Types extends BaseTableModel {

  //table fields
  declare name: string;
  declare is_origin: number;
  declare is_owner: number;
  declare is_reserved: number;
  declare is_target: number;
  declare description: string;



  static id = 8026;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static OWNER = 1;
  static fields = {
    ...Stock_Entity_Relationship_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      is_origin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      is_reserved: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_target: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Stock_Entity_Relationship_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Stock_Entity_Relationship_Types.tableName + '_u1',
      fields: [...Stock_Entity_Relationship_Types.getBaseTableModelUniqueFields(),...Stock_Entity_Relationship_Types.uniqueFields],
      type:"unique"
    },{
      name: Stock_Entity_Relationship_Types.tableName + '_c_1',
      fields:['is_origin'],
      type:"check",
      where:{
        is_origin: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Stock_Entity_Relationship_Types.tableName + '_c_2',
      fields:['is_owner'],
      type:"check",
      where:{
        is_owner: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Stock_Entity_Relationship_Types.tableName + '_c_3',
      fields:['is_reserved'],
      type:"check",
      where:{
        is_reserved: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Stock_Entity_Relationship_Types.tableName + '_c_4',
      fields:['is_target'],
      type:"check",
      where:{
        is_target: {
              [Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys : any[] = [];
  
};