// app/models/survey.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SurveySchema   = new Schema({
    name: String,
    subject: String,
    country: String,
    numberOfQuestions: Number,
    target: {
    	gender: String,
    	ageRange : String,
    	income:{
    		currency : String,
    		range :String
    	}
    },
    subscription:{
    	frequency : String,
    	channel: String
    }
    	
});

module.exports = mongoose.model('Survey', SurveySchema);