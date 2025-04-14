'use strict';

import { DataTypes, Op, Sequelize } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Utils from "../../controllers/utils/Utils.js";
import Identifier_Types from "./Identifier_Types.js";



/**
 * class model
 */
export default class People extends BaseTableModel {
  
  //table fields
  declare identifier_doc_type_id: number;
  declare identifier_doc: string;
  declare name: string;
  declare birth_date: Date;
  declare fantasy: string;
  declare alias: string;
  declare observations: string;



  static id = 100;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static SYSTEM = 1;
  
  static fields = {
    ...People.getBaseTableModelFields(),...{
      identifier_doc_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      identifier_doc: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(2000),
        allowNull: false
      },
      birth_date: {
        type: DataTypes.DATE
      },
      fantasy: {
        type: DataTypes.STRING(2000)
      },
      alias: {
        type: DataTypes.STRING(2000)
      },
      observations: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'identifier_doc_type_id',
    'identifier_doc'
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
      fields: ['identifier_doc_type_id'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
  static include(queryParams: any,pClassModelParent: typeof BaseTableModel) : any {
    queryParams = queryParams || {};
    queryParams.attributes = queryParams.attributes || [`${pClassModelParent.tableName}.*`],
    queryParams.attributes.push([Sequelize.col(`${People.tableName}.identifier_doc_type_id`),'identifier_doc_type_id']);
    queryParams.attributes.push([Sequelize.col(`${People.tableName}.identifier_doc`),'identifier_doc']);
    queryParams.attributes.push([Sequelize.col(`${People.tableName}.name`),'name']);
    queryParams.attributes.push([Sequelize.col(`${People.tableName}.fantasy`),'fantasy']);
    queryParams.include = queryParams.include || [];
    queryParams.include.push({
        raw:true,
        model:People,
        attributes:[],
        on:Sequelize.where(
            Sequelize.col(`${People.tableName}.id`),
            '=',
            Sequelize.col(`${pClassModelParent.tableName}.people_id`)
        )
    });
    return queryParams;
  }

  static async updateOrCreatePeopleByIdentifierDocAndGet(queryParams: any) {
    if (queryParams.identifier_doc_type_id && queryParams.identifier_doc) {
      let people : any = await People.findOne({
        where:[
          {identifier_doc_type_id: queryParams.identifier_doc_type_id},
          Sequelize.where(Sequelize.fn('lower',Sequelize.fn('regexp_replace',Sequelize.col('identifier_doc'),'[^a-z|A-Z|0-9]','')),'=',Sequelize.fn('lower',Sequelize.fn('regexp_replace',queryParams.identifier_doc,'[^a-z|A-Z|0-9]','')))
        ] 
      });

      let describeTable = await People.describe();
      let originalFieldsNames = Object.keys(describeTable);
      let fieldsLower = originalFieldsNames.join(',').toLowerCase().split(',');
      let newParams : any = {};
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
        people = await People.create(newParams);
        return people;
      }
    } else {
      throw new Error("missing data");    
    }
  }

  static async getPeopleByIdentifiersDocs(identifiersDocs: any,options : any) {    
    let result = null;
    let queryParams = options?.queryParams || options || {};
    queryParams.raw = Utils.firstValid([queryParams?.raw,true]),
    queryParams.where = queryParams.where || {};
    if (identifiersDocs) {
      queryParams.where[Op.or] = identifiersDocs.map((el: any)=>{
        let r : any = {};
        let and = [];
        if (typeof el == 'object') {
          if (el.identifier_doc_type_id) {
            and.push({
              identifier_doc_type_id: el.identifier_doc_type_id
            });
          }
          if (el.identifier_doc) {
            and.push(Sequelize.where(
              Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col(`identifier_doc`),'[^0-9]',''),'DECIMAL(32)'),
              '=',
              Sequelize.cast(Sequelize.fn('regexp_replace',el.identifier_doc,'[^0-9]',''),'DECIMAL(32)'),
            ));
          }
        } else {
          and.push(Sequelize.where(
            Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col(`identifier_doc`),'[^0-9]',''),'DECIMAL(32)'),
            '=',
            Sequelize.cast(Sequelize.fn('regexp_replace',el,'[^0-9]',''),'DECIMAL(32)'),
          ));
        }
        r[Op.and] = and;
        return r;
      });
    };
    result = await People.findAll(queryParams);
    return result;
  }
  

  static foreignsKeys : any[] = [];
    

  /**
   * get the foreign keys avoiding ciclyc imports on BaseTableModel
   * @override
   * @created 2025-04-14
   * @version 1.0.0
   */
  static getForeignKeys(): any[] {
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      let newAdjustedForeignKeys : boolean = true;
      let baseFks = this.getBaseTableModelForeignsKeys();
      for(let i = 0; i < baseFks.length; i++) {
        result.push(baseFks[i]);
        if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
      }        
      this.adjustedForeignKeys = newAdjustedForeignKeys;
    }
    return result;
  }


  /**
   * static initializer block
   */
  static {
    this.foreignsKeys = this.getForeignKeys();
  }
     
};
