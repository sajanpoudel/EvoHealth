import mongoose from "mongoose";
const uri = "mongodb+srv://miyannishar786:123@cluster0.ufj2zib.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = async ()=>{
    const res = await mongoose.connect(uri)
    if(res){
        console.log("Connected successfully to the database")
    }
}

export default connectToMongo