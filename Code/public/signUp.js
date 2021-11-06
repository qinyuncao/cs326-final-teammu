

document.getElementById('signupbutton').addEventListener('click', async function(){
    const inputEmail = document.getElementById('inputEmail').value;
    const inputUsername = document.getElementById('inputUsername').value;
    const inputPassword = document.getElementById('inputPassword').value;
    const reInputPassword = document.getElementById('reInputPassword').value;
    const localhost = 'http://localhost:8080/users';
    const inputData = {
        email:inputEmail,
        username:inputUsername,
        password:inputPassword
    };
    if (!/\S+@\S+\.\S+/.test(inputEmail)) {
        document.getElementById('userUpdate').innerText = 'Sorry! The inputted email is invalid.';
        return;
    }

    if(!(inputUsername && inputPassword && reInputPassword)) {
        document.getElementById('userUpdate').innerText = 'Sorry! You must fill in all fields.';
        return;
    }

    if (!(inputPassword === reInputPassword)) {
        document.getElementById('userUpdate').innerText = 'Sorry! The passwords do not match.';
        return;
    }

    if (inputPassword.length < 8) {
        document.getElementById('userUpdate').innerText = 'Sorry! The password must be at least 8 characters long.';
        return;
    }


    //check if inputted username is in the database, if so alert the user. If not, add it to the data and log the user in
    const response = await fetch(localhost+'/'+inputUsername);
    console.log(response);
    if(response.ok) {
        document.getElementById('userUpdate').innerText = 'The information has been stored!';
        //post object to server
        await fetch(localhost,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(inputData)
        });

    }
    else {
        document.getElementById('userUpdate').innerText = 'Sorry! That user already exists.';
    }
});