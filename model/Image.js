const mongoose = require("mongoose")
const Schema = mongoose.Schema


const ImageSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    image:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Image = mongoose.model("Image",ImageSchema)

module.exports=Image