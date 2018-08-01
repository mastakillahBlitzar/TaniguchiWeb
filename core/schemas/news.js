var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

const NewsSchema = new Schema({

    title: String,
    content: String,
    pictures: [
        {
            url: String,
            description: String
        }],
    date: Date
});

NewsSchema.plugin(autoIncrement.plugin, 'News');

var News = mongoose.model('News', NewsSchema);
module.exports = News;