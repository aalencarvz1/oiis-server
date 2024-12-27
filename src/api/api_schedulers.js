
//requires
const express = require('express');
require('dotenv').config();
const { Utils } = require('./controllers/utils/Utils');
Utils.log('NODE_ENV =',process.env.NODE_ENV);
const { ModelsController } = require('./controllers/database/ModelsController');
const { ToadScheduler, SimpleIntervalJob, AsyncTask } = require('toad-scheduler');
const { SicrediIntegrationsPixController } = require('./controllers/modules/financial/billing/pix/integrations/sicredi/SicrediIntegrationsPixController');
const { AuroraIntegrationsRegistersController } = require('./controllers/modules/registers/integrations/aurora/AuroraIntegrationsRegistersController');
const cors = require('cors');
const { WinthorIntegrationsRegistersController } = require('./controllers/modules/registers/integrations/winthor/WinthorIntegrationsRegistersController');
//const { MtrixIntegrationsController } = require('./controllers/modules/registers/integrations/mtrix/MtrixIntegrationsController');

//api create
const api = express();

api.use(cors());

//init database models
ModelsController.initModels();

//job to query complete pixs
if (process.env.NODE_ENV == 'production') {
    const scheduler = new ToadScheduler();

    //API PIX SICREDI INTEGRATION CHECKER
    const taskSicrediPixIntegraion = new AsyncTask(
        'simple task', 
        async () => { 
            try {
                await SicrediIntegrationsPixController.checkCompletedsPix();
            } catch (e) {
                Utils.log('FL',"error on callback AsyncTask job");
                Utils.log(e);
            }
        },
        (err) => { 
            Utils.log('FL',"error returning of callback AsyncTask job");
            Utils.log(err) 
        }
    );
    const jobSicrediPixIntegration = new SimpleIntervalJob(
        { 
            minutes: 5,
            runImmediately: true
        }, 
        taskSicrediPixIntegraion, 
        { 
            id: 'webhook_pix',
            preventOverrun: true,
        }
    );    
    scheduler.addSimpleIntervalJob(jobSicrediPixIntegration);


    //AURORA STOCK INTEGRATION
    const taskAuroraStockIntegration = new AsyncTask(
        'simple task', 
        async () => { 
            try {
                await AuroraIntegrationsRegistersController.integrateStock();
            } catch (e) {
                Utils.log('FL',"error on callback AsyncTask job");
                Utils.log(e);
            }
        },
        (err) => { 
            Utils.log('FL',"error returning of callback AsyncTask job");
            Utils.log(err) 
        }
    );
    const jobAuroraStockIntegration = new SimpleIntervalJob(
        { 
            minutes: 60,            
            runImmediately: true
        }, 
        taskAuroraStockIntegration,
        { 
            id: 'integrate_aurora_stock',
            preventOverrun: true,
        }
    );
    scheduler.addSimpleIntervalJob(jobAuroraStockIntegration);


    //AURORA STOCK INTEGRATION
    const taskWinthorRegistersIntegration = new AsyncTask(
        'simple task', 
        async () => { 
            try {
                await WinthorIntegrationsRegistersController.integrateRegisters();
            } catch (e) {
                Utils.log('FL',"error on callback AsyncTask job");
                Utils.log(e);
            }
        },
        (err) => { 
            Utils.log('FL',"error returning of callback AsyncTask job");
            Utils.log(err) 
        }
    );
    const jobWinthorRegistersIntegration = new SimpleIntervalJob(
        { 
            minutes: 15,            
            runImmediately: true
        }, 
        taskWinthorRegistersIntegration,
        { 
            id: 'integrate_winthor_registers',
            preventOverrun: true,
        }
    );
    scheduler.addSimpleIntervalJob(jobWinthorRegistersIntegration);


    //MTRIX INTEGRATION FILES GENERATE 
    /*const taskMtrixIntegration = new AsyncTask(
        'simple task', 
        async () => { 
            try {
                await MtrixIntegrationsController.generateFiles();
            } catch (e) {
                Utils.log('FL',"error on callback AsyncTask job");
                Utils.log(e);
            }
        },
        (err) => { 
            Utils.log('FL',"error returning of callback AsyncTask job");
            Utils.log(err) 
        }
    );
    const jobMtrixIntegration = new SimpleIntervalJob(
        { 
            hours: 24,            
            runImmediately: true
        }, 
        taskMtrixIntegration,
        { 
            id: 'generate_mtrix_files',
            preventOverrun: true,
        }
    );
    scheduler.addSimpleIntervalJob(jobMtrixIntegration);*/

    process.on('SIGINT', function() {
        Utils.log('FL','stopped application, stoping schedulers');
        Utils.closeLogFile();
        scheduler.stop();
    });
}

Utils.log('FL','schedulers running');



