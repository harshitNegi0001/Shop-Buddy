import express from 'express';
import router from './routes/authRoutes.js';
import cors from 'cors'; 
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const app = express();
const port = 5000;

app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}));

app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api',router);
app.get('/',(req,res)=>{
    res.send("<h1>Welcome</h1>");
})
app.get('/set-test-cookie', (req, res) => {
  res.cookie('testCookie', 'hello', {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax'
  });
  res.json({ message: 'Test cookie sent' });
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})