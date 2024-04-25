const { default: mongoose } = require("mongoose");
// const FoodItems = require("../models/FoodItems");

exports.getFoodItems = async (req, res) => {
    try {
        const response = await mongoose.connection.db.collection("Food_Items").find({}).toArray();
        res.status(200).json(response
            // {

            //     success: true,
            //     data: response,
            //     message: 'Entire FoodItems data is fetched'
            // }
        );
    }
    catch (err) {
        console.error(err);
        res.status(500)
            .json({
                success: false,
                data: " server error",
                message: err.message,
            })
    }
}




exports.getFoodCategory = async (req, res) => {
    try {
        const response = await mongoose.connection.db.collection("Food_Category").find({}).toArray();
        res.status(200).json(response
            // {

            //     success: true,
            //     data: response,
            //     message: 'Entire FoodItems data is fetched'
            // }
        );
    }
    catch (err) {
        console.error(err);
        res.status(500)
            .json({
                success: false,
                data: " server error",
                message: err.message,
            })
    }
}


// exports.getFoodItemsById = async (req, res) => {
//     try {
//         const id=req.params.id;
//         const response = await FoodItems.findById({_id:id});
//         if(!response){
//             return res.ststus(404).json({
//                 success: false,
//                 message: `no  data is fetched`
//             })
//         }
//         res.status(200).json(
//             {
//                 success: true,
//                 data: response,
//                 message: `FoodItems ${id} data is fetched`
//             }
//         );
//     }
//     catch (err) {
//         console.error(err);
//         console.log(err);
//         res.status(500)
//             .json({
//                 success: false,
//                 data: " server error",
//                 message: err.message,
//             })
//     }
// }