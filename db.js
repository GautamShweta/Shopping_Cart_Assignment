const Sequelize = require('sequelize')


const db = new Sequelize({
  dialect: 'sqlite',
  storage: __dirname + '/Shopping_Cart.db'

})

const vendors = db.define('vendor', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const products=db.define('product',{
  name:{
    type: Sequelize.STRING,
    allowNull: false
  },
  price:{
   type:Sequelize.DECIMAL(12,2),
   allowNull:false
  },
  qty:{
  type:Sequelize.INTEGER,
  allowNull:false
  }
})

const users=db.define('user',{
  name:{
    type: Sequelize.STRING,
    allowNull: false
  }
 
})

const cartItems=db.define('cartItem',{
  quantity:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  vendorName:{
    type:Sequelize.STRING,
    allowNull:false
  }
})
vendors.hasMany(products,{onDelete:'cascade'});
products.belongsTo(vendors);

users.hasMany(cartItems,{onDelete:'cascade'});
cartItems.belongsTo(users);


products.hasMany(cartItems,{onDelete:'cascade'});
cartItems.belongsTo(products);

module.exports = {

  db, vendors,products,users,cartItems
}


