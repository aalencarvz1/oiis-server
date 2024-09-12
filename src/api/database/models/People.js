'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require("./BaseTableModel");
const { Identifier_Types } = require("./Identifier_Types");
const { Utils } = require("../../controllers/utils/Utils");

/**
 * class model
 */
class People extends BaseTableModel {
  static id = 100;
  static tableName = this.name.toLowerCase();
  static model = null;

  static SYSTEM = 1;
  
  static fields = {
    ...People.getBaseTableModelFields(),...{
      IDIDENTIFIERDOCTYPE: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDENTIFIERDOC: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(2000),
        allowNull: false
      },
      BIRTHDATE: {
        type: DataTypes.DATE
      },
      FANTASY: {
        type: DataTypes.STRING(2000)
      },
      ALIAS: {
        type: DataTypes.STRING(2000)
      },
      OBSERVATIONS: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDIDENTIFIERDOCTYPE',
    'IDENTIFIERDOC'
  ];

  static constraints = [...(People.getBaseTableModelConstraints() || []),...[
    {
      name: People.tableName + '_u1',
      fields: [...People.getBaseTableModelUniqueFields(),...People.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDIDENTIFIERDOCTYPE'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
  static include(queryParams,pClassModelParent) {
    queryParams = queryParams || {};
    queryParams.attributes = queryParams.attributes || [`${pClassModelParent.tableName}.*`],
    queryParams.attributes.push([Sequelize.col(`${People.tableName}.IDIDENTIFIERDOCTYPE`),'IDIDENTIFIERDOCTYPE']);
    queryParams.attributes.push([Sequelize.col(`${People.tableName}.IDENTIFIERDOC`),'IDENTIFIERDOC']);
    queryParams.attributes.push([Sequelize.col(`${People.tableName}.name`),'name']);
    queryParams.attributes.push([Sequelize.col(`${People.tableName}.FANTASY`),'FANTASY']);
    queryParams.include = queryParams.include || [];
    queryParams.include.push({
        raw:true,
        model:People.getModel(),
        attributes:[],
        on:Sequelize.where(
            Sequelize.col(`${People.tableName}.id`),
            '=',
            Sequelize.col(`${pClassModelParent.tableName}.IDPEOPLE`)
        )
    });
    return queryParams;
  }

  static async updateOrCreatePeopleByIdentifierDocAndGet(queryParams) {
    if (queryParams.IDIDENTIFIERDOCTYPE && queryParams.IDENTIFIERDOC) {
      let people = await People.getModel().findOne({
        where:[
          {IDIDENTIFIERDOCTYPE: queryParams.IDIDENTIFIERDOCTYPE},
          Sequelize.where(Sequelize.fn('lower',Sequelize.fn('regexp_replace',Sequelize.col('IDENTIFIERDOC'),'[^a-z|A-Z|0-9]','')),'=',Sequelize.fn('lower',Sequelize.fn('regexp_replace',queryParams.IDENTIFIERDOC,'[^a-z|A-Z|0-9]','')))
        ] 
      });

      let describeTable = await People.getModel().describe();
      let originalFieldsNames = Object.keys(describeTable);
      let fieldsLower = originalFieldsNames.join(',').toLowerCase().split(',');
      let newParams  = {};
      let ind = null;
      for(let key in queryParams) {
        ind = fieldsLower.indexOf(key.trim().toLowerCase());
        if (ind > -1 && key != 'id') {
          newParams[originalFieldsNames[ind]] = queryParams[key];
        }
      }
      if (people) {
        for(let key in newParams) {
          if (key != 'id') people[key] = newParams[key];
        }
        await people.save();
        return people;
      } else {        
        people = await People.getModel().create(newParams);
        return people;
      }
    } else {
      throw new Error("missing data");    
    }
  }

  static async getPeopleByIdentifiersDocs(identifiersDocs,options) {    
    let result = null;
    let queryParams = options?.queryParams || options || {};
    queryParams.raw = Utils.firstValid([queryParams?.raw,true]),
    queryParams.where = queryParams.where || {};
    if (identifiersDocs) {
      queryParams.where[Sequelize.Op.or] = identifiersDocs.map(el=>{
        let r = {};
        let and = [];
        if (typeof el == 'object') {
          if (el.IDIDENTIFIERDOCTYPE) {
            and.push({
              IDIDENTIFIERDOCTYPE: el.IDIDENTIFIERDOCTYPE
            });
          }
          if (el.IDENTIFIERDOC) {
            and.push(Sequelize.where(
              Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col(`IDENTIFIERDOC`),'[^0-9]',''),'DECIMAL(32)'),
              '=',
              Sequelize.cast(Sequelize.fn('regexp_replace',el.IDENTIFIERDOC,'[^0-9]',''),'DECIMAL(32)'),
            ));
          }
        } else {
          and.push(Sequelize.where(
            Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col(`IDENTIFIERDOC`),'[^0-9]',''),'DECIMAL(32)'),
            '=',
            Sequelize.cast(Sequelize.fn('regexp_replace',el,'[^0-9]',''),'DECIMAL(32)'),
          ));
        }
        r[Sequelize.Op.and] = and;
        return r;
      });
    };
    result = await People.getModel().findAll(queryParams);
    return result;
  }
  
};



module.exports = {People}