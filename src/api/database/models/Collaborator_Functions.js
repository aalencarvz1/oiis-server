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
      ISTRUST: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISTIMECONTROLLED: {
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
      fields:['ISTRUST'],
      type:"check",
      where:{
        ISTRUST: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Collaborator_Functions.tableName + '_c_2',
      fields:['ISTIMECONTROLLED'],
      type:"check",
      where:{
        ISTIMECONTROLLED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Collaborator_Functions}