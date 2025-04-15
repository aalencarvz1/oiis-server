'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Business_Units  from "./Business_Units.js";
import  Companies  from "./Companies.js";
import  Suppliers  from "./Suppliers.js";
import  Warehouses  from "./Warehouses.js";
import  Clients  from "./Clients.js";
import  Users  from "./Users.js";
import  Collaborators  from "./Collaborators.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Stock_Entities extends BaseTableModel {

  //table fields
  declare company_id: number;
  declare business_unit_id: number;
  declare warehouse_id: number;
  declare supplier_id: number;
  declare client_id: number;
  declare user_id: number;
  declare collaborator_id: number;
  declare numeric_order: number;
  declare precedence: number;
  declare observations: string;


  static id = 8025;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static WITHOUT_CONTEINER = 1;

  static fields = {
    ...Stock_Entities.getBaseTableModelFields(),...{           
      company_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      business_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      warehouse_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      supplier_id:{
        type: DataTypes.BIGINT.UNSIGNED        
      },
      client_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      user_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      collaborator_id:{
        type: DataTypes.BIGINT.UNSIGNED
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
    'company_id',
    Sequelize.literal(`(COALESCE(business_unit_id,0))`),
    Sequelize.literal(`(COALESCE(warehouse_id,0))`),
    Sequelize.literal(`(COALESCE(supplier_id,0))`),
    Sequelize.literal(`(COALESCE(client_id,0))`),
    Sequelize.literal(`(COALESCE(user_id,0))`),
    Sequelize.literal(`(COALESCE(collaborator_id,0))`)
  ];

  static constraints = [...(Stock_Entities.getBaseTableModelConstraints() || []),...[
    {
      name: Stock_Entities.tableName + '_u1',
      fields: [...Stock_Entities.getBaseTableModelUniqueFields(),...Stock_Entities.uniqueFields],
      type:"unique"
    }
  ]];


  static foreignsKeys : any[] = [];
    

  /**
   * get the foreign keys avoiding ciclyc imports on BaseTableModel
   * @override
   * @created 2025-04-14
   * @version 1.0.0
   */
  static getForeignKeys(): any[] {
    //Utils.logi(this.name,'getForeignKeys');
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      result = [];
      let newAdjustedForeignKeys : boolean = true;
      let baseFks = this.getBaseTableModelForeignsKeys();
      for(let i = 0; i < baseFks.length; i++) {
        result.push(baseFks[i]);
        if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
      }   
      result.push({
        fields: ['company_id'],
        type: 'foreign key',
        references: { 
            table: Companies,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['business_unit_id'],
        type: 'foreign key',
        references: { 
            table: Business_Units,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['warehouse_id'],
        type: 'foreign key',
        references: { 
            table: Warehouses,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['supplier_id'],
        type: 'foreign key',
        references: { 
            table: Suppliers,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['client_id'],
        type: 'foreign key',
        references: { 
            table: Clients,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['user_id'],
        type: 'foreign key',
        references: { 
            table: Users,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['collaborator_id'],
        type: 'foreign key',
        references: { 
            table: Collaborators,
            field: 'id'
        },
        onUpdate: 'cascade'
      }); 
      this.adjustedForeignKeys = newAdjustedForeignKeys;
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }


  /**
   * static initializer block
   */
  static {
    //Utils.logi(this.name,'STATIC');
    this.foreignsKeys = this.getForeignKeys();
    //Utils.logf(this.name,'STATIC');
  }
     
  
};