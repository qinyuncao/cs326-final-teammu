const express = require('express');
const fs = require('fs');
const app = express();


//port 
const port = process.env.port || 3000;


app.use(express.json());

const filename1 = 'username.json';
let users = [];

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
    const user = users.find(c => c.username === req.params.username);
    if(!user) return res.status(404).send('The username is not exist');
    res.send(user);
});

//When client want to create new username and password
//use this when sign up
app.post('/api/users', function(req,res){
    //reload the user first
    reload();

    if(!req.body.username||!req.body.password ||req.body.username.length<5){
        res.status(400).send('Username and Password is required with minimum 5 charactor')
        return;
    }

    const user = {
        id: users.length+1,
        username : req.body.username,
        password : req.body.password
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




app.listen(port,() => {
    console.log(`Server listening at http://localhost:${port}`);
  })