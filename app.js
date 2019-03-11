import express from 'express';
const app = express();


import userRouter from './server/routes/user';
import messageRouter from './server/routes/message';
import specificRouter from './server/routes/specificEmail';
import deleteRouter from './server/routes/deleteMessage';


app.use(express.json());

app.use('/api/v1/',specificRouter);
app.use('/api/v1/auth/',userRouter);
app.use('/api/v1/',messageRouter);

app.use('/api/v1/',deleteRouter);

app.get('/',(req,res)=>{

	res.status(202).send('Welcome to the EPIC Mail web app');
});

app.get('/*',(req,res)=>{

	res.status(404).send('This is not the page you are looking for');
});

app.get((err,req,res,next) => {
					  
	res.status(404).send('This is not the page you are looking for');
});


const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));

export default app;