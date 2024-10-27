
//requires
const express = require('express');
require('dotenv').config();
const { Utils } = require('./controllers/utils/Utils');
Utils.logToFile('NODE_ENV =',process.env.NODE_ENV);
const fs = require('node:fs');
const path = require('node:path');
const https = require("https");
const bodyParser = require("body-parser");
const { RoutesController } = require('./controllers/routes/RoutesController');


//api create
const api = express();

//api configure midlewares
api.use(express.json({limit: '50mb'}));
api.use(express.urlencoded({limit: '50mb', extended: true }));
api.use(bodyParser.json({limit: '50mb'}));
api.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
api.use(RoutesController.getReqResMiddleware());


//handle all methods and routes
api.all('*', (req,res,next)=>{
    Utils.logToFile('request received of webhook notification');
    let log = `${req?.method} ${req?.socket?.remoteAddress} ${JSON.stringify(req?.body||{})} req.url=${req.url}`;    
    Utils.logToFile(log);
    if (!req.socket.authorized) {
        Utils.logToFile('unauthorized');
        res.writeHead(401);
        return res.end('Invalid client certificate authentication (unauthorized).');        
    } else {
        Utils.logToFile('authorized');
    }
    Utils.logToFile('client certificate',req.socket.getPeerCertificate(true)?.raw);
    processRoute(req,res,next);
});


//process route
const processRoute = (req,res,next) => {    
    switch(req.url) {
        case "/":
            Utils.logToFile('route 1');
            res.header('content-type','application/json').status(200).send({success:true,url:req.url});
            break;
        case "/webhook":
            Utils.logToFile('route 2');
            res.header('content-type','application/json').status(200).send({success:true,url:req.url});
            break;
        case "/webhook/":
            Utils.logToFile('route 3');
            res.header('content-type','application/json').status(200).send({success:true,url:req.url});
            break;
        case "/webhook/pix":
            Utils.logToFile('route 4');
            res.header('content-type','application/json').status(200).send({success:true,url:req.url});
            break;
        case "/webhook/pix/":
            Utils.logToFile('route 5');
            res.header('content-type','application/json').status(200).send({success:true,url:req.url});
            break;
        default:
            Utils.logToFile('route 6');
            res.header('content-type','application/json').status(200).send({success:false,url:req.url});
            break;
    }
}

api.listen(process.env.API_PORT,function(){
    Utils.logToFile(`server api running on port ${process.env.API_PORT} at ${new Date()}`)
});

var httpsOptions = {
    port: 443,
    cert: fs.readFileSync('C:\\Users\\TI\\.step\\certs\\intermediate_ca.crt'),
    requestCert: false,
    rejectUnauthorized: false,
    ca: fs.readFileSync('C:\\Users\\TI\\.step\\certs\\root_ca.crt')
};

const httpsApi = https.createServer(httpsOptions,api);

httpsApi.listen(process.env.API_WEBHOOK_HTTPS_PORT,function(){
    Utils.logToFile(`server api running on port ${process.env.API_WEBHOOK_HTTPS_PORT}`)
});


//init database models
//ModelsController.initModels();




  