var express = require('express');
var app = express();

// SHOW LIST OF APPLICANTS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
	conn.query('SELECT * FROM applicants ORDER BY applicant_id ASC',function(err, rows, fields) {
	    //if(err) throw err
	    if (err) {
		req.flash('error', err)
		res.render('applicants/list', {
		    title: 'Applicants List',
		    data: ''
		})
	    } else {
		// render to views/applicants/list.ejs template file
		res.render('applicants/list', {
		    title: 'Applicants List',
		    data: rows
		})
	    }
	})
    })
})

// SHOW Application FORM
app.get('/add', function(req, res, next){	
    // render to views/applicants/add.ejs

    res.render('applicants/add', {
	title: 'Apply',
	job_id: req.query.job_id,
	first_name: '',
	last_name: '',
	email: '',
	phone: ''
    })
})

// ADD NEW APPLICANT POST ACTION
app.post('/add', function(req, res, next){	
    req.assert('first_name', 'First name is required').notEmpty()           //Validate name
    req.assert('last_name', 'Last name is required').notEmpty()             //Validate age
    var errors = req.validationErrors()

    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/

	var applicant = {
	    applicant_id: null,
	    first_name: req.sanitize('first_name').escape().trim(),
	    last_name: req.sanitize('last_name').escape().trim(),
	    email: req.sanitize('email').escape().trim(),
	    phone: req.sanitize('phone').escape().trim(),
	    job_id: req.body.job_id
	}

	req.getConnection(function(error, conn) {
	    conn.query('INSERT INTO applicants SET ?', applicant, function(err, result) {
		//if(err) throw err
		if (err) {
		    req.flash('error', err)

		    // render to views/applicants/add.ejs
		    res.render('applicants/add', {
			title: 'Apply',
			first_name: applicant.first_name,
			last_name: applicant.last_name,
			email:  applicant.email,
			phone:  applicant.phone,
			job_id:	req.body.job_id,
		    })
		} else {				
		    req.flash('success', 'Data added successfully!')
		    res.redirect('/applicants')
/*
		    // render to views/applicants/add.ejs
		    res.render('applicants/add', {
			title: 'Apply',
		        job_id:	req.body.job_id,
			first_name: '',
			last_name: '',
			email: '',
			phone: ''
		    })
*/
		}
	    })
	})
    }
    else {   //Display errors to user
	var error_msg = ''
	errors.forEach(function(error) {
	    error_msg += error.msg + '<br>'
	})				
	req.flash('error', error_msg)		

	/**
	 * Using req.body.name 
	 * because req.param('name') is deprecated
	 */ 
        res.render('applicants/add', {
            title: 'Apply',
            first_name: req.body.first_name,
            last_name: req.body.last_name,
	    email: req.body.email,
	    phone: req.body.phone,
	    job_id: req.query.job_id
        })
    }
})

// SHOW EDIT APPLICANTS FORM
app.get('/edit/(:applicant_id)', function(req, res, next){
    req.getConnection(function(error, conn) {
	conn.query('SELECT * FROM applicants WHERE applicant_id = ' + req.params.applicant_id, function(err, rows, fields) {
	    if(err) throw err
	    // if applicants not found
	    if (rows.length <= 0) {
		req.flash('error', 'Applicants not found with applicant_id = ' + req.params.applicant_id)
		res.redirect('/applicants')
	    }
	    else { // if applicant found
		// render to views/applicants/edit.ejs template file
		res.render('applicants/edit', {
		    title: 'Edit Applicants',
		    //data: rows[0],
		    applicant_id: rows[0].applicant_id,
		    first_name: rows[0].first_name,
		    last_name: rows[0].last_name,
		    email: rows[0].email,
		    phone: rows[0].phone
		})
	    }			
	})
    })
})

// EDIT APPLICANT POST ACTION
app.put('/edit/(:applicant_id)', function(req, res, next) {
    req.assert('first_name', 'First name is required').notEmpty()           //Validate job title
    req.assert('last_name', 'Last name is required').notEmpty()             //Validate job description

    var errors = req.validationErrors()

    if( !errors ) {   //No errors were found.  Passed Validation!

	        /********************************************
		 * Express-validator module

		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
	var applicant = {
	    //job_id: null,
	    first_name: req.sanitize('first_name').escape().trim(),
	    last_name: req.sanitize('last_name').escape().trim(),
            email: req.sanitize('email').escape().trim(),
            phone: req.sanitize('phone').escape().trim()
	}

	req.getConnection(function(error, conn) {
	    conn.query('UPDATE applicants SET ? WHERE applicant_id = ' + req.params.applicant_id, applicant, function(err, result) {
		//if(err) throw err
		if (err) {
		    req.flash('error', err)

		    // render to views/applicants/add.ejs
		    res.render('applicants/edit', {
			title: 'Edit Applicants',
			applicant_id: req.body.applicant_id,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
                        email: req.body.email,
                        phone: req.body.phone
		    })
		} else {
		    req.flash('success', 'Data updated successfully!')

		    // render to views/applicants/add.ejs
		    res.render('applicants/edit', {
			title: 'Edit Applicants',
			applicant_id: req.body.applicant_id,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
                        phone: req.body.phone
		    })
		}
	    })
	})
    }
    else {   //Display errors to user
	var error_msg = ''
	errors.forEach(function(error) {
	    error_msg += error.msg + '<br>'
	})
	req.flash('error', error_msg)

	/**
	 * Using req.body.name 
	 * because req.param('name') is deprecated
	 */ 
        res.render('applicants/edit', {
            title: 'Edit Applicants',
	    applicant_id: req.body.applicant_id,
	    first_name: req.body.first_name,
	    last_name: req.body.last_name,
	    email: req.body.email,
            phone: req.body.phone
        })
    }
})

// DELETE APPLICANT
app.delete('/delete/(:applicant_id)', function(req, res, next) {
    var applicant = { applicant_id: req.params.applicant_id }

    req.getConnection(function(error, conn) {
	conn.query('DELETE FROM applicants WHERE applicant_id = ' + req.params.applicant_id, applicant, function(err, result) {
	    //if(err) throw err
	    if (err) {
		req.flash('error', err)
		// redirect to applicants list page
		res.redirect('/applicants')
	    } else {
		req.flash('success', 'Applicant deleted successfully! applicant_id = ' + req.params.applicant_id)
		// redirect to applicants list page
		res.redirect('/applicants')
	    }
	})
    })
})

module.exports = app;
