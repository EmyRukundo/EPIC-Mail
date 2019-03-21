import joi from 'joi';
import jsonWebToken from 'jsonwebtoken';
import Database from '../db/db-connection';
import selectFrom  from '../models/message';
import Validation from '../helpers/validations';
import uuid from 'uuid';

// @@get all messages



const getMessages = async (req, res) => {
  selectFrom('messages_table').then((users) => {
    if (users.rows) {
      return res.status(200).json({ status: 200, data: users.rows });
    }
  }).catch(error => res.status(500).json({ status: 500, error: `Internal server error : ${error}` }));
};


  //@@Create message

  const createMessage = (req, res) => {
   
      const newMessage = [
        new Date(),
        req.body.subject,
        req.body.messages,
        req.body.userId, //senderId
        req.body.receiverid, //receiverid
        req.body.parentmessageid,
        req.body.status
      ];
     
      
      const messageSql = Database.executeQuery(`INSERT INTO messages_table(created_on,subject,messages,senderid,receiverid,parentmessageid,status) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`, newMessage);
      console.log(messageSql.rows);
      messageSql.then((insertedMessage) => {   
      
        if (insertedMessage.rows) {
          return res.status(200).json(
              {    
            status: 200,
            data: insertedMessage.rows,

          });
        }
        return res.status(400).json({
          status: 400,
          error: " You can not send email",
        });
      });
   
  };
  
//@get a specific Email

  const specificEmail = (req, res) => {

    const ownerIt = Database.executeQuery(`SELECT * FROM messages_table WHERE senderid='${req.body.userId}'`);

    ownerIt.then((result) =>{
        
        if(result.rows ==0) { return res.status(404).send('No email found with given user id')}});

    
    const messageSql = Database.executeQuery(`SELECT * FROM messages_table WHERE id = '${req.params.id}'`);
 
    messageSql.then((result) => {

      if (result.rows.length) {

        return res.status(200).json({

          status: 200,
          data: result.rows
        });
      }
      return res.status(404).json({

        status: 404,
        error: 'No email found!',

      });
    }).catch(error => res.status(500).json({

      status: 500,
      error: `Internal server error ${error}`,

    }));
  };


  
  //@get a sent message
    
    const sentMessage = (req, res) => {
          
        const sql = "SELECT * FROM messages_table WHERE status='sent'"; 
        const messageSql = Database.executeQuery(sql);
        
        console.log(messageSql.rows);
        messageSql.then((result) => {
          console.log(result.rows);
          if (result.rows.length) {

            return res.status(200).json({
              status: 200,
              data: result.rows,
            });
          }
      
          return res.status(404).json({
            status: 400,
            error: 'No sent email found',
          });
        }).catch(error =>{
            console.log(error);
            res.status(500).json({
                status: 500,
                error: `Internal server error ${error}`,
              })
        }
         
        );
      };


// @get unread Message

const unreadMessage = (req, res) => {

  let token = 0;
  let decodedToken = '';
  let userId = '';
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
    decodedToken = jsonWebToken.verify(token, 'secret');
    userId = decodedToken.user[0].id;
  } else {
    return res.status(403).json({
      status: 403,
      error:" Oops,you are not authorised!!",
    });
  }

    const sql =" SELECT * FROM messages_table WHERE status LIKE 's%' ";
    const messageSql = Database.executeQuery(sql);

   
    messageSql.then((result) => {
      console.log(result);
      if (result) {
        console.log(result);
        return res.status(200).send({
          status: 200,
          data: result.rows,
        });
      }
      console.log(result);
      return res.status(404).json({
        status: 400,
        error: 'No unread email found',
      });
    }).catch(error => res.status(500).json({
      status: 500,
      error: `Internal server error ${error}`,
    }));
  };

  //@@ delete a specific email

const deleteEmail= async (req, res) => {

   
      
    const tableAv = Database.executeQuery(`SELECT * FROM messages_table WHERE id='${req.params.id}'`);

      tableAv.then((istableAv) =>{
          
          if(istableAv.rows ==0) { return res.status(404).send('message does not exist')}});

    const ownerIt = Database.executeQuery(`SELECT * FROM messages_table WHERE senderid='${req.body.userId}'`);

    ownerIt.then((result) =>{
        
        if(result.rows ==0) { return res.status(404).send('No email found with given user id')}});
    
  
    Database.executeQuery(`DELETE FROM messages_table WHERE id = '${req.params.id}' RETURNING *`).then((result) => {
      
      res.status(202).json({ status:202,message: "Message Deleted  successful" });
      
    }).catch(error => res.status(500).json({ status: 500, error: `Server error ${error}` }));

  }

    export{
        getMessages,createMessage,specificEmail,sentMessage,unreadMessage,deleteEmail
      };