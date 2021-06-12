import { Response, Request } from "express";
import User  from '../models/user';
const jwt = require('jsonwebtoken');




export const generarJWT = (uid = '') => {
   
    return new Promise((resolve,reject) => {
        const payload = { uid };

        jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn: '4h'
        },(err: any,token:any) => {
     
            if(err){
                console.log(err)
                reject('No se pudo generar el token.')
            }else{
                resolve(token);
            }
        });
        
    })

};




export const validarJWT = async (req:any, res:Response, next:any) => {

    const token = req.header('x-token');


    if(!token){
        return res.status(401).json({
            msg: 'No existe token en la peticion'
        })
    }


    try {

      const {uid} = jwt.verify(token,process.env.SECRET_KEY);
      
      //leer el usuario que coresponde al uid
      const user = await User.findByPk(uid);

        if(!user){
            return res.status(401).json({
                msg:'Toke no valido - usuario no existe en DB'
            })
        }


      req.user = user;

      next();        
    
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }


}


