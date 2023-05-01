const jwt = require("jsonwebtoken");

const auth = (req, res, next)=>{
    const token = req.headers.authorization;
    if(token){
        try {
            const decoded=jwt.verify(token.split(" ")[1], "userPass")
            if(decoded){
                console.log(decoded)
                req.body.authorId = decoded.authorId;
                req.body.author = decoded.author;
                next()
            } else{
                res.send({msg:"Please login"})
            }
        } catch (error) {
            res.send({msg: error})
        }
    } else {
        res.status(200).send({msg:"Please login."})
    }
   
}

module.exports = auth;