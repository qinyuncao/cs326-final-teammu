const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public'));
app.use(express.json());
const filename1 = 'username.json';
const filename2 = 'review.json';
const filename3 = 'currentuser.json';
const filename4 = 'currenthall.json'
let users = [];
let reviews= [];
let currentUser = '';
let currentHall = '';

//port 
const port = process.env.port || 8101;

//Main page
app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/mainPage.html');
});

app.get('/currentuser', function(req,res) {
    reload();
    res.send(JSON.stringify(currentUser));
});

app.get('/currenthall', function(req,res) {
    reload();
    res.send(JSON.stringify(currentHall));
});

app.post('/currentuser', function(req,res) {
    reload();
    currentUser = req.body.user;
    fs.writeFileSync(filename3,JSON.stringify(currentUser));
    res.send(JSON.stringify(currentUser));
});

app.post('/currenthall', function(req,res) {
    reload();
    currentHall = req.body.hall;
    fs.writeFileSync(filename4,JSON.stringify(currentHall));
    res.send(JSON.stringify(currentHall));
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
        password : req.body.password,
        id: Math.random().toString(16).slice(2)
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
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === req.params.username && users[i].password === req.params.password) {
            res.send(JSON.stringify(users[i].id));
            res.end();
        }
    }
    res.send(JSON.stringify(''));
});

//Use this when write a review
//Save everything they write
app.post('/review',async function(req,res){
    //reload first
    reload();
    //Check if the database has this username, if not, return 404
    const review = req.body;
    review.reviewid = Math.random().toString(16).slice(2);
    reviews.push(review);
    let strIn = JSON.stringify(reviews);
    fs.writeFileSync(filename2, strIn);
    res.send(reviews);
});

//use this when get the reviews for rank page
app.get('/reviewrank',async function(req,res){
    //reload first
    reload();
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
    //reload first
    reload();
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
    reload();
    const deleteReview = req.body.reviewid;
    for (let i=0; i < reviews.length; i++) {
        if (reviews[i].reviewid === deleteReview) {
            reviews.splice(i,1);
            fs.writeFileSync(filename2, JSON.stringify(reviews));
            res.end('Review Deleted');
        }
    }
});

app.post('/increaselikedislike', async function(req,res) {
    reload();
    const chosenReview = req.body.reviewid;
    const likedislike = req.body.likedislike;
    for (let i=0; i < reviews.length; i++) {
        if (reviews[i].reviewid === chosenReview) {
            reviews[i][likedislike]++;
            fs.writeFileSync(filename2, JSON.stringify(reviews));
            res.end('Review Updated');
        }
    }
})

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
    if (fs.existsSync(filename3)) {
        let someStr3 = fs.readFileSync(filename3);
        currentUser = JSON.parse(someStr3);
    }
    else {
        currentUser = '';
    }
    if (fs.existsSync(filename4)) {
        let someStr4 = fs.readFileSync(filename4);
        currentHall = JSON.parse(someStr4);
    }
    else {
        currentHall = '';
    }
}

app.listen(port,() => {
    console.log(`Server listening at http://localhost:${port}`);
})
