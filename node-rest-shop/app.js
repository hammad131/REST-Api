const express = require('express');
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/user')


//mongoDb connection
mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@cluster0.k17bm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser :true,
    useUnifiedTopology: true
})

mongoose.Promise = global.Promise

// middleware
app.use(morgan('dev'))

//body parser
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Header", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    }
    next();
    
})

//Routes for handling request
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/user', userRoutes)

//404 error
app.use((req, res, next) => {
    const error = new Error('not found')
    error.status = 404
    next(error);
})

// 500 error
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports = app ;