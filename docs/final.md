### **Title**: 
Team Mu

### **Application Name**: 
UMA Dorm Review

### **Semester**: 
Fall 2021

### **Overview**: 
Our application is a rating and review application for UMass students by UMass students. Here, reviews are made for the several residential halls on campus so students can make an educated, informed decision on which residence hall fits them and their lifestyle the best. Users can write reviews, view all the reviewed halls ranked from highest to lowest, and like/dislike other reviews. Users can also delete their own reviews. Their are many review apps in the world, but ours is unique and innovative as it focuses on UMass students and specifically, the many residential halls that are available to them.

### **Team Members**:
- Qinyun Cao : **qinyuncao**

- Moiz Saqib : **moizsaqib369**

- Yingxun Wei : **Laurenwei**

### **User Interface**: 
Home Page: Purpose is to welcome the user to the application and allow them to select what they wish to do from the various options available in the header.

Sign Up Page: Purpose is to allow the user to create an account and be able to later, log in and access to the core features of the application.

Log In Page: Purpose is to allow the user to log in to their account and access the core features of the application.

Write A Review Page: Purpose is to allow the user to write a review to a residential hall so other users and themselves can view it in the other UIs.

Residential Hall Rankings Page: Purpose is to see all the halls with reviews and how they compare to each other in terms of how they were rated.

Residential Hall Review Page: Purpose is to view the detailed ratings and reviews for a specific residential hall. Can like/dislike other reviews. Can delete own review.

### **APIs**:
GET /users/:username : Checks if the username in the parameter of the GET request is in the database. If so, a 404 status is sent. If not, a 200 status is sent. This is used when signing up to make sure an inputted username is unique in the database.

POST /users : Posts the user object in the body of the POST request to the database along with a unique generated ID. This is used when signing up to officially add the inputted user information to the database.

GET /users/login:/username/:password : Checks if the username and password in the parameter of the GET request is in the database. If not, an empty string is sent. If not, the ID of the user is sent. This is used when logging in to check if the inputted username and password is valid.

POST /review : Posts the review object in the body of the POST request to the database along with a unique generated ID. This is used when writing a review to officially add the inputted review information to the database.

GET /reviewrank : Gets an array of all the halls with a review as an object with the hall name and the total score of the hall. This array is an average of all the reviews for a specific hall. This is used when the residential hall rankings page loads.

POST /reviewpage : Gets an array of all the review objects for a specific hall that is in the body of the POST request. The reviews are sorted by how many total likes and dislikes they have as well as how many likes they have compared to how many dislikes they have. This is to put the best reviews at the top of the screen. This is used when the residential hall review page loads.

POST /deletereview : Deletes the review which belongs to the given review ID in the body of the request. This is done when the delete button is clicked for a review.

POST /increaselikedislike : Increases the like or dislike count (specified in the body of the POST request) by 1 for the specific review which belongs to the given review ID in the body of the POST request. This is done when the like or dislike button is pressed for a review.

GET /currentuser : Gets a string which is the current user id in the database. This is done for user authentication.

POST /currentuser : Sets the current user id in the database which is provided in the body of the POST request. This is done for user authentication.

GET /currenthall : Gets a string which is the current hall in the database. This is done for correctly loading the residential hall review page.

POST /currenthall : Sets the current hall in the database which is provided in the body of the POST request. This is done for correctly loading the residential hall review page.

### **Database**: 
There are 4 entities or collections in our mongoDB database:

The 'users' collection: Contains all the user objects for all users which have signed up for an account to the application.

The 'reviews' collection: Contains all the review objects for all reviews which have been made and haven't been deleted on the application.

The 'currentuser' collection: Contains the current user id string of the current user for user authentication.

The 'currenthall' collection: Contains the current hall string of the current hall for loading the residential hall review page.

### **URL Routes/Mapping**: 
When a users opens the application and find themseleves on the home page, if they are logged in, they will find a log out link on the header which would log them out. If not, they will find a log in and sign up link on the header. The 'write a review' and rankings links are always in the header at all times. Users can view the ranking and review page without being logged in but can not interact with reviews. Users can not write reviews unless they are logged in. Navigation to all the pages in the headers is evident. The only way to get to the specific review page for a chosen hall is to go to the ranking page and clicking on the specific hall in the list of all ranked halls.

### **Authentication/Authorization**: 
Users are authenticated by checking if the inputted username and password is in the database. If so, they are set as the current user and have access to all features of the application. These features include the ability to write reviews, like/dislike other reviews, and delete own reviews. When a user is authenticated, the main page changes to suggest the user to explore the rankings as opposed to signing up if they were not logged in.

### **Division Of Labor**: 
- Qinyun Cao : 

- Moiz Saqib : Finalized idea for project with group. Set up wireframes primarily for the 'Write A Review' page and the 'Residential Hall Review' page. Worked collabortively with groupmates to finalize wireframes for all UIs with detailed creative changes. Coded specific aspects of all HTML and CSS for the app. Primary inintial work involved the 'Write A Review' page, 'Residential Hall Review' page, and 'Residential Hall Ranking' page. Coded frontend Javascript logic and page population through DOM surgery for all pages which needed it. Implemented GET and POST requests to connect the node.js server with the frontend. Implemented about half of the APIs needed. Finalized the connection of the external mongoDB database to the server. Added some last minute functionality and visual changes.

- Yingxun Wei : 

### **Conclusion**: 
This project was very challenging but very fulfilling for our group. There were many times that we found ourselves stuck but this project urged us to work together and be creative in finding solutions together through the concepts we learned in class. As we continued to work, we found ourselves very commited and passionate about the application we were making as it began to come together. We can confidently say that our application, while not being perfect, reached our vision through a lot of hard work and we are happy about this. It was particularly difficult for us to implement functional user authentication as well as initially setting up our node.js server. We wished we had more knowledge on this before we started this project.

### **Rubric (100 Points Total)**: 
Log In (15 Points):

- Username and Password used to sign up work and user is redirected to the home page (15 Points)

Write A Review (10 Points):

- Must fill in all fields to submit a review (10 Points)

Residential Hall Rankings Page (25 Points):

- Halls are ranked by their average score from the reviews from highest to lowest (15 Points)

- When a hall is clicked, it sends you to the specific review page for that hall (10 Points)

Review Page (45 Points):

- The total average score, five categories average score, reviews with likes and dislikes, and random tags are all shown (10 Points)

- Review are sorted from top to bottom by how many likes they have compared to dislikes and how many total interactions they have (10 Points)

- Own review can be deleted by pressing the delete button and the page is automatically updated (5 Points)

- Own review can not be liked. Can only like if logged in. Can like/dislike other reviews but only once (20 Points)

Log Out (5 Points):

- When the Log Out link is pressed in the header, the user is redirected to the home page with Log In and Sign Up in the header (5 Points)
