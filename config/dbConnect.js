import mongoose from "mongoose";

const dbConnect = async () =>{
    try{
        const connected = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb connected ${( connected).connection.host}`);
        mongoose.set('strictQuery',false)
    }catch(error){
        console.log(`Error:${error.message}`);
        process.exit(1);
    }
}

export default dbConnect;