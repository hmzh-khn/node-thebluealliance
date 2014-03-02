/**
 * The Blue Alliance API Library for node.js v1.0.0
 * (c) 2014 Hamzah Khan [FRC 3188 (2010), FRC 3636 (2011-12), FRC 1540 (2013-14)]
 * License: MIT
 */

var req = require('request');

// all TBA API v2 requests go to this root folder
var rootURL = 'http://www.thebluealliance.com/api/v2/';

// you have to set a header in order to get the request methods
exports = module.exports = function(name, description, version) {
	
	/*********************************************
	************** Helper Functions **************
	**********************************************/

	// sends a request to the given url and then calls the callback
	var tbaRequest = function(url, callback) {
		req.get({ headers:headers, url:url },

	  	function(err, res) {
	  		if(!err) {
	  			if(res.statusCode === 200) {
	  				var info = JSON.parse(res.body);
	  				// successful request
	  				callback( null, info );
	  			}
	  			
	  			else
	  				// Unsuccessful because of 404 or something
	  				callback( new Error('Unsuccessful request to TBA'), null, null );
	  		}

	  		else
	  			// error in request
	  			callback(err, null, null);
	  	}

	  );
	};

	var yearValidation = function(year, callback) {
		// arguments validation for year and callback
	  switch( typeof year ) {
	  	case 'number':
	  		year = year;
	  		break;

	  	case 'function':
	  		callback = year;
	  		year = undefined;

	  	case 'undefined':
	  		year = new Date().getFullYear();
	  		break;
	  }

	  return { year:year, callback:callback };
	};

	// required header for v2 of TBA API
	var headers = { "X-TBA-App-Id":null };
	var isDefined = function(variable) { return (typeof variable !== 'undefined' && variable !== null); };

	// set header or throw error
	if( isDefined(name) && isDefined(description) && isDefined(version) )
		headers['X-TBA-App-Id'] = [name,description,'v'+version].join(':');
	else
		throw new Error('can not set header with null or undefined values');


	/*********************************************
	************* TBA Library Methods ************
	**********************************************/

	var tba = {};

	tba['getTeam'] = function(teamId, year, callback) {

		// Argument validation
		var validatedYear = yearValidation( year, callback );
		year = validatedYear.year;
		callback = validatedYear.callback || function(err, info) { console.log(err,info) };

		var url = rootURL+'team/frc'+ teamId +'/'+ year;

		tbaRequest(url,callback);
	};

	tba['getEventById'] = tba['getEvent'] = function(eventId, year, callback) {

		// Argument validation
		var validatedYear = yearValidation( year, callback );
		year = validatedYear.year;
		callback = validatedYear.callback || function(err, info) { console.log(err,info) };

		var url = rootURL+'event/'+ year+eventId;

		tbaRequest(url,callback);
	};

	// get all of the teams at an event
	tba['getTeamsAtEvent'] = function(eventId, year, callback) {

		// Argument validation
		var validatedYear = yearValidation( year, callback );
		year = validatedYear.year;
		callback = validatedYear.callback || function(err, info) { console.log(err,info) };

		var url = rootURL+'event/'+ year+eventId +'/teams';

		tbaRequest(url,callback);
	};

	// get all of the matches at an event
	tba['getMatchesAtEvent'] = function(eventId, year, callback) {

		// Argument validation
		var validatedYear = yearValidation( year, callback );
		year = validatedYear.year;
		callback = validatedYear.callback || function(err, info) { console.log(err,info) };

		var url = rootURL+'event/'+ year+eventId +'/matches';

		tbaRequest(url,callback);
	};

	return tba;
};
