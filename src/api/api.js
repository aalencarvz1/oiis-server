
//requires
const express = require('express');
require('dotenv').config({ path: __dirname + "/../../.env" });
const { Utils } = require('./controllers/utils/Utils');
Utils.log('NODE_ENV =',process.env.NODE_ENV);
const { AuthController } = require('./controllers/auth/AuthController');
const bodyParser = require("body-parser");
const { EndPointsController } = require('./controllers/endpoints/EndPointsController');
const { ModelsController } = require('./controllers/database/ModelsController');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const multer  = require('multer');
const { Midia_Controller } = require('./controllers/modules/registers/midias/Midia_Controller');
const DBConnectionManager = require('./database/DBConnectionManager');
const { QueryTypes } = require('sequelize');
const { Types } = require('mysql2');

//multer configure
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        Utils.log('filename object',file);
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
api.use(EndPointsController.getReqResMiddleware());
api.use(AuthController.checkToken); //auth token check middleware

//handle upload midias route
api.post("/api/controllers/modules/registers/midias/midia_controller/uploadfile",upload.array('files'),Midia_Controller.uploadFile);

api.post("/api/controllers/modules/registers/product",
    async function datesProduct(req,res) {
        let termo = req.body.termo
        termo = termo.split(',')
        let date = await DBConnectionManager.getWinthorDBConnection().query(`
        select
            CODPROD,
            DESCRICAO,
            EMBALAGEM,
            UNIDADE,
            PESOLIQ,
            PESOBRUTO,
            CODEPTO,
            TEMREPOS,
            QTUNIT,
            DTCADASTRO,
            DTEXCLUSAO,
            dtultaltcom,
            PRAZOVAL,
            REVENDA,
            QTUNITCX,
            IMPORTADO,
            CODAUXILIAR
        from
            pcprodut
        where
            ${termo.map(el =>{
                return `
                (CODPROD like '${el}' 
                OR UPPER(DESCRICAO) LIKE UPPER('${el}')
                OR UPPER(EMBALAGEM) LIKE UPPER('${el}')
                OR UPPER(UNIDADE) LIKE UPPER('${el}')
                OR PESOLIQ LIKE '${el}'
                
                )`
            }).join(' or ')}
            `,
        {
            type: QueryTypes.SELECT,
        }

    )
    res.status(200).send(date)
    }
);

//handle all methods and routes
api.all('*', EndPointsController.processRequest.bind(EndPointsController));

//api start
api.listen(process.env.API_PORT||3000,function(){
    Utils.log('FL',`server api running on port ${process.env.API_PORT||3000} at ${new Date()}`)
});

//init database models
ModelsController.initModels();


