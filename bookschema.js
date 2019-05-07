let mongoos = require('mongoose');
let schema = mongoos.Schema;

let bookSchema = new schema({
    title: String,
    keyword: Array,
    author: String,
    published : {
        type: Date,
        default: Date.now()
    }
} );

module.exports = mongoos.model('Book',bookSchema);