const fs = require('node:fs');
const {parse, stringify, toJSON, fromJSON} = require('flatted');


class Utils {    

    static #logFile = fs.createWriteStream(__dirname + '/../../log.log', {flags : 'a'});

    static getMomento(){
        let momento = new Date();
        momento=momento.getDate().toString().padStart(2,'0')+'/'+((momento.getMonth()+1).toString().padStart(2,'0'))+'/'+momento.getFullYear()+' '+momento.getHours()+':'+momento.getMinutes()+':'+momento.getSeconds()+'.'+momento.getMilliseconds();
        return momento;
    };

    static logi(p_nome_classe,p_nome_funcao){
        try {
            if (typeof p_nome_funcao !== "undefined") {
                Utils.log('Inicio ',p_nome_classe + "." + p_nome_funcao);
            } else {
                Utils.log('Inicio ',p_nome_classe);
            }
        }catch(e){
            Utils.log(e);					  
            alert(e.message || e);									
        }
    };

    static logf(p_nome_classe,p_nome_funcao){		
        try {
            if (typeof p_nome_funcao !== "undefined") {
                Utils.log('Fim ',p_nome_classe + "." + p_nome_funcao);
            } else {
                Utils.log('Fim ',p_nome_classe);
            }
        }catch(e){
            Utils.log(e);					  
            alert(e.message || e);								
        }
    };

    

    static typeOf(value) {
        let r = typeof value;
        if (typeof NodeList != 'undefined') {
            if (Array.isArray(value) || value instanceof NodeList || value instanceof Array) {
                r = "array";
            }
        } else {
            if (Array.isArray(value) || value instanceof Array) {
                r = "array";
            }
        }
        return r;
    }

    static isArray(obj){
        return Utils.typeOf(obj) == "array";
    }

    

    static hasValue(pValue){
        let result = false;
        let tpof = Utils.typeOf(pValue);
        if (tpof !== "undefined" && pValue != null) {
            if (tpof == "object") {
                if (Object.keys(pValue).length > 0
                    || Object.getOwnPropertySymbols(pValue).length > 0
                    || ['DATE'].indexOf(pValue?.constructor?.name?.toUpperCase()) > - 1
                ) {
                    result = true;
                } 
            } else if (tpof == "array") {
                if (pValue.length > 0) {
                    result = true;
                }
            } else if (tpof == "string") {
                if (pValue.trim().length > 0) {
                    result = true;
                }
            } else {
                result = true;
            }
        }
        return result;
    }

    static isNotNull(obj){
        if (typeof obj !== "undefined" && obj !== null) {
            return true;
        }
        return false;
    }

    static firstValid(arr_valores,check_null) {
        try {
            //this.logi(this.constructor.name,"firstValid");
            if (typeof arr_valores !== "undefined") {
                check_null = check_null === false ? false : true;
                if (arr_valores !== null) {            
                    if (Utils.typeOf(arr_valores) === "array") {
                        let q = arr_valores.length;                
                        if (check_null) {
                            for (let i = 0; i < q; i++) {
                                if (typeof arr_valores[i] !== "undefined" && arr_valores[i] !== null) {
                                    return arr_valores[i];
                                };
                            }
                        } else {
                            for (let i = 0; i < q; i++) {
                                if (typeof arr_valores[i] !== "undefined") {
                                    return arr_valores[i];
                                }
                            }
                        }
                    } else {
                        throw new Error("tipo nao esperado: " + Utils.typeOf(arr_valores));
                    }
                } 
            }            
            //this.logf(this.constructor.name,"firstValid");
            return null;
        }catch(e){
            Utils.log(e);
            alert(e.message || e);            
            return null;
        } 
    };

    static toBool(pValue){
        let result = false;
        if (typeof pValue !== "undefined" && pValue != null) {
            if (typeof pValue == "boolean") {
                result = pValue;
            } else if (typeof pValue == "string") {
                if (["0","false","not","no","n","não"," ","","null"].indexOf(pValue.trim().toLowerCase()) == -1) {
                    result = true;
                }
            } else if (typeof pValue == "number") {
                if (pValue != 0) {
                    return true;
                }
            } else {
                result = pValue?true:false;
            }
        }
        //Utils.log('to bool',pValue,result);
        return result;
    }

    static getDeepProperty(obj,arrayOfDeepProps) {
        let _return = null;
        let obj_temp = obj;
        for(let key in arrayOfDeepProps) {
            obj_temp = obj_temp[arrayOfDeepProps[key]];
            if (!Utils.isNotNull(obj_temp)) {
                break;
            }
        }
        _return = obj_temp;
        return _return;
    }

    

    static getKey(obj, key) {
        let result = null;
        try {
            if (typeof obj !== "undefined" && obj != null) {
                if (typeof obj == "object") {
                    if (typeof key !== "undefined" && key != null) {
                        let objKeys = Object.keys(obj);
                        let keyTemp = key.trim().toLowerCase();
                        for(let i = 0; i < objKeys.length; i++) {
                            //console.log('comparing ',objKeys[i].trim().toLowerCase() , keyTemp,objKeys[i].trim().toLowerCase() == keyTemp);
                            if (objKeys[i].trim().toLowerCase() == keyTemp) {
                                result = objKeys[i];
                                break;
                            }
                        }
                    }                    
                }
            }
        }catch(e){
           Utils.log(e);
        }
        return result;
    }

    
    static toNumber(v) {
        let r = null;
        try {
            let t = typeof v;
            if (t == 'number') {
                r = v;
            } else {
                if (t == 'boolean') {
                    r = Number(v);  
                } else if (t == 'string') {
                    r = Number(v);
                    if (isNaN(r)) {
                        v = v.replace(/[^\d|\,|\.|\-|\+]+/ig,'');
                        if (v.length > 0) { 
                            let pc = v.indexOf(",");
                            let pp = v.indexOf(".");
                            if (pc > -1 && pp > -1) {
                                if (pp > pc) {
                                    r = Number(v.replaceAll(",",""));
                                } else {
                                    r = Number(v.replaceAll(".","").replace(",","."));
                                }
                            } else {
                                if (pc > -1) {
                                    r = Number(v.replace(",","."));
                                } else {
                                    r = Number(v);
                                }
                            }
                        }
                    }
                }
            }
        } catch(e) {
            Utils.showError(e);
        }
        return r;
    }

    static log(...values){
        if ((process.env.NODE_ENV || 'development') == 'production' && (process.env.LOG_LEVEL || 'debug') == 'production') {
            if (values[0]) {
                let tp = typeof values[0];
                if ((values instanceof Error                     
                    || (tp == 'object' && values[0].message)
                    || (tp == 'string' && (
                        values[0] == 'FL' //FORCE LOG                        
                    ))) && !(tp == 'object' && values[0].success)) {
                    console.log(Utils.getMomento(),values);   
                }
            }
        } else {
            console.log(Utils.getMomento(),values);
        }        
    }

    static logToFile(...values){
        let log = [Utils.getMomento()];
        for(let key in values) {
            switch(Utils.typeOf(values[key])) {
                case 'object':
                case 'array':
                    log.push(stringify(values[key]));
                    break;
                case 'function':
                    log.push(values[key].name);
                    break;
                default:
                    log.push(values[key]);
                    break;
            }
        }
        Utils.#logFile.write(log.join(' ') + '\n');
        Utils.log(...values);
    }

    static closeLogFile(){
        Utils.#logFile.close();
    }

    static deleteNotExistsProperty(object,properties){
        properties = Utils.toArray(properties || []);
        properties = properties.join(',').toLowerCase().split(',');
        for(let k2 in object) {
            if (properties.indexOf(k2.toLowerCase().trim()) == -1) {
              delete object[k2];
            }
        }
    }


    static arrayToObject(array,key) {
        let result = {};
        if (array && key) {
            if (Utils.typeOf(key) == 'array') {                
                let currentPath = null;
                for(let i in array) {                    
                    result[array[i][key[0]]] = result[array[i][key[0]]] || {};
                    currentPath = result[array[i][key[0]]];
                    for(let j = 1; j < key.length; j++) {
                        currentPath[array[i][key[j]]] = currentPath[array[i][key[j]]] || {};                        
                        if (j == key.length -1) {
                            if (Utils.typeOf(currentPath[array[i][key[j]]]) !== 'array') currentPath[array[i][key[j]]] = []; 
                            currentPath[array[i][key[j]]].push(array[i]);
                        }
                        currentPath = currentPath[array[i][key[j]]];                        
                    }
                    
                }
            } else {
                for(let i in array) { 
                    result[array[i][key]] = result[array[i][key]];
                    result[array[i][key]] = array[i];
                }
            }
        }
        return result;
    }

    static toBRDate(pDate) {
        let result = null;
        if (pDate) {
            if (typeof pDate != 'object') pDate = new Date(pDate);
            result = pDate.toISOString().substring(0,10);            
            result = result.split("-");
            result = `${result[2]}/${result[1]}/${result[0]}`;
        }
        return result;
    }

    static getPreviousYearDate(pDate) {
        let previousDate = new Date(pDate || undefined);                        
        previousDate.setFullYear(previousDate.getFullYear()-1);
        return previousDate;
    }

    static getPreviousYearLastMonthDate(pDate) {
        pDate = new Date(pDate || undefined);
        let previousDate = new Date(pDate);
        previousDate.setDate(1);
        previousDate.setFullYear(previousDate.getFullYear()-1);

        let lastDayMonthDate1 = new Date(pDate.getFullYear(), pDate.getMonth()+1, 0);
        if (lastDayMonthDate1.getDate() == pDate.getDate()) {
            previousDate = new Date(previousDate.getFullYear(), previousDate.getMonth()+1, 0);
        } else {
            let invalidDate = null;
            let dec = 0;
            while(invalidDate !== 0) {
                try {
                    previousDate.setDate(pDate.getDate()-dec);
                    invalidDate = 0;
                } catch (e) {
                    Utils.log(e);
                    dec++;
                    invalidDate = e;
                }
            }
        }
        return previousDate;
    }

    static toArray(value,delimiter) {
        let result = value;
        if (value) {
            if (typeof value == 'string') {
                result = value.split(delimiter || ',');
            } else if (Utils.typeOf(value) != 'array') {
                result = [value];
            }
        }
        return result;
    }
    

    static singleArrayTo2LevelArray(array) {
        let newArray = [];
        let current2Level = [];
        for(let k in array) {
            if (Utils.typeOf(array[k]) != 'array') {
                current2Level.push(array[k]);
                if (current2Level.length == 2 ) {
                    newArray.push(current2Level);
                    current2Level = [];
                }
            } else {
                newArray.push(array[k]);
            }
        }
        if (current2Level.length > 0 ) {
            newArray.push(current2Level);
        }
        return newArray;
    }

    static getSingleUrlPath(urlPath) {
        let result = urlPath || '';
        let p1 = result.indexOf("?");
        if (p1 > -1) {
            result = result.substring(0,p1);
        }            
        result = result.toLowerCase().trim();
        if (result.lastIndexOf("/") == result.length-1) {
            result = result.substring(0,result.length-1);
        }
        return result;
    }    

    /**
     * 
     * @param {*} obj 
     * @param {*} methodName 
     * @returns string | null
     * @created 2024-07-13
     * @version 1.0.1
     */
    static getMethodName(obj,methodName) {
        //console.log('getting method name from ',obj.name || obj.constructor?.name, methodName);
        let ownPropName = `${obj.name}_hashMethodsNames`;
        if (!this.hasValue(obj[ownPropName])) {            
            obj[ownPropName] = {};

            let obj2 = obj;
            do {
                if (obj2 && typeof obj2 !== 'undefined' && obj2 !== undefined && obj2 !== null) {
                    let keys = Reflect.ownKeys(obj2);
                    if (keys && typeof keys !== 'undefined' && keys.length > 0) {
                        for (let k in keys) {
                            //console.log(typeof keys[k], keys[k]);
                            try {
                                if (typeof keys[k] == 'string' && [ 'caller', 'callee', 'arguments'].indexOf(keys[k]) == -1 && typeof (obj2||{})[keys[k]]  == 'function') obj[ownPropName][keys[k].toLowerCase()] = keys[k];
                            } catch (e) {
                                //console.log(e);
                                obj[ownPropName][keys[k].toLowerCase()] = keys[k];
                            }
                        };
                    }
                }
            } while (obj2 = Reflect.getPrototypeOf(obj2)); 
            //Utils.log('FL','Utils.getMethodName','storaged methods from ',obj.name,'in','hashMethodsNames',Object.keys(obj[ownPropName]));
        }

        if (obj[ownPropName][methodName.trim().toLowerCase()]) {
            //console.log('encountred method ',methodName);
            return obj[ownPropName][methodName.trim().toLowerCase()];
        } else {
            //console.log('not encountred method ',methodName,'in',obj.name || obj.constructor?.name, Object.keys(obj[ownPropName]));
        }
        return null;
    }
    
}

module.exports = {Utils}