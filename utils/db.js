const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1:27017/mern_admin'
const connectDb = async ()=>{
    try{
        await mongoose.connect(URI);
        console.log("Database Connected Successfully");        
    }catch(error){
        console.log("Database not Connected")
    }
}
module.exports = connectDb;
