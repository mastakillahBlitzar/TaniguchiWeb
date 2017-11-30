var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

const ArticleSchema = new Schema({
    
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
    },
    pictures: [{
        url: String,
        description: String
    }],
    date:{
        type: Date,
        required: true
    }

});

ArticleSchema.plugin(autoIncrement.plugin, 'Article');

var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;