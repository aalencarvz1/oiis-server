import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import Utils from "../utils/Utils.js";
import config from "../../config.js";
import validator  from "email-validator";
import { createTransport } from "nodemailer";
import Users from "../../database/models/Users.js";
import User_Tokens from "../../database/models/User_Tokens.js";
import Access_Profiles from "../../database/models/Access_Profiles.js";
import EndPointsController from "../endpoints/EndPointsController.js";

/**
 * class to handle authentication
 */
export default class AuthController {


    static #cryptSalt : number = 10;    
    static userEmail : string = process.env.API_EMAIL || "jumbo.ti@jumboalimentos.com.br";
    static userEmailPassword : string = process.env.API_EMAIL_PASSWORD || "1#__Racnela07__XY##Z";
    static #mailTransport : any = null;
    static #tokenSiginOptions : SignOptions = {
        expiresIn: Utils.firstValid([process.env.API_TOKEN_EXPIRATION,10])
    }
    static #refreshTokenSiginOptions : SignOptions = {
        expiresIn: Utils.firstValid([process.env.API_REFRESH_TOKEN_EXPIRATION,60])
    }

    /**
     * unsecure routes
     */
    static #unsecureRoutes = [        
        "/api/docs",
        "/public",
        "/uploads",
        "/api/online",        
        "/api/endpoints",        
        "/api/controllers/auth/authcontroller/login",
        "/api/controllers/auth/authcontroller/refresh_token",
        "/api/controllers/auth/authcontroller/register",
        "/api/controllers/auth/authcontroller/send_email_recover_password",
        "/api/controllers/auth/authcontroller/password_change",
        "/api/controllers/modules/outputs/sales/financial_collection/pix/integrations/sicredi/webhooks/5545991334657",
        "/api/controllers/modules/outputs/sales/financial_collection/pix/integrations/sicredi/webhooks/5545991334657/pix",
        "/api/controllers/modules/registers/midiascontroller/upload_file",
        '/api/controllers/modules/webhooks/api_requests',
        '/api/test/'
    ];

    static getCryptSalt() : number {
        return AuthController.#cryptSalt;
    }

    /**
     * api login method
     * @returns object with token
     */
    static async login(req: Request,res: Response) : Promise<void> {
        try {
            const body = req.body || {};
            if (!body.email || !body.password) return res.sendResponse(401,false,'missing data');
            const user : Users | null = await Users.findOne({
                where:{email:(body.email||'').trim().toLowerCase()}
            });        
            if (!Utils.hasValue(user)) return res.sendResponse(401,false,'user not found'); 
            if (!bcrypt.compareSync(body.password, user.password)) return res.sendResponse(401,false,'password not match'); 
            const token = jwt.sign({id: user.id,access_profile_id:user.access_profile_id},process.env.API_SECRET, AuthController.#tokenSiginOptions);
            const refreshToken = jwt.sign({id: user.id,access_profile_id:user.access_profile_id}, process.env.API_REFRESH_SECRET, AuthController.#refreshTokenSiginOptions); 
            
            user.last_token = token;
            user.last_timezone_offset = body?.currentTimeZoneOffset || 0;
            await user.save();

            const userToken : User_Tokens | null = await User_Tokens.findOne({
                where:{
                    user_id: user.id,
                    token: token            
                }
            })
            if (!Utils.hasValue(userToken)) {
                try {
                    await User_Tokens.create({
                        user_id: user.id,
                        token: token,
                        timezone_offset: user.last_timezone_offset
                    });
                } catch (e2: any) {
                    //paralell requests are causing this error
                    if(!(e2.message.toLowerCase().indexOf("unique") > -1 || e2.message.toLowerCase().indexOf("duplicate") > -1)) {
                        Utils.logError(e2);
                    }
                }
            } else {
                userToken.timezone_offset = user.last_timezone_offset;
                await userToken.save();
            }

            res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })
                .header('Authorization', token) //web applications use header, but others applications like mobile or direct request from database triggers, use only body
                .sendResponse(200,true,'logged',{token:token,refreshToken:refreshToken,user:user});
        } catch (e) {
            Utils.logError(e);
            res.sendResponse(517,false,e?.message || e);
        }
    }


    static async basic_auth(req: Request, res: Response, next: NextFunction) : Promise<void> {        
        try {
            // check for basic auth header
            if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
                return res.sendResponse(401,false,'Missing Authorization Header'); 
            }
        
            // verify auth credentials
            const base64Credentials =  req.headers.authorization.split(' ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
            const [username, password] = credentials.split(':');
            const user : Users | null = await Users.findOne({where:{email:(username||'').trim().toLowerCase()}});
            if (!Utils.hasValue(user)) return res.sendResponse(401,false,'user not found'); 
            if (!bcrypt.compareSync(password, user.password)) return res.sendResponse(401,false,'password not match'); 
            

            // attach user to request object
            req.user = user
            next();
        } catch (e: any) {
            Utils.logError(e);
            res.sendResponse(517,false,e?.message || e);
        }
    }


    /**
     * api refreshToken method
     * @returns object with token
     */
    static async refresh_token(req: Request,res: Response) : Promise<void> {
        try {
            const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
            if (!refreshToken) {
                res.status(401).json({success:false,message:'no refresh token'});
                return;
            }
            jwt.verify(refreshToken,process.env.API_REFRESH_SECRET,async function(error: any,decoded: any) {
                try {
                    if (error) return res.status(401).json({success:false,message:error.message || error});
                    req.user = {id:decoded.id};  
                    if (Utils.hasValue(req.user.id)) {
                        const user : Users | null = await Users.findOne({where:{id:req.user.id}});
                        if (!Utils.hasValue(user)) return res.sendResponse(401,false,'user not found'); 

                        const token = jwt.sign({id: decoded.id},process.env.API_SECRET, AuthController.#tokenSiginOptions);            
                        const newRefreshToken = jwt.sign({id: user.id,access_profile_id:user.access_profile_id}, process.env.API_REFRESH_SECRET, AuthController.#refreshTokenSiginOptions); 

                        user.last_token = token;
                        user.last_timezone_offset = req.body?.currentTimeZoneOffset || 0;
                        await user.save();

                        const userToken : User_Tokens | null = await User_Tokens.findOne({
                            where:{
                                user_id: user.id,
                                token: token            
                            }
                        });
                        if (!userToken) {
                            try {
                                await User_Tokens.create({
                                    user_id: user.id,
                                    token: token,
                                    timezone_offset: user.last_timezone_offset
                                });
                            } catch (ex: any) {
                                if (ex.name.trim().toLowerCase().indexOf('unique') === -1) {
                                    throw ex;
                                } //else async other request already inserted new user token at same time
                            }
                        } else {
                            userToken.timezone_offset = user.last_timezone_offset;
                            await userToken.save();
                        }
                        //jwt.destroy(refreshToken);
                        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })
                            .header('Authorization', token) //web applications use header, but others applications like mobile or direct request from database triggers, use only body
                            .sendResponse(200,true,'logged',{token:token,refreshToken:newRefreshToken,user:user});
                    } else {
                        res.sendResponse(401,false,'user not found');
                    }         
                } catch (e2) {
                    Utils.logError(e2);
                    res.sendResponse(517,false,e2?.message || e2);
                }   
            });
        } catch (e) {
            Utils.logError(e);
            res.sendResponse(517,false,e?.message || e);
        }        
    }

    /**
     * api register method
     * @returns object with token
     */
    static async register(req: Request,res: Response) : Promise<void> {
        try{
            const body = req.body || {};
            if (!body.email || !body.password) return res.sendResponse(401,false,'missing data');
            if (body.password.trim().length < 8) return res.sendResponse(401,false,'password < 8');
            let user : Users | null = await Users.findOne({
                raw:true,
                where:{
                    email:(body.email||'').trim().toLowerCase()
                }
            });
            if (user) return res.sendResponse(401,false,'user already register'); 
            user = await Users.createData({
                creator_user_id : Users.SYSTEM,
                access_profile_id : Access_Profiles.DEFAULT,
                email:(req.body.email||'').trim().toLowerCase(),
                password: bcrypt.hashSync(req.body.password,Utils.toNumber(Utils.firstValid([process.env.API_USER_PASSWORD_CRIPTSALT,10])))
            },false , false);
            console.log('wqeqwdsa',user);
            if(Utils.hasValue(user)){
                
                const token = jwt.sign({id: user.id,access_profile_id:user.access_profile_id},process.env.API_SECRET, AuthController.#tokenSiginOptions);
                const refreshToken = jwt.sign({id: user.id,access_profile_id:user.access_profile_id}, process.env.API_REFRESH_SECRET, AuthController.#refreshTokenSiginOptions); 

                user.last_token = token;
                user.last_timezone_offset = req.body?.currentTimeZoneOffset || 0;
                await user.save();

                await User_Tokens.create({
                    user_id: user.id,
                    token: token,
                    timezone_offset: user.last_timezone_offset
                });

                res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })
                    .header('Authorization', token) //web applications use header, but others applications like mobile or direct request from database triggers, use only body
                    .sendResponse(200,true,'logged',{token:token,user:user});
            } else {
                res.sendResponse(501,false,'User not created')
            }
        } catch(e){
            res.sendResponse(501,false,e.message)
        }       
    }

    /**
     * middleware check autorization, called by all routes (app.use)
     */
    static check_token(req: Request,res: Response,next: NextFunction) : void {      
        try {
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
                const token : unknown = req.headers['x-access-token'];
                if (!Utils.hasValue(token)) {
                    const authorization = req.headers['authorization'];
                    if (Utils.hasValue(authorization)) {
                        AuthController.basic_auth(req,res,next);
                        return;
                    } else {                
                        res.status(401).json({success:false,message:'no token'});
                        return;
                    }
                }
                jwt.verify(token as string,(process as any).env.API_SECRET,function(error:any,decoded:any) {
                    try {
                        if (error) return res.status(401).json({success:false,message:error.message || error});
                        req.user = decoded;
                        next();
                    } catch (e2) {
                        Utils.logError(e2);
                        res.sendResponse(517,false,e2?.message || e2);
                    }
                });
            }
        } catch (e) {
            Utils.logError(e);
            res.sendResponse(517,false,e?.message || e);
        }
    }

    static async send_email_recover_password(req: Request,res: Response) : Promise<void> {
        try {
            const email = req.body.email;
            const path = req.body.path;
            if (Utils.hasValue(email)) {
                if (validator.validate(email)) {

                    const user = await Users.findOne({
                        raw:true,
                        where:{
                            email:email
                        }
                    });


                    if (user) {

                        AuthController.#mailTransport = AuthController.#mailTransport || createTransport(config[`smtp_${process.env.NODE_ENV||'development'}`]);
                        const verify = await AuthController.#mailTransport.verify();
                        if (verify === true) {

                            const token = jwt.sign({id: user.id},(process as any).env.API_RECOVER_SECRET, AuthController.#tokenSiginOptions);

                            const response = await AuthController.#mailTransport.sendMail({
                                from:config[`smtp_${process.env.NODE_ENV||'development'}`]?.auth?.user || process.env.EMAIL,
                                to: email,
                                subject: config[`app_${process.env.NODE_ENV||'development'}`] || process.env.API_NAME || 'Api' + '-Recuperacao de senha',
                                text: `Acesse este link para criar uma nova senha: ${path}/${token}`,
                                html: `Acesse este link para criar uma nova senha: <br /><a href="${path}/${token}">Alterar senha</a>`,
                            });
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
        } catch(e: any) {
            Utils.logError(e);
            res.sendResponse(517,false,e?.message || e);
        }
    }

    static async recover(req: Request,res: Response) : Promise<void> {
        AuthController.send_email_recover_password(req,res);
    }

    static async password_change(req: Request,res: Response) : Promise<void> {
        //Utils.logi(`${this.name}`,`password_Change`);
        try {            
            const token = req.body.token || '';
            const password = req.body.password || '';
            if (!Utils.hasValue(token) || !Utils.hasValue(password)) {
                res.sendResponse(517,false,"missing data");
            } else {
                if (password.trim().length < 8) return res.sendResponse(401,false,'password < 8');
                jwt.verify(token,(process as any).env.API_RECOVER_SECRET,async function(error: any,decoded: any) {
                    try {
                        if (error) return res.status(401).json({success:false,message:error.message || error});
                        const user : Users | null = await Users.findOne({
                            where:{
                                id:decoded.id
                            }
                        });
                        if (user) {
                            user.password = bcrypt.hashSync(password,Utils.toNumber(Utils.firstValid([process.env.API_USER_PASSWORD_CRIPTSALT,10])));

                            await user.save();
                            return res.sendResponse(200,true);
                        } else {
                            return res.status(401).json({success:false,message:'user not found'});
                        }
                    } catch (e2) {
                        Utils.logError(e2);
                        res.sendResponse(517,false,e2?.message || e2);
                    }
                });
            }
        } catch(e : any) {
            Utils.logError(e);
            res.sendResponse(517,false,e?.message || e);
        }
        //Utils.logf(`${this.name}`,`password_Change`);
    }


    static {
        [
            this.login,
            this.basic_auth,
            this.refresh_token,
            this.register,
            this.check_token,
            this.send_email_recover_password,
            this.password_change,
        ].forEach(el=>EndPointsController.markAsRequestHandler(el));
    }

}