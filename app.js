import express from 'express';
const app = express();
import bodyParser from 'body-parser';

import userRouter from './server/routes/user';
import session from 'express-session';

app.use(express.json());


app.use('/api/v1/auth/',userRouter);



app.get('/api',(req,res)=>{
res.status(202).send('Welcome to the EPIC Mail web app');
});

app.get((err,req,res,next) => {
	res.status(404).send('This is not the page you are looking for');
});


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));

export default app;