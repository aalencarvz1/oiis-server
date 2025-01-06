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
                            if (limitedsValues.length == QueryBuilder.IN_CLAUSE_ELEMENTS_LIMIT) {
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
}
