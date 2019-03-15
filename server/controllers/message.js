import joi from 'joi';
import Validation from '../helpers/validations';

const email =[{
    id:1,
    createdOn:'26/02/2019​',
    subject:'greetings',
    message:'How is everything going brother',
    senderId:1, receiverId:1, 
    parentMessageId:1,
     status:'unread'
},{
    id:2,
    createdOn:'08/03/2019​',
    subject:'Andela Fellowship',
    message:'Andela Kigali Bootcamp cycle Four',
    senderId:2,receiverId:2,
    parentMessageId:2,
     status:'sent'
 },{
    id:3,
    createdOn:'10/03/2019​',
    subject:'Software development',
    message:'Technical skills that require passion',
    senderId:3,receiverId:3,
    parentMessageId:3,
     status:'sent'
 },{
    id:4,
    createdOn:'11/03/2019​',
    subject:'Kigali love',
    message:'Try your best to be in kigali',
    senderId:3,receiverId:3,
    parentMessageId:3,
     status:'unread'
 }]

 //@get all messges

 const getMessages= (req,res)=>{

    res.send({status:200, data:email});
   if(!getMessages) res.status(404).send('the data was not found,Try again');
};

//@Create message

const createMessage = (req, res) => {

    joi.validate(req.body, Validation.messageSchema, Validation.validationOption).then((result) => {

    const newMessage = {
            id: email.length + 1,
            createdOn:new Date(),
            subject: req.body.subject,
            message: req.body.message,
            senderId: req.body.senderId,
            receiverId: req.body.receiverId,
            parentMessageId: req.body.parentMessageId,
            status: req.body.status,
        };
        email.push(newMessage);
        res.status(201).send({status:201, data: newMessage});

    }).catch(error => res.status(400).send({
        status: 400,
        error: error.details[0].message.replace(/[$\/\\#,+()$~%.'":*<>{}]/g,''),
      }));
};

//@specificMessage

  const specificEmail= (req,res)=>{

   const specificMessage = email.find(c => c.id === parseInt (req.params.id));
   if(!specificMessage) return res.status(404).send('The Email with the given ID was not found');
   
   res.status(200).send({status:200,data:specificMessage});
    
  };

//@sentMessage

  const sentMessage = (req,res)=>{ 
    const sentMail = [];
    email.forEach((message) => {
        if(message.status =="sent")
        {
         sentMail.push(message);

        }
    })
        
        if(!sentMail) return res.status(400).send('NO any unread Email');
        
        res.status(200).send({status:200, data:sentMail});
        };


    
  //@unreadMessage
  
    const unreadMessage = (req,res)=>{
   const output = [];
    email.forEach((message) => {
        if(message.status =="unread")
        {
         output.push(message);

        }
    })
        
        if(!output) return res.status(400).send('NO any unread Email');
        
        res.status(200).send({status:200, data:output});
        };

//@deleteEmailS

const deleteEmail = (req,res)=>{

    const deleteMessage = email.find(c => c.id === parseInt(req.params.id));
    if(!deleteMessage) res.status(404).send('The Email with the given ID was not found');
    const index = email.indexOf(deleteEmail);
      email.splice(index,1);   
      res.send({status:200,message: "you deleted email successfully."});
  
  
  };
  
export{
    getMessages,createMessage,specificEmail,deleteEmail,unreadMessage,sentMessage
};   