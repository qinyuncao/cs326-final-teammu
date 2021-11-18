//get array of all halls with reviews sorted in order of their total score.
//Then this array is itterated through and the halls are dynamically added to the pages
//i < length of array
window.addEventListener('load',async() => {
    const curUser = await (await fetch('/currentuser')).json();
    if (curUser) {
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
    const response = await(await fetch('/reviewrank')).json();
    for (let i=0; i < response.length; i++) {
        if (i===0) {
            const rankHall = document.getElementById('rankHall');
            const rankBlock = document.createElement('div');
            rankBlock.classList.add('spacer');
            const rankNum = document.createElement('div');
            rankNum.classList.add('rank1');
            rankNum.innerText = '1';
            const link = document.createElement('a');
            link.href = 'review.html';
            const hallName = document.createElement('div');
            hallName.classList.add('hallname1');
    
            //get this info from the array
            hallName.innerText = response[i].hall;
    
            link.appendChild(hallName);
            link.addEventListener('click',async() =>{
                await fetch('/currenthall',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({hall: response[i].hall})
                });
            });
            const score = document.createElement('progress');
    
            //get this info from the array
            score.value = response[i].totalscore;
    
            score.min = '0';
            score.max = '100';
            const textScore = document.createElement('b');
    
            //get this info from the array
            textScore.innerText = response[i].totalscore.toString() + '%';
    
            rankHall.appendChild(rankBlock);
            rankBlock.appendChild(rankNum);
            rankBlock.appendChild(link);
            rankBlock.appendChild(score);
            rankBlock.appendChild(textScore);
        }
        else {
            const rankHall = document.getElementById('rankHall');
            const rankBlock = document.createElement('div');
            rankBlock.classList.add('spacer');
            const rankNum = document.createElement('div');
            rankNum.classList.add('rank2');
            rankNum.innerText = (i+1).toString();
            const link = document.createElement('a');
            link.href = 'review.html';
            const hallName = document.createElement('div');
            hallName.classList.add('hallname2');
    
            //get this info from the array
            hallName.innerText = response[i].hall;;
    
            link.appendChild(hallName);
            link.addEventListener('click',async() =>{
                await fetch('/currenthall',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({hall: response[i].hall})
                });
            });
            const score = document.createElement('progress');
    
            //get this info from the array
            score.value = response[i].totalscore;
    
            score.min = '0';
            score.max = '100';
            const textScore = document.createElement('b');
    
            //get this info from the array
            textScore.innerText = response[i].totalscore.toString() + '%';
    
            rankHall.appendChild(rankBlock);
            rankBlock.appendChild(rankNum);
            rankBlock.appendChild(link);
            rankBlock.appendChild(score);
            rankBlock.appendChild(textScore);
        }
    }
});