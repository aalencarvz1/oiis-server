'use strict';

/*imports*/
const { BasePeopleModel } = require("./BasePeopleModel");

/**
 * class model
 */
class Collaborators extends BasePeopleModel {
  static id = 110;
  static tableName = this.name.toLowerCase();
  static model = null;

  static SYSTEM = 1;
  
  static fields = {
    ...(Collaborators.getBaseTableModelFields() || {})
  };
  
  static uniqueFields = [];

  static constraints = [...(Collaborators.getBaseTableModelConstraints() || []),...[
    {
      name: Collaborators.tableName + '_u1',
      fields: [...Collaborators.getBaseTableModelUniqueFields(),...Collaborators.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.defaultPeopleForeignsKeys || [])];
  
};



module.exports = {Collaborators}