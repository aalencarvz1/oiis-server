import express, { Request } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

//configure dotenv
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: __dirname + "/../../.env" });

import Utils from "./controllers/utils/Utils.js";
Utils.log('NODE_ENV =',process.env.NODE_ENV);
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import multer from 'multer';
import AuthController from "./controllers/auth/AuthController.js";
import EndPointsController from './controllers/endpoints/EndPointsController.js';
import ModelsController from './controllers/database/ModelsController.js';
import MidiasController from './controllers/modules/registers/MidiasController.js';


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

//serve files
api.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
api.use('/files', express.static(path.join(__dirname, '../../files')));

api.use(cookieParser());

//customize response properties
api.use(EndPointsController.custom_response);

//access check
api.use(AuthController.check_token); //auth token check middleware


//handle upload midias route
api.post("/api/controllers/modules/registers/midiascontroller/upload_file",upload.array('files'),MidiasController.upload_file);


//handle all methods and routes
(async()=>{

  //only controllers can receive requests
  let requestHandlersRootDir = `${__dirname}/controllers`;
  console.log('dir is ',requestHandlersRootDir);
  EndPointsController.loadDefaultEndPoints();

  /**
   * base end point is /api/controllers
   * auto load configure this app with router of all controlers that has methods with request handler signature as a endpoint.
   */  
  await EndPointsController.autoLoadEndPoints(requestHandlersRootDir,"/api/controllers/");
  api.use(EndPointsController.getRouter());

  //falback (404)
  api.use((req,res,next) => {
    res.success = false;
    res.message = "resource not found";
    res.sendResponse(404,false);
  })
  console.log('endpoints',EndPointsController.getEndPoints(EndPointsController.getRouter()));
})();


//api start
api.listen(process.env.API_PORT||3000,function(){
    Utils.log('FL',`server api running on port ${process.env.API_PORT||3000} at ${new Date()}`)
});

ModelsController.initModels();
