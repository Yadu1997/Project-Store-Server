const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next) =>{
    console.log("inside jwtMIddleware");
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    if (token) {
        try {
            const jwtResponse = jwt.verify(token,process.env.JWT_PASSWORD)
            console.log(jwtResponse);
            req.payload=jwtResponse.userId
            next()
        } catch (error) {
            res.status(401).json("invalid token please login")
        }
    }else{
        res.status(401).json("Missing token")
    }
}

module.exports = jwtMiddleware