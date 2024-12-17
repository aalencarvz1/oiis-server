'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Requirements_Types } = require("./Requirements_Types");
const { Projects_Items } = require("./Projects_Items");
const { Utils } = require("../../controllers/utils/Utils");



/**
 * class model
 */
class Requirements extends BaseTableModel {
  static id = 15020;
  static tableName = this.name.toLowerCase();
  static model = null;

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



  static async createData(params) {
    params = params || {};  
    if (!Utils.hasValue(params.project_item_id)) {
      let projectItem = await Projects_Items.createData(params);
      params.project_item_id = projectItem.id;
    }                  
    return await BaseTableModel.createData.bind(Requirements)(params);
  }  
  static putData = this.createData;

  static async updateData(params) {
    params = params || {};  
    let projectItemParams = {...params,id:params.project_item_id};
    let projectItem = await Projects_Items.updateData(projectItemParams);
    return await BaseTableModel.updateData.bind(Requirements)(params);
  }  
  static patchData = this.updateData;
  

  static async deleteData(params) {
    let records = await this.getData(params);
    let projectsIds = [];
    if (Utils.hasValue(records)) {
      projectsIds = records.map(el=>el.project_item_id);
    }
    await BaseTableModel.deleteData.bind(Requirements)(params);
    return Projects_Items.deleteData({queryParams:{where:{id:projectsIds}}});
  } 
};


module.exports = {Requirements}