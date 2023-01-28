
const { sequelize } = require('./../models/db');
const db = require('./../models/db');
const {CreateJWTtoken,JwtVerify} = require('./authentication/authHandler')

const cartPage = async (req,res) =>{
  if(req.query.p_id !== 'undefined' && req.cookies.token != 'undefined'){
 console.log(req.query.p_id)
// id	userId	Quantity	amount	

try  {
 
  // console.log(data.email)
  if(req.cookies.token == undefined ){
    res.status(307).redirect('/login');
 } else{
 let data = await JwtVerify(req.cookies.token)
  
 
  let user = await sequelize.query(`select id from users where email="${data.Email}"`)
  console.log(user[0][0].id)
  // if(user) res.redirect('/login')
  let cart = await sequelize.query(`select id from carts where userId="${user[0][0].id}"`)
  let ADD_to_CART = await sequelize.query(`INSERT INTO cart_products (cartId,productId) values (${cart[0][0].id}, ${req.query.p_id})`)

  // let cart_productsId = await sequelize.query(`select * from datasets where id in (select productId from cart_products  where cartId=${cart[0][0].id})  `)
  let result = await sequelize.query(`select d.*,count(cp.productId) as ind_total from datasets d  inner join cart_products cp on  d.id = cp.productId  where cp.cartId =${cart[0][0].id} group by cp.productId`)
 
  // console.log(cart_productsId[0][0].productId)

  console.log(result[0])
  //taril 
  // let a  = await sequelize.query(`SELECT d.id,count(*) as individual_total ,count(c.productId) * d.price as price  FROM datasets d INNER JOIN cart_products c on d.id = c.productId IN ( select a.productId from carts inner join cart_products a on carts.id = a.cartId where carts.userId = "${user[0][0].id}"  )  GROUP BY c.productId  ; ;`)
  // console.log(a[0][0])




  // let sub_total = await sequelize.query(`SELECT d.id,count(*) as individual_total ,count(c.productId) * d.price as price  FROM datasets d INNER JOIN cart_products c on d.id = c.productId GROUP BY c.productId ;`)
  // // console.log(sub_total)

   let total_quantity = 0;
   let total_price = 0;

  for(let i = 0;i < result[0].length ; i++){
    total_price  = total_price + ( result[0][i].ind_total * result[0][i].price);
    total_quantity = total_quantity +   result[0][i].ind_total;
  }
  // console.log(Math.round(total_price))
  total_price =  Math.round(total_price)
  console.log(total_quantity)


  // let result  = await sequelize.query(`SELECT d.id ,d.name,d.category,d.mrp,d.price,d.description,count(c.productId) as total_quantity FROM datasets d INNER JOIN cart_products c on d.id = c.productId GROUP BY c.productId ;`)
  // let result  = await sequelize.query(`SELECT d.id ,d.name,d.category,d.mrp,d.price,d.description,count(c.productId) as total_quantity FROM datasets d INNER JOIN cart_products c on d.id = c.productId  IN ( select a.productId from carts inner join cart_products a on carts.id = a.cartId where carts.userId = "${user[0][0].id}"  ) GROUP BY c.productId ;`)


//  console.log(result)
  res.render('cart', { result,total_price,total_quantity })
  // res.json({"message":"i can get this"})

 }
  // console.log(cart[0][0].id)
 }
  catch(e){
    console.log(e.message)
  //  console.log('kdfhkdhfk')
  }
      // console.log(req.cookies.token)
     
      // db.cartModel
     

   
   // res.status(200).cookie('p_id'+req.query.p_id, req.query.p_id).render('cart')
  } 
  else{
    console.log('im in cart page') 
      
    res.status(200).render('cart')

  }     
  
  
}







const deleteCartItem  = (req,res)=>{
  console.log(req.query)
  // add-to-cart/delete-product
  console.log('from delete')
  if(req.query.p_id !== 'undefined'){
    res.clearCookie('p_id'+req.query.p_id);
    // res.redirect("/") 
  }
   res.render('cart',{
    'result':"result"
   })
}



let k = async() =>{
 
}

k()
exports.cartPage = cartPage;
exports.deleteCartItem  = deleteCartItem