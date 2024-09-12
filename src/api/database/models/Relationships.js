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
      IDRELATIONSHIPTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDTABLE1:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      COLUMNREG1:{
        type: DataTypes.STRING(255)
      },      
      IDREG1:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      CONDICTIONSREG1:{
        type: DataTypes.TEXT
      },
      IDTABLE2:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },      
      COLUMNREG2:{
        type: DataTypes.STRING(255)
      },            
      IDREG2:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      CONDICTIONSREG2:{
        type: DataTypes.TEXT
      },
      IDCONTEXT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      VALUE:{
        type: DataTypes.STRING(255)
      },
      ORDERNUM:{
        type: DataTypes.BIGINT
      },
      STARTMOMENT:{
        type: DataTypes.DATE
      },
      ENDMOMENT:{
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [
    'IDRELATIONSHIPTYPE',
    'IDTABLE1',
    'IDTABLE2',
    Sequelize.literal(`(COALESCE(COLUMNREG1,'id'))`),
    Sequelize.literal(`(COALESCE(COLUMNREG2,'id'))`),
    Sequelize.literal(`(COALESCE(IDREG1,0))`),
    Sequelize.literal(`(COALESCE(IDREG2,0))`),
    Sequelize.literal(`(COALESCE(IDCONTEXT,0))`),
    //Sequelize.literal(`(COALESCE(VALUE,'NULL'))`),
    Sequelize.literal(`(COALESCE(ORDERNUM,0))`),
    Sequelize.literal(`(COALESCE(STARTMOMENT,'1900-01-01'))`)
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
      fields: ['IDRELATIONSHIPTYPE'],
      type: 'foreign key',
      references: { 
          table: Relationship_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDTABLE1'],
      type: 'foreign key',
      references: { 
          table: Tables,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDTABLE2'],
      type: 'foreign key',
      references: { 
          table: Tables,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDCONTEXT'],
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