# node-thebluealliance

node-thebluealliance is a node.js wrapper library for [The Blue Alliance v2 API](http://www.thebluealliance.com/apidocs). See the v2 API page for more information on what data can be returned.

This app uses The Blue Alliance's [post-2013 event codes](https://docs.google.com/spreadsheet/ccc?key=0ApRO2Yzh2z01dExFZEdieV9WdTJsZ25HSWI3VUxsWGc#gid=0).


### Installation

First install [node](http://nodejs.org). Then:

```sh
$ npm install thebluealliance
```

This will download node-thebluealliance to the local `node_modules` folder, from which it can be imported with `require`.


## node-thebluealliance API docs

### **Notes on the API**

- Arguments
  - `frc_id` refers to the number assigned to each team by FIRST (i.e. 1540, 254, etc.)
  - `event_id` refers to The Blue Alliance's [post-2013 event codes](https://docs.google.com/spreadsheet/ccc?key=0ApRO2Yzh2z01dExFZEdieV9WdTJsZ25HSWI3VUxsWGc#gid=0)

- **CONSISTENT ACROSS EVERY FUNCTION:** In node's style, all callbacks will receive an `error` object as the first argument. A null `error` object indicates a successful request. The second argument in the callback will contain unchanged queried data from The Blue Alliance. The Blue Alliance data models are available under the Models sections of the [API webpage](http://www.thebluealliance.com/apidocs).

#### callback(*err*, *data*)

##### err

type: `null` or `Error Object`

##### data

Queried data returned by The Blue Alliance


- **CONSISTENT ACROSS EVERY FUNCTION:** The year argument is always optional and will always default to the current year. For example, calling

```js
tba.getTeamsAtEvent('arc', callback);
```

is the same as calling

```js
tba.getTeamsAtEvent('arc', (new Date()).getFullYear(), callback);
```

#### year
type: `number`
default: current year

The year for which data will be returned.

- Suggestions for improvement are always welcome at hmzh.khn@gmail.com


### Methods Summary
- initTBA
- tba
  - **getListOfTeams**     /       getTeamList
  - **getTeamById**     /       getTeam
  - **getEventsForTeam**     /       getTeamEvent
  - **getAwardsForTeamAtEvent**     /       getTeamEventAwards
  - **getMatchesForTeamsAtEvent**     /       getTeamEventMatches
  - **getYearsParticipatedByTeam**     /       getTeamYearsParticipated
  - **getMediaForTeam**     /       getTeamMedia
  - **getListOfEvents**     /       getEventList
  - **getEventById**     /       getEvent
  - **getTeamsAtEvent**     /       getEventTeams
  - **getMatchesAtEvent**     /       getEventMatches
  - **getStatsAtEvent**     /       getEventStats
  - **getRankingsAtEvent**     /       getEventRankings
  - **getAwardsAtEvent**     /       getEventAwards
  - **getEventHistoryForTeam**     /       getTeamEventHistory
  - **getAwardHistoryForTeam**     /       getTeamAwardHistory
  - **getRobotHistoryForTeam**     /       getTeamRobotHistory
  - **getDistrictHistoryForTeam**     /       getTeamDistrictHistory
  - **getSingleMatchFromKey**     / getSingleMatch


### initTBA(*identifier*, *description*, *version_number*)

```js
var initTBA = require('thebluealliance');
var tba = initTBA('node-thebluealliance','Node.js wrapper library for the TBA v2 API','1.1.1');

// or as a shortcut

var tba = require('thebluealliance')('node-thebluealliance','Node.js wrapper library for the TBA v2 API','1.1.1');
```

The Blue Alliance v2 API requires a custom `X-TBA-App-Id` header in order to accept requests. Calling initTBA allows node-thebluealliance to retain this header for the duration of the library's use. Calling `initTBA` returns the `tba` object, which contains all of the methods required to retrieve data from The Blue Alliance.

#### identifier

Type: `String`

Name or organization of the user.

#### description

Type: `String`

Description of the application requesting data from The Blue Alliance.

#### version_number

Type: `String` or `Number`

Version number of the application requesting data from The Blue Alliance.



### tba.getListOfTeams(*page_num*, *callback(err, list_of_teams)*)

##### aliased as *tba.getTeamList*

`Team List Request` on TBA API docs
Gets all the teams on one page of the team list at TBA

data_type: `Array` of `Teams`

### tba.getTeamById(*frc_id*, *callback(err, team_info)*)

##### aliased as tba.getTeam

`Team Request` on TBA API docs
Gets one team`s background info by its team id

### tba.getEventsForTeam(*frc_id*[, *year*], *callback(err, event_info)*)

##### aliased as tba.getTeamEvent

`Team Events Request` on TBA API docs
Gets all the team`s events from a single year

### tba.getAwardsForTeamAtEvent(*frc_id*, *event_id*[, *year*], *callback(err, awards_list)*)

##### aliased as tba.getTeamEventAwards

`Team Event Awards Request` on TBA API docs
Gets all the teams awards for a single year at a single event

### tba.getMatchesForTeamsAtEvent(*frc_id*, *event_id*, [*year*], *callback(err, matches_list)*)

##### aliased as tba.getTeamEventMatches

`Team Event Matches Request` on TBA API docs
Gets all the team`s matches at a single event in a single year

### tba.getYearsParticipatedByTeam(*frc_id*, *callback(err, list_of_years)*)

##### aliased as tba.getTeamYearsParticipated

`Team Years Participated Request` on TBA API docs
returns array of years that the team has been participated in FIRST

### tba.getMediaForTeam(*frc_id*, [*year*], *callback(err, media_list)*)

##### aliased as tba.getTeamMedia

`Team Media Request` on TBA API docs
Gets all the teams media for a single year,  as collected on TBA

### tba.getEventHistoryForTeam(*frc_id*, *callback(err, event_history)*)

##### aliased as tba.getTeamEventHistory

'Team History Events Request' on TBA API docs
Gets all historical events for a given team

### tba.getAwardHistoryForTeam(*frc_id*, *callback(err, award_history)*)

##### aliased as tba.getTeamAwardHistory

'Team History Awards Request' on TBA API docs
Gets all historical awards for a given team

### tba.getRobotHistoryForTeam(*frc_id*, *callback(err, robot_history)*)

##### aliased as tba.getTeamRobotHistory

'Team History Robots Request' on TBA API docs
Gets all historical robots for a given team

### tba.getDistrictHistoryForTeam(*frc_id*, *callback(err, robot_history)*)

##### aliased as tba.getTeamDistrictHistory

'Team History Districts Request' on TBA API docs
Gets all historical districts for a given team


### tba.getListOfEvents([*year*], *callback(err, list_of_teams)*)

##### aliased as tba.getEventList

`Team List Request` on TBA API docs
Gets all the events in FIRST in a single year

### tba.getEventById(*eventId*[, *year*], *callback(err, event_object)*)

##### aliased as tba.getEvent

`Event Request` on TBA API docs
Gets event info for a single year

### tba.getTeamsAtEvent(*eventId*[, *year*], *callback(err, teams_list)*)

##### aliased as tba.getEventTeams

`Event Teams Request` on TBA API docs
get all of the teams at an event

### tba.getMatchesAtEvent(*eventId*[, *year*], *callback(err, matches_list)*)

##### aliased as tba.getEventMatches

`Event Matches Request` on TBA API docs
get all of the matches at an event

### tba.getStatsAtEvent(*eventId*[, *year*], *callback(err, stats_object)*)

##### aliased as tba.getEventStats

`Event Stats Request` on TBA API docs
Gets the stats for a single event

### tba.getRankingsAtEvent(*eventId*[, *year*], *callback(err, rankings_list)*)

##### aliased as tba.getEventRankings

`Event Rankings Request` on TBA API docs
Gets the rankings for a single event

### tba.getAwardsAtEvent(*eventId*[, *year*], *callback(err, awards_list)*)

##### aliased as tba.getEventAwards

`Event Awards Request` on TBA API docs
Gets awards at an event in a single year

### tba.getSingleMatchFromKey(*match_key*, *callback(err, match_data)*)

##### aliased as tba.getSingleMatch

`Single Match Request` on TBA API docs
Gets information from 1 match at an event using a match key (see Match Model - key on TBA API docs)

## Example Code

```js
tba.getTeamsAtEvent('casb', function(err, teamsInfo) {
  // teamsInfo is a list of teams at the Inland Empire Regional for the current year
  //...
});
```


## Support
- [bug reports](https://github.com/khanh111/node-thebluealliance/issues)



## To-Do List

- more clarity in documentation
- add better example code
- tests w/ [Mocha](http://visionmedia.github.io/mocha/)
- ability to pass in more variants of ids/years (i.e. `'2014orore'` instead of `getEvent('orore',2014)`)

## Upcoming functionality improvements

- methods that allow analysis of certain data subsets (maybe a separate library for this)
- data caching for things that are unlikely to change
  - for this one, limitations due to TBA API (can't get data subsets easily)



## MIT License

> Copyright &copy; 2014 Hamzah Khan &lt;hmzh.khn@gmail.com&gt;

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
