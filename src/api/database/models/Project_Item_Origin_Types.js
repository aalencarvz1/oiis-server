'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Project_Item_Origin_Types extends BaseTableModel {
  static id = 15005;
  static tableName = this.name.toLowerCase();
  static model = null;

  static USER = 1;
  static SYSTEM = 2;

  static fields = {
    ...Project_Item_Origin_Types.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT
      },
      anotations: {
        type: DataTypes.TEXT
      },
      is_system: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Project_Item_Origin_Types.getBaseTableModelConstraints() || []),...[{
    name: Project_Item_Origin_Types.tableName + '_u1',
    fields: [...Project_Item_Origin_Types.getBaseTableModelUniqueFields(),...Project_Item_Origin_Types.uniqueFields],
    type:"unique"
  },{
    name: Project_Item_Origin_Types.tableName + '_c_1',
    fields:['is_system'],
    type:"check",
    where:{
      is_system: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Project_Item_Origin_Types}