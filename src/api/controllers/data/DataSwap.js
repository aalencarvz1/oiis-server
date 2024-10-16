const { Utils } = require("../utils/Utils");

class DataSwap {
    success = false;
    data = null;
    message = null;
    exception = null;

    setDataSwap(obj) {
        this.success = obj.success || false;
        this.data = obj.data;
        this.message = obj.message;
        this.exception = obj.exception;
    }
    
    setException(ex,notConsole) {
        if (!notConsole) Utils.log(ex);
        this.success = false;
        this.message = ex.sqlMessage || ex.message || ex;
        if (ex.errors?.length) {
            this.message = ex.errors[0].sqlMessage || ex.errors[0].message || this.message;
        }
        this.exception = ex;        
    }
}

module.exports = {DataSwap}
