import mongoose from "mongoose";

export const productsModel=mongoose.model(
    "products",
    new mongoose.Schema(
        {
            title: String, 
            price: Number, 
            stock: {
                type: Number, 
                default: 0
            },
            code: {
                type: String, 
                unique: true
            }
        }, 
        {
            timestamps: true, 
            // collection: "productos2019",
            strict: false
        }
    )
)

// productsModel.find()