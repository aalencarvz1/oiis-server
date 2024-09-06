'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class DataRelationshipTypes extends BaseTableModel {
  static id = 1000;
  static model = null;

  static RELATIONSHIP = 1;
  static IDENTIFIER = 2;  
  static SUBORDINATED = 10;
  static WINTHOR_ID = 11;
  static EP_ID = 12;

  static fields = {
    ...DataRelationshipTypes.getBaseTableModelFields(),...{     
      NAME:{
        type: DataTypes.STRING(256),
        allowNull: false
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(DataRelationshipTypes.getBaseTableModelConstraints() || []),...[
    {
      name: DataRelationshipTypes.name.toLowerCase() + '_u1',
      fields: [...DataRelationshipTypes.getBaseTableModelUniqueFields(),...DataRelationshipTypes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};


module.exports = {DataRelationshipTypes}