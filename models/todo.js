import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    todo: { 
        type:String,
        required:true,
    },
}, {
    timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema )
export default Todo;