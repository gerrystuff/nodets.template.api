import { DataTypes,SchemaOptions } from 'sequelize';
import database from '../database/database';

const User = database.define('User',{
    
    user_name:{
        type: DataTypes.STRING
    },

    user_password: {
        type: DataTypes.STRING
    },
    user_role: {
        type: DataTypes.STRING,
    }
})


export default User;