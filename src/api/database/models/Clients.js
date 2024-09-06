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
          'IDIDENTIFIERDOCTYPE',
          'IDENTIFIERDOC',
          'name',
          'FANTASY'
        ],
        on:{
            [Op.and]: [
                Sequelize.where(Sequelize.col(`${People.tableName}.id`), Sequelize.col(`${Clients.tableName}.IDPEOPLE`))
            ]
        }
    });
    if (identifiersDocs) {    
      queryParams.where[Op.or] = identifiersDocs.map(el=>{
        let r = {};
        let and = [];
        if (typeof el == 'object') {
          if (el.IDIDENTIFIERDOCTYPE) {
            and.push(Sequelize.where(
              Sequelize.col(`${People.tableName}.IDIDENTIFIERDOCTYPE`),
              el.IDIDENTIFIERDOCTYPE
            ));
          }
          if (el.IDENTIFIERDOC) {
            and.push(Sequelize.where(
              Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col(`${People.tableName}.IDENTIFIERDOC`),'[^0-9]',''),'DECIMAL(32)'),
              '=',
              Sequelize.cast(Sequelize.fn('regexp_replace',el.IDENTIFIERDOC,'[^0-9]',''),'DECIMAL(32)'),
            ));
          }
        } else {
          and.push(Sequelize.where(
            Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col(`${People.tableName}.IDENTIFIERDOC`),'[^0-9]',''),'DECIMAL(32)'),
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