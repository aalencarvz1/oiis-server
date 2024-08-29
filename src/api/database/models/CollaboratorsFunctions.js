'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class CollaboratorsFunctions extends BaseTableModel {
  static ID = 6001;
  static model = null;
  static fields = {
    ...CollaboratorsFunctions.getBaseTableModelFields(),...{           
      NAME:{
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
    'NAME'
  ];

  static constraints = [...(CollaboratorsFunctions.getBaseTableModelConstraints() || []),...[
    {
      name: CollaboratorsFunctions.name.toUpperCase() + '_U1',
      fields: [...CollaboratorsFunctions.getBaseTableModelUniqueFields(),...CollaboratorsFunctions.uniqueFields],
      type:"unique"
    },{
      name: CollaboratorsFunctions.name.toUpperCase() + '_C_1',
      fields:['ISTRUST'],
      type:"check",
      where:{
        ISTRUST: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: CollaboratorsFunctions.name.toUpperCase() + '_C_2',
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


module.exports = {CollaboratorsFunctions}