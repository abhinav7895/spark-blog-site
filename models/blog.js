import {Schema, model} from "mongoose";

const blogSchema = new Schema({
    title : {
        type : String,
        required : true,
        maxlength : 100
    },
    body : {
        type : String,
        required : true
    },
    coverImage : {
        type : String,
        required : false
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "user",
    }
}, {timestamps : true});


export default model("blog", blogSchema);