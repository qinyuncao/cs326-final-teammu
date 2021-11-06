//get array of all halls with reviews sorted in order of their total score.
//Then this array is itterated through and the halls are dynamically added to the pages

//i < length of array
for (let i=0; i < 2; i++) {
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
        hallName.innerText = 'Residential Hall Name';

        link.appendChild(hallName);
        const score = document.createElement('progress');

        //get this info from the array
        score.value = '95';

        score.min = '0';
        score.max = '100';
        const textScore = document.createElement('b');

        //get this info from the array
        textScore.innerText = '95%';

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
        hallName.innerText = 'Residential Hall Name';

        link.appendChild(hallName);
        const score = document.createElement('progress');

        //get this info from the array
        score.value = '90';

        score.min = '0';
        score.max = '100';
        const textScore = document.createElement('b');

        //get this info from the array
        textScore.innerText = '90%';

        rankHall.appendChild(rankBlock);
        rankBlock.appendChild(rankNum);
        rankBlock.appendChild(link);
        rankBlock.appendChild(score);
        rankBlock.appendChild(textScore);
    }
}