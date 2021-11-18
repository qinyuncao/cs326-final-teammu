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
    const curHall = await (await fetch('/currenthall')).json();
    let reviewData = await fetch('/reviewpage',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({hall: curHall})
    });
    reviewData = await reviewData.json();
    renderHall(curHall);
    renderScores(reviewData,curHall);
    renderReviews(reviewData,curUser);
    renderTags(reviewData);
    renderBased(reviewData);
});

function renderHall(curHall) {
    //Get chosen hall name
    document.getElementById('chosenHall').innerText = curHall;
}

async function renderReviews(reviewData,curUser) {
    //Iterate through the number of individual reviews and render the review on the page
    for (let i=0; i<reviewData.length; i++) {
        const revcol = document.getElementById('revcol');
        const revcon = document.createElement('div');
        revcon.classList.add('border');
        revcon.classList.add('border-dark')
        const revdet = document.createElement('p');
        revdet.classList.add('revtext');

        //Get review text
        revdet.innerText = reviewData[i].hallreview;
        revcon.appendChild(revdet);

        //if the id of the review equals the id of the current user, add a delete button
        if(reviewData[i].reviewuserid === curUser) {
            const delbut = document.createElement('span');
            delbut.classList.add('vote');
            const deletebut = document.createElement('input');
            deletebut.type = 'button';
            deletebut.value = 'Delete';
            deletebut.classList.add('btn');
            deletebut.classList.add('btn-danger');
            deletebut.classList.add('btn-sm');
            delbut.appendChild(deletebut);
            revcon.appendChild(delbut);

            deletebut.addEventListener('click',async() => {
                //delete the review information from the server and update all data
                await fetch('/deletereview',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({reviewid: reviewData[i].reviewid})
                });
                
                //deleting the review from the page and updating the page
                revcon.remove();
                linebreak.remove();
                location.reload();
            });
        }
        const votedis = document.createElement('span');
        votedis.classList.add('vote');

        //Get sum of 5 categories for the review
        votedis.innerText = 'Vote: ' + reviewData[i].totalscore.toString() + '/100';
        revcon.appendChild(votedis);

        const likedisArea = document.createElement('span');
        likedisArea.classList.add('likedis');
        const likeImg = document.createElement('input');
        likeImg.type = 'image';
        likeImg.src = 'imageForWeb/like.png';
        likeImg.classList.add('resize');
        likeImg.alt = "like button";
        const likeCount = document.createElement('span');
        likeCount.classList.add('likedislike');

        //Get number of likes for the review
        likeCount.innerText = reviewData[i].likecount.toString();
        
        likeImg.addEventListener('click',likeBut);

        async function likeBut() {
            await fetch('/increaselikedislike',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({reviewid: reviewData[i].reviewid, likedislike: 'likecount'})
            });

            likeCount.innerText = (reviewData[i].likecount + 1).toString();
            likeImg.removeEventListener('click',likeBut)
        }

        const dislikeImg = document.createElement('input');
        dislikeImg.type = 'image';
        dislikeImg.src = 'imageForWeb/dislike.png';
        dislikeImg.classList.add('resize');
        dislikeImg.alt = "dislike button";
        const dislikeCount = document.createElement('span');
        dislikeCount.classList.add('likedislike');

        //Get number of dislikes for the review
        dislikeCount.innerText = reviewData[i].dislikecount.toString();

        dislikeImg.addEventListener('click',dislikeBut);

        async function dislikeBut() {
            await fetch('/increaselikedislike',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({reviewid: reviewData[i].reviewid, likedislike: 'dislikecount'})
            });

            dislikeCount.innerText = (reviewData[i].dislikecount + 1).toString();
            dislikeImg.removeEventListener('click',dislikeBut);
        }

        likedisArea.appendChild(likeImg);
        likedisArea.appendChild(likeCount);
        likedisArea.appendChild(dislikeImg);
        likedisArea.appendChild(dislikeCount);

        revcon.appendChild(likedisArea);

        revcol.appendChild(revcon);
        const linebreak = document.createElement('br')
        revcol.appendChild(linebreak);
    }   
}
async function renderScores(reviewData,curHall) {
    const response = await(await fetch('/reviewrank')).json();
    for (let i=0; i <response.length; i++) {
        if (response[i].hall === curHall) {
            document.getElementById('relRank').innerText = i+1;
        }
    }

    //Get percentage of total score for the specific hall
    document.getElementById('overallScore').innerText = 'Overall Score: ' + getAverageTotal(reviewData).toString() + '%';
    document.getElementById('overallScore').style.background = 'linear-gradient(to right, maroon 0%, maroon ' + getAverageTotal(reviewData).toString() + '%' + ', lightgray ' + getAverageTotal(reviewData).toString() + '%' + ', lightgray 100%)';

    //Get average rating rounded to nearest whole number. For gradient, convert to percent and insert.
    document.getElementById('convlabel').innerText = 'Convenience: ' + getAverageConv(reviewData).toString() + '/20';
    document.getElementById('convscore').innerText = getAverageConv(reviewData).toString() + '/20';
    document.getElementById('convscore').style.background = 'linear-gradient(to right, maroon 0%, maroon ' + ((getAverageConv(reviewData)/20)*100).toString() + '%' + ', lightgray ' + ((getAverageConv(reviewData)/20)*100).toString() + '%' + ', lightgray 100%)';

    document.getElementById('comflabel').innerText = 'Comfort: ' + getAverageComf(reviewData).toString() + '/20';
    document.getElementById('comfscore').innerText = getAverageComf(reviewData).toString() + '/20';
    document.getElementById('comfscore').style.background = 'linear-gradient(to right, maroon 0%, maroon ' + ((getAverageComf(reviewData)/20)*100).toString() + '%' + ', lightgray ' + ((getAverageComf(reviewData)/20)*100).toString() + '%' + ', lightgray 100%)';

    document.getElementById('privlabel').innerText = 'Privacy: ' + getAveragePriv(reviewData).toString() + '/20';
    document.getElementById('privscore').innerText = getAveragePriv(reviewData).toString() + '/20';
    document.getElementById('privscore').style.background = 'linear-gradient(to right, maroon 0%, maroon ' + ((getAveragePriv(reviewData)/20)*100).toString() + '%' + ', lightgray ' + ((getAveragePriv(reviewData)/20)*100).toString() + '%' + ', lightgray 100%)';

    document.getElementById('faclabel').innerText = 'Facility: ' + getAverageFac(reviewData).toString() + '/20';
    document.getElementById('facscore').innerText = getAverageFac(reviewData).toString() + '/20';
    document.getElementById('facscore').style.background = 'linear-gradient(to right, maroon 0%, maroon ' + ((getAverageFac(reviewData)/20)*100).toString() + '%' + ', lightgray ' + ((getAverageFac(reviewData)/20)*100).toString() + '%' + ', lightgray 100%)';

    document.getElementById('cleanlabel').innerText = 'Cleanliness: ' + getAverageClean(reviewData).toString() + '/20';
    document.getElementById('cleanscore').innerText = getAverageClean(reviewData).toString() + '/20';
    document.getElementById('cleanscore').style.background = 'linear-gradient(to right, maroon 0%, maroon ' + ((getAverageClean(reviewData)/20)*100).toString() + '%' + ', lightgray ' + ((getAverageClean(reviewData)/20)*100).toString() + '%' + ', lightgray 100%)';
}
function renderTags(reviewData) {
    //Given array of all tags for each hall, randomly select on load
    const tagList = getTags(reviewData);
    const tagClone = tagList.slice();
    let arrayLength = tagList.length;
    for (let i=0; i < 3; i++) {
        let randTag = tagClone[Math.floor(Math.random() * arrayLength)];
        if (randTag === undefined) {
            break;
        }
        arrayLength--;
        let index = tagClone.indexOf(randTag);
        tagClone.splice(index,1);
        const tagbody = document.getElementById('tagbody');
        const tagword = document.createElement('span');
        tagword.classList.add('tagtext');
        tagword.innerText = randTag;
        tagbody.appendChild(tagword);
    }
}
function renderBased(reviewData) {
    if(reviewData.length === 1) {
        document.getElementById('totalrevs').innerText = '(Based on 1 Rating)';
    }
    else {
        document.getElementById('totalrevs').innerText = '(Based on ' + reviewData.length.toString() + ' Ratings)';
    }
}

function getAverageTotal(reviewData) {
    let sum = 0;
    for (let i=0; i<reviewData.length; i++) {
        sum += reviewData[i].totalscore;
    }
    return Math.round(sum / reviewData.length);
}

function getAverageConv(reviewData) {
    let sum = 0;
    for (let i=0; i<reviewData.length; i++) {
        sum += reviewData[i].convenience;
    }
    return Math.round(sum / reviewData.length);
}

function getAverageComf(reviewData) {
    let sum = 0;
    for (let i=0; i<reviewData.length; i++) {
        sum += reviewData[i].comfort;
    }
    return Math.round(sum / reviewData.length);
}

function getAveragePriv(reviewData) {
    let sum = 0;
    for (let i=0; i<reviewData.length; i++) {
        sum += reviewData[i].privacy;
    }
    return Math.round(sum / reviewData.length);
}

function getAverageFac(reviewData) {
    let sum = 0;
    for (let i=0; i<reviewData.length; i++) {
        sum += reviewData[i].facility;
    }
    return Math.round(sum / reviewData.length);
}

function getAverageClean(reviewData) {
    let sum = 0;
    for (let i=0; i<reviewData.length; i++) {
        sum += reviewData[i].cleanliness;
    }
    return Math.round(sum / reviewData.length);
}

function getTags(reviewData) {
    let tagArray = [];
    for (let i = 0; i < reviewData.length; i++) {
        tagArray = tagArray.concat(reviewData[i].tags.split(' '));
    }
    return tagArray;
}