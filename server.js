const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{ //acept only function.
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err) =>{
    if (err){
      console.log('Unable to append in aerver.log');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

var text = "welcome"
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});



app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle : 'Home Page',
    welcomeMessage : 'Welcome to Home Page'
  })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
      pageTitle : 'About Page'

    });
});

app.get('/bad',(req,res)=>{
  res.send({errorMessage : "Not able to fullfill this request at this time"});
});

app.listen(port,()=>{
  console.log(`Application is listening in ${port}`);
});
