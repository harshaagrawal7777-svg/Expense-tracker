import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken';

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"});
}

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
     return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      name: newUser.username,
      email: newUser.email,
      token: generateToken(newUser._id),
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login =async (req,res)=>{
    const {email,password}= req.body;

    try{
        const userExist = await User.findOne({email});
        if(!userExist){
            return res.status(400).json({message:"User does not exist"});
        }
        
        const isMatch= await userExist.comparePassword(password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        return res.status(200).json({
            _id: userExist._id,
            name: userExist.name,
            email: userExist.email,
            token: generateToken(userExist._id),
            message: "User logged in successfully",
        });

    }
    catch (error) {
    return res.status(500).json({ message: error.message });
  }

}


