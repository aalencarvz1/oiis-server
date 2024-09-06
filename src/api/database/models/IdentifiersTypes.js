'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require("./BaseTableModel");


/**
 * class model
 */
class IdentifiersTypes extends BaseTableModel {
  static id = 70;
  static tableName = this.name.toLowerCase();
  static model = null;

  static IDENTIFIER = 1;
  static CODE = 2;
  static CNPJ = 3;
  static CPF = 4;
  static CHAVENFE = 5;
  static GTIN = 10;
  static GTINTYPE = 11;
  static PACKAGING = 8001;
  static SUPPLIER = 5000; 
  static VALUE = 20;
  static WINTHORCODE = 30;
  static WINTHORCODEFAB = 31;
  
  static fields = {
    ...IdentifiersTypes.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      PROCESSTOVALIDATE: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(IdentifiersTypes.getBaseTableModelConstraints() || []),...[
    {
      name: IdentifiersTypes.tableName + '_u1',
      fields: [...IdentifiersTypes.getBaseTableModelUniqueFields(),...IdentifiersTypes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
  
};



module.exports = {IdentifiersTypes}