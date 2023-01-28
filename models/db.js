const {Sequelize,DataTypes } = require('sequelize');




const {sequelize} = require('../config/dbConfig')
const {SignUp} = require('./signUpModel')
const {mailModel} = require('./mailModel')
const {ProductModel} = require('./ProductModel')
const {addressModel} = require('./addressModel')
const {orderModel} = require('./orderModel')
const {cartModel} = require('./cartModel')
const {cartProductModel} = require('./cartProductModel')
const {categoryModel} = require('./categoryModel')




sequelize.sync({force:false}).then(() => {
    // SignUp
// mailModel
// ProductModel
// addressModel
// orderModel
cartModel
// cartProductModel
// categoryModel

}).catch((error) => {
    console.error('Unable to create table : ', error);
});


  


    const db = {}
    db.sequelize = sequelize;
    db.SignUp = SignUp;
    db.mailModel = mailModel ;
    db.ProductModel = ProductModel;
    db.categoryModel = categoryModel;
    db.cartModel = cartModel;
    db.addressModel = addressModel;

    // SignUp.hasMany(addressModel,{foreignKey:`userId`});
    // addressModel.belongsTo(SignUp,{foreignKey:`id`});


    const ch = async() =>{
       // const users =  await sequelize.query("ALTER TABLE  cart_products ADD FOREIGN KEY (productId) REFERENCES datasets(id)", { type: QueryTypes.ALTER });
       try{


        const users = await sequelize.query( //'Delimiter // '+ 
        'CREATE TRIGGER create_cartId  AFTER INSERT ON users' + 
        ' FOR EACH ROW BEGIN ' +
        'INSERT INTO carts(userId)  VALUES (NEW.id );'+ 
      'END;' )
     
    
         console.log(users)
       } catch(e){
        console.log(e.message)
       }
      
      
    }
   
  
   ch()



module.exports = db;
// module.exports = mailModel;