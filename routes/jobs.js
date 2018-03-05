var express = require('express');
var util = require('./util');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
var data =null;
  util.connectionPool.request() // or: new sql.Request(pool1)
  .query('select * from JOBS', (err, result) => {
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
  .query('select * from JOBS WHERE ID = ' + req.params.jobID, (err, result) => {

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
INSERT INTO JOBS (ID, TITLE, LOCATION, CATEGORY, TYPE, DESCRIPTION, URL)

{
  "ID": null,
  "TITLE": "SSA",
  "LOCATION": "apac",
  "CATEGORY": "Techincal",
  "TYPE" :"Perm",
  "DESCRIPTION": "good job",
  "URL": "http://jobstreet.com/1234"
}

*/

router.post('/', function(req, res, next) {

  console.log(req.body);
//  var q='Update applicants SET first_name="'+req.param('first_name')+'", last_name="'+req.param('last_name')+'", phone="'+req.param('phone')+'", email="'+req.param('email')+'" where applicant_id="'+req.param('applicant_id')+'"';
  var job=req.body;
var q="Insert into JOBS values ('"+job.TITLE+"','"+job.LOCATION+"','"+job.CATEGORY+"','"+job.TYPE+"','"+job.DESCRIPTION+"','"+job.URL+"')";
console.log(q);
  util.connectionPool.request() // or: new sql.Request(pool1)
  .query(q, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(result.rowsAffected+' rows added');
      if (result.rowsAffected == 0) {
        res.send('records not added');
      }
      else
        res.sendStatus(200);
    }
  });
});

router.post('/(:jobID)', function(req, res, next) {

  console.log(req.body);
  var job=req.body;
  var q="Update JOBS SET TITLE='"+job.TITLE+"', LOCATION='"+job.LOCATION+"',CATEGORY='"+job.CATEGORY+"',TYPE='"+job.TYPE+"',DESCRIPTION='"+job.DESCRIPTION+"',URL='"+job.URL+"' where ID='"+req.param("jobID")+"'";

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

router.delete('/(:jobID)', function(req, res, next) {
    util.connectionPool.request() // or: new sql.Request(pool1)
    .query("DELETE FROM JOBS WHERE ID = '" + req.params.jobID+"'", (err, result) => {
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
