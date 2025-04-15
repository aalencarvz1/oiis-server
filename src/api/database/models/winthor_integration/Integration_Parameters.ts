'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorIntegrationTableModel  from "./BaseWinthorIntegrationTableModel.js";
import Utils from "../../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Integration_Parameters extends BaseWinthorIntegrationTableModel {

  //table fields
  declare name:string;
  declare value:string;



  static id = 35006;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;

  static API_LOCAL_NETWORK_IP_ID = 1;
  static API_LOCAL_NETWORK_IP = process.env.API_LOCAL_NETWORK_IP;

  static fields = {
    ...Integration_Parameters.getBaseTableModelFields(),...{                 
      name:{
        type: DataTypes.STRING(255),
        allowNull:false
      },
      value:{
        type: DataTypes.STRING(2000),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Integration_Parameters.getBaseTableModelConstraints() || []),...[{
    name: Integration_Parameters.tableName + '_u1',
    fields: [...Integration_Parameters.getBaseTableModelUniqueFields(),...Integration_Parameters.uniqueFields],
    type:"unique"
  }]];
  
  static foreignsKeys : any[] = [];

};
