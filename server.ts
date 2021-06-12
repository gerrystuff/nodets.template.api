import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

import database from './database/database';
import productRoutes from './routes/productRoutes';

class Server {

    public app:Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
        this.connectDB();
    }

    config():void{
        this.app.set('port',process.env.PORT || 8080);
      
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));

    }

    routes():void{
      this.app.use('/api/users',userRoutes);
      this.app.use('/auth',authRoutes);
      this.app.use('/api/products',productRoutes);

    }

    async connectDB():Promise<void>{
        try {
            
            await database.authenticate();
            console.log('Database online.');
        } catch (error) {
            console.log(error);
        }
    }
    
    start():void{
      this.app.listen(this.app.get('port'), () => {
          console.log('Server on port',this.app.get('port'))
      });
    }
    
    }
    
    export default Server;