//use- api ke andar kya hoga aur kaise hoga uske kam me aaegi
async function registerController(req,res){
    const{username, password}= req.body;
}
async function loginController(req,res){
const{username, password}= req.body
}

module.exports= {
    registerController, 
    loginController
}
