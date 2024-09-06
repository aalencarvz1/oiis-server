'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Packagings } = require("./Packagings");
const { Suppliers } = require("./Suppliers");


/**
 * class model
 */
class PacksXPacksOrigins extends BaseTableModel {
  static id = 30800;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...PacksXPacksOrigins.getBaseTableModelFields(),...{                 
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

  static constraints = [...(PacksXPacksOrigins.getBaseTableModelConstraints() || []),...[
    {
      name: PacksXPacksOrigins.tableName + '_u1',
      fields: [...PacksXPacksOrigins.getBaseTableModelUniqueFields(),...PacksXPacksOrigins.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    /*{
      fields: ['data_origin_id'],
      type: 'foreign key',
      references: { 
          table: OriginsDatas,
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


module.exports = {PacksXPacksOrigins}