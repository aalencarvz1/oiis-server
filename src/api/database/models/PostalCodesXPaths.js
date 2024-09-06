'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { PostalCodes } = require("./PostalCodes");
const { PostalCodesXStreets } = require("./PostalCodesXStreets");

/**
 * class model
 */
class PostalCodesXPaths extends BaseTableModel {
  static id = 2010;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...PostalCodesXPaths.getBaseTableModelFields(),...{                 
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

  static constraints = [...(PostalCodesXPaths.getBaseTableModelConstraints() || []),...[
    {
      name: PostalCodesXPaths.tableName + '_u1',
      fields: [...PostalCodesXPaths.getBaseTableModelUniqueFields(),...PostalCodesXPaths.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDPOSTALCODE'],
      type: 'foreign key',
      references: { 
          table: PostalCodes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDPOSTALCODEXSTREET'],
      type: 'foreign key',
      references: { 
          table: PostalCodesXStreets,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {PostalCodesXPaths}