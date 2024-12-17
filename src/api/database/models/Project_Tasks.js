'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Project_Task_Types } = require("./Project_Task_Types");
const { Projects_Items } = require("./Projects_Items");
const { Utils } = require("../../controllers/utils/Utils");
const { Record_Status } = require("./Record_Status");
const { Users } = require("./Users");
const { Data_Origins } = require("./Data_Origins");
const { Relationship_Types } = require("./Relationship_Types");
const { Relationships } = require("./Relationships");
const { Requirements } = require("./Requirements");



/**
 * class model
 */
class Project_Tasks extends BaseTableModel {
  static id = 15051;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Project_Tasks.getBaseTableModelFields(),...{            
      project_item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },    
      task_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue: Project_Task_Types.TASK
      }
    }
  };
  
  static uniqueFields = [
    'project_item_id'
  ];

  static constraints = [...(Project_Tasks.getBaseTableModelConstraints() || []),...[
    {
      name: Project_Tasks.tableName + '_u1',
      fields: [...Project_Tasks.getBaseTableModelUniqueFields(),...Project_Tasks.uniqueFields],
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
      fields: ['task_type_id'],
      type: 'foreign key',
      references: { 
          table: Project_Task_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];



  static async createData(params, req) {
    params = params || {};  
    if (!Utils.hasValue(params.project_item_id)) {
      let projectItem = await Projects_Items.createData(params);
      params.project_item_id = projectItem.id;
    }     
    
    let result = await BaseTableModel.createData.bind(Project_Tasks)(params);

    if (Utils.hasValue(params.requirements)) {
      let toUpsert = params.requirements.map(el=>({
        status_reg_id: Record_Status.ACTIVE,
        creator_user_id : params.req?.user?.id || req?.user?.id || Users.SYSTEM,
        created_at: new Date(),
        data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
        is_sys_rec : 0,
        relationship_type_id : Relationship_Types.SUBORDINATED,
        table_1_id: Project_Tasks.id,
        record_1_column: 'id',
        record_1_id: result.id,
        table_2_id: Requirements.id,
        record_2_column: 'id',
        record_2_id: el.id,
      }));

      await Relationships.getModel().bulkCreate(toUpsert,{
        ignoreDuplicates:true
      })
      
    }

    return result;
  }  
  static putData = this.createData;

  static async updateData(params) {
    params = params || {};  
    let projectItemParams = {...params,id:params.project_item_id};
    let projectItem = await Projects_Items.updateData(projectItemParams);
    return await BaseTableModel.updateData.bind(Project_Tasks)(params);
  }  
  static patchData = this.updateData;
  

  static async deleteData(params) {
    let records = await this.getData(params);
    let projectsIds = [];
    if (Utils.hasValue(records)) {
      projectsIds = records.map(el=>el.project_item_id);
    }
    await BaseTableModel.deleteData.bind(Project_Tasks)(params);
    return Projects_Items.deleteData({queryParams:{where:{id:projectsIds}}});
  } 
};


module.exports = {Project_Tasks}