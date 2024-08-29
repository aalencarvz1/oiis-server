'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Cities } = require("./Cities");

/**
 * class model
 */
class NeighborHoods extends BaseTableModel {
  static ID = 2004;
  static model = null;
  static fields = {
    ...NeighborHoods.getBaseTableModelFields(),...{           
      IDCITY:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'IDCITY',
    'NAME'
  ];

  static constraints = [...(NeighborHoods.getBaseTableModelConstraints() || []),...[
    {
      name: NeighborHoods.name.toUpperCase() + '_U1',
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
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {NeighborHoods}