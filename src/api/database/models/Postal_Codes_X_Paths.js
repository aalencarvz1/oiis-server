'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Postal_Codes } = require("./Postal_Codes");
const { Postal_Codes_X_Streets } = require("./Postal_Codes_X_Streets");

/**
 * class model
 */
class Postal_Codes_X_Paths extends BaseTableModel {
  static id = 2010;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Postal_Codes_X_Paths.getBaseTableModelFields(),...{                 
      IDPOSTALCODE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDPOSTALCODEXSTREET:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      LATITUDE:{
        type: DataTypes.DECIMAL(18,10)
      },
      LONGITUDE:{
        type: DataTypes.DECIMAL(18,10)
      },
      STARTNUMBER:{
        type: DataTypes.STRING(256)
      },
      ENDNUMBER:{
        type: DataTypes.STRING(256)
      }
    }
  };
  
  static uniqueFields = [
    'IDPOSTALCODE',
    Sequelize.literal(`(COALESCE(IDPOSTALCODEXSTREET,0))`),
    Sequelize.literal(`(COALESCE(LATITUDE,0))`),
    Sequelize.literal(`(COALESCE(LONGITUDE,0))`),
    Sequelize.literal(`(COALESCE(STARTNUMBER,'NULL'))`),
    Sequelize.literal(`(COALESCE(ENDNUMBER,'NULL'))`),
  ];

  static constraints = [...(Postal_Codes_X_Paths.getBaseTableModelConstraints() || []),...[
    {
      name: Postal_Codes_X_Paths.tableName + '_u1',
      fields: [...Postal_Codes_X_Paths.getBaseTableModelUniqueFields(),...Postal_Codes_X_Paths.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDPOSTALCODE'],
      type: 'foreign key',
      references: { 
          table: Postal_Codes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDPOSTALCODEXSTREET'],
      type: 'foreign key',
      references: { 
          table: Postal_Codes_X_Streets,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Postal_Codes_X_Paths}