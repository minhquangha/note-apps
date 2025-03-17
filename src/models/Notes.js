const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { title } = require('process');

const noteSchema = mongoose.Schema({
    title : {type: String, required: true},
    content: {type:String, required: true},
},{timestamp:true});

module.exports= mongoose.model('Note',noteSchema);  