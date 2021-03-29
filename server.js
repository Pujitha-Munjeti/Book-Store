const exp=require("express")
const app=exp();

const mc=require("mongodb").MongoClient;

// //import .env file
// require("dotenv").config();

const path=require("path")

//connect angular with web server

app.use(exp.static(path.join(__dirname,"dist/BookStore")));

//import api objects
const userApiObj=require("./APIS/user-Api");
const adminApiObj=require("./APIS/admin-Api");
const myOrdersApiObj=require("./APIS/myorders-Api");
const userCartApiObj=require("./APIS/usercart-Api");
const wishlistApiObj=require("./APIS/wishlist-Api");

//forward req obj to specific API based on path
app.use("/user",userApiObj)
app.use("/cart",userCartApiObj)
app.use("/wishlist",wishlistApiObj)
//app.use("/admin",adminApiObj)

//dburl
const dburl="mongodb+srv://Pujitha:cdb37@mongodb-cluster.daalo.mongodb.net/BookStore?retryWrites=true&w=majority";

//db connectivity
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(client=>{

    //get database object
    const databaseObj=client.db("BookStore");
    const booksCollectionObj=databaseObj.collection("books collection")
    const userCollectionObj=databaseObj.collection("users collection");
    const myOrdersCollectionObj=databaseObj.collection("my orders collection")
    const cartCollectionObj=databaseObj.collection("usercart")
    const wishlistCollectionObj=databaseObj.collection("wishlistcollection")

    //sharing collection object
    app.set("userCollectionObj",userCollectionObj)
    app.set("myOrdersCollectionObj",myOrdersCollectionObj)
    app.set("cartCollectionObj",cartCollectionObj)
    app.set("wishlistCollectionObj",wishlistCollectionObj)
    app.set("booksCollectionObj",booksCollectionObj)
   
    console.log("DB Server Started")
})
.catch(err=>console.log("err in db connection",err))



//middleware to handle invalid paths
app.use((req,res,next)=>{
    res.send({message:`${req.url} is invalid path`})
})

//error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:"error occured",reason:err.message})
})

//assign port number
const port=process.env.port||8080;
app.listen(port,()=>console.log(`Web server is on ${port}`))

