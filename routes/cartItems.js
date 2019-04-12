const route = require('express').Router();

const {
    cartItems, products, vendors, users } = require('../db.js');


route.get('/', async (req, res) => {

    const CartItems = await cartItems.findAll({
        include: [
            { model: users },
            {
                model: products,
                include: [vendors]
            }
        ]
    })

    //console.log(products);
    res.send(CartItems);

})

route.get("/:id", async (req, res) => {

    const CartItems = await cartItems.findAll({
        where: {
            userId: req.params.id
        },
        include:
            [

                {
                    model: products,
                    include: [vendors]
                }
            ]
    }


    )

    res.send(CartItems);
})
route.post('/', async (req, res) => {


    try {
        const previousEntry = cartItems.findOne({
            where: {
                productId: req.body.productId,
                userId: req.body.userId
            }
        }).then((data) => {
            if (data) {
                data.update({
                    quantity: parseInt(data.quantity) + 1
                })
            }
            else {
                cartItems.create({
                    'quantity': 1,
                    'vendorName': req.body.vendorName,
                    'productId': req.body.productId,
                    'userId': req.body.userId,

                })
            }
        })

        res.send({ success: true })
    } catch (e) {
        res.send({ success: false, err: e.message })
    }
})








module.exports = {
    route
}