// server.js

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://node:node@ds055495.mongolab.com:55495/bookies'); // connect to our database
var Survey     = require('./models/survey');        //survey model

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var router = express.Router();              // get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the SurveyAPI' });   
});

router.route('/surveys')

    // create a survey (accessed at POST http://localhost:8080/api/surveys)
    .post(function(req, res) {
        
        var survey = new Survey();      // create a new instance of the Survey model
        survey.name = req.body.survey.name;
        survey.subject = req.body.survey.subject;
        survey.target = req.body.survey.target; 
        survey.country = req.body.survey.country;
        survey.subscription = req.body.survey.subscription;
        survey.numberOfQuestions = req.body.survey.numberOfQuestions;
        survey.save(function(err) {
            if (err){
                res.send(err);
            }
            else{
            res.json({ message: 'Survey created!' });
       		 }
        });
        
    })
    //get all surveys
    .get(function(req, res) {
        Survey.find(function(err, surveys) {
            if (err)
                res.send(err);

            res.json(surveys);
        });
    });


//find surveys based on parameters to GET request
router.route('/surveys/find')
    .get(function(req,res){
     
        var searchObject = {};
        if (req.param('subject')) searchObject["subject"] = req.param('subject');
        if (req.param('name')) searchObject["name"] = req.param('name');
        if (req.param('country')) searchObject["country"] = req.param('country');

            Survey.find(searchObject,function(err,surveys){
                if (err) res.send(err);
                res.json(surveys);
            });
       
    })
    //filter surveys based on information received in a post request.
    .post(function(req,res){

         Survey.find(req.body.survey,function(err,surveys){
                if (err) res.send(err);
                res.json(surveys);
            });
    });

router.route('/surveys/:survey_id')
    .get(function(req, res) {
        Survey.findById(req.params.survey_id, function(err, survey) {
            if (err)
                res.send(err);
            res.json(survey);
        });
    })
    // delete a survey with it's id 
    .delete(function(req, res) {
        Survey.remove({
            _id: req.params.survey_id
        }, function(err, survey) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

//routes
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Running on port : ' + port);