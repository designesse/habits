import React, { Component } from 'react';
import './Trackers.css';
import Constants from '../Constants';

class Trackers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'trackers': props.trackers
    }

    this.formatTrackers = this.formatTrackers.bind(this);
  }

  formatTrackers(trackers) {
    var dayCheckHabits = [];
    trackers.forEach(function (trackerHabit, i) {
      var today = new Date();
      var todayDate = today.getDate();
      var startDate = trackerHabit['start']['day'];
      var lastMonth = trackerHabit['checksByMonths'][0]['month'];
      var numMissedMonths = 0;
      var types = Constants.HABITSTYPES;

      // Fill in trackers if months are missing from last tracker to today.
      if ( trackerHabit['checksByMonths'][0]['year'] !== today.getFullYear() ) {
        var newMonth = lastMonth;
        var lastYear, newYear;
        lastYear = newYear = trackerHabit['checksByMonths'][0]['year'];
        numMissedMonths = 12*(today.getFullYear()-lastYear) + (today.getMonth()-lastMonth);
        for (var iAddMonth=0; iAddMonth<numMissedMonths; iAddMonth++) {
          newMonth++;
          if ( newMonth>11 ) {
            newMonth = 0;
            newYear++;
          }
          trackerHabit['checksByMonths'].unshift({ 'year': newYear, 'month': newMonth, 'days': []});
        }
      }
      else if ( trackerHabit['checksByMonths'][0]['month'] !== today.getMonth() ) {
        numMissedMonths = today.getMonth()-trackerHabit['checksByMonths'][0]['month'];
        for (var jAddMonth=0; jAddMonth<numMissedMonths; jAddMonth++) {
          trackerHabit['checksByMonths'].unshift({ 'year': today.getFullYear(), 'month': lastMonth+jAddMonth+1, 'days': []});
        }
      }

      var numMonths = trackerHabit['checksByMonths'].length;
      var checkHabit = [];
      for (var iMonth=0; iMonth<numMonths; iMonth++) {
        var checksByMonth = trackerHabit['checksByMonths'][iMonth];
        var checkedDays = checksByMonth['days'];
        var daysInMonth = (new Date(checksByMonth['year'], checksByMonth['month']+1, 0)).getDate();
        var checks = [];

        switch (trackerHabit['type']) {
          case types['daily'] :
            // Fill in calendar days.
            for (var iDay=0; iDay<daysInMonth; iDay++) {
              checks.push({'date': iDay+1, 'isChecked': false});
            }

            // Fill in checked days.
            for (var iCheckDay=0; iCheckDay<checkedDays.length; iCheckDay++) {
              checks[checkedDays[iCheckDay]-1]['isChecked'] = true;
            }

            // Remove days after today.
            if (iMonth === 0) {
              checks.splice(-daysInMonth+todayDate, daysInMonth-todayDate);
            }
            // Remove days before start date.
            if (iMonth === numMonths-1) {
              checks.splice(0, startDate-1);
            }
            break;

          case types['weekly'] :
            // Fill in weekly calendar days, checked or not.
            var firstDay = (new Date(checksByMonth['year'], checksByMonth['month'], 1)).getDay();
            var weekDay = trackerHabit['weekDay'] - firstDay < 0 ? trackerHabit['weekDay'] - firstDay + 7 : trackerHabit['weekDay'] - firstDay;
            weekDay++;
            var iCheckWeeklyDay = 0;
            var numCheckedDays = checkedDays.length;

            while (weekDay <= daysInMonth) {
              var isChecked = false;
              if (iCheckWeeklyDay < numCheckedDays && weekDay === checkedDays[iCheckWeeklyDay]) {
                isChecked = true;
                iCheckWeeklyDay++;
              }
              checks.push({'date': weekDay, 'isChecked': isChecked});
              weekDay += 7;
            }

            // Remove days after today.
            if (iMonth === 0) {
              while (checks[checks.length-1]['date']>todayDate) {
                checks.pop();
              }
            }

            // Remove days before start date.
            if (iMonth === numMonths-1) {
              while (checks.length>0 && checks[0]['date']<startDate) {
                checks.shift();
              }
            }

            break;

          default: break;
          }


        checkHabit.push({'month': checksByMonth['month'], 'days': checks});
      }
      dayCheckHabits.push({'name': trackerHabit['name'], 'checksByMonths': checkHabit});
    })
    return dayCheckHabits;
  }

  render() {
    var trackers = this.formatTrackers(this.state.trackers);

    return (
      <div className="App-Trackers">
      { trackers.map((habit, i) =>
        <div key={i} className="overflow-hide">
          <h4 className="bold left title-circle"> { habit['name'] } </h4>
          { habit['checksByMonths'].map((month, j) =>
            <span key={j} className="left padding-hor right-border">
              { month['days'].map((day, k) =>
                <span key={k} className={ day['isChecked'] ? 'circle box right' : 'circle no-box right' }> { day['date'] }</span>
              )}
            </span>
          )}
        </div>
      )}
      </div>
    );
  }
};

export default Trackers;
