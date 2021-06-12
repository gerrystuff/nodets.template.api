import { Request,Response } from 'express';
import  bcrypt  from 'bcryptjs';
import User from '../models/user';
import { generarJWT } from '../middlewares/JTW';


//endpoint
class AuthController {

  public async login (req:Request,res:Response) {

    const {user_name,user_password } = req.body;

    try {

      //verificamos que el usuario exista.

      const user:any = await User.findOne({where:{user_name: user_name}});

      if(!user) {
        return res.status(400).json({
          ok:false,
          msg: 'Nombre de usuario incorrecto.'
        })
      }


    //verificamos contraseña
    const validPassword:boolean = bcrypt.compareSync(user_password,user.user_password);

    if(!validPassword){
      return res.status(400).json({
        ok:false,
        msg: 'Contraseña incorrecta.'
      })
    }

    //generar el JWT
    const token = await generarJWT(user.id);
    


      res.json({
        ok:true,
        uid:user.id,
        name:user_name,
        token

      })
      
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        ok:false,
        msg: 'Hable con el administrador'
      })
    }

}
  public async validate (req: any, res:Response) {

    res.json({
      ok:true,
      uid:req.user.id,
      name:req.user.user_name
    })
    req.user

}

  public async getOne (req: Request, res:Response) {

  }





  public async delete (req:Request,res:Response){
  

 }

  public async update (req:Request,res:Response){

   

}
}
export const authController = new AuthController();