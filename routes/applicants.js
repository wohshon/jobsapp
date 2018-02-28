var express = require('express');
var util = require('./util');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
var data =null;
  util.connectionPool.request() // or: new sql.Request(pool1)
  .query('select * from applicants', (err, result) => {
      // ... error checks

      console.dir(result.recordsets)
      data=result.recordsets[0];

      console.dir(data);

        res.render('applicants/list', {
            title: 'Applicants List',
            data: data,
            messages: {
              success: util.test(123),
              error: null
            }
        })

  })
});

router.get('/edit/(:applicant_id)', function(req, res, next){

  util.connectionPool.request() // or: new sql.Request(pool1)
  .query('select * from applicants WHERE applicant_id = ' + req.params.applicant_id, (err, result) => {
    var rows=result.recordsets[0];
    res.render('applicants/edit', {
		    title: 'Edit Applicants',
		    //data: rows[0],
		    applicant_id: rows[0].applicant_id,
		    first_name: rows[0].first_name,
		    last_name: rows[0].last_name,
		    email: rows[0].email,
		    phone: rows[0].phone,
        messages: {
          success: util.test(123),
          error: null
        }
		})
  })

});

router.post('/edit/(:applicant_id)', function(req, res, next) {

  console.log(req.param('first_name'));
//  var q='Update applicants SET first_name="'+req.param('first_name')+'", last_name="'+req.param('last_name')+'", phone="'+req.param('phone')+'", email="'+req.param('email')+'" where applicant_id="'+req.param('applicant_id')+'"';

var q="Update applicants SET first_name='"+req.param("first_name")+"', last_name='"+req.param("last_name")+"', phone='"+req.param("phone")+"', email='"+req.param("email")+"' where applicant_id='"+req.param("applicant_id")+"'";
console.log(q);
  util.connectionPool.request() // or: new sql.Request(pool1)
  .query(q, (err, result) => {
    console.log(err);
    console.log(result.rowsAffected);
  });



    var data =null;
    util.connectionPool.request() // or: new sql.Request(pool1)
    .query('select * from applicants', (err, result) => {
        // ... error checks

        console.dir(result.recordsets)
        data=result.recordsets[0];

        console.dir(data);

          res.render('applicants/list', {
              title: 'Applicants List',
              data: data,
              messages: {
                success: "Data updated!",
                error: null
              }
          })

    })

});

router.post('/delete/(:applicant_id)', function(req, res, next) {


    util.connectionPool.request() // or: new sql.Request(pool1)
    .query("DELETE FROM applicants WHERE applicant_id = '" + req.params.applicant_id+"'", (err, result) => {
      console.log(err);
      console.log(result.rowsAffected);
    });

    var data =null;
    util.connectionPool.request() // or: new sql.Request(pool1)
    .query('select * from applicants', (err, result) => {
        // ... error checks

        console.dir(result.recordsets)
        data=result.recordsets[0];

        console.dir(data);

          res.render('applicants/list', {
              title: 'Applicants List',
              data: data,
              messages: {
                success: "Data deleted!",
                error: null
              }
          })

    })
})
module.exports = router;
