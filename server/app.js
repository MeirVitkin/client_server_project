const express = require('express');
const cors = require('cors')
const loginRoute = require('./routes/loginRoute');
const todosRoute = require('./routes/todosRouts')
const postsRoute = require('./routes/postsRoute')
const commentsRoute = require('./routes/commentsRoute')
const authenticate = require("./routes/authenticate");


const app = express();
app.use(cors())
app.use(authenticate)
app.use(express.json())

app.use('/login',loginRoute)
app.use('/todos',todosRoute)
app.use('/posts',postsRoute)
app.use('/comments',commentsRoute)

const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});