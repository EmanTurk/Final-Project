import User from '../models/user.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from 'express';
import multer from 'multer';
import protect from '../middleware/authMiddleware.js';



export const createUser = async (req, res) => {
    const {name, email, address, password} = req.body.formData;
    console.log(req.body)
    try{    
    if(!name || !email || !password || !address){
        res.status(404)
        throw new Error ("please fill all fields")
    }
    
    const userExists = await User.findOne({email}) //to avoid repetition-using same email twice.

    if(userExists){
        res.status(404)
        throw new Error ("user already exists")
    }
        
    
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            address,
            email,
            password: hashedPassword
        })
        if(user){
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token:generateToken(user._id)
            });
        } else{
            res.status(400)
            throw new Error ("invalid user data")
        }
        

      
    } catch(error){
        res.status(500).json({message: error.message});
    }
}
//this function to update the profile- after setProfile...


export const updateProfile = async (req, res, next) => {
    console.log('Hello, Im the update function')
    // Retrieve user ID from the request (added by the protect middleware)
    const userId = req.user._id;
  
    try {
      const { username, linkedIn, fieldOfWork, interests, location, bio } = req.body;
      const profilePicture = req.file.path; // Access the uploaded file path
  
      // Update the user's profile in the database
      const updatedUser = await User.findByIdAndUpdate(userId, {
        profilePicture,
        username,
        linkedIn,
        fieldOfWork,
        interests,
        location,
        bio
      }, { new: true });
  
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).send('Internal Server Error');
    }
  };

///////////

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        if(!email || !password) {
            res.status(401)
            throw new Error ('all fields are required')
        }
        const user  = await User.findOne({email})

        if(user && (await bcrypt.compare(password, user.password))){
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token:generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error ("invalid credentials")
        }
    } catch(err){
        res.send(err.message)
    }
}


export const getMe = async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id);

    res.status(200).send({
        id: _id,
        name,
        email
    })
}


export const getAllUsers = async(req, res) =>{
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

 export const findUserById = async(req,res) =>{
    const {id} = req.params;
        try {
            const user = await User.findById(id)
            if(!user){
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user)
        } catch (error) {
            console.error('Error finding user by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
 }

  export const updateUser = async (req, res) =>{
    console.log(req.user);
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {new: true});
        res.status(200).send(updatedUser)
        
    } catch (error) {
        console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).send(deletedUser);
    } catch (error) {
        console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}


 const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:"30d"
    })
 }

 const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploaded files

// ...

// Update the updateProfile route to handle file uploads
router.post('/updateProfile', protect, upload.single('profilePicture'), async (req, res) => {
  try {
    // Access the uploaded file using req.file
    const { profilePicture, username, linkedIn, fieldOfWork, interests, location, bio } = req.body;
    
    // Handle saving the uploaded file and other profile data to your database
    // Make sure to save the file path or other relevant information in the database
    // You may need to configure storage options in multer for file handling

    // Return a success response or error response as needed
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


