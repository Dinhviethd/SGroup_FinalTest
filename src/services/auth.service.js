import userModel from '../models/users.model.js'
import { hashPassword, comparePassword } from '../utils/password.util.js'
import { JwtUtils } from '../utils/jwt.util.js'
class AuthService { 
    constructor() {
    this.user = userModel;}
   async Login(email, password){
     try {
       const existedUser = await this.user.findOne({email});
       if(!existedUser){
         throw new Error("User not found");
       }
       console.log("existedUser: ",existedUser);
       await comparePassword(password, existedUser.password);
 
       const accessToken = await JwtUtils.generateAccessToken({id: existedUser._id, role: existedUser.role});
       const refreshToken = await JwtUtils.generateRefreshToken({id: existedUser._id, role: existedUser.role});
       
       console.log("accessToken: ", accessToken);
       console.log("refreshToken: ", refreshToken);
       
       return {accessToken, refreshToken};
     } catch (err) {
       throw new Error("Error logging in user: " + err.message);
     }
   }
 
   async Register(username, email, password) {
     try{
     const existedUser = await this.user.findOne({email});
     console.log("existedUser: ",existedUser);
     
     if(existedUser){
       throw new Error("User already exists");
     }
 
     const hashedPass = await hashPassword(password);
     const newUser = new this.user({
       username,
       email,
       password: hashedPass,
     });
     const savedUser = await newUser.save();
     console.log("savedUser: ", newUser);
     if(!savedUser){
       throw new Error("Error saving user");
     }
     return savedUser;
   }
     catch(error){
       throw new Error("Error registering user: " + error.message);
     }
   }
 }
 export default new AuthService();