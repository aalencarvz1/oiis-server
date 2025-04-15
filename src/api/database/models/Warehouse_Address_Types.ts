'use strict';


import { Sequelize, DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Warehouse_Address_Types extends BaseTableModel {

  //table fiels
  declare name: string;
  declare is_storable: number;
  declare is_passable: number;

  static id = 3003;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Warehouse_Address_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      is_storable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      is_passable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Warehouse_Address_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Warehouse_Address_Types.tableName + '_u1',
      fields: [...Warehouse_Address_Types.getBaseTableModelUniqueFields(),...Warehouse_Address_Types.uniqueFields],
      type:"unique"
    },{
      name: Warehouse_Address_Types.tableName + '_c_1',
      fields:['is_storable'],
      type:"check",
      where:{
        is_storable: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Warehouse_Address_Types.tableName + '_c_2',
      fields:['is_passable'],
      type:"check",
      where:{
        is_passable: {
              [Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys : any[] = [];

  
};