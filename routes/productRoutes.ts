import { Router } from 'express';
import { productController } from '../controllers/productController';
import { validarJWT  } from '../middlewares/JTW';



class ProductRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/',[validarJWT],productController.list);
        //pendientes
        this.router.get('/:id',[validarJWT],productController.getOne);
        this.router.post('/',[validarJWT],productController.create);
        this.router.delete('/:id',[validarJWT],productController.delete);
        this.router.put('/:id',[validarJWT],productController.update);

    }
}


const productRoutes = new ProductRoutes();

export default productRoutes.router;
