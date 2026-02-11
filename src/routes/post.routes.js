const express= require("express")
const router = express.Router();
const jwt= require ('jsonwebtoken')
/* POST  /api/posts[protected] */
router.post('/',(req,res)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message: "Unautharized access, please login first "
        })
    }
})




module.exports= router;
