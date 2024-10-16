const { Sequelize } = require("sequelize");
const { Utils } = require("../utils/Utils");

class DatabaseUtils {
    static customOrder(column, values, direction) {
        let orderByClause = 'CASE ';
      
        for (let index = 0; index < values.length; index++) {
          let value = values[index];
      
          if (typeof value === 'string') value = `'${value}'`;
      
          orderByClause += `WHEN ${column} = ${value} THEN '${index}' `;
        }
      
        orderByClause += `ELSE ${column} END`
      
        return [Sequelize.literal(orderByClause), direction]
    };

    static prepareLogicalQueryParams(queryParamsProp) {
        let result = queryParamsProp;
        let opKeysLower = Object.keys(Sequelize.Op).map(el=>el.toLowerCase().trim()); 
        let opKeys = Object.keys(Sequelize.Op); 
        let realInd = -1;
        if (Utils.typeOf(queryParamsProp) === 'object') {
            if (queryParamsProp == null) {
                result = null;
            } else {
                //result = {}; //symbol keys not iteratable by for key in 
                for(let key in queryParamsProp) {                
                    realInd = opKeysLower.indexOf(key.replace(/[\s_]/g,'').toLowerCase().trim());
                    if (realInd > 0)  {
                        result[Sequelize.Op[opKeys[realInd]]] = DatabaseUtils.prepareLogicalQueryParams(queryParamsProp[key]);
                        delete result[key]; //replaced by simbol key
                    } else {
                        result[key] = DatabaseUtils.prepareLogicalQueryParams(queryParamsProp[key]);  
                    }
                }
            }
        } else if (Utils.typeOf(queryParamsProp) === 'array') {
            for(let key in queryParamsProp) {                                
                result[key] = DatabaseUtils.prepareLogicalQueryParams(queryParamsProp[key]);  
            }
        } else if (typeof queryParamsProp === 'string' && (queryParamsProp.indexOf(' ') > -1  || queryParamsProp.indexOf('(') > -1)) {
            if (queryParamsProp.indexOf('%') === 0) queryParamsProp = `'${queryParamsProp}'`; //like %%
            result = Sequelize.literal(queryParamsProp);
        }
        return result;
    }

    static prepareQueryParams(queryParams) {
        queryParams = queryParams || {};      
        if (queryParams.where) {
            queryParams.where = DatabaseUtils.prepareLogicalQueryParams(queryParams.where || {});
        }
        for(let key in queryParams?.attributes || []) {
            if (typeof queryParams.attributes[key] === 'string') {
                if (queryParams.attributes[key].trim().indexOf(' ') > -1
                    || queryParams.attributes[key].trim().indexOf('(') > -1
                ) {
                    queryParams.attributes[key] = Sequelize.literal(queryParams.attributes[key]);
                }
            }
        }        
        for(let key in queryParams?.order || []) {            
            if (queryParams.order[key][0]?.toString().trim().indexOf(' ') > -1
                || queryParams.order[key][0]?.toString().trim().indexOf('(') > -1
                || (!isNaN(queryParams.order[key][0]) && Number.isInteger(queryParams.order[key][0]-0))
            ) {
                queryParams.order[key][0] = Sequelize.literal(queryParams.order[key][0]);
            }
        }
        return queryParams;
    }

    static getSequelizeOperation(name) {
        let result = name;
        if (typeof result == 'string') {
            name = name || '';
            name = name.trim().toLowerCase();
            if (name == 'not in' || name == 'notin') {
                name = 'notIn';
            }
            if (name == 'not like' || name == 'notlike') {
                name = 'notLike';
            }
            result = Sequelize.Op[name] || name;
        }
        return result;
    }


    static mountCondition(whereClause,field,values,compare,valuesFunc) {
        if (values && values != null) {
            if (Utils.typeOf(values) == 'array') {
                if (values.length > 0) {
                    let inValues = [];
                    compare = compare || Sequelize.Op.in;
                    for(let i = 0; i < values.length; i++) {
                        inValues.push(valuesFunc ? Sequelize.fn(valuesFunc,values[i].id || values[i].id || values[i].name || values[i].name || values[i].label || values[i]) : values[i].id || values[i].id || values[i].name || values[i].name || values[i].label || values[i]);
                    }
                    if (typeof field != 'string') {
                        whereClause[Sequelize.Op.and] = whereClause[Sequelize.Op.and] || [];
                        if ((compare == Sequelize.Op.in || (typeof compare == 'string' && compare.trim().toLowerCase() == 'in'))
                            || (compare == Sequelize.Op.notIn || (typeof compare == 'string' && compare.trim().toLowerCase() == 'not in'))
                        ) {
                            whereClause[Sequelize.Op.and].push(Sequelize.where(field,compare,inValues));
                        } else {
                            if (compare == Sequelize.Op.notLike || (typeof compare == 'string' && compare.trim().toLowerCase() == 'not like')) {
                                inValues.map(el=>{
                                    whereClause[Sequelize.Op.and].push({
                                        [Sequelize.Op.notLike]: el
                                    });
                                })                                
                            } else if (compare == Sequelize.Op.like || (typeof compare == 'string' && compare.trim().toLowerCase() == 'like')) {
                                whereClause[Sequelize.Op.and].push({
                                    [Sequelize.Op.or]: inValues.map(el=>{
                                        let res = null;
                                        if (typeof field == 'string') {
                                            res = {
                                                [field]:{
                                                    [Sequelize.Op.like] : el        
                                                }
                                            }
                                        } else {
                                            res = Sequelize.where(field,Sequelize.Op.like,el);
                                        }
                                        return res;
                                    })                                    
                                });
                            } else {
                                whereClause[Sequelize.Op.and].push(Sequelize.where(field,compare,inValues));
                            }
                        }
                    } else {
                        whereClause[field] = {
                            [DatabaseUtils.getSequelizeOperation(compare)] : inValues
                        }
                    }
                }
            } else {
                if (compare) {
                    if (typeof field != 'string') {
                        whereClause[Sequelize.Op.and] = whereClause[Sequelize.Op.and] || [];
                        whereClause[Sequelize.Op.and].push(Sequelize.where(field,DatabaseUtils.getSequelizeOperation(compare), valuesFunc ? Sequelize.fn(valuesFunc,values.id || values.id || values.name || values.name || values.label || values) : values.id || values.id || values.name || values.name || values.label || values));
                    } else {
                        whereClause[field] = {
                            [DatabaseUtils.getSequelizeOperation(compare)] : valuesFunc ? Sequelize.fn(valuesFunc,values.id || values.id || values.name || values.name || values.label || values) : values.id || values.id || values.name || values.name || values.label || values
                        }
                    }
                } else {
                    if (typeof field != 'string') {
                        whereClause[Sequelize.Op.and] = whereClause[Sequelize.Op.and] || [];
                        whereClause[Sequelize.Op.and].push(Sequelize.where(field,valuesFunc ? Sequelize.fn(valuesFunc,values.id || values.id || values.name || values.name || values.label || values) : values.id || values.id || values.name || values.name || values.label || values));
                    } else {
                        whereClause[field] = valuesFunc ? Sequelize.fn(valuesFunc,values.id || values.id || values.name || values.name || values.label || values) : values.id || values.id || values.name || values.name || values.label || values;
                    }
                }
            }
        }
    }

    static whereToString(where,tableClassModel,delimiter) {
        let result = null;
        //console.log('whereToString where',where);
        if (Utils.hasValue(where)) {
            if (Utils.typeOf(where) == 'array') {
                let wheres = [];
                for(let i = 0; i < where.length; i++) {
                    wheres.push(this.whereToString(where[i],tableClassModel,delimiter));
                }
                result = wheres.join(delimiter || ' and ');
            } else if (Utils.typeOf(where) == 'object') {
                let fieldsNames = Object.keys(tableClassModel?.fields||{});
                fieldsNames = fieldsNames.map(el=>el.trim().toLowerCase());
                let wheres = [];
                for(let key in where) {
                    if (fieldsNames.indexOf(key.trim().toLowerCase()) > -1) {
                        let fieldWhere = key;
                        if (tableClassModel && fieldWhere.indexOf('.') == -1 && fieldWhere.indexOf(' ') == -1 && fieldWhere.indexOf('(') == -1) {
                            fieldWhere = `${tableClassModel.name}.${fieldWhere}`;
                        }
                        if (Utils.typeOf(where[key]) == 'object') {
                            let keys = Object.keys(where[key]);
                            //console.log('keys where ',key,keys);
                            if (keys.length > 1) throw new Error(`where clause field ${key} has more than 1 object key`);
                            let fieldKey = keys[0].trim().toLowerCase();
                            if (fieldKey == 'in' || fieldKey == 'not in') {
                                wheres.push(`${fieldWhere} ${fieldKey} (${where[key][keys[0]].join(',')})`);
                            } else /*if (fieldKey == 'like' || fieldKey == 'not like')*/ {
                                wheres.push(`${fieldWhere} ${fieldKey} ${where[key][keys[0]]}`);
                            }
                        } else {
                            wheres.push(`${fieldWhere}=${where[key]}`)
                        }
                    } else {
                        switch(key.trim().toLowerCase()) {
                            case 'and':
                            case 'or':
                                wheres.push(`(${this.whereToString(where[key],tableClassModel,` ${key} `)})`);
                                break;
                        }
                    }
                }
                result = wheres.join(delimiter || ' and ');
            } else {
                result = where;
            }
        }
        //console.log('whereToString result',result);
        return result;
    }

}

module.exports = { DatabaseUtils }