require("dotenv").config();
const express = require("express");
const app = express();
const path =require("path");
const hbs = require("hbs");
const port = process.env.PORT || 3000
require("./db/conn");
const Product = require("./models/product");

const { json } = require("express");
const { log } = require("console");

//built in middleware
const staticPath =path.join(__dirname,"../public");
const templatePath =path.join(__dirname,"../templates/views");
const partialsPath =path.join(__dirname,"../templates/partials");

//register the hbs
app.set('view engine','hbs');
app.set("views",templatePath);
hbs.registerPartials(partialsPath);
app.use(express.static(staticPath));
//app.use(express.static(staticPath));
//it through get the data from form and convert to json formate 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get("/",(req,res) => {
   res.render("index");
});
app.post("/", async (req,res) => { 
    try{
      
        const pro = new Product({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            amount:req.body.amount,
            data: req.body.data,
            status:"current",
        }) 
        
        const result2 = await Product.findOne({email:req.body.email})
        
         if(result2)
         {
            res.status(400).send("Order already presnet");
             
         }
         else
         {
            const result = await pro.save();
            res.render("congress");
         }       
    }
    catch(error){
    res.status(400).send(error);
    }
});
app.get("/admin",(req,res) => {
    res.render("admin");
    
 });
 app.get("/resultpage",(req,res) => {
    res.render("resultpage");
 });
 app.post("/admin", async (req,res) => {
    try{
         
        const a_email =  process.env.EMAIL;
        const a_password = process.env.PASSWORD; 
    if (a_email===req.body.email && a_password===req.body.pass)
        {
            const result4 = await Product.find({status:"current"})
             res.render("admin" , { "result4":result4 } ); 

        }
        else
        {

            res.status(400).send("email and password wrong ");
               
        }
       
    }
    catch(error)
    {
        res.status(400).send(error);   
    }

 });
 app.get("/delete",(req,res) => {
   res.render("delete");
   
});
 app.post("/delete", async (req,res) => {
    try{
         a_password = process.env.PASSWORD
        if(a_password===req.body.password)
        {
           
           await Product.deleteOne({_id:req.body.orderid},function(error){
               if(!error){ 
                  res.render("delete");
               }
               else{  console.log(error); }
           });
            
            
        }
        else{
        res.status(400).send("Please Enter right information  ");
       }
    }
    catch(error){  console.log(error); }
 });

app.listen(port, (req,res ) =>{
    console.log(`post number ${port}`);
});