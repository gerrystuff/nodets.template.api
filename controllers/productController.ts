import { Request,Response } from 'express';
import Product from '../models/product';


//endpoint
class ProductController {

  public async list (req:any,res:Response) {
      
    try {

      const products = await Product.findAll();

      const userAuthenticated = {
        uid: req.user.id,
        user_name: req.user.user_name
      }
            
      res.json({products,userAuthenticated})
    
  } catch (error) {
    
      res.status(500).json({
      msg: error.parent.sqlMessage
      })

  }


}

public async create (req: Request, res:Response) {


}

  public async getOne (req: Request, res:Response) {

  }





  public async delete (req:Request,res:Response){
  

 }

  public async update (req:Request,res:Response){

   

}
}
export const productController = new ProductController();