# EPIC-Mail
 

 [![Build Status](https://travis-ci.org/EmyRukundo/EPIC-Mail.svg?branch=develop)](https://travis-ci.org/EmyRukundo/EPIC-Mail)  ![Coveralls github](https://img.shields.io/coveralls/github/EmyRukundo/EPIC-Mail.svg?style=popout)  [![Maintainability](https://api.codeclimate.com/v1/badges/430aae199b238ec60664/maintainability)](https://codeclimate.com/github/EmyRukundo/EPIC-Mail/maintainability)




## App Description

    web app that helps people exchange messages/information over the internet.

    A User can creates account, compose email,view inbox, can see unread and

    Sent email, and can also delete email.
    
    This is the link for Pivot Track: https://www.pivotaltracker.com/n/projects/2314962


## Technologies Used

    JavaScript - Programming Language

    NodeJS - Server Environment

    Mocha and Chai - Test Framework And Assertion Library

    Travis-CI - Continuous Integration Testing

    Coveralls - Continuous Integration Test Coverage

    Code Climate - Continuous Integration Code Quality

    Heroku - App Deployed on Heroku

    GIT - Version Control System

    GitHub Pages - Front-End UI Hosting is Hosted: https://emyrukundo.github.io/EPIC-Mail/ 



## Running the api Locally

    clone the repo or download the zip
    Navigate to the folder where you downloaded or cloned the app
    Make sure you are on the Develop branch (Because the Develop branch has all the recent code)
    Run npm install from the terminal(make sure the port 5000 is free).
    Run npm start from the terminal to start the app.
    With the ideal tool preferably postman, send requests to the endpoints descriped bellow.


## API ENDPOINT ROUTES
   
| METHOD  |	ROUTES                   |	DESCRIPTION                          |
|-------- |--------------------------|----------------------------------------|        	                                  
| POST    |	api/v2/auth/signup       |    User Registration                   |	
| POST    |	api/v2/auth/login        |	   User Login 	                       |
| GET     | api/v2/auth/getUsers     |    Retrieve all users                  |
| POST    |	api/v2/messages          |    Send Email 	                       |
| GET 	  | api/v2/messages          |   	Retrieve Received Emails           | 	
| GET 	  | api/v2/messages          |    Retrieve A Specific Email          | 	
| DELETE  |	api/v2/messages          |	   Delete A Specific Email             | 	
| GET 	  | api/v2/message/sent      | 	  Retrieve Sent Emails               | 	
| GET 	  | api/v2/message/unread    |	   Retrieve unRead Emails            |
| POST    | api/v2/groups            |    Create groups                      |
| GET     | api/v2/groups            |     Fetch all groups                  |
| PATCH   | api/groups/:id/name      |    update group name                  |
| DELETE  | api/groups/:id           |    delete a group                     |
| POST    | api/groups/id/user       |    Add a ​user​ to a ​group​              |
| DELETE  | groups/:groupid/users/:id|Delete a ​user​ from a specific ​group. |
| POST    | groups/:id/message       | Create or send an ​email​ to a ​group     |

## Information on the API

       If you are running this app on from the hosted version, the following urls link:
       https://epicmailapplicatio.herokuapp.com
          

       If you are running this app from your local computer, the following urls link:
       http://localhost:4000 
 
   

     {
       "creating the user" : {
       "url" : "api/v1/auth/signup",
       "method" : "POST",
       "objectFormat" : {
           "email" : "user's email",
           "firstname" : "user's firstname",
           "lastname" : "user's last name",
           "password" : "user's password"

     }
      }, 
  
     "For login" : {
     "url" : "/api/v1/auth/login",
     "method" : "POST",
      "objectFormat" : {
      "email" : "email for authenticate user",
      "password" : "password for authenticate password"

          },
    
      "get all users" : {
      "url" : "/api/v1/auth/getUsers",
      "method" : "GET"
         },
  
     "Create a message" : {
     "url" : "/api/v1/messages",
      "method" : "POST",
      "objectFormat" : {
        "createdOn": 
        "subject": 
        "message": 
        "senderId": 
        "receiverId": 
        "parentMessageId": 
        "status": 
             },
    

        "get all messages " : {
         "url" : "/api/v1/messages",
         "method" : "GET"
           },
  
        "get a single message" : {
        "url" : "/api/v1/<messageId>",
        "method" : "GET"
           },
 
       "get sent message" : {
       "url" : "/api/v1/message/sent",
       "method" : "GET"
         },
  
      "get unread message" : {
      "url" : "/api/v1/message/unread",
      "method" : "GET"
     },
  
    "delete a message" : {
    "url" : "/api/v1/messages/<messageId>",
    "method" : "DELETE"
    }
}

 
   @COPYRIGHT 
      
       Emmanuel Rukundo