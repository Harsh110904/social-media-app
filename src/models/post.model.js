const mongoose = require ("mongoose ")
const postSchema= new mongoose.schema({
    image: String,
    caption: String,
    user:{
        type:mongoose.schema.Types.ObjectId,
        ref:"users"
    }
})
const postModel = mongoose.model("post", postSchema)
module.exports= postModel