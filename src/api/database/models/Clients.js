'use strict';

const { Op, Sequelize } = require("sequelize");
/*imports*/
const { BasePeopleModel } = require("./BasePeopleModel");
const { People } = require("./People");
const { Utils } = require("../../controllers/utils/Utils");

/**
 * class model
 */
class Clients extends BasePeopleModel {
  static id = 4000;
  static tableName = this.name.toLowerCase();
  static model = null;

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

  static foreignsKeys = [...(this.defaultPeopleForeignsKeys || [])];

  static async getClientsByIdentifiersDocs(identifiersDocs,options) {    
    let result = null;
    let queryParams = options?.queryParams || options || {};
    queryParams.raw = Utils.firstValid([queryParams?.raw,true]),
    queryParams.where = queryParams.where || {};
    queryParams.include = queryParams.include || [];
    queryParams.include.push({
        raw : queryParams.raw,
        required:true,        
        model:People.getModel(),
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
        let r = {};
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
    result = await Clients.getModel().findAll(queryParams);
    return result;
  }
  
};


module.exports = {Clients}