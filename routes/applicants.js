var express = require('express');
var util = require('./util');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
var data =null;
  util.connectionPool.request() // or: new sql.Request(pool1)
  .query('select * from APPLICANTS', (err, result) => {
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
  .query('select * from APPLICANTS WHERE ID = ' + req.params.applicant_id, (err, result) => {

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


router.get('/jobapplications/(:applicant_id)', function(req, res, next){

  util.connectionPool.request() // or: new sql.Request(pool1)
  .query('select * from APPLICANTS WHERE ID = ' + req.params.applicant_id, (err, result) => {

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
INSERT INTO APPLICANTS (ID, NAME, EXPECTED_SALARY, PHOTO_LINK, STATUS, RESUME, JOB_ID)

{
  "ID": NULL`,
  "NAME": "john",
  "EXPECTED_SALARY": 12000,
  "PHOTO_LINK": "http://test.com/123.png",
  "STATUS" :"PENDING",
  "RESUME" : "this is my CV",
   "JOB_ID": 001
}

*/

router.post('/', function(req, res, next) {

  console.log(req.body);
//  var q='Update applicants SET first_name="'+req.param('first_name')+'", last_name="'+req.param('last_name')+'", phone="'+req.param('phone')+'", email="'+req.param('email')+'" where applicant_id="'+req.param('applicant_id')+'"';
  var appl=req.body;
var q="Insert into APPLICANTS values ('"+appl.NAME+"',"+appl.EXPECTED_SALARY+",'"+appl.PHOTO_LINK+"','"+appl.STATUS+"','"+appl.RESUME+"',"+appl.JOB_ID+")";
console.log(q);
  util.connectionPool.request() // or: new sql.Request(pool1)
  .query(q, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(result.rowsAffected+' rows created');
      if (result.rowsAffected == 0) {
        res.send('records not created');
      }
      else
      res.sendStatus(200);
    }
  });
});

router.post('/(:applicantID)', function(req, res, next) {

  console.log(req.body);
//  var q='Update applicants SET first_name="'+req.param('first_name')+'", last_name="'+req.param('last_name')+'", phone="'+req.param('phone')+'", email="'+req.param('email')+'" where applicant_id="'+req.param('applicant_id')+'"';
  var appl=req.body;
var q="Update APPLICANTS SET EXPECTED_SALARY="+appl.EXPECTED_SALARY+", NAME='"+appl.NAME+"', PHOTO_LINK='"+appl.PHOTO_LINK+"', STATUS='"+appl.STATUS+"', RESUME='"+appl.RESUME+"', JOB_ID='"+appl.JOB_ID+"' where ID='"+req.param("applicantID")+"'";
console.log(q);
  util.connectionPool.request() // or: new sql.Request(pool1)
  .query(q, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(result.rowsAffected+' rows updated');
      if (result.rowsAffected == 0) {
        res.send('records not found');
      }
      else
      res.sendStatus(200);
    }
  });
});

router.delete('/(:applicantID)', function(req, res, next) {


    util.connectionPool.request() // or: new sql.Request(pool1)
    .query("DELETE FROM APPLICANTS WHERE ID = '" + req.params.applicantID+"'", (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log(result.rowsAffected+' rows deleted');
        if (result.rowsAffected == 0) {
          res.send('records not found');
        }
        else
        res.sendStatus(200);
      }

    });

})
module.exports = router;
