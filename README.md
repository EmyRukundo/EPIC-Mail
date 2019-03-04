# EPIC-Mail
 web app that helps people exchange messages/information over the internet. A User can creates account, compose email,view inbox, can see unread and sent email, and can also delete email.

 [![Build Status](https://travis-ci.org/EmyRukundo/EPIC-Mail.svg?branch=develop)](https://travis-ci.org/EmyRukundo/EPIC-Mail)  ![Coveralls github](https://img.shields.io/coveralls/github/EmyRukundo/EPIC-Mail.svg?style=popout)  [![Maintainability](https://api.codeclimate.com/v1/badges/430aae199b238ec60664/maintainability)](https://codeclimate.com/github/EmyRukundo/EPIC-Mail/maintainability)

Some Important links of the App 

     Github repo: https://github.com/EmyRukundo/EPIC-Mail
     UI pages: https://emyrukundo.github.io/EPIC-Mail/
     Pivot Track: https://www.pivotaltracker.com/n/projects/2314962
     Heroku :


Lists of API End points for EPIC-Mail

    
    POST/api/v1/auth/signup create new account
    GET/api/v1/auth/login signin
    POST/api/v1/messages create email
    GET/api/v1/messages Fetch all messages
    GET/api/v1/messages/:id get a specific email
    GET/api/v1/message/sent get sent messages
    GET/api/v1/message/unread get unread message
    DELETE/api/v1/messages/:id delete a message
