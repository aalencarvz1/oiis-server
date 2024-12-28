import express, { Request, Response, NextFunction } from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

//configure dotenv
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: __dirname + "/../../.env" });

import Utils from "./controllers/utils/Utils.js";
Utils.log('NODE_ENV =',process.env.NODE_ENV);
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import multer from 'multer';
import { JsonStreamStringify } from 'json-stream-stringify';
import AuthController from "./controllers/auth/AuthController.js";
import EndPointsController from "./controllers/endpoints/EndPointsController.js";
import Midia_Controller from "./controllers/modules/registers/midias/Midia_Controller.js";
import DataSwap from './controllers/data/DataSwap.js';


//multer configure
const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: Function) {
    cb(null, 'uploads/')
  },
  filename: function (req: Request , file: any, cb: Function) {
      let fileExt = file.mimetype?.split('/') || file.filename?.split('.') || ['file'];
      if (fileExt && fileExt.length > 0) {
          fileExt = fileExt[fileExt.length-1];
      } 
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) ;
      cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
  }
});
const upload = multer({ storage: storage });


//api create
const api = express();


//api configure midlewares
api.use(cors());
api.use(compression());
api.use(express.json({limit: '50mb'}));
api.use(express.urlencoded({limit: '50mb', extended: true }));
api.use(bodyParser.json({limit: '50mb'}));
api.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
api.use('/uploads', express.static('uploads'));
api.use('/files', express.static('files'));
api.use(cookieParser());


//customize response properties
api.use((req: Request, res: Response, next: NextFunction) => {
  res.success = false;
  res.data = null;
  res.message = null;
  res.exception = null;                    
      
  res.getJson = function(){
      return {
          success: this.success,
          data : this.data,
          message : this.message,
          exception : this.exception
      }
  }

  res.setDataSwap = function(dataSwap: DataSwap) {
    if (Utils.hasValue(dataSwap)) { 
      res.success = dataSwap?.success || false;
      res.data = dataSwap?.data;
      res.message = dataSwap?.message;
      res.exception = dataSwap?.exception;
    }
  }

  res.setException = function(exception: any,notShowConsole : boolean = false) {;  
    if (!notShowConsole) console.error(exception);
    res.success = false;
    res.message = exception?.message || exception;
    if (exception?.errors?.length) {
        res.message = exception?.errors[0].sqlMessage || exception?.errors[0].message || res.message;
    }
    res.exception = exception || null;        
  };

  res.sendResponse = function(status: number = 517,success: boolean = false,message: string | null = null,data:any = null,exception:any = null) {
    if (Utils.hasValue(success)) res.success = res.success || success;
    if (Utils.hasValue(message)) res.message = res.message || message;
    if (Utils.hasValue(data)) res.data = res.data || data;            
    if (Utils.hasValue(exception)) {
        res.exception = res.exception || exception;  
        if (res.exception) {
            if (res.exception.errors) {
                let messages = res.exception.errors.map((el:any)=>el?.message || el.toString());
                res.message += `: ${messages.join(",")}`;
            }
        }
    }
    if (status) res.status(status);

    res.setHeader('Content-Type', 'application/json');

    // Cria um stream de resposta JSON            
    res.type('json'); // Required for proper handling by test frameworks and some clients
    new JsonStreamStringify(res.getJson()).pipe(res);
  };

  next();
});


//access check
api.use(AuthController.checkToken); //auth token check middleware


//handle upload midias route
api.post("/api/controllers/modules/registers/midias/midia_controller/uploadfile",upload.array('files'),Midia_Controller.uploadFile);


//handle all methods and routes
api.all('*', EndPointsController.processRequest);


//api start
api.listen(process.env.API_PORT||3000,function(){
    Utils.log('FL',`server api running on port ${process.env.API_PORT||3000} at ${new Date()}`)
});

