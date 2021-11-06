window.addEventListener('load',() => {
    //if there is at least one review, render the page. Else, no need
    if (true) {
        renderHall();
        renderScores();
        renderReviews();
        renderTags();
        renderBased();
    }
    else {
        return;
    }
});

function renderHall() {
    //Get chosen hall name
    document.getElementById('chosenHall').innerText = 'Brown Hall';
}

async function renderReviews() {
    //Iterate through the number of individual reviews and render the review on the page
    for (let i=0; i<1; i++) {
        const revcol = document.getElementById('revcol');
        const revcon = document.createElement('div');
        revcon.classList.add('border');
        revcon.classList.add('border-dark')
        const revdet = document.createElement('p');
        revdet.classList.add('revtext');

        //Get review text
        revdet.innerText = 'Review text.........';
        revcon.appendChild(revdet);

        //if the id of the review equals the id of the current user, add a delete button
        if(true) {
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

            deletebut.addEventListener('click',() => {
                //delete the review information from the server and update all data
    
                //deleting the review from the page and updating the page
                revcon.remove();
                linebreak.remove();
                location.reload();
            });
        }
        const votedis = document.createElement('span');
        votedis.classList.add('vote');

        //Get sum of 5 categories for the review
        votedis.innerText = 'Vote: ' + '87' + '/100';
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
        likeCount.innerText = '2'
        
        likeImg.addEventListener('click',() => {
            //Increase number of likes by one in the server for this review

            likeCount.innerText = (parseInt('2') + 1).toString();
        });

        const dislikeImg = document.createElement('input');
        dislikeImg.type = 'image';
        dislikeImg.src = 'imageForWeb/dislike.png';
        dislikeImg.classList.add('resize');
        dislikeImg.alt = "dislike button";
        const dislikeCount = document.createElement('span');
        dislikeCount.classList.add('likedislike');

        //Get number of dislikes for the review
        dislikeCount.innerText = '0'

        dislikeImg.addEventListener('click',() => {
            //Increase number of dislikes by one in the server for this review

            dislikeCount.innerText = (parseInt('0') + 1).toString();
        });
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
function renderScores() {
    //Get rank of hall among all halls in total score
    document.getElementById('relRank').innerText = '3';

    //Get percentage of total score for the specific hall
    document.getElementById('overallScore').innerText = 'Overall Score: ' + '86%';
    document.getElementById('overallScore').style.background = 'linear-gradient(to right, maroon 0%, maroon ' + '86%' + ', lightgray ' + '86%' + ', lightgray 100%)';

    //Get average rating rounded to nearest whole number. For gradient, convert to percent and insert.
    document.getElementById('convlabel').innerText = 'Convenience: ' + '15' + '/20';
    document.getElementById('convscore').innerText = '15' + '/20';
    document.getElementById('convscore').style.background = 'linear-gradient(to right, maroon 0%, maroon ' + '75%' + ', lightgray ' + '75%' + ', lightgray 100%)';

    document.getElementById('comflabel').innerText = 'Comfort: ' + '17' + '/20';
    document.getElementById('comfscore').innerText = '17' + '/20';
    document.getElementById('comfscore').style.background = 'linear-gradient(to right, maroon 0%, maroon ' + '85%' + ', lightgray ' + '85%' + ', lightgray 100%)';

    document.getElementById('privlabel').innerText = 'Privacy: ' + '19' + '/20';
    document.getElementById('privscore').innerText = '19' + '/20';
    document.getElementById('privscore').style.background = 'linear-gradient(to right, maroon 0%, maroon ' + '95%' + ', lightgray ' + '95%' + ', lightgray 100%)';

    document.getElementById('faclabel').innerText = 'Facility: ' + '18' + '/20';
    document.getElementById('facscore').innerText = '18' + '/20';
    document.getElementById('facscore').style.background = 'linear-gradient(to right, maroon 0%, maroon ' + '90%' + ', lightgray ' + '90%' + ', lightgray 100%)';

    document.getElementById('cleanlabel').innerText = 'Cleanliness: ' + '19' + '/20';
    document.getElementById('cleanscore').innerText = '19' + '/20';
    document.getElementById('cleanscore').style.background = 'linear-gradient(to right, maroon 0%, maroon ' + '95%' + ', lightgray ' + '95%' + ', lightgray 100%)';
}
function renderTags() {
    //Given array of all tags for each hall, randomly select on load
    for (let i=0; i < 5; i++) {
        if (i===3) {
            break;
        }
        const tagbody = document.getElementById('tagbody');
        const tagword = document.createElement('span');
        tagword.classList.add('tagtext');
        tagword.innerText = //array[Math.floor(Math.random() * array.length]
        'peaceful';
        tagbody.appendChild(tagword);
    }
}
function renderBased() {
    document.getElementById('totalrevs').innerText = '(Based on ' + '12' + ' Ratings)';
}