'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Cities } = require("./Cities");

/**
 * class model
 */
class NeighborHoods extends BaseTableModel {
  static id = 2004;
  static model = null;
  static fields = {
    ...NeighborHoods.getBaseTableModelFields(),...{           
      IDCITY:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'IDCITY',
    'name'
  ];

  static constraints = [...(NeighborHoods.getBaseTableModelConstraints() || []),...[
    {
      name: NeighborHoods.name.toLowerCase() + '_u1',
      fields: [...NeighborHoods.getBaseTableModelUniqueFields(),...NeighborHoods.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDCITY'],
      type: 'foreign key',
      references: { 
          table: Cities,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {NeighborHoods}