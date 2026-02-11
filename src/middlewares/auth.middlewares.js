const jwt= require("jsonwebtoken")
const userModel= require("./models/user.model")
async function authMiddleware(req,res)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message: "Unautharized access, please login first "
        })
    }
    try{
    const decoded = jwt.verify(token, proccess.env.JWT_SECRET)
    const user = await userModel.findOne({
        _id:decoded.id
    })
    req.user=user 
    next() 
    } catch(err){
        return res.status(401).json({
            message: "Invalid token, please login again"
        })
    }
}