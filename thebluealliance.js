/**
 * The Blue Alliance API Library for node.js es6 v1.2.2
 * (c) 2014 Hamzah Khan [FRC 3188 (2010), FRC 3636 (2011-12), FRC 1540 (2013-14)]
 * Modified by Gus Caplan [FRC 3135 (2015-16)]
 * License: MIT
 */

/*
  TBA API docs are at: http://www.thebluealliance.com/apidocs
*/

const req = require('superagent');

const isDefined = variable => (typeof variable !== 'undefined' && variable !== null);

// you have to set a header in order to get the request methods
class initTBA {

  constructor (name, description, version) {
    // all TBA API v2 requests go to this root uri
    this.ROOT_URL = 'https://www.thebluealliance.com/api/v2';
    this.headers = { 'X-TBA-App-Id': null };
    // set header or throw error
    if (isDefined(name) && isDefined(description) && isDefined(version)) {
      this.headers['X-TBA-App-Id'] = [name, description, version].join(':');
    } else {
      return new Error('can not set header with null or undefined values');
    }
    /*********************************************
    ****************** Aliases *******************
    **********************************************/
    this.getListOfTeams = this.getTeamList;
    this.getTeamById = this.getTeam;
    this.getEventsForTeam = this.getTeamEvents;
    this.getAwardsForTeamAtEvent = this.getTeamEventAwards;
    this.getMatchesForTeamAtEvent = this.getTeamEventMatches;
    this.getYearsParticipatedByTeam = this.getTeamYearsParticipated;
    this.getMediaForTeam = this.getTeamMedia;
    this.getEventHistoryForTeam = this.getTeamEventHistory;
    this.getAwardHistoryForTeam = this.getTeamAwardHistory;
    this.getRobotHistoryForTeam = this.getTeamRobotHistory;
    this.getDistrictHistoryForTeam = this.getTeamDistrictHistory;
    this.getListOfEvents = this.getEventList;
    this.getEventById = this.getEvent;
    this.getTeamsAtEvent = this.getEventTeams;
    this.getMatchesAtEvent = this.getEventMatches;
    this.getStatsAtEvent = this.getEventStats;
    this.getRankingsAtEvent = this.getEventRankings;
    this.getAwardsAtEvent = this.getEventAwards;
    this.getSingleMatchFromKey = this.getSingleMatch;
  }

  /*********************************************
  ************** Helper Functions **************
  **********************************************/

  // MVF - Most Valuable Function! in library
  // sends a request to the given url and then calls the callback
  tbaRequest (url, callback) {
    callback = callback || function (err, info) { console.log(err, info) }; // safety

    req.get(this.ROOT_URL + url)
    .set(this.headers)
    .end((err, res) => {
      if (!err) {
        if (res.statusCode === 200) {
          let info = res.body;

          // sets error to be null if there is a team, or null if no such team exists
          err = (info != null) ? null : new Error('Team did/does not exist in FIRST as of the desired year');

          // successful request
          callback(null, info);
        } else {
          // Unsuccessful because of 404 or something
          callback(new Error('Unsuccessful request to TBA'), null, null);
        }
      } else {
        // error in request
        callback(err, null, null);
      }
    });
  };

  yearValidation (year, callback) {
    // arguments validation for year and callback
    switch (typeof year) {
      case 'number':
        break;

      case 'function':
        callback = year;
        year = new Date().getFullYear();
        break;

      case 'undefined':
        year = new Date().getFullYear();
        break;
    }

    return { year: year, callback: callback };
  };

  /*********************************************
  ************* TBA Library Methods ************
  **********************************************/

  /**********************************************
  *************** TEAM REQUESTS *****************
  **********************************************/

  // 'Team List Request' on TBA API docs
  // gets all the teams on one page of the team list at TBA
  getTeamList (pageNum, callback) {
    let url = this.ROOT_URL + 'teams/' + pageNum;

    this.tbaRequest(url, callback);
  };

  // 'Team Request' on TBA API docs
  // gets one team's background info by its team id and year
  getTeam (teamId, callback) {
    let url = `/team/frc${teamId}`;

    this.tbaRequest(url, callback);
  };

  // 'Team Events Request' on TBA API docs
  // gets all the team's events from a single year
  getTeamEvents (teamId, year, callback) {
    // Argument validation
    let validatedYear = this.yearValidation(year, callback);
    year = validatedYear.year;
    callback = validatedYear.callback || function (err, info) { console.log(err, info) };

    let url = `/team/frc${teamId}/${year}/events`;
    this.tbaRequest(url, callback);
  };

  // 'Team Event Awards Request' on TBA API docs
  // gets all the teams awards for a single year at a single event
  getTeamEventAwards (teamId, eventId, year, callback) {
    // Argument validation
    let validatedYear = this.yearValidation(year, callback);
    year = validatedYear.year;
    callback = validatedYear.callback || function (err, info) { console.log(err, info) };

    let url = `/team/frc${teamId}/event/${year}${eventId}/awards`;
    this.tbaRequest(url, callback);
  };

  // 'Team Event Matches Request' on TBA API docs
  // gets all the team's matches at a single event in a single year
  getTeamEventMatches (teamId, eventId, year, callback) {
    // Argument validation
    let validatedYear = this.yearValidation(year, callback);
    year = validatedYear.year;
    callback = validatedYear.callback || function (err, info) { console.log(err, info) };

    let url = `/team/frc${teamId}/event/${year}${eventId}/matches`;
    this.tbaRequest(url, callback);
  };

  // 'Team Years Participated Request' on TBA API docs
  // returns array of years that the team has been participated in FIRST
  getTeamYearsParticipated (teamId, callback) {
    let url = `/team/frc${teamId}/years_participated`;

    this.tbaRequest(url, callback);
  };

  // 'Team Media Request' on TBA API docs
  // gets all the teams media for a single year, as collected on TBA
  getTeamMedia (teamId, year, callback) {
    // Argument validation
    let validatedYear = this.yearValidation(year, callback);
    year = validatedYear.year;
    callback = validatedYear.callback || function (err, info) { console.log(err, info) };

    let url = `/team/frc${teamId}/${year}/media`;
    this.tbaRequest(url, callback);
  };

    // 'Team History Events Request' on TBA API docs
  // gets all historical events for a given team
  getTeamEventHistory (teamId, callback) {
    let url = `/team/frc${teamId}/history/events`;

    this.tbaRequest(url, callback);
  };

    // 'Team History Awards Request' on TBA API docs
  // gets all historical awards for a given team
  getTeamAwardHistory (teamId, callback) {
    let url = `/team/frc${teamId}/history/awards`;

    this.tbaRequest(url, callback);
  };

    // 'Team History Robots Request' on TBA API docs
  // gets all historical robots for a given team
  getTeamRobotHistory (teamId, callback) {
    let url = `/team/frc${teamId}/history/robots`;

    this.tbaRequest(url, callback);
  };

    // 'Team History Districts Request' on TBA API docs
  // gets all historical robots for a given team
  getTeamDistrictHistory (teamId, callback) {
    let url = `/team/frc${teamId}/history/districts`;

    this.tbaRequest(url, callback);
  };

  /***********************************************
  *************** EVENT REQUESTS *****************
  ***********************************************/

  // 'Team List Request' on TBA API docs
  // gets all the events in FIRST in a single year
  getEventList (year, callback) {
    // Argument validation
    let validatedYear = this.yearValidation(year, callback);
    year = validatedYear.year;
    callback = validatedYear.callback || function (err, info) { console.log(err, info) };

    let url = `/events/${year}`;
    this.tbaRequest(url, callback);
  };

  // 'Event Request' on TBA API docs
  // gets event info for a single year
  getEvent (eventId, year, callback) {
    // Argument validation
    let validatedYear = this.yearValidation(year, callback);
    year = validatedYear.year;
    callback = validatedYear.callback || function (err, info) { console.log(err, info) };

    let url = `/event/${year}${eventId}`;

    this.tbaRequest(url, callback);
  };

  // 'Event Teams Request' on TBA API docs
  // get all of the teams at an event
  getEventTeams (eventId, year, callback) {
    // Argument validation
    let validatedYear = this.yearValidation(year, callback);
    year = validatedYear.year;
    callback = validatedYear.callback || function (err, info) { console.log(err, info) };

    let url = `/event/${year}${eventId}/teams`;

    this.tbaRequest(url, callback);
  };

  // 'Event Matches Request' on TBA API docs
  // get all of the matches at an event
  getEventMatches (eventId, year, callback) {
    // Argument validation
    let validatedYear = this.yearValidation(year, callback);
    year = validatedYear.year;
    callback = validatedYear.callback || function (err, info) { console.log(err, info) };

    let url = `/event/${year}${eventId}/matches`;

    this.tbaRequest(url, callback);
  };

  // 'Event Stats Request' on TBA API docs
  // gets the stats for a single event
  getEventStats (eventId, year, callback) {
    // Argument validation
    let validatedYear = this.yearValidation(year, callback);
    year = validatedYear.year;
    callback = validatedYear.callback || function (err, info) { console.log(err, info) };

    let url = `/event/${year}${eventId}/stats`;
    this.tbaRequest(url, callback);
  };

  // 'Event Rankings Request' on TBA API docs
  // gets the rankings for a single event
  getEventRankings (eventId, year, callback) {
    // Argument validation
    let validatedYear = this.yearValidation(year, callback);
    year = validatedYear.year;
    callback = validatedYear.callback || function (err, info) { console.log(err, info) };

    let url = `/event/${year}${eventId}/rankings`;
    this.tbaRequest(url, callback);
  };

  // 'Event Awards Request' on TBA API docs
  // gets awards at an event in a single year
  getEventAwards (eventId, year, callback) {
    // Argument validation
    let validatedYear = this.yearValidation(year, callback);
    year = validatedYear.year;
    callback = validatedYear.callback || function (err, info) { console.log(err, info) };

    let url = `/event/${year}${eventId}/awards`;

    this.tbaRequest(url, callback);
  };

  // 'Single Match Request' on TBA API docs
  // Gets a single match based on match_key
  getSingleMatch (matchKey, callback) {
    let url = `/match/${matchKey}`;

    this.tbaRequest(url, callback);
  };

};

module.exports = initTBA;
