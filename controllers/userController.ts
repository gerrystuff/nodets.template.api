import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';

//endpoint
class UserController {

  public async list(req: any, res: Response) {


    try {

      const users = await User.findAll();
      const userAuth = {
        uid: req.user.id,
        user_name: req.user.user_name
      }
      res.json({ ok: true, users, userAuth })

    } catch (error) {

      res.status(500).json({
        msg: error.parent.sqlMessage
      })

    }

  }
  public async create(req: Request, res: Response) {

    const { body } = req;


    try {

      //check username
      
      const checkuser:any = await User.findOne({where:{user_name:body.user_name}});

      if(checkuser){
        return res.status(400).json({
          ok:false,
          msg:'Usuario con ese nombre ya existe.'
        })
      }


      const user: any = User.build(body);

      //Encriptacion de contraseña

      const salt = bcrypt.genSaltSync();
      user.user_password = bcrypt.hashSync(body.user_password, salt);


      //Crea usuario en la db
      await user.save();

      res.status(201).json(
        {
          ok:true,
          uid:user.id,
        }
      );

    } catch (error) {

      res.status(500).json({
        msg: error.parent.sqlMessage
      })

    }

  }

  public async getOne(req: any, res: Response) {

    try {
      const { id } = req.params;
      const user: any = await User.findByPk(id);

      if (user) {

        const userAuth = {
          uid: req.user.id,
          user_name: req.user.user_name
        }

        res.json({ ok: true, user, userAuth });

      } else {
        res.status(404).json({
          msg: `the user with the id: ${id} does not exist.`
        })
      }


    } catch (error) {
      res.status(500).json({
        msg: error.parent.sqlMessage
      })
    }
  }





  public async delete(req: any, res: Response) {

    const { id } = req.params;

    try {

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          msg: `the user with the id: ${id} does not exist.`
        })
      }

      await user.destroy();

      const userAuth = {
        uid: req.user.id,
        user_name: req.user.user_name
      }
      res.json({ok:true,msg:'user eliminated.',userAuth});

    } catch (error) {

      res.status(500).json({
        msg: error.parent.sqlMessage
      })

    }

  }

  public async update(req:any, res: Response) {

    const { id } = req.params;
    const { body } = req;

    try {

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          msg: `the user with the id: ${id} does not exist.`
        })
      }


      await user.update(body);

      const userAuth = {
        uid: req.user.id,
        user_name: req.user.user_name
      }

      res.json({ ok: true, msg: 'user updated.',userAuth });

    } catch (error) {

      res.status(500).json({
        msg: error.parent.sqlMessage
      })

    }
  }

}
export const userController = new UserController();