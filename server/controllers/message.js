
const email =[{
    id:1,
    createdOn:'26/02/2019​',
    subject:'greetings',
    message:'How is everything going brother',
    senderId:2, receiverId:2, 
    parentMessageId:2,
     status:'sent'
},{
    id:2,
    createdOn:'26/02/2019​',
    subject:'greetings',
    message:'How is everything going brother',
    senderId:1,receiverId:1,
    parentMessageId:1,
     status:'unread'
 }]

 const getMessages= (req,res)=>{

    res.send(email);
   if(!getMessages) res.status(404).send('the data was not found,Try again');
};



const createMessage = (req, res) => {

    const newMessage = {
            id: email.length + 1,
            createdOn:new Date(),
            subject: req.body.subject,
            message: req.body.message,
            senderId: req.body.senderId,
            receivedId: req.body.receivedId,
            parentMessageId: req.body.parentMessageId,
            status: req.body.status,
        };
        email.push(newMessage);
        res.send(newMessage);
};


  const specificEmail= (req,res)=>{

   const specificMessage = email.find(c => c.id === parseInt (req.params.id));
   if(!specificMessage) return res.status(404).send('The Email with the given ID was not found');
   
   res.status(200).send(specificMessage);
    
  };


  const sentMessage = (req,res)=>{ 
    const sentEmail = email.find(c => c.status === req.params.status);
    if(!sentEmail) return res.status(400).send('NO any unread Email');
    res.status(200).send(sentEmail);
    };
    
  
  
    const unreadMessage = (req,res)=>{
   
        const unreadEmail = email.find(c => c.status === req.params.status);
        if(!unreadEmail) return res.status(400).send('NO any unread Email');
        
        res.status(200).send(unreadEmail);
        };



const deleteEmail = (req,res)=>{

    const deleteMessage = email.find(c => c.id === parseInt(req.params.id));
    if(!deleteMessage) res.status(404).send('The Email with the given ID was not found');
    const index = email.indexOf(deleteEmail);
      email.splice(index,1);   
      res.send({deleteMessage,message: "you deleted email successfully."});
  
  
  };
  
export{
    getMessages,createMessage,specificEmail,deleteEmail,unreadMessage,sentMessage
};   