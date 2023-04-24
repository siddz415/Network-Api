const {Schema, Types, model} = require("mongoose")

const reactionSchema = new Schema({
    reactionId :{
        type:Schema.Types.ObjectId,
        default:() => new Types.ObjectId()
    }, 

    username:{
        type:String, 
        required:true, 
    },
    reaction:{
        type:String, 
        required:true,  
    }, 
    createdAt:{
        type:Date, 
        default:Date.now, 
    },
},{
    toJSON:{virtuals:true}
} )

const thoughtSchema = new Schema({
    username:{
        type:String, 
        required:true, 
        trim:true, 
        unique:true, 
    },
    thought:{
        type:String, 
        required:true, 
        trim:true, 
        unique:true, 
    }, 
    createdAt:{
        type:Date, 
        default:Date.now, 
    },
    reactions:[reactionSchema],
},{
    toJSON:{virtuals:true}
} )

thoughtSchema.virtual("reactionAccount").get(function(){return this.reactions.length})

const Thought = model ("Thought", thoughtSchema)
module.exports = Thought