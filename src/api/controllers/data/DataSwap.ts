export default class DataSwap{
    success : boolean = false;
    status : number = -1;
    data : any =  null;
    message : string | null =  null;
    exception : any = null;

    setDataSwap(newDataSwap: DataSwap) {
        this.success = newDataSwap?.success || false;
        this.data = newDataSwap?.data || null;
        this.message = newDataSwap?.message || null;
        this.exception = newDataSwap?.exception || null;
    }
    
    setException(exception: any, notConsole: boolean = false) {
        if (!notConsole) console.error(exception);
        this.success = false;
        this.message = exception?.sqlMessage || exception?.message || exception;
        if (exception.errors?.length) {
            this.message = exception.errors[0].sqlMessage || exception.errors[0].message || this.message;
        }
        this.exception = exception;        
    }

    throw() {
        throw this.exception || new Error(this.message || 'error');
    }
}