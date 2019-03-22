import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';


process.env.NODE_ENV = 'test';

chai.should();
chai.use(chaiHttp);


  describe('Get All messages', () => {

    it('Should get all emails randomly', () => {

      chai.request(app).get('/api/v2/messages').end((err, res) => {

        res.should.have.status(403);
  
      });
    });
  });


  describe('Get a specific email',()=>{

    it('Should get a specific email',()=>{

      chai.request(app).get('/api/v2/messages/1').end((err,res) =>{

        res.should.have.status(403);

        res.body.should.be.a('object');
      });
    });
  });

describe('GET UNREAD MESSAGE',()=>{
  it('should get unread email',()=>{
    chai.request(app).get('/api/v2/message/unread').end((err,res) =>{
      res.should.have.status(404);
      res.body.should.be.a('object');
    });
  });
});

describe('GET SENT MESSAGE',()=>{
  it('should get sent email',()=>{
    chai.request(app).get('/api/v2/message/sent').end((err,res) =>{
      res.should.have.status(404);
      res.body.should.be.a('object');
    });
  });
});


  describe('POST, CREATE NEW MESSAGE', () => {
    it('Should Create  a new Email', () => {
      const newMessage = {
        id:1,
        createdOn:'26/02/2019​',
        subject:'greetings',
        message:'How is everything going brother',
        senderId:2,
         receiverId:2, 
        parentMessageId:2,
         status:'sent'

      };
      chai.request(app).post('/api/v2/messages').send(newMessage).end((err, res) => {
        try {
        
          res.body.should.be.a('object');
          
        } catch (error) {
          throw error;
        }
      });
    });
  });

  describe('USER CAN DELETE MESSAGE', () => {
    it('should delete an email', () => {
      chai.request(app).delete('/api/v2/messages/2').end((err, res) => {

        res.should.have.status(403);
        res.body.should.be.a('object');

      });
    });
  });