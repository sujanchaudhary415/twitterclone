import userModel from './../models/auth.model.js';

const createUser=async({name,email,password,location,proffession})=>{
    if(!name || !email || !password || !location || !proffession)
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
        password,
        proffession,
        location
    });
    return user;
}

export default createUser;