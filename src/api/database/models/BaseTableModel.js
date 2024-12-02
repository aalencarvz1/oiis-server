/*imports*/
require('dotenv').config({ path: __dirname + "/../../../../.env" });
const { DataTypes, Model, Op, Sequelize, QueryTypes } = require("sequelize");
const configDB  = require("../config/config");
const { Utils } = require('../../controllers/utils/Utils');
const DBConnectionManager = require('../DBConnectionManager');
const { DatabaseUtils } = require('../../controllers/database/DatabaseUtils');
const { DataSwap } = require('../../controllers/data/DataSwap');

/**
 * class model
 */
class BaseTableModel extends Model { 
    
    static schema = configDB[process.env.NODE_ENV || 'development'].database;  
    static id;
    static tableName = null;
    static model = null;    
    static fields;
    static constraints;
    static foreignsKeys;
    static getConnection = DBConnectionManager.getDefaultDBConnection;
    
    static getBaseTableModelFields = () => {
        return {
            id: {
                type : DataTypes.BIGINT.UNSIGNED,                
                autoIncrement : true,
                primaryKey: true,               
                allowNull: false 
            },
            status_reg_id: {
                type: DataTypes.BIGINT.UNSIGNED,                
                allowNull: false,
                defaultValue:1 
            },
            creator_user_id: {
                type: DataTypes.BIGINT.UNSIGNED,                
                allowNull: false,
                defaultValue:1 
            },
            created_at : {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            updater_user_id: {
                type: DataTypes.BIGINT.UNSIGNED,
            },
            updated_at : {
                type: DataTypes.DATE,
                allowNull: true
            },
            data_origin_id: {
                type: DataTypes.BIGINT.UNSIGNED,                
                allowNull: false,
                defaultValue:1
            },
            id_at_origin: {
                type: DataTypes.STRING(256)
            },
            deleted_at:{
                type: DataTypes.DATE,
                allowNull : true
            },
            is_sys_rec: {
                type: DataTypes.INTEGER(1),
                allowNull: false,
                defaultValue:0
            }
        }; 
    }
    
    static getBaseTableModelConstraints = () => {
        return [
            {
                fields:['is_sys_rec'],
                type:"check",
                where:{
                    is_sys_rec: {
                        [Op.in]: [0,1]
                    }
                }
            }
        ];
    };

    static getBaseTableModelUniqueFields = () => {
        return [
            'status_reg_id',
            'data_origin_id'
        ];
    };   
    
    static baseTableModelForeignsKeys = [{
        fields: ['status_reg_id'],
        type: 'foreign key',
        references: { 
            table: 'Record_Status',
            field: 'id'
        },
        onUpdate: 'cascade'
    },{
        fields: ['creator_user_id'],
        type: 'foreign key',
        references: { 
            table: 'Users',
            field: 'id'
        },
        onUpdate: 'cascade'
    },{
        fields: ['updater_user_id'],
        type: 'foreign key',
        references: { 
            table: 'Users',
            field: 'id'
        },
        onUpdate: 'cascade'
    },{
        fields: ['data_origin_id'],
        type: 'foreign key',
        references: { 
            table: 'Data_Origins',
            field: 'id'
        },
        onUpdate: 'cascade'
    }];

    static getBaseTableModelForeignsKeys (){
        return this.baseTableModelForeignsKeys;
    }

    static getBaseTableModelInitHooks = () => {
        return {
            beforeCreate : (record, options) => {
                record.dataValues.created_at = Sequelize.literal('current_timestamp');//new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');                
            },
            beforeUpdate : (record, options) => {
                record.dataValues.updated_at = Sequelize.literal('current_timestamp');//new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');        
            }
        };
    }

    static getPrimaryKeysFieldsNames() {
        if (!Utils.hasValue(this.primaryKeysFieldsNames)) {
            this.primaryKeysFieldsNames = this.primaryKeysFieldsNames || [];
            for(let k in this.fields) {
                if (this.fields[k].primaryKey) {
                this.primaryKeysFieldsNames.push(k);
                }
            } 
        }
        return this.primaryKeysFieldsNames;
    }

    /**
     * run migrations constraints of inherited model
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async migrateConstraints(queryInterface) {
        if (this.constraints && (this.constraints||[]).length > 0) {
            for(let i in this.constraints) {
                if (typeof this.constraints[i] === 'object') {
                    if (!this.constraints[i].name) {
                        this.constraints[i].name = this.tableName + '_c' + i;
                    }
                    await queryInterface.addConstraint(this.tableName, this.constraints[i]);
                } else {
                    await queryInterface.sequelize.query(this.constraints[i]);
                }
            }
        }
    }

    /**
     * run migrations foreign keys of inherited model
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async migrateForeignKeyContraint(queryInterface, pClassModelRef) {
        for(let i in (this.foreignsKeys || [])) {
            let foreignKey  = {};
            if (typeof this.foreignsKeys[i] === 'object') {
                for(let key in this.foreignsKeys[i]) {
                    if (key.trim().toLowerCase() != 'references') {
                        foreignKey[key] = this.foreignsKeys[i][key];
                    } else {
                        foreignKey[key] = {};
                        if (Utils.hasValue(this.foreignsKeys[i][key].fields)) {
                            foreignKey[key].fields = this.foreignsKeys[i][key].fields;
                        } else {
                            foreignKey[key].field = this.foreignsKeys[i][key].field;
                        }
                        if (typeof this.foreignsKeys[i][key].table == 'string') {
                            foreignKey[key].table = this.foreignsKeys[i][key].table.toLowerCase();
                        } else {
                            foreignKey[key].table = this.foreignsKeys[i][key].table.tableName;
                        }
                    }
                }
                foreignKey.references.table = foreignKey.references.table.split('.');
                foreignKey.references.table = foreignKey.references.table[1] || foreignKey.references.table[0];

                //migrate all foreign keys or only specific model ref parameter
                if (!pClassModelRef || (foreignKey.references.table.trim().toLowerCase() == pClassModelRef.tableName.trim())) {
                    if (!foreignKey.name) {
                        foreignKey.name = this.tableName + '_fk' + i;
                    }
                    await queryInterface.addConstraint(this.tableName, foreignKey);                
                }
            } else {
                await queryInterface.sequelize.query(this.foreignsKeys[i]);  
            }
        }        
    }

    
    /**
     * run migrations of inherited model
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async runUpMigration(queryInterface, options) {
        options = options || {};
        await queryInterface.createTable(this.tableName, this.fields);
        await this.migrateConstraints(queryInterface);    
        await queryInterface.bulkInsert('tables',[{      
            id:this.id,
            created_at: new Date(),
            is_sys_rec : 1,
            data_connection_id : configDB[process.env.NODE_ENV || 'development'].id,
            schema_id : configDB[process.env.NODE_ENV || 'development'].id,
            name : this.tableName
        }],{
            ignoreDuplicates:true,
            updateOnDuplicate:null
        });
        if (Object.keys(options).indexOf('migrateForeignKeyContraint') == -1) options.migrateForeignKeyContraint = true;
        if (options.migrateForeignKeyContraint == true) {
            await this.migrateForeignKeyContraint(queryInterface);              
        }
    }


    /**
     * init associations of inherited model to other model
     * @static (pay attention to bindings)
     * @created 2023-11-10
     */
    static associates() {
        let ignoredForeignsKeys = 0;
        let tableRefClassModel = null;
        try {
            for(let i in (this.foreignsKeys || [])) {

                tableRefClassModel = this.foreignsKeys[i].references.table; //for re-declare if necessary
                if (typeof tableRefClassModel == 'string') {

                    //require.cache is case sensitive, avoid reload cached model
                    let path = require.resolve(`./${tableRefClassModel.toLowerCase().indexOf('pc') === 0 ? 'winthor/':''}${tableRefClassModel}`).toLowerCase();
                    let ind = Object.keys(require.cache).join(',').toLowerCase().split(',').indexOf(path);
                    if (ind > -1) {
                        let keyCache = Object.keys(require.cache)[ind];                        
                        let realKey = Utils.getKey(require.cache[keyCache].exports,tableRefClassModel);
                        if (Utils.hasValue(realKey)) {
                            tableRefClassModel = require.cache[keyCache].exports[realKey];
                        } else {
                            tableRefClassModel = require.cache[keyCache].exports;
                        }
                    } else {
                        let tempp = require(`./${tableRefClassModel.toLowerCase().indexOf('pc') === 0 ? 'winthor/' : ''}${tableRefClassModel}`);
                        let realKey = Utils.getKey(tempp,tableRefClassModel);
                        if (Utils.hasValue(realKey)) {
                            tableRefClassModel = tempp[realKey];
                        } else {
                            tableRefClassModel = tempp;
                        }
                    }
                }    
                let model = null;
                let columnForeign = this.foreignsKeys[i].fields.join(',');
                let belongsToParams  = {
                    foreignKey : columnForeign,
                    targetKey : this.foreignsKeys[i].references.fields?.join(',') || this.foreignsKeys[i].references.field
                };
                let hasManyParams = {
                    sourceKey: this.foreignsKeys[i].references.fields?.join(',') || this.foreignsKeys[i].references.field,
                    foreignKey : columnForeign
                };
                if (tableRefClassModel.tableName.trim() == this.model.tableName.trim().toLowerCase()) {
                    model = this.model;
                } else {
                    model = tableRefClassModel.getModel();
                }                
                if (model) {
                    let hasMany = model.hasMany(this.model,hasManyParams);
                    let belongsTo = this.model.belongsTo(model,belongsToParams);
                }                
            }            
        } catch(e) {
            Utils.logError(e);
            throw e;
        } 
    }

    /**
     * init model inherithed
     * @static (pay attention to bindings)
     * @created 2023-11-10
     */
    static initModel(pSequelize) {
        let model = null;
        try {
            pSequelize = pSequelize || this.getConnection();  
            if (pSequelize) {
                model = this.init(this.fields,{
                    sequelize: pSequelize,
                    underscore:false,
                    freezeTableName:true,
                    modelName:this.tableName,
                    tableName:this.tableName,
                    name:{
                        singular:this.tableName,
                        plural:this.tableName
                    },
                    timestamps:false,
                    hooks: this.getBaseTableModelInitHooks(),
                    noPrimaryKey: Utils.firstValid([this.noPrimaryKey ,false]),
                    removeAttr: Utils.firstValid([this.removeAttr ,'']),
                });
            }
            if (Utils.hasValue(this.removeAttr)) {
                model.removeAttribute(this.removeAttr);
            }            
        } catch (e) {
            Utils.logError(e);
        }
        return model;
    }

    static getModel(pSequelize) {
        if (this.model == null) {
            this.model = this.initModel(pSequelize);
            if (!Utils.hasValue(this.model.associations))
                this.associates();
        }
        return this.model;
    }
      
    static initAssociations() {
        this.associates();
    }

    /**
     * create data of model inherithed of this if not exists
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async createIfNotExists(queryParams, newValues){
        let reg = await this.getModel().findOne(queryParams);
        if(!reg && queryParams.transaction) {
            let transactionTemp = queryParams.transaction;
            queryParams.transaction = undefined;
            delete queryParams.transaction;
            reg = await this.getModel().findOne(queryParams);
            queryParams.transaction = transactionTemp;
        }
        if (!reg) {
            let options  = {};            
            if (queryParams.transaction) options.transaction = queryParams.transaction;        
            let values = newValues || queryParams.where;
            reg = await this.getModel().create(values,options);
        }
        return reg;
    }

    static async getOneByID(id) {
        let result = await this.getData({queryParams:{where:{id:id}}});
        if (result && result.length) {
            result = result[0];
        }
        return result;
    }

    /**
     * create data of model inherithed of this
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async createData(params,returnRaw) {
        let queryParams = params.queryParams?.values || params.values || params.queryParams || params || {};
        let result = await this.getModel().create(queryParams);
        if (typeof this.getData === 'function' && returnRaw !== false && Object.keys(this.fields).indexOf('id') > -1) return await this.getOneByID(result.id) || result
        else return result;
    }
    static putData = this.createData;


    /**
     * get data of model inherithed of this
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async getData(params, req) {
        let queryParams = await DatabaseUtils.prepareQueryParams(params.queryParams || params || {});
        if (queryParams.raw !== false) queryParams.raw = true; 
        if (queryParams.query) {
            let result = await this.getConnection().query(queryParams.query,{raw:queryParams.raw,queryType:QueryTypes.SELECT});
            result = result[0] || [];
            return result;
        } else {
            if ((this.accesLevel || 1) == 2 && Utils.hasValue(params.req || req)) {
                queryParams.where = queryParams.where || {};
                queryParams.creator_user_id = (params.req || req).user?.id
            }
            return await this.getModel().findAll(queryParams);
        }        
    }    


    /**
     * update data of model inherithed of this
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async updateData(params) {
        let reg = null;
        let values = params.values || params.queryParams?.values || params.queryParams || params ;                
        params.where = params.where || params.queryParams?.where || null;
        let primaryKeysFieldsNames = this.getPrimaryKeysFieldsNames();
        if (Utils.hasValue(params.where)) {
            reg = await this.getModel().findOne(params);
        } else if (values.id) { 
            params.where = {id:values.id}
            reg = await this.getModel().findOne({where:params.where,transaction:params.transaction});
        } else {            
            
            if (primaryKeysFieldsNames.length > 0) {
                params.where = {};
                let keys = Object.keys(values).join(',').trim().toLowerCase().split(',');
                let ind = -1;
                for(let k in primaryKeysFieldsNames) {
                    ind = keys.indexOf(primaryKeysFieldsNames[k].trim().toLowerCase());
                    if (ind > -1) {
                        params.where[Object.keys(values)[ind]] = values[Object.keys(values)[ind]];
                    }
                }
                if (Object.keys(params.where).length > 0) {
                    reg = await this.getModel().findOne({where:params.where,transaction:params.transaction});
                } else {
                    throw new Error('missing data (primary key)');    
                }
            } else {
                throw new Error('missing data (primary key)');
            }
        }
        let hasPrimaryKeyOnUpdate = false;
        let valuesToUpdate = {};
        if (reg) {
            for(let key in values) {
                if (key != 'id' && key != 'where') {
                    if (reg[key] != values[key]) {
                        reg[key] = values[key];
                        valuesToUpdate[key] = values[key];
                        
                        /*sequelize nao atualiza estes campos se forem chaves primarias, 
                        verificar apos o save se houve alteracao de campos chaves primarias e fazer update via query e nao via 
                        save nestes casos

                        testar dica do chatgpt sequelize.queryGenerator.updateQuery, que gera a query sem executala*/

                        if (Utils.hasValue(primaryKeysFieldsNames) && !hasPrimaryKeyOnUpdate) {
                            for(let ks in primaryKeysFieldsNames) {
                                if (primaryKeysFieldsNames[ks].trim().toLowerCase() == key.trim().toLowerCase()) {
                                    if (reg[key] != values[key]) {
                                        hasPrimaryKeyOnUpdate = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (hasPrimaryKeyOnUpdate) {
                const updateSQL = this.getModel().queryGenerator.updateQuery(
                    this.getTableName(),
                    valuesToUpdate,
                    params.where,
                    this.getModel()
                );
                console.log(updateSQL);
                let resultUpdate = await this.getConnection().query(updateSQL,{queryType:QueryTypes.UPDATE,transaction:params.transaction});                
                if (Utils.hasValue(resultUpdate) && resultUpdate[0]?.rowsAffected >= 1) {
                    if (typeof this.getData === 'function' && Object.keys(this.fields).indexOf('id') > -1) return await this.getOneByID(reg.id) || reg.dataValues
                    else return values;
                } else {
                    throw new Error(`error on update data with query: ${updateSQL}`);
                }
            } else {
                if (params.transaction) { 
                    await reg.save({transaction:params.transaction});
                } else {
                    await reg.save();
                }
            }
            if (typeof this.getData === 'function' && Object.keys(this.fields).indexOf('id') > -1) return await this.getOneByID(reg.id) || reg.dataValues
            else return reg.dataValues;
        } else {
            throw new Error('no data found');
        }
    }
    static patchData = this.updateData;


    /**
     * delete data of model inherithed of this
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     * @version 1.1.0
     */
    static async deleteData(params){
        let queryParams = await DatabaseUtils.prepareQueryParams(params.queryParams || params || {});
        if (Utils.hasValue(queryParams.where) || Utils.hasValue(queryParams.id) || Utils.hasValue(queryParams.identifiers)) {
            let where = {};
            if (Utils.hasValue(queryParams.where)) {
                where = queryParams.where;
            } else if (Utils.hasValue(queryParams.id)) {
                where = {
                    id: {
                        [Op.in]: Utils.toArray(queryParams.id)
                    } 
                }
            } else if (Utils.hasValue(queryParams.identifiers)) {
                where = {
                    id: {
                        [Op.in]: Utils.toArray(queryParams.identifiers)
                    } 
                }
            }
            let regs = await this.getModel().findAll({
                where:where
            });
            if (regs && regs.length) {
                await this.getModel().destroy({
                    where:where
                });
                return true;
            } else {
                throw new Error('no data found');
            }
        } else {
            throw new Error('missing data');
        }
    }

    static async getOrCreate(params) {
        let result = new DataSwap();
        try {
            let queryParams = params.queryParams || params || {};
            queryParams.raw = queryParams.raw !== false ? true : queryParams.raw;
            queryParams.limit = queryParams.limit || 1;
            queryParams.transaction = queryParams.transaction || params.transaction;
            result.data = await this.getModel().findOne(queryParams);
            if (!result.data) {
                if (params.createMethod)  {
                    let paramsToCreateMethod = {...queryParams.where,...(queryParams.values||{})};
                    if (params.transaction) {
                        paramsToCreateMethod.transaction = params.transaction;
                    } 
                    result = await params.createMethod.bind(this)(paramsToCreateMethod);
                } else {
                    result.data = await this.getModel().create({...queryParams.where,...(queryParams.values||{})},{transaction:params.transaction});
                    if (result.data) {
                        if (queryParams.raw)
                            result.data = result.data.dataValues;
                        result.success = true;
                    } else throw new Error(`error on create register with ${JSON.parse({...queryParams.where,...(queryParams.values||{})})}`);
                }
            } else {
                result.success = true;
            }
        } catch (e) {
            Utils.logError(e);
            result.setException(e);
        }
        return result;
    }

    static async saveOrCreate(params) {
        let result = new DataSwap();
        try {
            let queryParams = params.queryParams || params || {};
            result.data = await this.getModel().findOne(queryParams);
            if (!result.data) {
                if (params.createMethod) 
                    result = await params.createMethod.bind(this)({...queryParams.where,...(queryParams.values||{})},params);
                else {
                    result.data = await this.getModel().create({...queryParams.where,...(queryParams.values||{})},params.transaction ? {transaction: params.transaction} : {});
                    if (result.data) {
                        result.success = true;
                    } else throw new Error(`error on create register with ${JSON.parse({...queryParams.where,...(queryParams.values||{})})}`);
                }
            } else {
                await this.updateData({
                    values:{...result.data.dataValues,...(queryParams.values||{})},
                    where:queryParams.where,
                    transaction: params.transaction
                });
                result.success = true;
            }
        } catch (e) {
          result.setException(e);
        }
        return result;
    }

    static getQueryFields(){
        return Object.keys(this.fields).map(el=>Sequelize.col(el));
    }

};

module.exports = {BaseTableModel}
