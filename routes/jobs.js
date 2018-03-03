var express = require('express');
var util = require('./util');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
var data =null;
  util.connectionPool.request() // or: new sql.Request(pool1)
  .query('select * from jobTable', (err, result) => {
      console.dir(data);
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.dir(result.recordsets)
        data=result.recordsets[0];
        console.dir(data);
        res.send(data);
//        res.sendStatus(200);
      }
  })
});

router.get('/(:jobID)', function(req, res, next){

  util.connectionPool.request() // or: new sql.Request(pool1)
  .query('select * from jobTable WHERE jobID = ' + req.params.jobID, (err, result) => {

          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            console.dir(result.recordsets)
            data=result.recordsets[0];
            console.dir(data);
            res.send(data);
    //        res.sendStatus(200);
          }
  })

});

/*
{
  "jobID": null,
  "jobTitle": "janitor",
  "location": "apac",
  "category": "slave category",
  "jobType" :"slave",
  "jobDescription": "good job",
  "jobURL": "http://jobstreet.com/1234"
}

*/

router.post('/', function(req, res, next) {

  console.log(req.body);
//  var q='Update applicants SET first_name="'+req.param('first_name')+'", last_name="'+req.param('last_name')+'", phone="'+req.param('phone')+'", email="'+req.param('email')+'" where applicant_id="'+req.param('applicant_id')+'"';
  var job=req.body;
var q="Insert into jobTable values ('"+job.jobTitle+"','"+job.location+"','"+job.category+"','"+job.jobType+"','"+job.jobDescription+"','"+job.jobURL+"')";
console.log(q);
  util.connectionPool.request() // or: new sql.Request(pool1)
  .query(q, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(result.rowsAffected+' rows added');
      res.sendStatus(200);
    }
  });
});

router.post('/(:jobID)', function(req, res, next) {

  console.log(req.body);
  var job=req.body;
  var q="Update jobTable SET jobTitle='"+job.jobTitle+"', location='"+job.location+"',category='"+job.category+"',jobType='"+job.jobType+"',jobDescription='"+job.jobDescription+"',jobURL='"+job.jobURL+"' where jobID='"+req.param("jobID")+"'";

console.log(q);
  util.connectionPool.request() // or: new sql.Request(pool1)
  .query(q, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(result.rowsAffected+' rows updated');
      res.sendStatus(200);
    }
  });
});

router.delete('/(:jobID)', function(req, res, next) {


    util.connectionPool.request() // or: new sql.Request(pool1)
    .query("DELETE FROM jobTable WHERE jobID = '" + req.params.jobID+"'", (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log(result.rowsAffected+' rows deleted');
        res.sendStatus(200);
      }

    });

})
module.exports = router;
