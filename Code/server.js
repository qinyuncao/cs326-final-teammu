const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public'));
app.use(express.json());
//port 
const port = process.env.port || 8080;

app.get('/',function(req,res){
    console.log('hello');
    res.sendFile(__dirname + '/public/mainPage.html')
});

app.listen(port,() => {
    console.log(`Server listening at http://localhost:${port}`);
  })