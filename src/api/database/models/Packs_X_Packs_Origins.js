'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Packagings } = require("./Packagings");
const { Suppliers } = require("./Suppliers");


/**
 * class model
 */
class Packs_X_Packs_Origins extends BaseTableModel {
  static id = 30800;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Packs_X_Packs_Origins.getBaseTableModelFields(),...{                 
      /*data_origin_id:{
        type: DataTypes.BIGINT.UNSIGNED
      }, already exists*/
      IDSUPPLIER:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      PACKAGINGORIGIN:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      IDPACKAGING:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    Sequelize.literal(`(COALESCE(IDSUPPLIER,0))`),  
    'PACKAGINGORIGIN'
  ];

  static constraints = [...(Packs_X_Packs_Origins.getBaseTableModelConstraints() || []),...[
    {
      name: Packs_X_Packs_Origins.tableName + '_u1',
      fields: [...Packs_X_Packs_Origins.getBaseTableModelUniqueFields(),...Packs_X_Packs_Origins.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    /*{
      fields: ['data_origin_id'],
      type: 'foreign key',
      references: { 
          table: Data_Origins,
          field: 'id'
      },
      onUpdate: 'cascade'
    },*/
    {
      fields: ['IDSUPPLIER'],
      type: 'foreign key',
      references: { 
          table: Suppliers,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDPACKAGING'],
      type: 'foreign key',
      references: { 
          table: Packagings,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Packs_X_Packs_Origins}