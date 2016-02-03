var frisby = require('frisby');


frisby.create("Testing the survery_api")
.get('https://survey-api.herokuapp.com/api/surveys')
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.toss();
//https://survey-api.herokuapp.com/api/surveys