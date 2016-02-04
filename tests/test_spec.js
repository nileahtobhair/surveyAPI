var frisby = require('frisby');

//Testing the application home -GET
frisby.create("/api endpoint testing")
.get('https://survey-api.herokuapp.com/api')
.after(function(err, res, body) {
        console.log("Testing the api basic path");
    })
.expectStatus(200)
.expectJSONLength(1)
.toss();


//Testing the /surveys endpoint -GET
frisby.create("/surveys endpoint testing")
.get('https://survey-api.herokuapp.com/api/surveys')
.after(function(err, res, body) {
        console.log("Testing the /surveys endpoint \n1)Expect status -200\n2)Expect 13 surveys to be returned");
    })
.expectStatus(200)
.expectJSONLength(15)
.toss();


//Testing the /surveys/find endpoint - with a single parameter - GET
frisby.create("/surveys/find endpoint testing - GET")
.get('https://survey-api.herokuapp.com/api/surveys/find?subject=technology')
.afterJSON(function(json) {
        console.log("\nTesting the /surveys/find endpoint with subject=technology parameters\n1)Expect status -200 \n2)Expect 5 surveys to be returned");
    })
.expectStatus(200)
.expectJSONLength(5)
.toss();

//Testing the /surveys/find endpoint - with two parameters - GET
frisby.create("/surveys/find endpoint testing - GET")
.get('https://survey-api.herokuapp.com/api/surveys/find?subject=technology&&name=userTesting')
.afterJSON(function(json) {
	 console.log("\nTesting the /surveys/find endpoint with two parameters (subject&&name)\n1)Expect status -200 \n2)Expect 1 survey to be returned \n3)Expect JSON to be of right structure, length, content and type");
    })
.expectStatus(200)
.expectJSONLength(1)
.expectJSONTypes('*', {
    _id: String,
    country: String,
    subject: String,
    name : String,
    __v: Number,
    subscription:{
    	frequency: String,
    	channel: String
    }
   })
.toss();

//Testing the /surveys/:survey_id endpoint -GET
frisby.create("/surveys/:survey_id endpoint testing - GET")
.get('https://survey-api.herokuapp.com/api/surveys/56b26cd21b4148c608f1f213')
.afterJSON(function(json) {
	 console.log("\nTesting the /surveys/:survey_id endpoint \n1)Expect status -200 \n2)Expect the survey to have 6 elements\n3)Expect the correct survey with the correct id to be returned");
    })
.expectStatus(200)
.expectJSONLength(7)
.expectJSON({
      _id:"56b26cd21b4148c608f1f213"
  })
.toss();


//Testing the surveys/find endpoint -POST
frisby.create('Testing the surveys/find endpoint -POST - which uses post data to filter survey results')
  .post('https://survey-api.herokuapp.com/api/surveys/find',
   	{ "survey":{
   		"name": "Android",
   	}},
   	{ json: true },
  	{ headers: { 'Content-Type': 'application/json' }}
   )
  .afterJSON(function(json) {
	 console.log("\nTesting the surveys/find endpoint -POST - which uses post data to filter survey results \n1)Expect status -200 \n2)Expect the header to be of type json\n");
    })
  .expectStatus(200)
  .expectHeader('Content-Type', 'application/json')
  .expectHeaderContains('content-type', 'application/json')
  .toss();
/*
  //Testing the /surveys endpoint -POST
frisby.create('Testing the surveys/find endpoint -POST - which uses post data to create a new survey')
  .post('https://survey-api.herokuapp.com/api/surveys/',
   	{ "survey":{
   		"name": "fromtestingframework",
   		"subject": "testing",
   		"country": "IE",
   		"subscription":{
   			"frequency":"weekly",
   			"channel":"email"
   		}
   	}},
   	{ json: true },
  	{ headers: { 'Content-Type': 'application/json' }}
   )
  .expectStatus(200)
  .expectHeader('Content-Type', 'application/json')
  .expectHeaderContains('content-type', 'application/json')
  .toss();*/

//Testing the  /surveys/:survey_id endpoint -DELETE
/*frisby.create("/surveys/:survey_id endpoint testing - DELETE")
.delete('https://survey-api.herokuapp.com/api/surveys/56b26e6c1b4148c608f1f216')
.expectStatus(200)
.toss();*/

//Testing the error cases
frisby.create("/api endpoint testing")
.get('https://survey-api.herokuapp.com/api/Sur')
.after(function(err, res, body) {
        console.log("Testing the api basic path");
    })
.expectStatus(404)
.toss();
