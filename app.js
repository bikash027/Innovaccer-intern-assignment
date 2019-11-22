const express=require('express');
const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser'); 
const db=require('./config/database');
const routes=require('./routes/routes');


const app=express();
const port =5000;


//database
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine','ejs');

app.use(express.static('public'));

app.use('/',routes);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));