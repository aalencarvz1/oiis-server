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
console.log('BaseTableModel - antes declaracao classe, antes exportacao');
class BaseTableModel extends Model { 
    
    static schema = configDB[process.env.NODE_ENV || 'development'].database;  
    static ID;
    static model = null;
    static fields;
    static constraints;
    static foreignsKeys;
    static getConnection = DBConnectionManager.getDefaultDBConnection;

    
    static getBaseTableModelFields = () => {
        return {
            ID: {
                type : DataTypes.BIGINT.UNSIGNED,                
                autoIncrement : true,
                primaryKey: true,               
                allowNull: false 
            },
            IDSTATUSREG: {
                type: DataTypes.BIGINT.UNSIGNED,                
                allowNull: false,
                defaultValue:1 
            },
            IDUSERCREATE: {
                type: DataTypes.BIGINT.UNSIGNED,                
                allowNull: false,
                defaultValue:1 
            },
            CREATEDAT : {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            IDUSERUPDATE: {
                type: DataTypes.BIGINT.UNSIGNED,
            },
            UPDATEDAT : {
                type: DataTypes.DATE,
                allowNull: true
            },
            IDORIGINDATA: {
                type: DataTypes.BIGINT.UNSIGNED,                
                allowNull: false,
                defaultValue:1
            },
            IDONORIGINDATA: {
                type: DataTypes.STRING(256)
            },
            DELETEDAT:{
                type: DataTypes.DATE,
                allowNull : true
            },
            ISSYSTEMREG: {
                type: DataTypes.INTEGER(1),
                allowNull: false,
                defaultValue:0
            }
        }; 
    }
    
    static getBaseTableModelConstraints = () => {
        return [
            {
                fields:['ISSYSTEMREG'],
                type:"check",
                where:{
                    ISSYSTEMREG: {
                        [Op.in]: [0,1]
                    }
                }
            }
        ];
    };

    static getBaseTableModelUniqueFields = () => {
        return [
            'IDSTATUSREG',
            'IDORIGINDATA'
        ];
    };   
    
    static baseTableModelForeignsKeys = [{
        fields: ['IDSTATUSREG'],
        type: 'foreign key',
        references: { 
            table: 'StatusRegs',
            field: 'ID'
        },
        onUpdate: 'cascade'
    },{
        fields: ['IDUSERCREATE'],
        type: 'foreign key',
        references: { 
            table: 'Users',
            field: 'ID'
        },
        onUpdate: 'cascade'
    },{
        fields: ['IDUSERUPDATE'],
        type: 'foreign key',
        references: { 
            table: 'Users',
            field: 'ID'
        },
        onUpdate: 'cascade'
    },{
        fields: ['IDORIGINDATA'],
        type: 'foreign key',
        references: { 
            table: 'OriginsDatas',
            field: 'ID'
        },
        onUpdate: 'cascade'
    }];

    static getBaseTableModelForeignsKeys (){
        return this.baseTableModelForeignsKeys;
    }

    static getBaseTableModelInitHooks = () => {
        return {
            beforeCreate : (record, options) => {
                record.dataValues.CREATEDAT = Sequelize.literal('current_timestamp');//new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');                
            },
            beforeUpdate : (record, options) => {
                record.dataValues.UPDATEDAT = Sequelize.literal('current_timestamp');//new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');        
            }
        };
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
                        this.constraints[i].name = this.name.toUpperCase() + '_C' + i;
                    }
                    Utils.log(' add constraint',this.name.toUpperCase(), this.constraints[i]);
                    await queryInterface.addConstraint(this.name.toUpperCase(), this.constraints[i]);
                } else {
                    Utils.log(' add constraint',this.name.toUpperCase(), this.constraints[i]);
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
                            foreignKey[key].table = this.foreignsKeys[i][key].table.toUpperCase();
                        } else {
                            foreignKey[key].table = this.foreignsKeys[i][key].table.name.toUpperCase();
                        }
                    }
                }
                foreignKey.references.table = foreignKey.references.table.split('.');
                foreignKey.references.table = foreignKey.references.table[1] || foreignKey.references.table[0];

                //migrate all foreign keys or only specific model ref parameter
                if (!pClassModelRef || (foreignKey.references.table.trim().toUpperCase() == pClassModelRef.name.toUpperCase().trim())) {
                    if (!foreignKey.name) {
                        foreignKey.name = this.name.toUpperCase() + '_FK' + i;
                    }
                    Utils.log(' add constraint',this.name.toUpperCase(), foreignKey);
                    await queryInterface.addConstraint(this.name.toUpperCase(), foreignKey);                
                }
            } else {
                Utils.log(' add constraint',this.name.toUpperCase(), this.foreignsKeys[i]);
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
        Utils.log('creating table',this.name.toUpperCase(), Object.keys(this.fields));
        await queryInterface.createTable(this.name.toUpperCase(), this.fields);
        await this.migrateConstraints(queryInterface);    
        await queryInterface.bulkInsert('DATATABLES',[{      
            ID:this.ID,
            CREATEDAT: new Date(),
            ISSYSTEMREG : 1,
            IDDATACONNECTION : configDB[process.env.NODE_ENV || 'development'].ID,
            IDSCHEMA : configDB[process.env.NODE_ENV || 'development'].ID,
            NAME : this.name.toUpperCase()
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
                //if (this.name.toUpperCase().indexOf('PC') === 0)
                    //Utils.log(' associating',this.name.toUpperCase(),i,this.foreignsKeys[i]);

                tableRefClassModel = this.foreignsKeys[i].references.table; //for re-declare if necessary
                if (typeof tableRefClassModel == 'string') {

                    //require.cache is case sensitive, avoid reload cached model
                    let path = require.resolve(`./${tableRefClassModel.toUpperCase().indexOf('PC') === 0 ? 'winthor/':''}${tableRefClassModel}`).toLowerCase();
                    let ind = Object.keys(require.cache).join(',').toLowerCase().split(',').indexOf(path);
                    Utils.log('loading module dinamic',path,ind);
                    if (ind > -1) {
                        let keyCache = Object.keys(require.cache)[ind];                        
                        let realKey = Utils.getKey(require.cache[keyCache].exports,tableRefClassModel);
                        console.log('keys',require.cache[keyCache].exports,tableRefClassModel, realKey);
                        if (Utils.hasValue(realKey)) {
                            tableRefClassModel = require.cache[keyCache].exports[realKey];
                        } else {
                            tableRefClassModel = require.cache[keyCache].exports;
                        }
                    } else {
                        let tempp = require(`./${tableRefClassModel.toUpperCase().indexOf('PC') === 0 ? 'winthor/' : ''}${tableRefClassModel}`);
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
                    targetKey : this.foreignsKeys[i].references.fields?.join(',') || this.foreignsKeys[i].references.field,
                };
                let hasManyParams = {
                    sourceKey: this.foreignsKeys[i].references.fields?.join(',') || this.foreignsKeys[i].references.field,
                    foreignKey : columnForeign
                };
                if (tableRefClassModel.name.toUpperCase().trim() == this.model.tableName.trim().toUpperCase()) {
                    model = this.model;
                } else {
                    model = tableRefClassModel.getModel();
                }                
                //belongsToParams.targetKey = this.foreignsKeys[i].references.field;
                //if (this.model.tableName.toUpperCase().indexOf('PC') === 0) {
                    //Utils.log(model.tableName,'hasMany',this.model,hasManyParams);
                    //Utils.log(this.model.tableName,'belongsTo',model,belongsToParams);
                //}
                if (model) {
                    Utils.log(`associating ${model.name} hasMany ${this.model.name} ${JSON.stringify(hasManyParams)} ${model && model.prototype} ${model && model.prototype && model.prototype instanceof Model} ${this.model && this.model.prototype} ${this.model && this.model.prototype && this.model.prototype instanceof Model}`);
                    Utils.log(`associating ${this.model.name} belongs to ${model.name} ${JSON.stringify(belongsToParams)} ${this.model && this.model.prototype} ${this.model && this.model.prototype && this.model.prototype instanceof Model} ${model && model.prototype} ${model && model.prototype && model.prototype instanceof Model}`);
                    let hasMany = model.hasMany(this.model,hasManyParams);
                    let belongsTo = this.model.belongsTo(model,belongsToParams);
                    //console.log('belongsTo',belongsTo);
                    
                    //console.log('hasMany',hasMany);
                }                
            }            
        } catch(e) {
            //Utils.log(' error ',e);
            Utils.log('tableRefClassModel on error',tableRefClassModel, this.model);
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
                    modelName:this.name.toUpperCase(),
                    tableName:this.name.toUpperCase(),
                    name:{
                        singular:this.name.toUpperCase(),
                        plural:this.name.toUpperCase()
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
            Utils.log(e);
        }
        return model;
    }

    static getModel(pSequelize) {
        if (this.model == null) {
            /*globalThis.tableModels = globalThis.tableModels || {};
            let tableModelGlobalKey = `${this.schema||'default'}.${this.name}`;
            tableModelGlobalKey = tableModelGlobalKey.trim().toLowerCase();
            //console.log('getModel has globals',tableModelGlobalKey,!Utils.hasValue(globalThis.tableModels[tableModelGlobalKey]));
            if (!Utils.hasValue(globalThis.tableModels[tableModelGlobalKey])) {
                globalThis.tableModels[tableModelGlobalKey] = this.initModel(pSequelize);
                //console.log('getModel initied by globals',tableModelGlobalKey,globalThis.tableModels[tableModelGlobalKey]);
            }
            this.model = globalThis.tableModels[tableModelGlobalKey];
            //console.log('model in getModel',tableModelGlobalKey,this.model);
            //console.log('keys of global',Object.keys(globalThis.tableModels));*/
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
        let result = await this.getData({queryParams:{where:{ID:id}}});
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
        let queryParams = params.queryParams?.values || params.queryParams || params || {};
        let result = await this.getModel().create(queryParams);
        if (typeof this.getData === 'function' && returnRaw !== false && Object.keys(this.fields).indexOf('ID') > -1) return await this.getOneByID(result.ID) || result
        else return result;
    }
    static putData = this.createData;


    /**
     * get data of model inherithed of this
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async getData(params) {
        let queryParams = DatabaseUtils.prepareQueryParams(params.queryParams || params || {});
        if (queryParams.raw !== false) queryParams.raw = true; 
        if (queryParams.query) {
            let result = await this.getConnection().query(queryParams.query,{raw:queryParams.raw,queryType:QueryTypes.SELECT});
            result = result[0] || [];
            return result;
        } else {
            return await this.getModel().findAll(queryParams);
        }        
    }    


    /**
     * update data of model inherithed of this
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async updateData(params,whereClause) {
        let queryParams = params.queryParams || params || {};
        let reg = null;
        whereClause = whereClause || queryParams.where;
        if (whereClause) {
            reg = await this.getModel().findOne({where:whereClause});
        } else if (queryParams.ID) { 
            reg = await this.getModel().findOne({where:{ID:queryParams.ID}});
        } else {
            let primaryKeys = [];
            for(let k in this.fields) {
                if (this.fields[k].primaryKey) {
                    primaryKeys.push(k);
                }
            } 
            if (primaryKeys.length > 0) {
                let where = {};
                let keys = Object.keys(queryParams).join(',').trim().toUpperCase().split(',');
                let ind = -1;
                //Utils.log(primaryKeys,keys);
                for(let k in primaryKeys) {
                    ind =keys.indexOf(k.trim().toUpperCase());
                    if (ind > -1) {
                        where[Object.keys(queryParams)[ind]] = queryParams[Object.keys(queryParams)[ind]];
                    }
                }
                //Utils.log(where);
                if (Object.keys(where).length > 0) {
                    reg = await this.getModel().findOne({where:where});
                } else {
                    throw new Error('missing data (primary key)');    
                }
            } else {
                throw new Error('missing data (primary key)');
            }
        }
        if (reg) {
            let values = queryParams.values || queryParams;
            for(let key in values) {
                if (key != 'ID') {
                    reg[key] = values[key];
                }
            }
            //Utils.log(reg);
            await reg.save();
            if (typeof this.getData === 'function' && Object.keys(this.fields).indexOf('ID') > -1) return await this.getOneByID(reg.ID) || reg.dataValues
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
        let queryParams = DatabaseUtils.prepareQueryParams(params.queryParams || params || {});
        if (Utils.hasValue(queryParams.where) || Utils.hasValue(queryParams.ID) || Utils.hasValue(queryParams.identifiers)) {
            let where = {};
            if (Utils.hasValue(queryParams.where)) {
                where = queryParams.where;
            } else if (Utils.hasValue(queryParams.ID)) {
                where = {
                    ID: {
                        [Op.in]: Utils.toArray(queryParams.ID)
                    } 
                }
            } else if (Utils.hasValue(queryParams.identifiers)) {
                where = {
                    ID: {
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
            result.data = await this.getModel().findOne(queryParams);
            if (!result.data) {
                if (params.createMethod) 
                    result = await params.createMethod.bind(this)({...queryParams.where,...(queryParams.values||{})});
                else {
                    result.data = await this.getModel().create({...queryParams.where,...(queryParams.values||{})});
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
            Utils.log(e);
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
                    result = await params.createMethod.bind(this)({...queryParams.where,...(queryParams.values||{})});
                else {
                    result.data = await this.getModel().create({...queryParams.where,...(queryParams.values||{})});
                    if (result.data) {
                        result.success = true;
                    } else throw new Error(`error on create register with ${JSON.parse({...queryParams.where,...(queryParams.values||{})})}`);
                }
            } else {
                await this.updateData({...result.data.dataValues,...(queryParams.values||{})},queryParams.where)
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

console.log('BaseTableModel - apos declaracao classe, antes exportacao');

module.exports = {BaseTableModel}

console.log('BaseTableModel - apos declaracao classe, apos exportacao');