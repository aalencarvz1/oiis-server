'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Relationship_Types } = require("./Relationship_Types");
const { Tables } = require("./Tables");
const { Contexts } = require("./Contexts");
const { Utils } = require("../../controllers/utils/Utils");

/**
 * class model
 */
class Relationships extends BaseTableModel {
  static id = 1001;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Relationships.getBaseTableModelFields(),...{     
      relationship_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      table_1_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      record_1_column:{
        type: DataTypes.STRING(255)
      },      
      record_1_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      record_1_conditions:{
        type: DataTypes.TEXT
      },
      table_2_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },      
      record_2_column:{
        type: DataTypes.STRING(255)
      },            
      record_2_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      record_2_conditions:{
        type: DataTypes.TEXT
      },
      context_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      value:{
        type: DataTypes.STRING(255)
      },
      numeric_order:{
        type: DataTypes.BIGINT
      },
      start_at:{
        type: DataTypes.DATE
      },
      end_at:{
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [
    'relationship_type_id',
    'table_1_id',
    'table_2_id',
    Sequelize.literal(`(COALESCE(record_1_column,'id'))`),
    Sequelize.literal(`(COALESCE(record_2_column,'id'))`),
    Sequelize.literal(`(COALESCE(record_1_id,0))`),
    Sequelize.literal(`(COALESCE(record_2_id,0))`),
    Sequelize.literal(`(COALESCE(context_id,0))`),
    //Sequelize.literal(`(COALESCE(value,'NULL'))`),
    Sequelize.literal(`(COALESCE(numeric_order,0))`),
    Sequelize.literal(`(COALESCE(start_at,'1900-01-01'))`)
  ];

  static constraints = [...(Relationships.getBaseTableModelConstraints() || []),...[
    {
      name: Relationships.tableName + '_u1',
      fields: [...Relationships.getBaseTableModelUniqueFields(),...Relationships.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['relationship_type_id'],
      type: 'foreign key',
      references: { 
          table: Relationship_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['table_1_id'],
      type: 'foreign key',
      references: { 
          table: Tables,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['table_2_id'],
      type: 'foreign key',
      references: { 
          table: Tables,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['context_id'],
      type: 'foreign key',
      references: { 
          table: Contexts,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];

  static async createIfNotExistsAndRelationed(queryParams, newValues, queryParamsRelationshipCheck){
    let reg = await Relationships.getModel().findOne(queryParams);
    if (!reg) {
      if (Utils.typeOf(queryParamsRelationshipCheck) !== 'array') {
        queryParamsRelationshipCheck = [queryParamsRelationshipCheck];
      }
      for(let key in queryParamsRelationshipCheck) {
        let relationed = await Relationships.getModel().findOne(queryParamsRelationshipCheck[key]);
        if (!relationed) {
          throw new Error(`not has relationship with ${JSON.stringify(queryParamsRelationshipCheck[key])}`);
        }
      }       
      let options  = {};
      if (queryParams.transaction) options.transaction = queryParams.transaction;
      let values = newValues || queryParams.where;
      reg = await Relationships.getModel().create(values,options);
    }
    return reg;
  }


  static async createIfNotExists(queryParams, newValues){
    return await BaseTableModel.createIfNotExists.bind(Relationships)(queryParams, newValues);
  }
  
};


module.exports = {Relationships}