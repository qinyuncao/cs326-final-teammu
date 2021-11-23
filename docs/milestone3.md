### **Team Name**: 
Team Mu

### **Application Name**: 
UMA DormReview

### **Team Overview**:
- Qinyun Cao : **qinyuncao**

- Moiz Saqib : **moizsaqib369**

- Yingxun Wei : **Laurenwei**

### **Database Description**:
    username document
    {
        email: String (Inputed UMass email linked with the user)
  
        username: String (Inputed Username linked with the user)
  
        password: String (Inputted Password linked with the user)
  
        id: String (Generated ID linked with the user)
    }


    reviews document
    {
        hall: String (Selected residence hall linked with the review)
        convenience: Integer (Chosen convenience score from 1-20 for the review)
        comfort: Integer (Chosen comfort score from 1-20 for the review)
        privacy: Integer (Chosen privacy score from 1-20 for the review)
        facility: Integer (Chosen facility score from 1-20 for the review)
        cleanliness: Integer (Chosen cleanliness score from 1-20 for the review)
        hallreview: String (Inputted free response review for the review)
        tags: String (Inputted tags for the review)
        totalscore: Integer (Sum of 5 score categories)
        likecount: Integer (Count of number of likes for the review)
        dislikecount: Integer (Count of number of dislikes for the review)
        reviewuserid: String (ID of user making review)
        reviewid: String (Generated ID of review)
    }

    currentuser document
    {
        index: Integer (Index of item in document. Only one and always 0)
        userid: String (ID of user who is designated as current user)
    }

    currenthall document
    {
        index: Integer (Index of item in document. Only one and always 0)
        hallid: String (The current hall (ex. Crabtree Hall) which is being explored on the review page)
    }
