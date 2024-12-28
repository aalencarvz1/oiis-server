import 'express';
import DataSwap from '../controllers/data/DataSwap.ts';

declare global {
    namespace Express {
        interface Request {
            user?: any
        }

        interface Response {
            success: boolean; // Propriedade customizada
            data: any;
            message: string | null;
            exception: any;

            getJson : () => {
                success: boolean; // Propriedade customizada
                data: any;
                message: string | null;
                exception: any;
            }

            setDataSwap: (dataSwap: DataSwap) => void;

            setException: (exception: any,notShowConsole : boolean = false) => void;

            sendResponse: (status: number = 517,success: boolean = false,message: string | null = null,data:any = null,exception:any = null) => void;
        }
    }
}