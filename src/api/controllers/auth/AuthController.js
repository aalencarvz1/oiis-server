const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../../database/models/Users");
const { Access_Profiles } = require("../../database/models/Access_Profiles");
const { Utils } = require("../utils/Utils");
const { User_Tokens } = require("../../database/models/User_Tokens");
const { createTransport } = require("nodemailer");
const config = require("../../config");
const validator = require("email-validator");
const { Sequelize } = require("sequelize");
const { RegistersController } = require("../modules/registers/RegistersController");


/**
 * class to handle authentication
 */
class AuthController extends RegistersController{

    static #cryptSalt = 10;    
    static userEmail = process.env.API_EMAIL || "jumbo.ti@jumboalimentos.com.br";
    static userEmailPassword = process.env.API_EMAIL_PASSWORD || "1#__Racnela07__XY##Z";
    static #mailTransport = null;

    /**
     * unsecure routes
     */
    static #unsecureRoutes = [        
        "/public",
        "/api/online",        
        "/api/endpoints",        
        "/api/controllers/auth/authcontroller/login",
        "/api/controllers/auth/authcontroller/refreshtoken",
        "/api/controllers/auth/authcontroller/register",
        "/api/controllers/auth/authcontroller/recover",
        "/api/controllers/auth/authcontroller/passwordchange",
        "/api/controllers/modules/outputs/sales/financial_collection/pix/integrations/sicredi/webhooks/5545991334657",
        "/api/controllers/modules/outputs/sales/financial_collection/pix/integrations/sicredi/webhooks/5545991334657/pix",
        "/api/controllers/modules/registers/midias/midia_controller/uploadfile",
        '/api/controllers/modules/webhooks/api_requests',
        '/api/test/'
    ];

    static getCryptSalt() {
        return AuthController.#cryptSalt;
    }

    /**
     * api login method
     * @returns object with token
     */
    static async login(req,res,next) {
        let body = req.body || {};
        Utils.log(req.method,body);
        if (!body.email || !body.password) return res.sendResponse(401,false,'missing data');
        let user = await Users.getModel().findOne({
            where:{email:(body.email||'').trim().toLowerCase()}
        });        
        if (!user) return res.sendResponse(401,false,'user not found'); 
        if (!bcrypt.compareSync(body.password, user.password)) return res.sendResponse(401,false,'password not match'); 
        let token = jwt.sign({id: user.id,access_profile_id:user.access_profile_id},process.env.API_SECRET, {expiresIn:/*process.env.API_TOKEN_EXPIRATION*/10});
        let refreshToken = jwt.sign({id: user.id,access_profile_id:user.access_profile_id}, process.env.API_REFRESH_SECRET, {expiresIn:process.env.API_REFRESH_TOKEN_EXPIRATION}); 
        
        user.last_token = token;
        user.last_timezone_offset = body?.currentTimeZoneOffset || 0;
        await user.save();

        let userToken = await User_Tokens.getModel().findOne({
            where:{
                user_id: user.id,
                token: token            
            }
        })
        if (!Utils.hasValue(userToken)) {
            try {
                await User_Tokens.getModel().create({
                    user_id: user.id,
                    token: token,
                    timezone_offset: user.last_timezone_offset
                });
            } catch (e) {
                Utils.log(e);
            }
        } else {
            userToken.timezone_offset = user.last_timezone_offset;
            await userToken.save();
        }

        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })
            .header('Authorization', token) //web applications use header, but others applications like mobile or direct request from database triggers, use only body
            .sendResponse(200,true,'logged',{token:token,refreshToken:refreshToken,user:user});
    }

    static async basicAuth(req, res, next) {        
        try {
            // check for basic auth header
            if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
                return res.sendResponse(401,false,'Missing Authorization Header'); 
            }
        
            // verify auth credentials
            const base64Credentials =  req.headers.authorization.split(' ')[1];
            Utils.log(base64Credentials);
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
            Utils.log(credentials);
            const [username, password] = credentials.split(':');
            Utils.log(username,password);
            let user = await Users.getModel().findOne({where:{email:(username||'').trim().toLowerCase()}});
            Utils.log('user',user);
            if (!user) return res.sendResponse(401,false,'user not found'); 
            Utils.log('ok0');
            if (!bcrypt.compareSync(password, user.password)) return res.sendResponse(401,false,'password not match'); 
            

            // attach user to request object
            req.user = user
            Utils.log('ok2');
            next();
        } catch (e) {
            Utils.log(e);
            res.sendResponse(517,false,e.message || e);
        }
    }


    /**
     * api refreshToken method
     * @returns object with token
     */
    static async refreshToken(req,res,next) {
        Utils.log('cokies',req.cookies);
        let refreshToken = req.cookies.refreshToken || req.body.refreshToken;
        if (!refreshToken) return res.status(401).json({success:false,message:'no refresh token'});
        jwt.verify(refreshToken,process.env.API_REFRESH_SECRET,async function(error,decoded) {
            if (error) return res.status(401).json({success:false,message:error.message || error});
            req.user = {id:decoded.id};  
            Utils.log("in refresh token",req.user,decoded);
            if (Utils.hasValue(req.user.id)) {
                let user = await Users.getModel().findOne({where:{id:req.user.id}});
                if (!user) return res.sendResponse(401,false,'user not found'); 

                let token = jwt.sign({id: decoded.id},process.env.API_SECRET, {expiresIn:process.env.API_TOKEN_EXPIRATION});            
                let newRefreshToken = jwt.sign({id: user.id,access_profile_id:user.access_profile_id}, process.env.API_REFRESH_SECRET, {expiresIn:process.env.API_REFRESH_TOKEN_EXPIRATION}); 

                user.last_token = token;
                user.last_timezone_offset = req.body?.currentTimeZoneOffset || 0;
                await user.save();

                let userToken = await User_Tokens.getModel().findOne({
                    where:{
                        user_id: user.id,
                        token: token            
                    }
                });
                Utils.log('usertoekn',userToken);
                if (!userToken) {
                    try {
                        await User_Tokens.getModel().create({
                            user_id: user.id,
                            token: token,
                            TIMEZONEOFFSET: user.last_timezone_offset
                        });
                    } catch (ex) {
                        if (ex.name.trim().toLowerCase().indexOf('unique') == -1) {
                            throw ex;
                        } //else async other request already inserted new user token at same time
                    }
                } else {
                    userToken.TIMEZONEOFFSET = user.last_timezone_offset;
                    await userToken.save();
                }
                //jwt.destroy(refreshToken);
                res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })
                    .header('Authorization', token) //web applications use header, but others applications like mobile or direct request from database triggers, use only body
                    .sendResponse(200,true,'logged',{token:token,refreshToken:newRefreshToken,user:user});
            } else {
                res.sendResponse(401,false,'user not found');
            }
            //next();
        });
        
    }

    /**
     * api register method
     * @returns object with token
     */
    static async register(req,res,next) {
        let body = req.body || {};
        Utils.log(req.method,body);
        if (!body.email || !body.password) return res.sendResponse(401,false,'missing data');
        if (body.password.trim().length < 8) return res.sendResponse(401,false,'password < 8');
        let user = await Users.getModel().findOne({where:{email:(body.email||'').trim().toLowerCase()}},{raw:true});
        if (user) return res.sendResponse(401,false,'user already register'); 
        user = await Users.getModel().create({
            creator_user_id : Users.SYSTEM,
            access_profile_id : Access_Profiles.DEFAULT,
            email:(req.body.email||'').trim().toLowerCase(),
            password: bcrypt.hashSync(req.body.password,(process.env.API_USER_PASSWORD_CRIPTSALT||10)-0)
        });
        let token = jwt.sign({id: user.id,access_profile_id:user.access_profile_id},process.env.API_SECRET, {expiresIn:process.env.API_TOKEN_EXPIRATION});
        let refreshToken = jwt.sign({id: user.id,access_profile_id:user.access_profile_id}, process.env.API_REFRESH_SECRET, {expiresIn:process.env.API_REFRESH_TOKEN_EXPIRATION}); 

        user.last_token = token;
        user.last_timezone_offset = req.body?.currentTimeZoneOffset || 0;
        await user.save();

        await User_Tokens.getModel().create({
            user_id: user.id,
            token: token,
            TIMEZONEOFFSET: user.last_timezone_offset
        });

        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })
            .header('Authorization', token) //web applications use header, but others applications like mobile or direct request from database triggers, use only body
            .sendResponse(200,true,'logged',{token:token,user:user});       
    }

    /**
     * middleware check autorization, called by all routes (app.use)
     */
    static checkToken(req,res,next) {      
        console.log('xxxxxxxxxxx',req.url,req.headers['x-access-token'],typeof req.headers['x-access-token'], !Utils.hasValue(req.headers['x-access-token']));  
        if (AuthController.#unsecureRoutes.find(el=>req.url.trim().toLowerCase().indexOf(el.trim().toLowerCase()) === 0)
            && (
            !Utils.hasValue(req.headers['x-access-token'])
            || (
                req.url.trim().toLowerCase().indexOf("/public") === 0
                || req.url.trim().toLowerCase().indexOf("/api/online") === 0
                || req.url.trim().toLowerCase().indexOf("/api/controllers/auth/authcontroller") === 0
            )
        )) {
            //unsecure route
            next(); 
        } else {       
            //secure route 
            let token = req.headers['x-access-token'];
            if (!token) {
                let authorization = req.headers['authorization'];
                if (Utils.hasValue(authorization)) {
                    Utils.log('checking basic for incomming connection ...', authorization);
                    return AuthController.basicAuth(req,res,next);
                } else {                
                    return res.status(401).json({success:false,message:'no token'});
                }
            }
            jwt.verify(token,process.env.API_SECRET,function(error,decoded) {
                if (error) return res.status(401).json({success:false,message:error.message || error});
                req.user = decoded;
                next();
            });
        }
    }

    static async sendEmailRecoverPassword(req,res){
        try {
            let email = req.body.email;
            let path = req.body.path;
            Utils.log('req.body',req.body);
            if (Utils.hasValue(email)) {
                if (validator.validate(email)) {

                    let user = await Users.getModel().findOne({
                        raw:true,
                        where:{
                            email:email
                        }
                    });


                    if (user) {

                        AuthController.#mailTransport = AuthController.#mailTransport || createTransport(config[`smtp_${process.env.NODE_ENV||'development'}`]);
                        let verify = await AuthController.#mailTransport.verify();
                        Utils.log('verify',verify);
                        if (verify === true) {

                            let token = jwt.sign({id: user.id},process.env.API_RECOVER_SECRET, {expiresIn:process.env.API_TOKEN_EXPIRATION});

                            let response = await AuthController.#mailTransport.sendMail({
                                from:config[`smtp_${process.env.NODE_ENV||'development'}`]?.auth?.user || process.env.EMAIL,
                                to: email,
                                subject: config[`app_${process.env.NODE_ENV||'development'}`] || process.env.API_NAME || 'Api' + '-Recuperacao de senha',
                                text: `Acesse este link para criar uma nova senha: ${path}/${token}`,
                                html: `Acesse este link para criar uma nova senha: <br /><a href="${path}/${token}">Alterar senha</a>`,
                            });
                            Utils.log(response);
                            if (response && (response.response||'').indexOf('Ok') > -1) {
                                res.sendResponse(200,true);
                            } else {
                                res.sendResponse(517,false,"error on send email");    
                            }
                        } else {                
                            res.sendResponse(517,false,"error on send email");
                        }            
                    } else {
                        res.sendResponse(517,false,"email not found");    
                    }
                } else {
                    res.sendResponse(517,false,"invalid email");
                }
            } else {
                res.sendResponse(517,false,"empty email");
            }
        } catch(e) {
            Utils.log(e);
            res.sendResponse(517,false,e.message || e);
        }
    }

    static async recover(req,res,next) {
        AuthController.sendEmailRecoverPassword(req,res,next);
    }

    static async passwordChange(req,res,next) {        
        Utils.logi(`${this.name}`,`passwordChange`);
        try {            
            let token = req.body.token || '';
            let password = req.body.password || '';
            if (!Utils.hasValue(token) || !Utils.hasValue(password)) {
                res.sendResponse(517,false,"missing data");
            } else {
                if (password.trim().length < 8) return res.sendResponse(401,false,'password < 8');
                jwt.verify(token,process.env.API_RECOVER_SECRET,async function(error,decoded) {
                    if (error) return res.status(401).json({success:false,message:error.message || error});
                    let user = await Users.getModel().findOne({
                        where:{
                            id:decoded.id
                        }
                    });
                    if (user) {
                        user.password = bcrypt.hashSync(password,(process.env.API_USER_PASSWORD_CRIPTSALT||10)-0);

                        await user.save();
                        return res.sendResponse(200,true);
                    } else {
                        return res.status(401).json({success:false,message:'user not found'});
                    }
                });
            }
        } catch(e) {
            Utils.log(e);
            res.sendResponse(517,false,e.message || e);
        }
        Utils.logf(`${this.name}`,`passwordChange`);
    }
}

module.exports = {AuthController}