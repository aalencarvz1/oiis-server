'use strict';

/*imports*/
import BasePeopleModel from "./BasePeopleModel.js";



/**
 * class model
 */
export default class Collaborators extends BasePeopleModel {
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
