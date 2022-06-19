const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const postScheme = mongoose.Schema({
    streamingPartner:{
        type:String,
        required: true
    },
    movieName:{
        type:String,
        required: true
    },
    imageUrl:{
        type:String,
    },
    language:{
        type:String,
        required: true
    },
    starring:{
        type:String,
        required: true
    },
    director:{
        type:String,
    },
    description:{
        type:String,
    },
    dateReleased:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('posts', postScheme);