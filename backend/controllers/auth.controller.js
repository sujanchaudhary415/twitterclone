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