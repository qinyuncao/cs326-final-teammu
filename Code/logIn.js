document.getElementById('loginbutton').addEventListener('click',() => {
    const inputUsername = document.getElementById('inputUsername').value;
    const inputPassword = document.getElementById('inputPassword').value;
    
    const userInfo = {username: inputUsername, password: inputPassword};
    document.getElementById('userUpdate').innerText = 'Sorry! Inputted username/password is invalid';
    //Insert code to check if this object is in the server. If it is, the user should be logged in

    //If login succesful, go to main page with user logged in
    if (false) {
        window.location.href = 'mainPage.html';
    }
    else {
        document.getElementById('userUpdate').innerText = 'Sorry! Inputted username/password is invalid';
    }
});