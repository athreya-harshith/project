const { JwtVerify } = require("./authentication/authHandler")

// const uprofile = async (req,res)=>
// {
//     res.render('uprofile')
// }

const checkProfile = async(req, res) => {
    if(JwtVerify(req.cookies.token)){
        res.render('userProfile')
    }
    else{
        req.status(404).send('incorrect url parsed!')
    }

}

exports.checkProfile = checkProfile;