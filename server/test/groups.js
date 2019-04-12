import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';

process.env.NODE_ENV = 'test';

chai.should();
chai.use(chaiHttp);


  describe('CAN CREATE A NEW ACCOUNT', () => {
    it('Should create a new user', () => {
      const createGroup = {
       name:"Developer",
      };
      chai.request(app).post('/api/v2/groups').send(createGroup).end((err, res) => {
        try {
          res.should.have.status(403);
          res.body.should.be.a('object');
        } catch (error) {
          throw error;
        }
      });
    });
  
  });

  