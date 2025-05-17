export default class Utils { 

    static getMomento() : string {
        let momento : any = new Date();
        momento=momento.getDate().toString().padStart(2,'0')+'/'+((momento.getMonth()+1).toString().padStart(2,'0'))+'/'+momento.getFullYear()+' '+momento.getHours()+':'+momento.getMinutes()+':'+momento.getSeconds()+'.'+momento.getMilliseconds();
        return momento;
    };

    static log(...values:any) : void {
        if ((process.env.NODE_ENV || 'development') === 'production' && (process.env.LOG_LEVEL || 'debug') === 'production') {
            if (values[0]) {
                const tp = typeof values[0];
                if ((values instanceof Error                     
                    || (tp === 'object' && values[0].message)
                    || (tp === 'string' && (
                        values[0] === 'FL' //FORCE LOG                        
                    ))) && !(tp === 'object' && values[0].success)) {
                    console.log(Utils.getMomento(),values);   
                }
            }
        } else {
            console.log(Utils.getMomento(),values);
        }  
    }

    static logi(p_nome_classe: string | null,p_nome_funcao:string | null) : void {
        try {
            if (typeof p_nome_funcao !== "undefined") {
                Utils.log('START ',p_nome_classe + "." + p_nome_funcao);
            } else {
                Utils.log('START ',p_nome_classe);
            }
        }catch(e:any){
            Utils.log(e);					  
        }
    };


    static logf(p_nome_classe: string | null,p_nome_funcao:string | null) : void {
        try {
            if (typeof p_nome_funcao !== "undefined") {
                Utils.log('END   ',p_nome_classe + "." + p_nome_funcao);
            } else {
                Utils.log('END   ',p_nome_classe);
            }
        }catch(e: any){
            Utils.log(e);					  
        }
    };

    static loge(...values : any) : void {
        if ((process.env.NODE_ENV || 'development') === 'production' && (process.env.LOG_LEVEL || 'debug') === 'production') {
            if (values[0]) {
                const tp = typeof values[0];
                if ((values instanceof Error                     
                    || (tp === 'object' && values[0].message)
                    || (tp === 'string' && (
                        values[0] === 'FL' //FORCE LOG                        
                    ))) && !(tp === 'object' && values[0].success)) {
                    console.error(Utils.getMomento(),values);   
                }
            }
        } else {
            console.error(Utils.getMomento(),values);
        }        
    }

    static logError(error: any) : void {
        console.error(error);
    }


    static typeOf(value : any) : string {
        let r : string = typeof value;
        if (typeof NodeList !== 'undefined') {
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

    static isArray(obj : any) : boolean{
        return Utils.typeOf(obj) === "array";
    }

    /**
     * 
     * @param {any} pValue 
     * @returns {boolean}
     */
    static hasValue<T>(pValue: T | null | undefined) : pValue is T {
        let result = false;
        const tpof = Utils.typeOf(pValue);
        if (tpof !== "undefined" && pValue != null) { // eslint-disable-line eqeqeq
            if (tpof === "object") {
                if (Object.keys(pValue).length > 0
                    || Object.getOwnPropertySymbols(pValue).length > 0
                    || ['DATE'].indexOf(pValue?.constructor?.name?.toUpperCase()) > - 1
                ) {
                    result = true;
                } 
            } else if (tpof === "array") {
                if ((pValue as any[]).length > 0) {
                    result = true;
                }
            } else if (tpof === "string") {
                if ((pValue as string).trim().length > 0) {
                    result = true;
                }
            } else {
                result = true;
            }
        }
        return result;
    }


    static isNotNull(obj: any) : boolean{
        if (typeof obj !== "undefined" && obj !== null) {
            return true;
        }
        return false;
    }

    static firstValid(arr_valores: any[],check_null: boolean = true) : any {
        try {
            //this.logi(this.constructor.name,"firstValid");
            if (typeof arr_valores !== "undefined") {
                check_null = check_null === false ? false : true;
                if (arr_valores !== null) {            
                    if (Utils.typeOf(arr_valores) === "array") {
                        const q = arr_valores.length;                
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
        }catch(e: any){
            Utils.log(e);
            return null;
        } 
    };

    static toBool(pValue : any) : boolean{
        let result : boolean = false;
        if (typeof pValue !== "undefined" && pValue != null) { // eslint-disable-line eqeqeq
            if (typeof pValue === "boolean") {
                result = pValue;
            } else if (typeof pValue === "string") {
                if (["0","false","not","no","n","não"," ","","null"].indexOf(pValue.trim().toLowerCase()) === -1) {
                    result = true;
                }
            } else if (typeof pValue === "number") {
                if (pValue !== 0) {
                    return true;
                }
            } else {
                result = pValue?true:false;
            }
        }
        //Utils.log('to bool',pValue,result);
        return result;
    }

    static getDeepProperty(obj: any,arrayOfDeepProps: string[]) : any {
        let _return = null;
        let obj_temp = obj;
        for(const key in arrayOfDeepProps) {
            obj_temp = obj_temp?.[arrayOfDeepProps[key]];
            if (!Utils.isNotNull(obj_temp)) {
                break;
            }
        }
        _return = obj_temp;
        return _return;
    }

    

    static getKey(obj: object | Function | null | undefined, key: string) : string | null {  // eslint-disable-line @typescript-eslint/no-unsafe-function-type
        let result = null;
        try {
            const tObj = typeof obj;
            if (tObj !== "undefined" && obj != null) { // eslint-disable-line eqeqeq
                if (tObj === "object" || tObj === "function") {
                    if (typeof key !== "undefined" && key != null) { // eslint-disable-line eqeqeq
                        //let objKeys = Object.keys(obj);
                        const objKeys = Object.getOwnPropertyNames(obj);
                        const keyTemp = key.trim().toLowerCase();
                        for(let i = 0; i < objKeys.length; i++) {
                            if (objKeys[i].trim().toLowerCase() === keyTemp) {
                                result = objKeys[i];
                                break;
                            }
                        }
                    }                    
                }
            }
        }catch(e: any){
           Utils.log(e);
        }
        return result;
    }

    
    static toNumber(v: any) : number | null {
        let r = null;
        try {
            const t = typeof v;
            if (t === 'number') {
                r = v;
            } else {
                if (t === 'boolean') {
                    r = Number(v);  
                } else if (t === 'string') {
                    r = Number(v);
                    if (isNaN(r)) {
                        v = v.replace(/[^\d|\,|\.|\-|\+]+/ig,'');
                        if (v.length > 0) { 
                            const pc = v.indexOf(",");
                            const pp = v.indexOf(".");
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
        } catch(e: any) {
            console.error(e);
        }
        return r;
    }


    static deleteNotExistsProperty(object: any,properties: any) : void{
        properties = Utils.toArray(properties || []);
        properties = properties.join(',').toLowerCase().split(',');
        for(const k2 in object) {
            if (properties.indexOf(k2.toLowerCase().trim()) === -1) {
              delete object[k2];
            }
        }
    }


    static arrayToObject(array: any,key: any = null) : any {
        const result : any = {};
        if (array && key) {
            if (Utils.typeOf(key) === 'array') {                
                let currentPath = null;
                for(const i in array) {                    
                    result[array[i][key[0]]] = result[array[i][key[0]]] || {};
                    currentPath = result[array[i][key[0]]];
                    for(let j = 1; j < key.length; j++) {
                        currentPath[array[i][key[j]]] = currentPath[array[i][key[j]]] || {};                        
                        if (j === key.length -1) {
                            if (Utils.typeOf(currentPath[array[i][key[j]]]) !== 'array') currentPath[array[i][key[j]]] = []; 
                            currentPath[array[i][key[j]]].push(array[i]);
                        }
                        currentPath = currentPath[array[i][key[j]]];                        
                    }
                    
                }
            } else {
                for(const i in array) {
                    result[array[i][key]] = result[array[i][key]] || []; 
                    result[array[i][key]].push(array[i]);
                }
            }
        }
        return result;
    }

    static toBRDate(pDate: Date | string | null | undefined = null) : string | null{
        let result = null;
        if (pDate) {
            if (typeof pDate !== 'object') pDate = Utils.toDate(pDate);
            result = pDate.toISOString().substring(0,10);            
            result = result.split("-");
            result = `${result[2]}/${result[1]}/${result[0]}`;
        }
        return result;
    }

    static toISODate(pDate?: any) : any {
        let result = null;
        if (pDate) {
            if (typeof pDate !== 'object') pDate = Utils.toDate(pDate);
            result = pDate.toISOString().substring(0,10);            
        }
        return result;
    }

    static getPreviousYearDate(pDate : any) : Date {
        const previousDate : Date = Utils.toDate(pDate);                   
        previousDate.setUTCFullYear(previousDate.getUTCFullYear()-1);
        return previousDate;
    }

    static getPreviousYearLastMonthDate(pDate: any) : Date {        
        pDate = Utils.toDate(pDate);        
        let previousDate = new Date(pDate)//Utils.toDate(Utils.toISODate(pDate));        
        previousDate.setDate(1);        
        previousDate.setUTCFullYear(previousDate.getUTCFullYear()-1);        
        const lastDayMonthDate1 = new Date(pDate.getUTCFullYear(), pDate.getUTCMonth()+1, 0);        
        if (lastDayMonthDate1.getDate() === pDate.getDate()) {
            previousDate = new Date(previousDate.getUTCFullYear(), previousDate.getUTCMonth()+1, 0);            
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

    static toArray(value?: any,delimiter?: string ) : any[] | null | undefined {
        let result = value;
        if (value) {
            if (typeof value === 'string') {
                delimiter = delimiter || ',';
                result = value.split(delimiter || ',');
            } else if (Utils.typeOf(value) !== 'array') {
                result = [value];
            }
        }
        return result;
    }
    

    static singleArrayTo2LevelArray(array : any[]) : any[] {
        const newArray = [];
        let current2Level = [];
        for(const k in array) {
            if (Utils.typeOf(array[k]) !== 'array') {
                current2Level.push(array[k]);
                if (current2Level.length === 2 ) {
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

    static getSingleUrlPath(urlPath: string) : string {
        let result = urlPath || '';
        const p1 = result.indexOf("?");
        if (p1 > -1) {
            result = result.substring(0,p1);
        }            
        result = result.toLowerCase().trim();
        if (result.lastIndexOf("/") === result.length-1) {
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
    static getMethodName(obj:any,methodName:string) : string | null{
        const ownPropName : string = `${obj.name}_hashMethodsNames`;
        if (!this.hasValue(obj[ownPropName])) {            
            obj[ownPropName] = {};

            let obj2 = obj;
            do {
                if (obj2 && typeof obj2 !== 'undefined' && obj2 !== undefined && obj2 !== null) {
                    const keys : any = Reflect.ownKeys(obj2);
                    if (keys && typeof keys !== 'undefined' && keys.length > 0) {
                        for (const k in keys) {
                            try {
                                if (typeof keys[k] === 'string' && [ 'caller', 'callee', 'arguments'].indexOf(keys[k]) === -1 && typeof (obj2||{})[keys[k]]  === 'function') obj[ownPropName][keys[k].toLowerCase()] = keys[k];
                            } catch {
                                obj[ownPropName][keys[k].toLowerCase()] = keys[k];
                            }
                        };
                    }
                }
            } while (obj2 = Reflect.getPrototypeOf(obj2)); 
        }

        if (obj[ownPropName][methodName.trim().toLowerCase()]) {
            return obj[ownPropName][methodName.trim().toLowerCase()];
        } 
        return null;
    }

    static toDate(pValue: any, pFormat?: any ) : Date {
        let result : any = null;
        if (pValue && pValue != null) {
            if (typeof pValue === 'object') {
                result = new Date(pValue);
            } else {
                if (pValue.indexOf("-") > -1) {
                    result = new Date(pValue.substring(0,10).split("-").map(Number));
                } else if (pValue.indexOf("/") > -1) {
                    result = new Date(pValue.substring(0,10).split("/").reverse().map(Number));
                } else {
                    if (Utils.hasValue(pFormat)) {
                        switch(pFormat.trim().toLowerCase()) {
                            case "yyyymmdd":
                                if(!/^(\d){8}$/.test(pValue)) throw new Error(`invalid date: ${pValue}`);
                                let y = pValue.substr(0,4),
                                    m = pValue.substr(4,2),
                                    d = pValue.substr(6,2);
                                result = new Date(y,m,d);
                                break;
                            default:
                                throw new Error(`not expected date format: ${pFormat}`);
                        }
                    } else {
                        result = new Date(pValue);
                    }
                }
            }
        }
        return result;
    }

    static isClass(func: any): boolean {
        return (
            typeof func === 'function' &&
            func.prototype &&
            Object.getOwnPropertyNames(func.prototype).includes('constructor')
        );
    }

    /**
     * Retorna todas as propriedades e métodos, incluindo as herdadas.
     * @param obj Objeto ou protótipo a ser analisado.
     * @returns Lista de nomes de propriedades e métodos.
     */
    static getAllProperties(obj: any): string[] {
        const properties = new Set<string>();

        while (obj && obj !== Object.prototype) {
            // Adiciona todas as propriedades e métodos do nível atual
            Object.getOwnPropertyNames(obj).forEach((prop) => properties.add(prop));
            obj = Object.getPrototypeOf(obj); // Move para o próximo nível da herança
        }

        return [...properties];
    }


    static getUTCFullDate(date: Date) : string{
        let result = `${date.getFullYear().toString().padStart(4,'0')}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
        return result;
    }


    static getFullMonthsDiff(date1: Date, date2: Date) : number | null {
        let tempDate1 = new Date(Date.UTC(date1.getUTCFullYear(), date1.getUTCMonth(), 1, 0, 0, 0, 0));
        let tempDate2 = new Date(Date.UTC(date2.getUTCFullYear(), date2.getUTCMonth()+1, 0, 0, 0, 0, 0));
      
        if (date1.getUTCDate() !== tempDate1.getUTCDate() || date2.getUTCDate() !== tempDate2.getUTCDate()) {
          return null;//"Não é um período completo";
        }
      
        let diffMonths = (tempDate2.getUTCFullYear() - tempDate1.getUTCFullYear()) * 12 + (tempDate2.getUTCMonth() - tempDate1.getUTCMonth()) + 1;
      
        return diffMonths;
    }

    static diffDays(date1: Date, date2: Date) : number {
        return Math.floor(
            (Number(new Date(date2.toDateString())) - Number(new Date(date1.toDateString()))) / (1000 * 60 * 60 * 24)
        );
    };

    static addFullMonths(date: Date, months: number) : void {
        let currentMonth = date.getUTCMonth();        
        date.setUTCMonth(date.getUTCMonth() + months);
        if (date.getUTCMonth() > currentMonth + months) {
            date.setUTCDate(0);
        } 
        if (date.getUTCDate() != 1) {
            let lastDate = new Date(date.getUTCFullYear(),date.getUTCMonth()+1,0);
            date.setUTCDate(lastDate.getUTCDate());
        }
    }


    /**
     * method to eval a text in expressions of params items
     * @created 2025-03-27
     * @version 1.0.0
     */
    static async evalReplaceVarsText(text?: string,params?: any) : Promise<any> {
        let result : any = text;
        if (Utils.hasValue(result)) {
            let p1 = result.indexOf("${");
            let p2 = result.indexOf("}$");
            let replaceText = null;
            let evalText = null;
            let evaluetedValue = null;
            let lastResult = result;
            while(p1 > -1 && p2 > -1 && p2 > p1) {
                replaceText = result.substring(p1,p2+2);
                evalText = replaceText.substring(2,replaceText.length-2);
                evaluetedValue = await eval(evalText);
                result = result.replaceAll(replaceText,evaluetedValue);
                if (lastResult == result) break;
                p1 = result.indexOf("${");
                p2 = result.indexOf("}$");
                lastResult = result;                    
            }     
        }
        return result;
    }


    /**
     * method to eval a text in expressions of params items
     * @created 2025-03-27
     * @version 1.0.0
     */
    static async evalText(text?: string,params?: any) : Promise<any> {
        let result : any = text;
        if (Utils.hasValue(result)) {
            result = await this.evalReplaceVarsText(result,params);       
        }
        result = await eval(result);
        return result;
    }


    // Função genérica para calcular o dígito verificador de GTIN-8, 13 e 14
    static calculateGtinDigit(code: string) : number {
        let sum = 0;
        let multiplier = 3;
    
        // Percorre os dígitos de trás para frente (exceto o último, que é o check digit)
        for (let i = code.length - 2; i >= 0; i--) {
            let num = parseInt(code[i]);
            sum += num * multiplier;
            multiplier = multiplier === 3 ? 1 : 3; // Alterna entre 3 e 1
        }
    
        let digit = (10 - (sum % 10)) % 10; // Se for 10, vira 0
        return digit;
    };
    
    // Função para validar GTIN-8, 13 ou 14
    static getGtinType(code?: any) : any {
        let result : any = {
            isGtin : false
        };
        if (Utils.hasValue(code)) {
            if (typeof code !== 'string') code = code.toString();
            const numbers = code?.replace(/\D/g, "") || ""; // Remove caracteres não numéricos        
            if (![8, 12, 13, 14].includes(numbers.length)) return result;
        
            const calculatedDigit = Utils.calculateGtinDigit(numbers);
            const informatedDigit = parseInt(numbers[numbers.length - 1]);
            result.isGtin = calculatedDigit === informatedDigit;
            if (result.isGtin) {
                result.type = numbers.length;
            }
        }
        return result;
    };

}
