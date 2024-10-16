'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Stock_Entity_Relationship_Types extends BaseTableModel {
  static id = 8026;
  static tableName = this.name.toLowerCase();
  static model = null;
  static OWNER = 1;
  static fields = {
    ...Stock_Entity_Relationship_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      is_origin: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_owner: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      is_reserved: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_target: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Stock_Entity_Relationship_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Stock_Entity_Relationship_Types.tableName + '_u1',
      fields: [...Stock_Entity_Relationship_Types.getBaseTableModelUniqueFields(),...Stock_Entity_Relationship_Types.uniqueFields],
      type:"unique"
    },{
      name: Stock_Entity_Relationship_Types.tableName + '_c_1',
      fields:['is_origin'],
      type:"check",
      where:{
        is_origin: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Stock_Entity_Relationship_Types.tableName + '_c_2',
      fields:['is_owner'],
      type:"check",
      where:{
        is_owner: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Stock_Entity_Relationship_Types.tableName + '_c_3',
      fields:['is_reserved'],
      type:"check",
      where:{
        is_reserved: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Stock_Entity_Relationship_Types.tableName + '_c_4',
      fields:['is_target'],
      type:"check",
      where:{
        is_target: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Stock_Entity_Relationship_Types}