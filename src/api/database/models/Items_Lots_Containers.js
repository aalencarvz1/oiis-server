'use strict';
/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Lots } = require("./Lots");
const { Items } = require("./Items");
const { Containers } = require("./Containers");


/**
 * class model
 */
class Items_Lots_Containers extends BaseTableModel {
  static id = 8020;
  static tableName = this.name.toLowerCase();
  static model = null;

  static WITHOUT_CONTEINER = 1;

  static fields = {
    ...Items_Lots_Containers.getBaseTableModelFields(),...{           
      item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      lot_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      container_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'item_id',
    'lot_id',
    'container_id'
  ];

  static constraints = [...(Items_Lots_Containers.getBaseTableModelConstraints() || []),...[
    {
      name: Items_Lots_Containers.tableName + '_u1',
      fields: [...Items_Lots_Containers.getBaseTableModelUniqueFields(),...Items_Lots_Containers.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['item_id'],
      type: 'foreign key',
      references: { 
          table: Items,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['lot_id'],
      type: 'foreign key',
      references: { 
          table: Lots,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['container_id'],
      type: 'foreign key',
      references: { 
          table: Containers,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  

  

};


module.exports = {Items_Lots_Containers}