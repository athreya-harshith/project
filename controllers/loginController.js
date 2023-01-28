const {CreateJWTtoken,JwtVerify} = require('./authentication/authHandler')
const dab = require('./../models/db');
const bcrypt = require('bcrypt');
const  loginForm = (req, res) => {

  if(typeof req.cookies.token != 'undefined')
  {
    console.log('cookies exists')
    console.log(req.cookies.token)
    JwtVerify(req.cookies.token)
    .then( (d) =>{
      console.log(d)
      res.status(200).redirect('/')
    })
  
  } else{
    console.log('cookies not exists')  
  //   res.send(`proccedd to login  <form >
  // <input type="text" />
  // <input type="text" />
  // <button type="submit" >Login</button>

  // </form>`)

 

  res.render('login')
  // res.render('otpVerification')
}
// console.log(CreateJWTtoken('jkhk'))
}


const collectLoginData = (req,res) =>{
  let {Email,Password} = req.body;
   let payload = {Email,Password};
  const checkExisiting = async(Email) =>{
    if(req.body != undefined){
     
      const result = await dab.SignUp.findOne({
        attributes : ['id','password'],
        where:{
          email: Email

        }
      })
      if(result == null){
         res.status(404).send('We cannot find an account with that email address')
         return false
      }
      console.log(result.password)
     // let passwordCheck = await bcrypt.compare(Password, result.password);
     // console.log(passwordCheck)

        //  function(err, result) {
        // // result == true
        let content = {};
        if(await bcrypt.compare(Password, result.password))  {
        const token = await  CreateJWTtoken(payload);
        // res.status(200).cookie('token',token).send('Account created successfully')
        content.token=token;
        content.status = true;
          return content;
        }
        content.status = false;
      return content;
    }
  }
 checkExisiting(Email) .then( (content) =>{
       // console.log(bool)
        if( content.status){

      
      // console.log(content.token);
      //   console.log('ghgjh ')
       
        res.status(200).cookie('token',content.token).send('logged in!');
        }
 })

 .catch( (error) =>{
  console.log('Error occurred during checking existing user')
 })

 

  //res.send('data received for login check')
}






const otpCheckPage = (req,res) =>{
  res.send('otp collection')
}
module.exports.collectLoginData= collectLoginData;
module.exports.loginForm= loginForm;
exports.otpCheckPage =otpCheckPage;



// const f = async()=>{
//   Password="12345"
//   passwordCheck = await bcrypt.compare(Password, "$2b$10$ng/qHVbIeks55Puwo7eTHuxaxYFctwZyAn3Q/l0Ro/E09WGg7Qo62");
// console.log(passwordCheck);
// }
// f();
