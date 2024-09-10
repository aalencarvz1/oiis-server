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
      ISORIGIN: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISOWNER: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      ISRESERVED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISTARGET: {
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
      fields:['ISORIGIN'],
      type:"check",
      where:{
        ISORIGIN: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Stock_Entity_Relationship_Types.tableName + '_c_2',
      fields:['ISOWNER'],
      type:"check",
      where:{
        ISOWNER: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Stock_Entity_Relationship_Types.tableName + '_c_3',
      fields:['ISRESERVED'],
      type:"check",
      where:{
        ISRESERVED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Stock_Entity_Relationship_Types.tableName + '_c_4',
      fields:['ISTARGET'],
      type:"check",
      where:{
        ISTARGET: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Stock_Entity_Relationship_Types}