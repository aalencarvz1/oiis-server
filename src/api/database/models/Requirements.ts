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



  static async createData(params: any) {
    params = params || {};  
    if (!Utils.hasValue(params.project_item_id)) {
      let projectItem = null;
      let projectItemParams = {...params};
      if (Utils.hasValue(projectItemParams.parent_id)) {
        projectItemParams.parent_id = null;
        delete projectItemParams.parent_id;
      }
      if (Utils.hasValue(projectItemParams.project_item_parent_id)) {
        projectItemParams.parent_id = projectItemParams.project_item_parent_id;        
      } 
      projectItem = await Projects_Items.createData(projectItemParams);
      params.project_item_id = projectItem.id;
    }                  
    return await BaseTableModel.createData.bind(Requirements)(params);
  }  
  static putData = this.createData;

  static async updateData(params: any) {
    params = params || {};  
    let projectItemParams = {...params,id:params.project_item_id};
    if (Utils.hasValue(projectItemParams.parent_id)) {
      projectItemParams.parent_id = null;
      delete projectItemParams.parent_id;
    }
    if (Utils.hasValue(projectItemParams.project_item_parent_id)) {
      projectItemParams.parent_id = projectItemParams.project_item_parent_id;        
    } 
    let projectItem = await Projects_Items.updateData(projectItemParams);
    return await BaseTableModel.updateData.bind(Requirements)(params);
  }  
  static patchData = this.updateData;
  

  static async deleteData(params: any) {
    let records = await this.getData(params);
    let projectsIds = [];
    if (Utils.hasValue(records)) {
      projectsIds = records.map((el: any)=>el.project_item_id);
    }
    await BaseTableModel.deleteData.bind(Requirements)(params);
    return Projects_Items.deleteData({queryParams:{where:{id:projectsIds}}});
  } 
};