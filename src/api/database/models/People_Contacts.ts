'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  People  from "./People.js";
import  Contact_Types  from "./Contact_Types.js";
import  Contacts  from "./Contacts.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class People_Contacts extends BaseTableModel {

  //table fields
  declare people_id: number;
  declare contact_type_id: number;
  declare contact_id: number;
  declare numeric_order: number;
  declare observations: string;


  static id = 2015;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...People_Contacts.getBaseTableModelFields(),...{           
      people_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      contact_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      contact_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      numeric_order:{
        type: DataTypes.BIGINT
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'people_id',
    Sequelize.literal(`(COALESCE(contact_type_id,0))`),
    'contact_id'
  ];

  static constraints = [...(People_Contacts.getBaseTableModelConstraints() || []),...[
    {
      name: People_Contacts.tableName + '_u1',
      fields: [...People_Contacts.getBaseTableModelUniqueFields(),...People_Contacts.uniqueFields],
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
      result = super.getForeignKeys();
      result.push({
        fields: ['people_id'],
        type: 'foreign key',
        references: { 
            table: People,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      result.push({
        fields: ['contact_type_id'],
        type: 'foreign key',
        references: { 
            table: Contact_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['contact_id'],
        type: 'foreign key',
        references: { 
            table: Contacts,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

};