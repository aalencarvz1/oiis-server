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
  static ID = 30800;
  static model = null;
  static fields = {
    ...PacksXPacksOrigins.getBaseTableModelFields(),...{                 
      /*idorigindata:{
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
      name: PacksXPacksOrigins.name.toUpperCase() + '_U1',
      fields: [...PacksXPacksOrigins.getBaseTableModelUniqueFields(),...PacksXPacksOrigins.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    /*{
      fields: ['idorigindata'],
      type: 'foreign key',
      references: { 
          table: OriginsDatas,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },*/
    {
      fields: ['IDSUPPLIER'],
      type: 'foreign key',
      references: { 
          table: Suppliers,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDPACKAGING'],
      type: 'foreign key',
      references: { 
          table: Packagings,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {PacksXPacksOrigins}