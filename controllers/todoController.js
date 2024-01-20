import Todo from "../models/todo.js";
import User from "../models/user.js";

export const createTodo = async (req, res) => {
    try {
        if(!req.body.todo){
            res.status(404).send({message: 'todo is required'})
        }
       const todo = await Todo.create({
        todo: req.body.todo,
        user:req.user.id
       })

       res.status(200).send(todo);

    } catch (error) {
        
    }
    console.log(req.user);
}

export const getTodos = async (req, res) => {
    console.log(req.user.id);
    try {
        const todos = await Todo.find({user:req.user.id})
    res.status(200).send(todos)
    console.log(req.user);
    } catch (error) {
        res.status(404).send("no todos found for this user")
    }
    
}

export const findTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        res.status(200).send(todo)
    } catch (error) {
        res.status(500).send(error.message)
    }
    console.log(req.user);
}

export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if(!todo) {
            res.status(404).send({message: 'Not Found'});
        }
    
        const user = await User.findById(req.user.id);
        // check if user
        if(!user ){
            res.status(401).send({message: 'user Not Found'});
        }
        // only the logged in user is allowed
        if(todo.user.toString() !== user.id){
            res.status(401).send({message: 'user not allowed'});
        }
    
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.send(updateTodo);
    } catch (error) {
        res.status(401).send(error.message);
    }
   
}

export const deleteTodo = async (req, res) => {
   try {
    const todo = await Todo.findById(req.params.id);

    if(!todo) {
        res.status(404)
        throw new Error({message: 'Not Found'});
    }

    const user = await User.findById(req.user.id);
    // check if user
    if(!user ){
        res.status(401)
        throw new Error({message: 'user Not Found'});
    }
    // only the logged in user is allowed
    if(todo.user .toString() !== user.id){
        res.status(401)
        throw new Error ({message: 'user not allowed'});
    }

    const deleteTodo = await Todo.findByIdAndDelete(req.params.id);
    res.send(deleteTodo);
   } catch (error) {
    res.status(401).send(error.message);
   }
}