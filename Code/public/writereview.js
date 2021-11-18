window.addEventListener('load',async() => {
    const curuserid = await (await fetch('/currentuser')).json();
    if (curuserid) {
        document.getElementById('homeButton').setAttribute('href','mainPage2.html');
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.setAttribute('href','mainPage.html');
        link.innerText = 'Log Out';
        listItem.appendChild(link);
        document.getElementById('headerNav').appendChild(listItem);
    }
    else {
        document.getElementById('homeButton').setAttribute('href','mainPage.html');
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.setAttribute('href','logIn.html');
        link.innerText = 'Log In';
        listItem.appendChild(link);
        document.getElementById('headerNav').appendChild(listItem);
        const listItem2 = document.createElement('li');
        const link2 = document.createElement('a');
        link2.setAttribute('href','signUp.html');
        link2.innerText = 'Sign Up';
        listItem2.appendChild(link2);
        document.getElementById('headerNav').appendChild(listItem2);
    }
});

document.getElementById('submit').addEventListener('click',async() => {
    const curuserid = await (await fetch('/currentuser')).json();
    if (!curuserid) {
        document.getElementById('confirm').innerText = 'You must be logged in to submit a review.';
        return;
    }
    const halls = document.getElementById('halls').options[document.getElementById('halls').selectedIndex].text;
    const gradeconv = parseInt(document.getElementById('gradeconv').value);
    const gradecomf = parseInt(document.getElementById('gradecomf').value);
    const gradepriv = parseInt(document.getElementById('gradepriv').value);
    const gradefac = parseInt(document.getElementById('gradefac').value);
    const gradeclean = parseInt(document.getElementById('gradeclean').value);
    const halltextrev = document.getElementById('halltextrev').value;
    const tagtext = document.getElementById('tagtext').value;
    const review = {
        hall:halls,
        convenience:gradeconv,
        comfort:gradecomf,
        privacy:gradepriv,
        facility:gradefac,
        cleanliness:gradeclean,
        hallreview:halltextrev,
        tags:tagtext,
        totalscore: gradeconv + gradecomf + gradepriv + gradefac + gradeclean,
        likecount: 0,
        dislikecount: 0,
        reviewuserid: curuserid
    };
    if (halltextrev && tagtext) {
        //save it to database
        await fetch('/review',{
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        });

        //Must insert code to get username of person reviewing and push it to server with post request
        document.getElementById('confirm').innerText = 'Thank you for  submitting a review!';
        document.getElementById('gradeconv').setAttribute('disabled','disabled');
        document.getElementById('gradecomf').setAttribute('disabled','disabled');
        document.getElementById('gradepriv').setAttribute('disabled','disabled');
        document.getElementById('gradefac').setAttribute('disabled','disabled');
        document.getElementById('gradeclean').setAttribute('disabled','disabled');
        document.getElementById('halltextrev').setAttribute('disabled','disabled');
        document.getElementById('tagtext').setAttribute('disabled','disabled');
        document.getElementById('submit').setAttribute('disabled','disabled');
        document.getElementById('halls').setAttribute('disabled','disabled');
    }
    else {
        document.getElementById('confirm').innerText = 'Please complete all fields to submit.';
    }
});
