import bcrypt from "bcryptjs";

export const comparePassword = async (pass, hashedPass) => {
    try {
        if(!pass || !hashedPass){
            throw new Error("Password or hashed password is missing");
        }
        const isMatch = await bcrypt.compare(pass, hashedPass);
        if(!isMatch){
            throw new Error("Password does not match");
        }
        return isMatch;
    } catch(err) {
        throw new Error("Error comparing password: " + err.message);
    }
};

export const hashPassword = async (password) => {
    try {
        if(!password){
            throw new Error("Password is required for hashing");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch(err) {
        throw new Error("Error hashing password: " + err.message);
    }
}