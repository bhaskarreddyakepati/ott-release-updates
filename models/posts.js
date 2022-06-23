const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const postScheme = mongoose.Schema({
    streaming_partner:{
        type:String,
        required: true
    },
    movie_name:{
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
    date_released:{
        type:Date,
        required: true
    },
    display_date:{
        type:String,
        required: true
    },
    vote_count:{
        type:String
    },
    vote_average:{
        type:Number
    },
    genres:{
        type:String
    }
})

module.exports = mongoose.model('posts', postScheme);