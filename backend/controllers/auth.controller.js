import {validationResult} from 'express-validator'
import userModel from './../models/auth.model.js';
import createUser from './../services/auth.services.js';


export const signup=async(req,res)=>{
     const errors=validationResult(req);
     if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()});
     }
     try {
          const {name,email,password}=req.body;

          const hashedPassword=await userModel.hashPassword(password);

          const user=await createUser({
               name,
               email,
               password:hashedPassword
          })
          const token=await user.generateAuthToken();
          res.json({user,token});
     } catch (error) {
          console.log(error);
          res.status(500).json({error:error.message});
     }
}


export const login=async(req,res)=>{
     const errors=validationResult(req);
     if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()});
     }
     try {
          const {email,password}=req.body;
          const user=await userModel.findOne({email});
          if(!user){
               return res.status(400).json({errors:[{msg:"Invalid credentials"}]});
          }
          const isMatch=await user.comparePassword(password);
          if(!isMatch){
               return res.status(400).json({errors:[{msg:"Invalid credentials"}]});
          }
          const token=await user.generateAuthToken();
          res.cookie("jwt", token, {
               maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
               httpOnly: true,
               sameSite: "strict",
               secure: false,
             });
          res.json({user,token});
     } catch (error) {
          console.log(error);
          res.status(500).json({error:error.message});
     }
}

export const checkAuth = async (req, res, next) => {
     try {
       res.status(200).json(req.user);
     } catch (error) {
       console.error("error in checking authentication", error);
       res.status(500).json({ message: "Server Error" });
     }
   };