window.addEventListener('load',async() => {
    const curuserid = await (await fetch('/currentuser')).json();
    if (curuserid) {
        document.getElementById('homeButton').setAttribute('href','mainPage2.html');
    }
    else {
        document.getElementById('homeButton').setAttribute('href','mainPage.html');
    }
});

document.getElementById('loginbutton').addEventListener('click',async() => {
    const inputUsername = document.getElementById('inputUsername').value;
    const inputPassword = document.getElementById('inputPassword').value;
    
    //Insert code to check if this object is in the server. If it is, the user should be logged in
    const response = await (await fetch('/users/login/'+inputUsername+'/'+inputPassword)).json();
    //If login succesful, go to main page with user logged in
    if (response) {
        document.getElementById('userUpdate').innerText = 'Correct username and password';
        await fetch('/currentuser',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: response})
        });
        window.location.href = 'mainPage2.html';
    }
    else {
        document.getElementById('userUpdate').innerText = 'Sorry! Inputted username/password is not correct';
    }
});