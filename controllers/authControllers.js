
const home = async (req,res)=>{
    try{
        res.status(200).send("This is Home Page");
    }catch(error){
        res.status(404).send("Page not found");
    }
}
const register= async (req,res)=>{
    try{
        res.status(200).send("This is registration Page");
    }catch(error){
        res.status(404).send("Page not found");
    }
}
const login= async (req,res)=>{
    try{
        res.status(200).send("This is login Page");
    }catch(error){
        res.status(404).send("Page not found");
    }
}

module.exports = {home,register,login};
