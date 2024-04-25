const express = require('express')
const Order = require('../models/Orders')

// exports.orderData = async (req, res) => {
// // router.post('/orderData', async (req, res) => {
//     let data = req.body.order_data
//     await data.splice(0, 0, { Order_date: req.body.order_date })
//     console.log("1231242343242354", req.body.email)

//     //if email not exisitng in db then create: else: InsertMany()
//     let eId = await Order.findOne({ 'email': req.body.email })
//     console.log(eId)
//     if (eId === null) {
//         try {
//             console.log(data)
//             console.log("1231242343242354", req.body.email)
//             await Order.create({
//                 email: req.body.email,
//                 order_data: [data]
//             }).then(() => {
//                 res.json({ success: true })
//             })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)

//         }
//     }

//     else {
//         try {
//             await Order.findOneAndUpdate({ email: req.body.email },
//                 { $push: { order_data: data } }).then(() => {
//                     res.json({ success: true })
//                 })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)
//         }
//     }
// }



exports.orderData = async (req, res) => {

    try {
        const { order_data, email, order_date } = req.body;
        const response = await Order.create({ order_data, email, order_date });
        res.status(200).json({
            success: true,
            data: response,
            message: 'Order Created Successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: err.message
        });
    }
}


exports.myOrderData = async (req, res) => {
    // router.post('/myOrderData', async (req, res) => {
    try {
        // console.log(req.body.email)
        let eId = await (await Order.find({ 'email': req.body.email })).reverse()
        //console.log(eId)
        res.status(200).json(eId)
    } catch (error) {
        res.send("Error", error.message)
    }


};

