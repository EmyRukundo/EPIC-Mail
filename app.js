import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './server/routes/users';
import groupsRouter from './server/routes/groups';


import messageRouter from './server/routes/message';
import swagger from 'swagger-ui-express';
import yamljs from 'yamljs';

const port = process.env.PORT || 4000;

const swaggerDocumment = yamljs.load('server/swagger/document.yml');

const app = express();
app.use('/doc',swagger.serve, swagger.setup(swaggerDocumment));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v2/auth/',userRouter);
app.use('/api/V2/groups',groupsRouter);
app.use('/api/v2/messages',messageRouter);




app.get('/',(req,res)=>{

	res.status(200).send('Welcome to the EPIC Mail web app');
});

app.get('/*',(req,res)=>{

	res.status(404).send('This is not the page you are looking for');

});

app.listen(port, ()=> console.log(`Listening on port ${port}...`));

export default app;