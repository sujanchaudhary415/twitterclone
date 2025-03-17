import userModel from './../models/auth.model.js';

const createUser=async({name,email,password})=>{
    if(!name || !email || !password)
    {
        throw new Error("All fields are required");
    }
    const emailExists=await userModel.findOne({email});

    if(emailExists)
    {
        throw new Error("Email already exists");
    }

    const user=await userModel.create({
        name,
        email,
        password
    });
    return user;
}

export default createUser;