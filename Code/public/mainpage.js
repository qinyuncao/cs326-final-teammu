window.addEventListener('load',async() => {
    await fetch('/currentuser',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: ''})
    });
});