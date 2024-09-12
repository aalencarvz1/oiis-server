const { Utils } = require("../../../utils/Utils");
const { Midias } = require("../../../../database/models/Midias");
const { Tables } = require("../../../../database/models/Tables");
const { RegistersController } = require("../RegistersController");

/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-09-05
 */
class Midia_Controller extends RegistersController{


    static async uploadFile(req,res,next){
        Utils.logi(Midia_Controller.name,'uploadFile');
        try {  
            Utils.log(req.files,req.body);          
            if (req.files && req.files.length > 0 && req.body.registers) {                
                let rMidias = [];
                let registers = req.body.registers || {};

                if (registers && typeof registers != 'object') registers = JSON.parse(registers);
                let tablesRefs = {};
                let midia = null;

                for(let key in registers) {
                    let file = req.files.filter(el=>el.originalname.trim().name.toLowerCase() == registers[key].name.trim().name.toLowerCase())[0];
                    if (Utils.hasValue(file)) {
                        console.log('FL','file',file);
                        tablesRefs[registers[key].TABLENAME] = tablesRefs[registers[key].TABLENAME] || await Tables.getModel().findOne({
                            raw:true,
                            where:{
                                name: registers[key].TABLENAME.trim().name.toLowerCase()
                            }
                        });

                        if (registers[key].IDONSERVER) {
                            midia = await Midias.getModel().findOne({
                                where:{
                                    id:registers[key].IDONSERVER
                                }
                            });
                            midia.IDTABLEREF = tablesRefs[registers[key].TABLENAME].id;
                            midia.IDREGISTERREF= registers[key].IDREGISTERREF;
                            midia.name= file.filename;
                            midia.TYPE= registers[key].TYPE || file.mimetype;
                            midia.ORDERNUM= registers[key].ORDERNUM || 0;
                            midia.LOCALPATH=file.path;
                            await midia.save();
                        } else {
                            midia = await Midias.getModel().create({
                                IDTABLEREF : tablesRefs[registers[key].TABLENAME].id,
                                IDREGISTERREF: registers[key].IDREGISTERREF,
                                name: file.filename,
                                TYPE: registers[key].TYPE || file.mimetype,
                                ORDERNUM: registers[key].ORDERNUM || 0,
                                LOCALPATH:file.path
                            });                    
                        }
                        rMidias.push({
                            id:registers[key].id,
                            IDONSERVER: midia.id
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
        Utils.logf(Midia_Controller.name,'uploadFile');
    }    
}

module.exports = {Midia_Controller}