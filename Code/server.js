const express = require('express');
const { MongoClient } = require("mongodb");
const app = express();

app.use(express.static('public'));
app.use(express.json());


let url;
if(!process.env.MONGODB_URI) {
    const secrets = require('./secrets.json');
    url = secrets.url;
 }
 else {
    url = process.env.MONGODB_URI;
 }

const client = new MongoClient(url);

client.connect(err => {
    if(err){
        console.log(err);
    }
    else{
        console.log('Connected to the server!')
        app.listen(process.env.PORT || 8210);
    }
});

//Main page
app.get('/',async function(req,res){
    const curuserid = await client.db("finalProject").collection('currentuser').findOne({'index':0});
    if (curuserid.userid) {
        res.sendFile(__dirname + '/public/mainPage2.html');
    }
    else {
        res.sendFile(__dirname + '/public/mainPage.html');
    }
});

app.get('/currentuser',async function(req,res) {
    const result = await client.db("finalProject").collection('currentuser').findOne({'index':0});
    res.send(JSON.stringify(result.userid));
});

app.get('/currenthall',async function(req,res) {
    const result = await client.db("finalProject").collection('currenthall').findOne({'index':0});
    res.send(JSON.stringify(result.hallid));
});

app.post('/currentuser',async function(req,res) {
    await client.db("finalProject").collection('currentuser').updateOne({'index':0},{$set: {userid: req.body.user}});
    res.send(JSON.stringify('Current User Updated'));
});

app.post('/currenthall',async function(req,res) {
    await client.db("finalProject").collection('currenthall').updateOne({'index':0},{$set: {hallid: req.body.hall}});
    res.send(JSON.stringify('Current Hall Updated'));
});

//When client ask for specific user
//use this when sign up
//*
app.get('/users/:username',async function(req,res){
    //Check if the database has this username, if not, return 404
    const result = await client.db("finalProject").collection("username").findOne({'username':req.params.username});
    if(!result){ 
        res.writeHead(200,{'Content-Type': 'application/javascript'});
        res.end();
    }
    else{
        res.writeHead(404,{'Content-Type': 'application/javascript'});
        res.end();
    }

});

//When client want to create new username and password
//use this when sign up
//*
app.post('/users', async function(req,res){
    const user = {
        email: req.body.email,
        username : req.body.username,
        password : req.body.password,
        id: Math.random().toString(16).slice(2)
    };
    await client.db("finalProject").collection('username').insertOne(user);
    res.end();
});

//use this when log in
//*
app.get('/users/login/:username/:password',async function(req,res){
    const result = await client.db("finalProject").collection("username").findOne({'username':req.params.username,'password':req.params.password});
    if(result){ 
        res.end(JSON.stringify(result.id));
    }
    else{
        res.end(JSON.stringify(''));
    }
});

//Use this when write a review
//Save everything they write
app.post('/review',async function(req,res){
    //Check if the database has this username, if not, return 404
    const review = req.body;
    review.reviewid = Math.random().toString(16).slice(2);
    await client.db("finalProject").collection('reviews').insertOne(review);
    res.end(JSON.stringify('Review Added!'));
});

//use this when get the reviews for rank page
app.get('/reviewrank',async function(req,res){
    const reviews = await client.db("finalProject").collection('reviews').find({}).toArray();
    //Send back the data
    const allHalls = [{hall: 'Baker Hall', sum: 0, count: 0},{hall: 'Brett Hall', sum: 0, count: 0},{hall: 'Brooks Hall', sum: 0, count: 0},{hall: 'Chadbourne Hall', sum: 0, count: 0},{hall: 'Gorman Hall', sum: 0, count: 0},{hall: 'Greenough Hall', sum: 0, count: 0},{hall: 'Van Meter Hall', sum: 0, count: 0},{hall: 'Wheeler Hall', sum: 0, count: 0},{hall: 'Birch Hall', sum: 0, count: 0},{hall: 'Elm Hall', sum: 0, count: 0},{hall: 'Linden Hall', sum: 0, count: 0},{hall: 'Maple Hall', sum: 0, count: 0},{hall: 'Oak Hall', sum: 0, count: 0},{hall: 'Sycamore Hall', sum: 0, count: 0},{hall: 'Crabtree Hall', sum: 0, count: 0},{hall: 'Dwight Hall', sum: 0, count: 0},{hall: 'Hamlin Hall', sum: 0, count: 0},{hall: 'Johnson Hall', sum: 0, count: 0},{hall: 'Knowlton Hall', sum: 0, count: 0},{hall: 'Leach Hall', sum: 0, count: 0},{hall: 'Lewis Hall', sum: 0, count: 0},{hall: 'Mary Lyon Hall', sum: 0, count: 0},{hall: 'Thatcher Hall', sum: 0, count: 0},{hall: 'Dickinson Hall', sum: 0, count: 0},{hall: 'Field Hall', sum: 0, count: 0},{hall: 'Grayson Hall', sum: 0, count: 0},{hall: 'Webster Hall', sum: 0, count: 0},{hall: 'Cance Hall', sum: 0, count: 0},{hall: 'Coolidge Hall', sum: 0, count: 0},{hall: 'Crampton Hall', sum: 0, count: 0},{hall: 'Emerson Hall', sum: 0, count: 0},{hall: 'James Hall', sum: 0, count: 0},{hall: 'John Adams Hall', sum: 0, count: 0},{hall: 'John Quincy Adams Hall', sum: 0, count: 0},{hall: 'Kennedy Hall', sum: 0, count: 0},{hall: 'MacKimmie Hall', sum: 0, count: 0},{hall: 'Melville Hall', sum: 0, count: 0},{hall: 'Moore Hall', sum: 0, count: 0},{hall: 'Patterson Hall', sum: 0, count: 0},{hall: 'Pierpont Hall', sum: 0, count: 0},{hall: 'Prince Hall', sum: 0, count: 0},{hall: 'Thoreau Hall', sum: 0, count: 0},{hall: 'Washington Hall', sum: 0, count: 0},{hall: 'Brown Hall', sum: 0, count: 0},{hall: 'Cashin Hall', sum: 0, count: 0},{hall: 'McNamara Hall', sum: 0, count: 0}];
    for (let i = 0; i < allHalls.length; i++) {
        for (let m = 0; m < reviews.length; m++) {
            if (allHalls[i].hall === reviews[m].hall) {
                allHalls[i].sum += reviews[m].totalscore;
                allHalls[i].count++;
            }
        }
    }
    for (let j = 0; j < allHalls.length; j++) {
        if (allHalls[j].count === 0) {
            allHalls.splice(j,1)
            j--;
        }
        else {
            allHalls[j].totalscore = Math.round(allHalls[j].sum / allHalls[j].count);
            delete allHalls[j].sum;
            delete allHalls[j].count;
        }
    }
    res.send(allHalls.sort((a,b) => b.totalscore - a.totalscore));
});

app.post('/reviewpage', async function(req,res){
    const reviews = await client.db("finalProject").collection('reviews').find({}).toArray();
    const chosenHall = req.body.hall;
    const hallReviews = [];
    for (let i = 0; i<reviews.length; i++) {
        if(reviews[i].hall === chosenHall) {
            hallReviews.push(reviews[i]);
        }
    }
    res.send(hallReviews);
});

app.post('/deletereview', async function(req,res) {
    const deleteReview = req.body.reviewid;
    await client.db("finalProject").collection('reviews').deleteOne({'reviewid':deleteReview});
    res.end(JSON.stringify('Review Deleted'));
});

app.post('/increaselikedislike', async function(req,res) {
    const likedislikeobj = {};
    likedislikeobj[req.body.likedislike] = 1;
    await client.db("finalProject").collection('reviews').updateOne({'reviewid':req.body.reviewid}, {$inc: likedislikeobj});
    res.end(JSON.stringify('Review Updated'));
});
