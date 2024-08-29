'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { CollaboratorsFunctions } = require("./CollaboratorsFunctions");
const { CollaboratorsContracts } = require("./CollaboratorsContracts");


/**
 * class model
 */
class CollaboratorsXFunctions extends BaseTableModel {
  static ID = 6003;
  static model = null;
  static fields = {
    ...CollaboratorsXFunctions.getBaseTableModelFields(),...{           
      IDCONTRACT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDFUNCTION:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      STARTDATE:{
        type: DataTypes.DATE,
      },
      ENDDATE:{
        type: DataTypes.DATE,
      },     
      ISTIMECONTROLLED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },      
      OBSERVATIONS:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'IDCONTRACT',
    'IDFUNCTION',
    Sequelize.literal(`(COALESCE(STARTDATE,'1900-01-01'))`)
  ];

  static constraints = [...(CollaboratorsXFunctions.getBaseTableModelConstraints() || []),...[
    {
      name: CollaboratorsXFunctions.name.toUpperCase() + '_U1',
      fields: [...CollaboratorsXFunctions.getBaseTableModelUniqueFields(),...CollaboratorsXFunctions.uniqueFields],
      type:"unique"
    },{
      name: CollaboratorsXFunctions.name.toUpperCase() + '_C_1',
      fields:['ISTIMECONTROLLED'],
      type:"check",
      where:{
        ISTIMECONTROLLED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDCONTRACT'],
      type: 'foreign key',
      references: { 
          table: CollaboratorsContracts,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDFUNCTION'],
      type: 'foreign key',
      references: { 
          table: CollaboratorsFunctions,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {CollaboratorsXFunctions}