const mongoose = require('mongoose');

const connectingString = 'mongodb+srv://asanctorum1301:Fj1TVFxZymuEcMUI@cluster0.qhuwdgv.mongodb.net/tickethack';

mongoose.connect(connectingString, { connectTimeoutMS: 2000 })
    .then(() => console.log('Database connected'))
    .catch(error => console.error(error));