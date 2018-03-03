var express = require('express');
var util = require('./util');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
var data =null;
  util.connectionPool.request() // or: new sql.Request(pool1)
  .query('select * from applicantTable', (err, result) => {
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

router.get('/(:applicant_id)', function(req, res, next){

  util.connectionPool.request() // or: new sql.Request(pool1)
  .query('select * from applicantTable WHERE applicantID = ' + req.params.applicant_id, (err, result) => {

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
  applicantID: 123,
  applicantName: 'joe',
  applciantExpectedSalary: 1000
  applicantPhotoLink: 'http://test.com/123.png',
  applicationStatus :'ok'
}

*/

router.post('/', function(req, res, next) {

  console.log(req.body);
//  var q='Update applicants SET first_name="'+req.param('first_name')+'", last_name="'+req.param('last_name')+'", phone="'+req.param('phone')+'", email="'+req.param('email')+'" where applicant_id="'+req.param('applicant_id')+'"';
  var appl=req.body;
var q="Insert into applicantTable values ('"+appl.applicantName+"',"+appl.applciantExpectedSalary+",'"+appl.applicantPhotoLink+"','"+appl.applicationStatus+"')";
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

router.post('/(:applicantID)', function(req, res, next) {

  console.log(req.body);
//  var q='Update applicants SET first_name="'+req.param('first_name')+'", last_name="'+req.param('last_name')+'", phone="'+req.param('phone')+'", email="'+req.param('email')+'" where applicant_id="'+req.param('applicant_id')+'"';
  var appl=req.body;
var q="Update applicantTable SET applciantExpectedSalary="+appl.applciantExpectedSalary+", applicantName='"+appl.applicantName+"', applicantPhotoLink='"+appl.applicantPhotoLink+"', applicationStatus='"+appl.applicationStatus+"' where applicantID='"+req.param("applicantID")+"'";
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

router.delete('/(:applicantID)', function(req, res, next) {


    util.connectionPool.request() // or: new sql.Request(pool1)
    .query("DELETE FROM applicantTable WHERE applicantID = '" + req.params.applicantID+"'", (err, result) => {
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
