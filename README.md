# EPIC-Mail
 

 [![Build Status](https://travis-ci.org/EmyRukundo/EPIC-Mail.svg?branch=develop)](https://travis-ci.org/EmyRukundo/EPIC-Mail)  ![Coveralls github](https://img.shields.io/coveralls/github/EmyRukundo/EPIC-Mail.svg?style=popout)  [![Maintainability](https://api.codeclimate.com/v1/badges/430aae199b238ec60664/maintainability)](https://codeclimate.com/github/EmyRukundo/EPIC-Mail/maintainability)




App Description

    web app that helps people exchange messages/information over the internet.

    A User can creates account, compose email,view inbox, can see unread and,

    sent email, and can also delete email.
    this is the link for Pivot Track: https://www.pivotaltracker.com/n/projects/2314962

Running the api Locally

clone the repo or download the zip
Navigate to the folder where you downloaded or cloned the app
Make sure you are on the Develop branch (Because the Develop branch has all the recent code)
Run npm install from the terminal(make sure the port 5000 is free).
Run npm start from the terminal to start the app.
With the ideal tool preferably postman, send requests to the endpoints descriped bellow.

Running the tests locally

clone the repo or downoald the zip file(extract the zip and navigate to the folder containing the app)
Install dependecies with npm install from the terminal
Run tests with npm test 

Information on the UI (I have not yet connected this UI to the backend for now)
The UI folder is at the root folder and that is where every UI related file is located
link for UI and are on the gh-pages: https://emyrukundo.github.io/EPIC-Mail/

Information on the API

if you are running this app on from the hosted version, the following urls link is https://arcane-shelf-53833.herokuapp.com/api/

if you are running this app from your local computer, the following urls link is http://localhost:5000

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