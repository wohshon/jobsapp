var express = require('express');
var app = express();

// SHOW LIST OF JOB POSTINGS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
	conn.query('SELECT * FROM jobpostings ORDER BY job_id ASC',function(err, rows, fields) {
	    //if(err) throw err
	    if (err) {
		req.flash('error', err)
		res.render('posting/list', {
		    title: 'Job Postings List',
		    data: ''
		})
	    } else {
		// render to views/posting/list.ejs template file
		res.render('posting/list', {
		    title: 'Job Postings List',
		    data: rows
		})
	    }
	})
    })
})

// SHOW ADD JOB POSTING FORM
app.get('/add', function(req, res, next){	
    // render to views/posting/add.ejs
    res.render('posting/add', {
	title: 'Add New Job',
	job_title: '',
	job_description: '',
	location: ''
    })
})

// ADD NEW JOB POSTING POST ACTION
app.post('/add', function(req, res, next){	
    req.assert('job_title', 'Job title is required').notEmpty()           //Validate name
    req.assert('job_description', 'Job description is required').notEmpty()             //Validate age
    req.assert('location', 'A valid location is required').notEmpty()  //Validate email

    var errors = req.validationErrors()

    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
	var posting = {
	    job_id: null,
	    job_title: req.sanitize('job_title').escape().trim(),
	    job_description: req.sanitize('job_description').escape().trim(),
	    location: req.sanitize('location').escape().trim()
	}

	req.getConnection(function(error, conn) {
	    conn.query('INSERT INTO jobpostings SET ?', posting, function(err, result) {
		//if(err) throw err
		console.log('adding new job');
		if (err) {
		    req.flash('error', err)
		    // render to views/posting/add.ejs
		    res.render('posting/add', {
			title: 'Add New Job Posting',
			job_title: posting.job_title,
			job_description: posting.job_description,
			location: posting.location
		    })
		} else {				
		    req.flash('success', 'Data added successfully!')
		    res.redirect('/postings')
/*
		    // render to views/posting/add.ejs
		    res.render('posting/add', {
			title: 'Add New Job Posting',
			job_title: '',
			job_description: '',
			location: ''					
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
        res.render('posting/add', { 
            title: 'Add New Job Posting',
            job_title: req.body.job_title,
            job_description: req.body.job_description,
            location: req.body.location
        })
    }
})

// SHOW EDIT JOB POSTING FORM
app.get('/edit/(:job_id)', function(req, res, next){
    req.getConnection(function(error, conn) {
	conn.query('SELECT * FROM jobpostings WHERE job_id = ' + req.params.job_id, function(err, rows, fields) {
	    if(err) throw err
	    // if job postings not found
	    if (rows.length <= 0) {
		req.flash('error', 'Job Posting not found with job_id = ' + req.params.job_id)
		res.redirect('/postings')
	    }
	    else { // if job posting found
		// render to views/posting/edit.ejs template file
		res.render('posting/edit', {
		    title: 'Edit Job Posting', 
		    //data: rows[0],
		    job_id: rows[0].job_id,
		    job_title: rows[0].job_title,
		    job_description: rows[0].job_description,
		    location: rows[0].location					
		})
	    }			
	})
    })
})

// EDIT JOB POSTING POST ACTION
app.put('/edit/(:job_id)', function(req, res, next) {
    req.assert('job_title', 'Job title is required').notEmpty()           //Validate job title
    req.assert('job_description', 'Job description is required').notEmpty()             //Validate job description
    req.assert('location', 'Location is required').notEmpty()  //Validate location

    var errors = req.validationErrors()

    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
	var posting = {
	    //job_id: null,
	    job_title: req.sanitize('job_title').escape().trim(),
	    job_description: req.sanitize('job_description').escape().trim(),
	    location: req.sanitize('location').escape().trim()
	}

	req.getConnection(function(error, conn) {
	    conn.query('UPDATE jobpostings SET ? WHERE job_id = ' + req.params.job_id, posting, function(err, result) {
		//if(err) throw err
		if (err) {
		    req.flash('error', err)

		    // render to views/posting/add.ejs
		    res.render('posting/edit', {
			title: 'Edit Job Posting',
			job_id: req.params.job_id,
			job_title: req.body.job_title,
			job_description: req.body.job_description,
			location: req.body.location
		    })
		} else {
		    req.flash('success', 'Data updated successfully!')

		    // render to views/posting/add.ejs
		    res.render('posting/edit', {
			title: 'Edit Job Posting',
			job_id: req.params.job_id,
			job_title: req.body.job_title,
			job_description: req.body.job_description,
			location: req.body.location
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
        res.render('posting/edit', { 
            title: 'Edit Job Posting',            
	    job_id: req.params.job_id, 
	    job_title: req.body.job_title,
	    job_description: req.body.job_description,
	    location: req.body.location
        })
    }
})

// DELETE JOB POSTING
app.delete('/delete/(:job_id)', function(req, res, next) {
    var posting = { job_id: req.params.job_id }
	
    req.getConnection(function(error, conn) {
	conn.query('DELETE FROM jobpostings WHERE job_id = ' + req.params.job_id, posting, function(err, result) {
	    //if(err) throw err
	    if (err) {
		req.flash('error', err)
		// redirect to posting list page
		res.redirect('/postings')
	    } else {
		req.flash('success', 'Job posting deleted successfully! job_id = ' + req.params.job_id)
		// redirect to posting list page
		res.redirect('/postings')
	    }
	})
    })
})

module.exports = app;
