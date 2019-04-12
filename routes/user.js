const route = require('express').Router();
const {
    users } = require('../db.js')
route.get('/:name', async (req, res) => {

    
    const Users = await users.findAll(
        {
           
            where: {
                'name': req.params.name
            }
        }

    )
    
    res.send(Users);

})

// route.post('/', async (req, res) => {

//     try {
//         await products.create({
//             'name': req.body.name,

//         })
//         res.send({ success: true })
//     } catch (e) {
//         res.send({ success: false, err: e.message })
//     }
// })

module.exports = {
    route
}