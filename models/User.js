const {Schema, Types, model} = require("mongoose") //should i write model here


const userSchema = new Schema({   // rewrite
    userName:{
        type:String, 
        required:true, 
        trim:true, 
        unique:true, 
    },
    email:{
        type:String, 
        required:true, 
        trim:true, 
        unique:true, 
    }, 
    thoughts:[
        {
            type:Schema.Types.ObjectId, 
            ref:"Thought", 
        }
    ],
    friends:[
        {
            type:Schema.Types.ObjectId, 
            ref:"User", 
        }
    ]
},{
    toJSON:{virtuals:true}, 
    id:false,
})



userSchema.virtual("friendAccount").get(function(){return this.friends.length})

const User = model ("User", userSchema)
module.exports = User