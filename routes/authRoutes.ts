import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validarJWT } from '../middlewares/JTW';


class AuthRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/login',authController.login);
        this.router.get('/renew',validarJWT,authController.validate)

    }
}


const authRoutes = new AuthRoutes();

export default authRoutes.router;
