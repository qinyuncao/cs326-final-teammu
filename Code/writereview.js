document.getElementById('submit').addEventListener('click',() => {
    let hallList = document.getElementById('halls');
    const halls = hallList.options[hallList.selectedIndex].text;
    const gradeconv = parseInt(document.getElementById('gradeconv').value);
    const gradecomf = parseInt(document.getElementById('gradecomf').value);
    const gradepriv = parseInt(document.getElementById('gradepriv').value);
    const gradefac = parseInt(document.getElementById('gradefac').value);
    const gradeclean = parseInt(document.getElementById('gradeclean').value);
    const halltextrev = document.getElementById('halltextrev').value;
    const tagtext = document.getElementById('tagtext').value;

    if (halltextrev && tagtext) {
        //Must insert code to get username of person reviewing and push it to server with post request
        const reviewObject = {username: 'whatever', hall: halls, convenience: gradeconv, comfort: gradecomf, privacy: gradepriv, facility: gradefac, cleanliness: gradeclean, totalscore: gradeconv+gradecomf+gradepriv+gradefac+gradeclean, detailedRev: halltextrev, tagRev: tagtext};
        console.log(reviewObject);
        document.getElementById('confirm').innerText = 'Thank you for  submitting a review!';
    }
    else {
        document.getElementById('confirm').innerText = 'Please complete all fields to submit.';
    }
});