const { Utils } = require("../../../utils/Utils");
const { Midias } = require("../../../../database/models/Midias");
const { DataTables } = require("../../../../database/models/DataTables");
const { RegistersController } = require("../RegistersController");

/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-09-05
 */
class MidiasController extends RegistersController{


    static async uploadFile(req,res,next){
        Utils.logi(MidiasController.name,'uploadFile');
        try {  
            Utils.log(req.files,req.body);          
            if (req.files && req.files.length > 0 && req.body.registers) {                
                let rMidias = [];
                let registers = req.body.registers || {};

                if (registers && typeof registers != 'object') registers = JSON.parse(registers);
                let tablesRefs = {};
                let midia = null;

                for(let key in registers) {
                    let file = req.files.filter(el=>el.originalname.trim().toUpperCase() == registers[key].NAME.trim().toUpperCase())[0];
                    if (Utils.hasValue(file)) {
                        console.log('FL','file',file);
                        tablesRefs[registers[key].TABLENAME] = tablesRefs[registers[key].TABLENAME] || await DataTables.getModel().findOne({
                            raw:true,
                            where:{
                                NAME: registers[key].TABLENAME.trim().toUpperCase()
                            }
                        });

                        if (registers[key].IDONSERVER) {
                            midia = await Midias.getModel().findOne({
                                where:{
                                    ID:registers[key].IDONSERVER
                                }
                            });
                            midia.IDTABLEREF = tablesRefs[registers[key].TABLENAME].ID;
                            midia.IDREGISTERREF= registers[key].IDREGISTERREF;
                            midia.NAME= file.filename;
                            midia.TYPE= registers[key].TYPE || file.mimetype;
                            midia.ORDERNUM= registers[key].ORDERNUM || 0;
                            midia.LOCALPATH=file.path;
                            await midia.save();
                        } else {
                            midia = await Midias.getModel().create({
                                IDTABLEREF : tablesRefs[registers[key].TABLENAME].ID,
                                IDREGISTERREF: registers[key].IDREGISTERREF,
                                NAME: file.filename,
                                TYPE: registers[key].TYPE || file.mimetype,
                                ORDERNUM: registers[key].ORDERNUM || 0,
                                LOCALPATH:file.path
                            });                    
                        }
                        rMidias.push({
                            ID:registers[key].ID,
                            IDONSERVER: midia.ID
                        });
                    }
                }            
                
                res.data = rMidias;
                res.sendResponse(200,true);
            } else {
                Utils.log('FL',req.files,req.body.registers);
                throw new Error("no file(s) uploaded(s) or missing data");
            }
        } catch (e) {
            Utils.log(e);
            res.sendResponse(517,false,e.message || e,null,e);
        }
        Utils.logf(MidiasController.name,'uploadFile');
    }    
}

module.exports = {MidiasController}