/**
 * The Blue Alliance API Library for node.js v1.1.1
 * (c) 2014 Hamzah Khan [FRC 3188 (2010), FRC 3636 (2011-12), FRC 1540 (2013-14)]
 * License: MIT
 */

/*
	TBA API docs are at: http://www.thebluealliance.com/apidocs
*/

var req = require('request');

// all TBA API v2 requests go to this root folder
var ROOT_URL = 'http://www.thebluealliance.com/api/v2/';

// you have to set a header in order to get the request methods
exports = module.exports = function initTBA(name, description, version) {

	// required header for v2 of TBA API
	var headers = { "X-TBA-App-Id":null };
	var isDefined = function(variable) { return (typeof variable !== 'undefined' && variable !== null); };

	// set header or throw error
	if( isDefined(name) && isDefined(description) && isDefined(version) ) {
		headers['X-TBA-App-Id'] = [name,description,version].join(':');
	}
	else {
		return new Error('can not set header with null or undefined values');
	}

	/*********************************************
	************** Helper Functions **************
	**********************************************/

	// MVF - Most Valuable Function! in library
	// sends a request to the given url and then calls the callback
	var tbaRequest = function(url, callback) {
		req.get({ headers:headers, url:url },

	  	function(err, res) {
	  		if(!err) {
	  			if(res.statusCode === 200) {
	  				var info = JSON.parse(res.body);

	  				// sets error to be null if there is a team, or null if no such team exists
	  				var err = (info != null)? null: new Error('Team did/does not exist in FIRST as of the desired year');

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

	/*********************************************
	************* TBA Library Methods ************
	**********************************************/

	var tba = {};

	/*************** TEAM REQUESTS *****************/

	// 'Team List Request' on TBA API docs
	// gets all the teams on one page of the team list at TBA
	tba['getListOfTeams'] = tba['getTeamList'] = function(pageNum, callback) {
		var url = ROOT_URL+'teams/'+pageNum;

		tbaRequest(url, callback);
	};

	// 'Team Request' on TBA API docs
	// gets one team's background info by its team id and year
	tba['getTeam'] = tba['getTeamById'] = function(teamId, callback) {

		var url = ROOT_URL+'team/frc'+ teamId;

		tbaRequest(url,callback);
	};

	// 'Team Events Request' on TBA API docs
	// gets all the team's events from a single year
	tba['getEventsForTeam'] = tba['getTeamEvents'] = function(teamId, year, callback) {

		// Argument validation
		var validatedYear = yearValidation( year, callback );
		year = validatedYear.year;
		callback = validatedYear.callback || function(err, info) { console.log(err,info) };

		var url = ROOT_URL+'team/frc'+teamId+'/'+year+'/events';
		tbaRequest(url, callback);
	};

	// 'Team Event Awards Request' on TBA API docs
	// gets all the teams awards for a single year at a single event
	tba['getAwardsForTeamAtEvent'] = tba['getTeamEventAwards'] = function(teamId, eventId, year, callback) {

		// Argument validation
		var validatedYear = yearValidation( year, callback );
		year = validatedYear.year;
		callback = validatedYear.callback || function(err, info) { console.log(err,info) };

		var url = ROOT_URL+'team/frc'+teamId+'/event/'+year+eventId+'/awards';
		tbaRequest(url, callback);
	};

	// 'Team Event Matches Request' on TBA API docs
	// gets all the team's matches at a single event in a single year
	tba['getMatchesForTeamAtEvent'] = tba['getTeamEventMatches'] = function(teamId, eventId, year, callback) {

		// Argument validation
		var validatedYear = yearValidation( year, callback );
		year = validatedYear.year;
		callback = validatedYear.callback || function(err, info) { console.log(err,info) };

		var url = ROOT_URL+'team/frc'+teamId+'/event/'+year+eventId+'/matches';
		tbaRequest(url, callback);
	};

	// 'Team Years Participated Request' on TBA API docs
	// returns array of years that the team has been participated in FIRST
	tba['getYearsParticipatedByTeam'] = tba['getTeamYearsParticipated'] = function(teamId, callback) {

		var url = ROOT_URL+'team/frc'+teamId+'/years_participated';

		tbaRequest(url,callback);
	};

	// 'Team Media Request' on TBA API docs
	// gets all the teams media for a single year, as collected on TBA
	tba['getMediaForTeam'] = tba['getTeamMedia'] = function(teamId, year, callback) {

		// Argument validation
		var validatedYear = yearValidation( year, callback );
		year = validatedYear.year;
		callback = validatedYear.callback || function(err, info) { console.log(err,info) };

		var url = ROOT_URL+'team/frc'+teamId+'/'+year+'/media';
		tbaRequest(url, callback);
	};

    // 'Team History Events Request' on TBA API docs
	// gets all historical events for a given team
	tba['getEventHistoryForTeam'] = tba['getTeamEventHistory'] = function(teamId, callback) {

		var url = ROOT_URL+'team/frc'+teamId+'/history/events';

		tbaRequest(url, callback);
	};

    // 'Team History Awards Request' on TBA API docs
	// gets all historical awards for a given team
	tba['getAwardHistoryForTeam'] = tba['getTeamAwardHistory'] = function(teamId, callback) {

		var url = ROOT_URL+'team/frc'+teamId+'/history/awards';

		tbaRequest(url, callback);
	};

    // 'Team History Robots Request' on TBA API docs
	// gets all historical robots for a given team
	tba['getRobotHistoryForTeam'] = tba['getTeamRobotHistory'] = function(teamId, callback) {

		var url = ROOT_URL+'team/frc'+teamId+'/history/robots';

		tbaRequest(url, callback);
	};

    // 'Team History Districts Request' on TBA API docs
	// gets all historical robots for a given team
	tba['getDistrictHistoryForTeam'] = tba['getTeamDistrictHistory'] = function(teamId, callback) {

		var url = ROOT_URL+'team/frc'+teamId+'/history/districts';

		tbaRequest(url, callback);
	};


	/*************** EVENT REQUESTS *****************/

	// 'Team List Request' on TBA API docs
	// gets all the events in FIRST in a single year
	tba['getListOfEvents'] = tba['getEventList'] = function(year, callback) {

		// Argument validation
		var validatedYear = yearValidation( year, callback );
		year = validatedYear.year;
		callback = validatedYear.callback || function(err, info) { console.log(err,info) };

		var url = ROOT_URL+'events/'+year;
		tbaRequest(url, callback);
	};

	// 'Event Request' on TBA API docs
	// gets event info for a single year
	tba['getEventById'] = tba['getEvent'] = function(eventId, year, callback) {

		// Argument validation
		var validatedYear = yearValidation( year, callback );
		year = validatedYear.year;
		callback = validatedYear.callback || function(err, info) { console.log(err,info) };

		var url = ROOT_URL+'event/'+ year+eventId;

		tbaRequest(url,callback);
	};

	// 'Event Teams Request' on TBA API docs
	// get all of the teams at an event
	tba['getTeamsAtEvent'] = tba['getEventTeams'] = function(eventId, year, callback) {

		// Argument validation
		var validatedYear = yearValidation( year, callback );
		year = validatedYear.year;
		callback = validatedYear.callback || function(err, info) { console.log(err,info) };

		var url = ROOT_URL+'event/'+ year+eventId +'/teams';

		tbaRequest(url,callback);
	};

	// 'Event Matches Request' on TBA API docs
	// get all of the matches at an event
	tba['getMatchesAtEvent'] = tba['getEventMatches'] = function(eventId, year, callback) {

		// Argument validation
		var validatedYear = yearValidation( year, callback );
		year = validatedYear.year;
		callback = validatedYear.callback || function(err, info) { console.log(err,info) };

		var url = ROOT_URL+'event/'+ year+eventId +'/matches';

		tbaRequest(url,callback);
	};

	// 'Event Stats Request' on TBA API docs
	// gets the stats for a single event
	tba['getStatsAtEvent'] = tba['getEventStats'] = function(eventId, year, callback) {

		// Argument validation
		var validatedYear = yearValidation( year, callback );
		year = validatedYear.year;
		callback = validatedYear.callback || function(err, info) { console.log(err,info) };

		var url = ROOT_URL+'event/'+year+eventId+'/stats';
		tbaRequest(url, callback);
	};

	// 'Event Rankings Request' on TBA API docs
	// gets the rankings for a single event
	tba['getRankingsAtEvent'] = tba['getEventRankings'] = function(eventId, year, callback) {

		// Argument validation
		var validatedYear = yearValidation( year, callback );
		year = validatedYear.year;
		callback = validatedYear.callback || function(err, info) { console.log(err,info) };

		var url = ROOT_URL+'event/'+year+eventId+'/rankings';
		tbaRequest(url, callback);
	};

	// 'Event Awards Request' on TBA API docs
	// gets awards at an event in a single year
	tba['getAwardsAtEvent'] = tba['getEventAwards'] = function(eventId, year, callback) {

		// Argument validation
		var validatedYear = yearValidation( year, callback );
		year = validatedYear.year;
		callback = validatedYear.callback || function(err, info) { console.log(err,info) };

		var url = ROOT_URL+'event/'+year+eventId+'/awards';

		tbaRequest(url,callback);
	};

	return tba;
};
