const express = require('express');
const loginRoute = require('./routes/loginRoute');
const todosRoute = require('./routes/todosRouts')

const app = express();

app.use(express.json())

app.use('/login',loginRoute)
app.use('/todos',todosRoute)

const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});