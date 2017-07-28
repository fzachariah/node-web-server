var express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;
var app=express();

hbs.registerPartials(__dirname+"/views/partials");
app.set('view engine', 'hbs');

app.use(function(req,res,next){
    var now=new Date().toString();
    var log=now+" "+req.method+" "+req.url
    fs.appendFile("server.log",log+" ",function(err){
        if(err)
        {
            console.log('error occured');
        }
    });
    next();

});


app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentyear',function(){
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',function(text){
    return text.toUpperCase();
});



app.get("/",function(req,res){

    res.render('home.hbs',{pageTitle:'Welcome Page', 
                           welcome:'Febin'});

});

app.get('/about',function(req,res){

    res.render('about.hbs',{pageTitle:'About Page'});

});

app.get('/projects',function(req,res){

    res.render('projects.hbs',{pageTitle:'Portfolio Page'});

});


app.get('/bad',function(req,res){

    res.send({error:'Unable to process'});
})

app.listen(port,function(){
    console.log("Server is Up"+port);
});