var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

const NewsSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
    },
    pictures: [
        {
            url: String,
            description: String
        }],
    date: {
        type: Date,
    }

});

NewsSchema.plugin(autoIncrement.plugin, 'News');

var News = mongoose.model('News', NewsSchema);
module.exports = News;