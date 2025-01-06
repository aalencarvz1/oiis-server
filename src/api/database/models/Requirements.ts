'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Requirements_Types  from "./Requirements_Types.js";
import  Projects_Items  from "./Projects_Items.js";
import  Utils  from "../../controllers/utils/Utils.js";



/**
 * class model
 */
export default class Requirements extends BaseTableModel {

  //table fields
  declare project_item_id: number;
  declare requirement_type_id: number;


  static id = 15020;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Requirements.getBaseTableModelFields(),...{            
      project_item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },    
      requirement_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue: Requirements_Types.FUNCTIONAL
      }
    }
  };
  
  static uniqueFields = [
    'project_item_id'
  ];

  static constraints = [...(Requirements.getBaseTableModelConstraints() || []),...[
    {
      name: Requirements.tableName + '_u1',
      fields: [...Requirements.getBaseTableModelUniqueFields(),...Requirements.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['project_item_id'],
      type: 'foreign key',
      references: { 
          table: Projects_Items,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['requirement_type_id'],
      type: 'foreign key',
      references: { 
          table: Requirements_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
};