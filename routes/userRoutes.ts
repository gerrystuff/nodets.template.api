import { Router } from 'express';
import { userController } from '../controllers/userController';
import { validarJWT } from '../middlewares/JTW';
import { validarCampos } from '../middlewares/FORMVAL';
import { check } from 'express-validator';



class UserRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/',
        [
            validarJWT
        
        ],
            userController.list);
        
        this.router.get('/:id',
        [    
            validarJWT
        ],
             userController.getOne);
        
        this.router.post('/',
        [
            check('user_name','El username es obligatorio.').not().isEmpty(),
            check('user_password','El password es obligatorio.').not().isEmpty(),
            validarCampos,
        ],
            userController.create);
        
        this.router.delete('/:id',
        [
            validarJWT
        ],
            userController.delete);
        
        this.router.put('/:id',[
            
            check('user_name','El username es obligatorio.').not().isEmpty(),
            validarJWT
        ],
            userController.update);

    }
}


const userRoutes = new UserRoutes();

export default userRoutes.router;
