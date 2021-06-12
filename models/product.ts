import { DataTypes } from 'sequelize';
import database from '../database/database';

const Product = database.define('Product',{
    
    product_name:{
        type: DataTypes.STRING
    },

    product_minInvestment: {
        type: DataTypes.NUMBER
    },

    product_maxInvestment: {
        type: DataTypes.NUMBER
    },

    product_monthlyRate: {
        type: DataTypes.NUMBER
    },

    product_planTime: {
        type: DataTypes.NUMBER
    },
})

export default Product;