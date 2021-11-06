document.getElementById('loginbutton').addEventListener('click',async() => {
    const inputUsername = document.getElementById('inputUsername').value;
    const inputPassword = document.getElementById('inputPassword').value;
    const localhost = 'http://localhost:8080/users';
    
    const userInfo = {username: inputUsername, password: inputPassword};
    //Insert code to check if this object is in the server. If it is, the user should be logged in
    const response = await fetch(localhost+'/login/'+inputUsername+'/'+inputPassword);
    console.log(response);
    //If login succesful, go to main page with user logged in
    if (response.ok) {
       
       document.getElementById('userUpdate').innerText = 'Correct username and password';
       window.location.href = 'mainPage2.html';
    }
    else {
        document.getElementById('userUpdate').innerText = 'Sorry! Inputted username/password is not correct';
    }
});