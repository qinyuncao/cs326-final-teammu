const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public'));
app.use(express.json());
const filename1 = 'username.json';
const filename2 = 'review.json';
let users = [];
let reviews= [];

//port 
const port = process.env.port || 8080;


//Main page
app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/mainPage.html');
});

//Log in
app.get('/login',function(req,res){
    res.sendFile(__dirname + '/public/logIn.html');
});

//Sign up
app.get('/signup',function(req,res){
    res.sendFile(__dirname + '/public/signUp.html');
});

//When client only ask for users, return the users array to the respond
app.get('/users', function(req, res){
    //reload the users first
    reload();
    res.send(users);
  });


//When client ask for specific user
//use this when sign up
app.get('/users/:username',async function(req,res){

    //reload first
    reload();
    //Check if the database has this username, if not, return 404
    const user = users.find(c => c.username === req.params.username);
    if(!user){ 
        res.writeHead(200,{'Content-Type': 'application/javascript'});
        res.end();}
    else{
        res.writeHead(404,{'Content-Type': 'application/javascript'});
        res.end();
    }

});

//When client want to create new username and password
//use this when sign up
app.post('/users', async function(req,res){
    //reload the user first
    reload();

    const user = {
        email: req.body.email,
        username : req.body.username,
        password : req.body.password
    };
    users.push(user);
    let strIn = JSON.stringify(users);
    fs.writeFileSync(filename1, strIn);
    res.send(user);
});

//use this when log in
app.get('/users/login/:username/:password',async function(req,res){
    //reload first
    reload();
    //Check if the database has this username, if not, return 404
    const username = users.find(c => c.username === req.params.username);
    const password = users.find(c => c.password === req.params.password);
    if(username && password){ 
        res.writeHead(200,{'Content-Type': 'application/javascript'});
        res.end();}
    else{
        res.writeHead(404,{'Content-Type': 'application/javascript'});
        res.end();
    }
});

//Use this when write a review
//Save everything they write
app.post('/review',async function(req,res){
    //reload first
    reload();
    //Check if the database has this username, if not, return 404
    const review = req.body;
    reviews.push(review);
    let strIn = JSON.stringify(reviews);
    fs.writeFileSync(filename2, strIn);
    res.send(reviews);
});

//reload the database
function reload() {
    if (fs.existsSync(filename1)) {
        let someStr = fs.readFileSync(filename1);
        users = JSON.parse(someStr);
    }
    else {
        users = [];
    }
    if (fs.existsSync(filename2)) {
        let someStr2 = fs.readFileSync(filename2);
        reviews = JSON.parse(someStr2);
    }
    else {
        reviews = [];
    }
    
}

app.listen(port,() => {
    console.log(`Server listening at http://localhost:${port}`);
  })