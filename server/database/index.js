const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://mtuspeh:f0lNNPkwNe5oz5tP@cluster0.8gxy4xe.mongodb.net/')
    .then(() => console.log('Connected to mongoDB'))
    .catch((error) => console.log('MondoDB error: ', error));

