'use strict';

import  BasePeopleModel  from "./BasePeopleModel.js";
import  People  from "./People.js";
import  Utils  from "../../controllers/utils/Utils.js";
import { Op, Sequelize } from "sequelize";

/**
 * class model
 */
export default class Clients extends BasePeopleModel {
  static id = 4000;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...(Clients.getBaseTableModelFields() || {})
  };
  
  static uniqueFields = [];

  static constraints = [...(Clients.getBaseTableModelConstraints() || []),...[
    {
      name: Clients.tableName + '_u1',
      fields: [...Clients.getBaseTableModelUniqueFields(),...Clients.uniqueFields],
      type:"unique"
    }
  ]];
  
  static foreignsKeys : any[] = [];

  static async getClientsByIdentifiersDocs(identifiersDocs?: any[] ,options?: any) {    
    let result = null;
    let queryParams = options?.queryParams || options || {};
    queryParams.raw = Utils.firstValid([queryParams?.raw,true]),
    queryParams.where = queryParams.where || {};
    queryParams.include = queryParams.include || [];
    queryParams.include.push({
        raw : queryParams.raw,
        required:true,        
        model:People,
        attributes:[
          'identifier_doc_type_id',
          'identifier_doc',
          'name',
          'fantasy'
        ],
        on:{
            [Op.and]: [
                Sequelize.where(Sequelize.col(`${People.tableName}.id`), Sequelize.col(`${Clients.tableName}.people_id`))
            ]
        }
    });
    if (identifiersDocs) {    
      queryParams.where[Op.or] = identifiersDocs.map(el=>{
        let r : any = {};
        let and = [];
        if (typeof el == 'object') {
          if (el.identifier_doc_type_id) {
            and.push(Sequelize.where(
              Sequelize.col(`${People.tableName}.identifier_doc_type_id`),
              el.identifier_doc_type_id
            ));
          }
          if (el.identifier_doc) {
            and.push(Sequelize.where(
              Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col(`${People.tableName}.identifier_doc`),'[^0-9]',''),'DECIMAL(32)'),
              '=',
              Sequelize.cast(Sequelize.fn('regexp_replace',el.identifier_doc,'[^0-9]',''),'DECIMAL(32)'),
            ));
          }
        } else {
          and.push(Sequelize.where(
            Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col(`${People.tableName}.identifier_doc`),'[^0-9]',''),'DECIMAL(32)'),
            '=',
            Sequelize.cast(Sequelize.fn('regexp_replace',el,'[^0-9]',''),'DECIMAL(32)'),
          ));
        }
        r[Op.and] = and;
        return r;
      });
    };
    result = await Clients.findAll(queryParams);
    return result;
  }

  
    

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