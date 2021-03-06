const express = require('express')

const {
  db}=require('./db.js')

const app = express()

const vendor=require('./routes/vendor')
const product=require('./routes/product')
const user=require('./routes/user')
const cart=require('./routes/cartItems')

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',
  express.static(__dirname + '/public')
)
app.use('/vendors',vendor.route);
app.use('/products',product.route);
app.use('/users',user.route);
app.use('/cartItems',cart.route);

const PORT=process.env.PORT || 8989 ;

db.sync().then(()=>{
  app.listen(PORT,()=>console.log(`started at localhost:http://localhost:${PORT}`));
})
