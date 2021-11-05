const express = require('express');
const fs = require('fs');
const app = express();

//port 
const port = process.env.port || 8080;


app.use(express.json());
const filename1 = 'username.json';
let users = [];

//
app.get('/',function(req,res){
    console.log('hello');
    res.redirect('mainPage.html');
});

//When client only ask for users, return the users array to the respond
app.get('/api/users', function(req, res){
    //reload the users first
    reload();
    res.send(users);
  });


//When client ask for specific user
//use this when log in
app.get('/api/users/:username',function(req,res){
    //reload first
    reload();
    //Check if the database has this username, if not, return 404
    const user = users.find(c => c.username === req.params.inputUsername);
    if(!user) return res.send(false);
    res.send(true);
});

//When client want to create new username and password
//use this when sign up
app.post('/api/users', function(req,res){
    //reload the user first
    reload();

    const user = {
        email: req.body.inputEmail,
        username : req.body.inputUsername,
        password : req.body.inputPassword
    };
    users.push(user);
    let strIn = JSON.stringify(users);
    fs.writeFileSync(filename1, strIn);
    res.send(user);
});


function reload() {
    if (fs.existsSync(filename1)) {
        let someStr = fs.readFileSync(filename1);
        users = JSON.parse(someStr);
    }
    else {
        users = [];
    }
}

app.get('/login',function(req,res){
    res.redirect('logIn.html');
    //res.sendFile('logIn.css',{'root':'../'});
    //res.sendFile('logIn.js',{'root':'../'});
});

app.get('/signup',function(req,res){
    res.sendFile('signUp.html');
});


app.listen(port,() => {
    console.log(`Server listening at http://localhost:${port}`);
  })