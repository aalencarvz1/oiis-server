'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Collaborator_Functions extends BaseTableModel {
  static id = 6001;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Collaborator_Functions.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      is_trust: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_time_controlled: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Collaborator_Functions.getBaseTableModelConstraints() || []),...[
    {
      name: Collaborator_Functions.tableName + '_u1',
      fields: [...Collaborator_Functions.getBaseTableModelUniqueFields(),...Collaborator_Functions.uniqueFields],
      type:"unique"
    },{
      name: Collaborator_Functions.tableName + '_c_1',
      fields:['is_trust'],
      type:"check",
      where:{
        is_trust: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Collaborator_Functions.tableName + '_c_2',
      fields:['is_time_controlled'],
      type:"check",
      where:{
        is_time_controlled: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Collaborator_Functions}