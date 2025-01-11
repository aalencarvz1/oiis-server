
import express from 'express';
import cors from 'cors';
import ModelsController from './controllers/database/ModelsController.js';
import { AsyncTask, SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';
import SicrediPixIntegrationsController from './controllers/modules/integrations/sicredi/SicrediPixIntegrationsController.js';
import AuroraStockIntegrationsController from './controllers/modules/integrations/aurora/AuroraStockIntegrationsController.js';
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
                await SicrediPixIntegrationsController.checkCompletedsPix();
            } catch (e) {
                console.error(e);
            }
        },
        (err) => {             
            console.error(err) 
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
                await AuroraStockIntegrationsController.integrate();
            } catch (e) {
                console.error(e);
            }
        },
        (err) => { 
            console.error(err);
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


    //MTRIX INTEGRATION FILES GENERATE 
    /*const taskMtrixIntegration = new AsyncTask(
        'simple task', 
        async () => { 
            try {
                await MtrixIntegrationsController.generateFiles();
            } catch (e) {
                console.error(e);
            }
        },
        (err) => { 
            console.error(err);
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
        scheduler.stop();
    });
}

api.listen(process.env.API_SCHEDULERS_PORT||3001,function(){
    console.info(`schedulers api running ${process.env.NODE_ENV} on port ${process.env.API_SCHEDULERS_PORT||3001} at ${new Date()}`)
});




