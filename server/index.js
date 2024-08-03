const express = require('express');
const cors = require('cors');
const blogRouter = require('./route/blog-route');

require('./database');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);

app.use('/api', (request, response) => {
    response.send('Hello World');
});

app.listen(5000, () => {
    console.log(`App is running at 5000...`)
})