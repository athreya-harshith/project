const home = (req,res) =>{
    // res.send(`<h1>This is home page </h1>    
    // <a href="/login">To Login click me</a>
    // <br/>
    // <br />
    // <a href="/register">To Login create Account</a>
    // <br /> 
    // <br />
    // <br />
    //  <a href="/logout" > To logout  click here  </a>
    // `)

    res.render('index')



}

module.exports = home