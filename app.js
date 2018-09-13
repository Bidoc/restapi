const express = require ('express');
const app = express();
const morgan = require ('morgan');
const mongoose = require ('mongoose');

const productRoutes = require ('./api/routes/products')
const ordersRoutes = require ('./api/routes/orders')

mongoose.connect('mongodb+srv://bido:'+ process.env.MONGO +'@node-rest-shop-9mtph.mongodb.net/test?retryWrites=true',{
    useNewUrlParser: true
});

app.use(morgan('dev'));
//Handling body-parser, since express v4.16.*. It's already included by default.
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET")
        return res.status(200).json({});
        
    }
    next();
});

//routes which should handle requests.
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

app.use((req, res, next) => {
    const error = new Error ('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });

});

module.exports = app;