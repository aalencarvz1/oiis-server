import { Op } from "sequelize";
import Utils from "../utils/Utils.js";


export default class QueryBuilder {

    static IN_CLAUSE_ELEMENTS_LIMIT = 1000;

    static mountInClause(field?:string,values?: any) : string | null {
        let result : any = null;
        try {
            if (Utils.hasValue(field) && Utils.hasValue(values)) {
                if (Utils.typeOf(values) != 'array') {
                    result = `${field} in (${values})`;
                } else {
                    if (values.length > QueryBuilder.IN_CLAUSE_ELEMENTS_LIMIT) {
                        result = [];
                        let limitedsValues = [];
                        for(let i = 0; i < values.length; i++) {
                            limitedsValues.push(Utils.hasValue(values[i])?values[i]:'null');
                            if (limitedsValues.length === QueryBuilder.IN_CLAUSE_ELEMENTS_LIMIT) {
                                result.push(`${field} in (${limitedsValues.join(',')})`);
                                limitedsValues = [];
                            }
                        }
                        result = `(${result.join(' or ')})`;
                    } else {
                        values = values.map((el: any)=>Utils.hasValue(el)?el:'null');
                        result = `${field} in (${values.join(',')})`;
                    }
                }
            }
        } catch (e) {
            Utils.logError(e);
        }
        return result;
    }

    static mountSequelizeInClause(field?:string,values?: any) : string | null {
        let result : any = null;
        try {
            if (Utils.hasValue(field) && Utils.hasValue(values)) {
                if (Utils.typeOf(values) != 'array') {
                    result = {
                        [field]: values
                    }
                } else {
                    if (values.length > QueryBuilder.IN_CLAUSE_ELEMENTS_LIMIT) {
                        result = [];
                        let limitedsValues = [];
                        for(let i = 0; i < values.length; i++) {
                            limitedsValues.push(Utils.hasValue(values[i])?values[i]:'null');
                            if (limitedsValues.length === QueryBuilder.IN_CLAUSE_ELEMENTS_LIMIT) {
                                result.push({
                                    [field]: {
                                        [Op.in]: limitedsValues
                                    }
                                });
                                limitedsValues = [];
                            }
                        }
                        result = {
                            [Op.or]: result
                        }
                    } else {
                        values = values.map((el: any)=>Utils.hasValue(el)?el:'null');
                        result = {
                            [field]: {
                                [Op.in]: values
                            }
                        }
                    }
                }
            }
        } catch (e) {
            Utils.logError(e);
        }
        return result;
    }

    static getSequelizeOperator(operator: string) : any {
        let result = Op.eq;
        switch (operator) {
            case 'ne':
            case '!=':
            case '<>':
                result = Op.ne;
            break;
            case 'gt':
            case '>':
                result = Op.gt;
            break;
            case 'gte':
            case '>=':
                result = Op.gte;
            break;
            case 'lt':
            case '<':
                result = Op.lt;
            break;
            case 'lte':
            case '<=':
                result = Op.lte;
            break;
            case 'like':
                result = Op.like;
            break;
        }
        return result;
    }
}
