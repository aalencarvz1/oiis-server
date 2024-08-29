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
        this.message = ex.message || ex;
        this.exception = ex;        
    }
}

module.exports = {DataSwap}
