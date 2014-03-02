# node-thebluealliance

node-thebluealliance is a node.js wrapper library for [The Blue Alliance v2 API](http://www.thebluealliance.com/apidocs). See the v2 API page for more information on what data can be returned.

This app uses The Blue Alliance's post-2013 [event codes](https://docs.google.com/spreadsheet/ccc?key=0ApRO2Yzh2z01dExFZEdieV9WdTJsZ25HSWI3VUxsWGc#gid=0).


## API Docs

### Installation

First install [node.js](http://nodejs.org/). Then:

    $ npm install thebluealliance
    
### Import (`tba = require('thebluealliance')([name])`)

    var tba = require('thebluealliance')('name/organization','description of your application','1.0.0')

This sets the `X-TBA-App-Id` header information (new and required in v2 API) so that you never have to again. `tba` holds all of the methods that can request data from The Blue Alliance.
    
### tba.getTeam ([`frc_id`], [`year` | optional, defaults to current year], [`callback(error, teamInfo)`])

    // get 1540 data from the current year
    
    tba.getTeam(1540, function(err, teamInfo) {
      // the year parameter defaults to the current year
    });
    
    // is the same as
    
    tba.getTeam(1540, (new Date()).getFullYear(), function(err, teamInfo) {
      // (new Date()).getFullYear() returns the current year (ex. 2014)
    });
    
Or from past years:
    
    // get 1540 data from 2012
    tba.getTeam(1540, 2012, function(err, teamInfo) {
      // teamInfo is team 1540's data from 2012
    });
    
### tba.getEvent ([`tba_event_code`], [`year` | optional, defaults to current year], [`callback(error, eventInfo)`])

    // get 'casb' (Inland Empire Regional) event info from the current year
    
    tba.getEvent('casb', function(err, eventInfo) {
      // the year parameter defaults to the current year
    });
    
    // is the same as
    
    tba.getEvent('casb', (new Date()).getFullYear(), function(err, eventInfo) {
      // (new Date()).getFullYear() returns the current year (ex. 2014)
    });
    
Or from past years:
    
    // get 'casb' data from 2012
    tba.getEvent('casb', 2012, function(err, eventInfo) {
      // eventInfo is 'casb' regional event data from 2012
    });

The `tba.getEvent` method is aliased to `tba.getEventById`.

### tba.getTeamsAtEvent ([`tba_event_code`], [`year` | optional, defaults to current year], [`callback(error, teamsInfo)`])

    // get info on teams at the 'casb' (Inland Empire Regional) event this year
    
    tba.getTeamsAtEvent('casb', function(err, teamsInfo) {
      // the year parameter defaults to the current year
    });
    
    // is the same as
    
    tba.getTeamsAtEvent('casb', (new Date()).getFullYear(), function(err, teamsInfo) {
      // (new Date()).getFullYear() returns the current year (ex. 2014)
    });
    
Or from past years:
    
    // get 'casb' team data from 2012
    tba.getTeamsAtEvent('casb', 2012, function(err, teamsInfo) {
      // teamsInfo is info on teams at the 'casb' regional event in 2012
    });

### tba.getMatchesAtEvent ([`tba_event_code`], [`year` | optional, defaults to current year], [`callback(error, matchesInfo)`])

    // get info on matches at the 'casb' (Inland Empire Regional) event this year
    
    tba.getMatchesAtEvent('casb', function(err, matchesInfo) {
      // the year parameter defaults to the current year
    });
    
    // is the same as
    
    tba.getMatchesAtEvent('casb', (new Date()).getFullYear(), function(err, matchesInfo) {
      // (new Date()).getFullYear() returns the current year (ex. 2014)
    });
    
Or from past years:
    
    // get 'casb' match data from 2012
    tba.getMatchesAtEvent('casb', 2012, function(err, matchesInfo) {
      // matchesInfo is info on matches at the 'casb' regional event in 2012
    });
 

## Support
  - [bug reports](https://github.com/khanh111/node-thebluealliance/issues)

## To-Do List
  - add better example code
  - tests w/ [Mocha](http://visionmedia.github.io/mocha/)
  - ability to pass in more variants of ids/years (i.e. `'2014orore'` instead of `getEvent('orore',2014)`)
  - improve documentation (MAKE IT PRETTY!)

## Functionality Improvements
  - methods that allow analysis of certain data subsets
  - data caching for things that are unlikely to change
    - for this one, limitations due to TBA API (can't get data subsets easily)

## License

Copyright (c) 2014 Hamzah Khan &lt;hmzh.khn@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
