const express = require ('express') ;
const dotenv = require ('dotenv') ;

const app = express();
dotenv.config();

const PORT = process.env.NODE_PORT || 3080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// const writeRead = require('./routes/writeRead');
// const updateDelete = require('./routes/updateDelete');
const order = require('./routes/order');

// // app.use('/wr',writeRead);
// // app.use('/ud',updateDelete);
app.use('/api',order);

app.use((req, res, next)=>{
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log('Server running on port:' + PORT);
});