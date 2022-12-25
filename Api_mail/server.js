//jshint esversion 6
const express =require("express");
const bodypaser = require("body-parser");
const request =require("request");
const https =require("https");
const url  = require("inspector");

const app =express();

app.use(express.static("public"));
app.use(bodypaser.urlencoded({extended:true}));


app.get("/",function(req,res)
{
    res.sendFile(__dirname + "/signup.html");
});


app.post("/",function(req,res){
    const fname =req.body.fname;
    const lname =req.body.lname;
    const email =req.body.emailAdd;
    
    var data= {
        members:[
            {
                email_address:email,
                status:"subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:lname
            }           
         }
        ]
    };

    const  url ="https://us21.api.mailchimp.com/3.0/lists/c73fd35d61";
    const jsonData=JSON.stringify(data);

    const options ={
        method:"POST",
        auth:"thabiso:4920d1f88fc422a00836f7075ceec232-us21"

    }

    const request = https.request(url,options,function(response){

        response.on("data",function(data)
        {
            console.log(JSON.parse(data));
        })

        request.write(jsonData);
        request.end();
    });




    
} );
app.listen(3000,function(){
    console.log("Server is  running on Port:3000");

});



//Api key
//4920d1f88fc422a00836f7075ceec232-us21
//c73fd35d61

