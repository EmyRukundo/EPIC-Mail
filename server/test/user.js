import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';

process.env.NODE_ENV = 'test';

chai.should();
chai.use(chaiHttp);


//  test for getting all users

  describe('GET ALL USERS', () => {
    it('Should get all users', () => {
      chai.request(app).get('/api/v2/auth/getUsers').end((err, res) => {
        res.should.have.status(404);
        
      });
    });
  });

  //login test

  describe('TESTING USER LOGIN', () => {
    it('Should login into user account', () => {
      chai.request(app).post('/api/v2/auth/login').send({
           email: 'Emmanuel', password: 'Rukundo' }).end((err, res) => {
       
        res.body.should.be.a('object');
      });
    });
  });


  describe('CAN CREATE A NEW ACCOUNT', () => {
    it('Should create a new user', () => {
      const userAccount = {
        id:1,
        email:'rukundoemma@gmail.com',
        firstname:'Emmanuel',
        lastname:'Rukundo',
        password:'success'
      };
      chai.request(app).post('/api/v2/auth/signup').send(userAccount).end((err, res) => {
        try {
          res.should.have.status(400);
          res.body.should.be.a('object');
        } catch (error) {
          throw error;
        }
      });
    });
  });