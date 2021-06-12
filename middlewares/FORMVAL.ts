import { validationResult } from "express-validator";

const { response } = require('express');

export const validarCampos = (req:Request,res = response,next:any) => {
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errores.mapped()
        });
    }

    next();

}