var express = require('express')
var app = express()

app.get('/', function(req, res) {
    // render to views/index.ejs template file
    res.render('index', {title: 'My Node.js Application'})
/*
    //Database setup - create tables
    var jobpostingsDb_init = 'CREATE TABLE IF NOT EXISTS jobpostings('
	+ 'job_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,'
	+ 'job_title VARCHAR(40) NOT NULL,'
	+ 'job_description VARCHAR(100) NOT NULL,'
	+ 'location VARCHAR(30) NOT NULL,'
	+ 'posted_date TIMESTAMP NOT NULL'
	+ ')'

    var applicantsDb_init = 'CREATE TABLE IF NOT EXISTS applicants('
	+ 'applicant_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, '
	+ 'first_name VARCHAR(40) NOT NULL, '
	+ 'last_name VARCHAR(40) NOT NULL,'
	+ 'email VARCHAR(50),'
	+ 'phone VARCHAR(20),'
	+ 'job_id INT UNSIGNED NOT NULL,'
	+ 'applied_date TIMESTAMP NOT NULL'
	+ ')'

    req.getConnection(function(error, conn) {
        conn.query(jobpostingsDb_init, function (err) {
            if (err) {
		console.log("error creating DB")
		throw err
	    } else {
		console.log("tables created")
	    }
        })
    })

    req.getConnection(function(error, conn) {
        conn.query(applicantsDb_init, function (err) {
            if (err) {
                console.log("error creating DB")
                throw err
            } else {
                console.log("tables created")
            }
        })
    })
*/
})

/** 
 * We assign app object to module.exports
 * 
 * module.exports exposes the app object as a module
 * 
 * module.exports should be used to return the object 
 * when this file is required in another module like app.js
 */ 
module.exports = app;
